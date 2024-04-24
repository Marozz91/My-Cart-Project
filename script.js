

function addProduct() {

    const isValid = validation();
    if (isValid === false) return;

    const product = getProductDetails();

    const productList = getListFromStorage();

    productList.push(product);

    saveToStorage(productList);

    displayProductsInTable(productList);

    clearForm();

}


function validation() {

    const productBox = document.getElementById("productBox");
    const priceBox = document.getElementById("priceBox");
    const selectBox = document.getElementById("selectBox");
    const imageBox = document.getElementById("imageBox");
    const productBoxErr = document.getElementById("productBoxErr");
    const priceBoxErr = document.getElementById("priceBoxErr");
    const imageBoxErr = document.getElementById("imageBoxErr");

    const product = productBox.value;
    const price = priceBox.value;
    const select = selectBox.value;
    const image = imageBox.value;

    productBoxErr.innerText = "";
    priceBoxErr.innerText = "";
    imageBoxErr.innerText = "";

    if (product === "") {

        productBoxErr.innerText = "Please Enter Product!";
        productBox.focus();
        return false;
    }

    if (price === "") {

        priceBoxErr.innerText = "Please Enter Price!";
        priceBox.focus();
        return false;
    }

    if (select === "") {
        selectBox.focus();
        return false;
    }

    if (image === "") {
        imageBoxErr.innerText = "Please Enter Image Link!";
        imageBox.focus();
        return false;
    }

    return true;
}


function getProductDetails() {

    const productBox = document.getElementById("productBox");
    const priceBox = document.getElementById("priceBox");
    const imageBox = document.getElementById("imageBox");
    const selectBox = document.getElementById("selectBox");

    const product = productBox.value;
    const price = priceBox.value;
    const image = imageBox.value;
    const optionValue = selectBox.value;


    const products = {

        product: product,
        price: price,
        image: image,
        optionValue: optionValue

    }

    return products;

}

function getListFromStorage() {

    const oldStr = localStorage.getItem("list");

    const productList = (oldStr === null) ? [] : JSON.parse(oldStr);

    return productList;

}


function saveToStorage(arr) {

    const str = JSON.stringify(arr);

    localStorage.setItem("list", str);

}

function displayProductsInTable(productList) {

    const tableBody = document.getElementById("tableBody");

    tableBody.innerHTML = "";

    for (const [index, product] of productList.entries()) {

        tableBody.innerHTML += `
            <tr>
                <td> ${product.product}</td>
                <td> ${product.price}</td>
                <td> ${product.optionValue}</td>
                <td> <img src="${product.image}" alt=""></td>
                <td><button class="remove-btn" data-index="${index}">Remove</button></td>

            </tr> `;

    }

    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const indexToRemove = button.getAttribute("data-index");
            productList.splice(indexToRemove, 1);
            saveToStorage(productList);
            displayProductsInTable(productList);
        });
    });

}


function clearForm() {
    const productBox = document.getElementById("productBox");
    const priceBox = document.getElementById("priceBox");
    const selectBox = document.getElementById("selectBox");
    const imageBox = document.getElementById("imageBox");


    productBox.value = "";
    priceBox.value = "";
    selectBox.value = "";
    imageBox.value = "";
}


