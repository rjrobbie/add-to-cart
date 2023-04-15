import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://add-to-cart-b362e-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const groceryItemInDB = ref(database, "groceries");


const inputEl = document.getElementById("input-field")
const addButton = document.getElementById("add-button");

addButton.addEventListener("click", () => {
    let inputValue = inputEl.value;

    push(groceryItemInDB, inputValue)
    console.log(`${inputValue} added to database`);
})
