let mealIds = [];

        function getRandomMealData() {
            return fetch('https://www.themealdb.com/api/json/v1/1/random.php')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => data.meals[0])
                .catch(error => console.error('Error:', error));
        }

        async function updateCarouselCellSnav() {
            const carouselCells = document.querySelectorAll('.carousel-cell');

            const updatePromises = [];

            for (let i = 0; i < carouselCells.length; i++) {
                try {
                    const mealData = await getRandomMealData();
                    mealIds.push(mealData.idMeal);
                    updatePromises.push(updateCarouselCellnav(carouselCells[i], mealData));
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }

            return Promise.all(updatePromises);
        }

        function updateCarouselCellnav(carouselCell, mealData) {
            return new Promise(resolve => {
                carouselCell.innerHTML = `
                <h1>${mealData.strMeal}</h1>
                <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
            `;
                resolve();
            });
        }

        console.log("before");
        console.log(mealIds);

        updateCarouselCellSnav().then(() => {
            console.log("after");
            console.log(mealIds);

            console.log("called the main carousel");
            updateCarouselCellsMain();
        });

        //$$$$$$$$$$$$$$$$$$$$$$
        //FOR CAOURESEL MAIN

        console.log("called the main carousel");

        function getMealDataById(mealid) {

            return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json(); // Parse the response body as JSON
                })
                .then(data => {
                    // Return the data
                    return data.meals[0];
                })
                .catch(error => {
                    // Handle errors
                    console.error('Error:', error);
                });
        }


        async function updateCarouselCellsMain() {

            const carouselCells = document.querySelectorAll('.carousel-cell-main');


            for (let i = 0; i < carouselCells.length; i++) {
                try {
                    const mealData = await getMealDataById(mealIds[i]);
                    updateCarouselCellMain(carouselCells[i], mealData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        }


        function updateCarouselCellMain(carouselCell, mealData) {
            // Extracting relevant data from mealData
            const name = mealData.strMeal;
            const imageUrl = mealData.strMealThumb;
            const category = mealData.strCategory;
            const origin = mealData.strArea;
            const ingredients = getIngredientsList(mealData);
            //const instructions = mealData.strInstructions;
            const instructions = getInstructionsList(mealData);

            // Update HTML content for the given carousel cell
            carouselCell.innerHTML = `
            <div class="parent-box">
                <div class="left-box">
                    <img src="${imageUrl}" alt="${name}">
                    <h1>${name}</h1>
                    <h3>Category: ${category}</h3>
                    <h3>Origin: ${origin}</h3>
                </div>

                <div class="middle-box">
                    <h1>Ingredients:</h1>
                    <ul>${ingredients}</ul>
                </div>

                <div class="right-box">
                    <h1>Recipe</h1>
                    <ol>${instructions}</ol>
                </div>
            </div>
        
            `;
        }

        // Helper function to generate the list of ingredients
        function getIngredientsList(mealData) {
            let ingredientsList = '';

            // Iterate through the ingredients and measures
            for (let i = 1; i <= 20; i++) {
                const ingredient = mealData[`strIngredient${i}`];
                const measure = mealData[`strMeasure${i}`];

                // Break the loop if no more ingredients are present
                if (!ingredient) break;

                ingredientsList += `<li>${measure} ${ingredient}</li>`;
            }

            return ingredientsList;
        }
        function getInstructionsList(mealData) {
            let instructionsList = '';

            // Iterate through the ingredients and measures
            const instruction_String = mealData.strInstructions;
            let current_initial_index = 0;
            let current_instruction = '';
            for (let i = 0; i < instruction_String.length; i++) {

                if (instruction_String[i] == '.') {
                    current_instruction = instruction_String.slice(current_initial_index, i);
                    current_initial_index = i;
                    instructionsList += `<li>${current_instruction}</li>`;
                }


            }

            return instructionsList;
        }

        updateCarouselCellsMain();

        // // <!--Next two lines are for using the flicketry Plugin for carousel-->
        // src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js";
        // src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js";