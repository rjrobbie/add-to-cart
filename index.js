import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://add-to-cart-b362e-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingList = ref(database, "shoppingList");

const inputEl = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButton.addEventListener("click", () => {
    let inputValue = inputEl.value;

    if (!inputValue.trim()) {
        alert("Nothing to add");
        return;
    }

    push(shoppingList, inputValue);

    clearInput();
});

onValue(shoppingList, function(snapshot) {

    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());
    
        clearShoppingList();
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];
            let currentItemID = currentItem[0];
            let currentItemValue = currentItem[1];
    
            addNewItem(currentItemID, currentItemValue);
        }
    } else {
        shoppingListEl.innerHTML = "<span class='empty-message'>Your shopping list is empty</span>";
    }
  
});

const clearShoppingList = () => {
    shoppingListEl.innerHTML = "";
};

const clearInput = () => {
    inputEl.value = "";
};

const addNewItem = (itemID, itemValue) => {
    let newEl = document.createElement("li");

    newEl.textContent = itemValue;

    newEl.addEventListener("click", () => {
        let locationOfItemInDB = ref(database, `shoppingList/${itemID}`)

        remove(locationOfItemInDB)
    })

    shoppingListEl.append(newEl);
};
