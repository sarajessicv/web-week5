

if (document.readyState !== "loading") {
    console.log("Document is ready");
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        console.log("Document ready after waiting!");
        initializeCode();
    })
}


function initializeCode() {

    const main = document.getElementById("container");
    const addIngButton = document.getElementById("add-ingredient");
    const addInsButton = document.getElementById("add-instruction");
    const addInsText = document.getElementById("instructions-text");
    const addIngText = document.getElementById("ingredients-text");
    const submitButton = document.getElementById("submit");
    const nameText = document.getElementById("name-text");
    const searchText = document.getElementById("search");
    const categoryDiv = document.getElementById("category-div");

    let checkboxData = [];

    fetch('http://localhost:1234/categories')
        .then(response => response.json())
        .then(data => {
            checkboxData = data;
            data.forEach(element => {
                console.log(element);
                const check = document.createElement("input");
                check.type = "checkbox";
                check.classList = "filled-in";
                check.name = "checkbox";
                const span = document.createElement("span");
                span.innerHTML = element.name;
                const label = document.createElement("label");
                const p = document.createElement("p");

                label.appendChild(check);
                label.appendChild(span);
                p.appendChild(label);
                categoryDiv.appendChild(p);
            })
        });


    /*const url = "http://localhost:1234/recipe/pizza";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let name = data.name;
            let instructions = data.instructions;
            let ingredients = data.ingredients;

            const header = document.createElement("h2");
            header.innerText = name;

            const ingredients_list = document.createElement("ul");

            ingredients.forEach(element => {
                let ing_item = document.createElement("li");
                ing_item.innerText = element;
                ingredients_list.appendChild(ing_item);

            });

            const instructions_list = document.createElement("ul");

            instructions.forEach(element => {
                let ins_item = document.createElement("li");
                ins_item.innerText = element;
                instructions_list.appendChild(ins_item);

            });
            const recipeContainer = document.createElement("div");
            recipeContainer.className = "col";

            const ingHeader = document.createElement("h5");
            const insHeader = document.createElement("h5");
            ingHeader.textContent = "Ingredients";
            insHeader.textContent = "Instructions";
            recipeContainer.appendChild(header);
            recipeContainer.appendChild(ingHeader);
            recipeContainer.appendChild(ingredients_list);
            recipeContainer.appendChild(insHeader);
            recipeContainer.appendChild(instructions_list);
            main.appendChild(recipeContainer);
        }
        );*/

    let newIngList = [];
    addIngButton.addEventListener("click", function () {
        newIngList.push(addIngText.value);
        addIngText.value = "";
    });

    let newInsList = [];
    addInsButton.addEventListener("click", function () {
        newInsList.push(addInsText.value);
        addInsText.value = "";
    });

    const picArea = document.getElementById("camera-file-input");


    submitButton.addEventListener("click", function () {
        let formData = new FormData();

        for (let index = 0; index < picArea.files.length; index++) {
            formData.append("images", picArea.files[index]);

        };

        let checkboxList = document.getElementsByName("checkbox");
        idList = [];
        checkboxList.forEach((element, i) => {
            if (element.checked) {
                idList.push(checkboxData[i]._id);
            } else {
                //jatketaan elämäää
            }

        });


        let newRecipe = { name: nameText.value, ingredients: newIngList, instructions: newInsList, categories: idList };
        fetch("http://localhost:1234/recipe/", {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(newRecipe)
        })
            .then(response => response.json())
            .then(data =>
                console.log(data));



        fetch("http://localhost:1234/images/", {
            method: "post",
            //headers: { "Content-type": "multipart/form-data" },
            body: formData
        })
            .then(response => response)
            .then(data =>
                console.log(data));
    });

    searchText.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const searchFood = searchText.value;
            fetch("http://localhost:1234/recipe/" + searchFood)
                .then(response => response.json())
                .then(data => {
                    let name = data.name;
                    let instructions = data.instructions;
                    let ingredients = data.ingredients;

                    const header = document.createElement("h2");
                    header.innerText = name;

                    const ingredients_list = document.createElement("ul");

                    ingredients.forEach(element => {
                        let ing_item = document.createElement("li");
                        ing_item.innerText = element;
                        ingredients_list.appendChild(ing_item);

                    });

                    const instructions_list = document.createElement("ul");

                    instructions.forEach(element => {
                        let ins_item = document.createElement("li");
                        ins_item.innerText = element;
                        instructions_list.appendChild(ins_item);

                    });
                    const recipeContainer = document.createElement("div");
                    recipeContainer.className = "col";

                    const ingHeader = document.createElement("h5");
                    const insHeader = document.createElement("h5");
                    ingHeader.textContent = "Ingredients";
                    insHeader.textContent = "Instructions";
                    recipeContainer.appendChild(header);
                    recipeContainer.appendChild(ingHeader);
                    recipeContainer.appendChild(ingredients_list);
                    recipeContainer.appendChild(insHeader);
                    recipeContainer.appendChild(instructions_list);
                    main.appendChild(recipeContainer);
                }
                );
        }
    });

};

