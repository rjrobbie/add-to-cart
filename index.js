import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://add-to-cart-b362e-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingList = ref(database, "shoppingList");

const inputEl = document.getElementById("input-field")
const addButton = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list")

addButton.addEventListener("click", () => {
    let inputValue = inputEl.value;

    if (!inputValue.trim()) {
        alert("Nothing to add");
        return;
    }

    push(shoppingList, inputValue)

    clearInput();

})

onValue(shoppingList, function(snapshot) {
    let itemsArray = Object.values(snapshot.val())
    
    clearShoppingList()
    
    for (let i = 0; i < itemsArray.length; i++) {
        addNewItem(itemsArray[i])
    }
})

const clearShoppingList = () => {
    shoppingListEl.innerHTML = ""
}

const clearInput = () => {
    inputEl.value = "";
};

const addNewItem = (itemValue) => {
    const existingItems = Array.from(shoppingListEl.children).map((li) => li.textContent.trim());
    
    if (existingItems.includes(itemValue)) {
        return;
    }
    
    shoppingListEl.innerHTML += `<li>${itemValue}</li>`
};