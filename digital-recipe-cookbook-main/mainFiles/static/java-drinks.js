const numberofCells = 20;
        let DrinksIds = [];
        const DrinksIdArray = [
            178367, 178366, 178364, 178363, 178359, 178358, 178357, 178356, 178354, 178352, 8348, 178346, 178345, 178344, 178332, 178322,
            178313, 178312, 178369,17832, 17830, 17827, 17824, 17246, 17245, 17242, 17241, 17233, 17221, 17217, 17202, 17197,
            17191, 17176, 17074, 17044, 17005, 16485, 16447, 16295, 16273, 16202, 16176, 11001, 11005, 11007, 11050, 11084, 17185,
            11145, 11146, 11157, 11205, 11324, 11338, 11407, 11415, 11419, 11658, 11666, 11728, 11936, 12067, 12127, 12402, 17181,
            12670, 12690, 12694, 12702, 12704, 12730, 12728, 12732, 12736, 12744, 12748, 12752, 12766, 12768, 12774, 12776, 12782,
            12784, 12792, 12796, 12800, 12802, 12854, 12862, 12910, 12914, 12944, 12954, 13026, 13625, 13751, 13936, 13940, 14095
        ]
        const limit = Math.floor(Math.random() * 100);
        for (let i = 0; i < numberofCells; i++) {
            DrinksIds.push(DrinksIdArray[(5*i+limit)%100])
        }


        async function updateCarouselCellSnavdrinks() {
            const carouselCells = document.querySelectorAll('.carousel-cell-drinks');

            

            for (let i = 0; i < carouselCells.length; i++) {
                try {
                    const mealData = await getDrinkDataById(DrinksIds[i]);
                    updateCarouselCellnavdrinks(carouselCells[i], mealData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }

            
        }

        function updateCarouselCellnavdrinks(carouselCell, mealData) {
           
                carouselCell.innerHTML = `
                <h1>${mealData.strDrink}</h1>
                <img src="${mealData.strDrinkThumb}" alt="${mealData.strDrink}">
            `;
               
        }

   

        updateCarouselCellSnavdrinks();

        //$$$$$$$$$$$$$$$$$$$$$$
        //FOR CAOURESEL MAIN

       
        function getDrinkDataById(drinkid) {

            return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkid}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json(); // Parse the response body as JSON
                })
                .then(data => {
                    // Return the data
                    return data.drinks[0];
                })
                .catch(error => {
                    // Handle errors
                    console.error('Error:', error);
                });
        }
       


        async function updateCarouselCellsMaindrinks() {

            const carouselCells = document.querySelectorAll('.carousel-cell-main-drinks');


            for (let i = 0; i < carouselCells.length; i++) {
                try {
                    const drinkData = await getDrinkDataById(DrinksIds[i]);
                    updateCarouselCellMaindrinks(carouselCells[i], drinkData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        }


        function updateCarouselCellMaindrinks(carouselCell, drinkData) {
            // Extracting relevant data from mealData
            const name = drinkData.strDrink;
            const imageUrl = drinkData.strDrinkThumb;
            const category = drinkData.strCategory;
            
            const ingredients = getIngredientsListdrinks(drinkData);
            //const instructions = mealData.strInstructions;
            const instructions = getInstructionsListdrinks(drinkData);

            // Update HTML content for the given carousel cell
            carouselCell.innerHTML = `
            <div class="parent-box-drinks">
                <div class="left-box-drinks">
                    <img src="${imageUrl}" alt="${name}">
                    <h1>${name}</h1>
                    <h3>Category: ${category}</h3>
                </div>

                <div class="middle-box-drinks">
                    
                    
                    <h1>Ingredients:</h1>
                   <ul>${ingredients}</ul>
                </div>

                <div class="right-box-drinks">
                   <h1>Recipe</h1>
                   <ol>${instructions}</ol>
                </div>
            </div>

            `;
        }

        // Helper function to generate the list of ingredients
        function getIngredientsListdrinks(drinkData) {
            let ingredientsList = '';

            // Iterate through the ingredients and measures
            for (let i = 1; i <= 20; i++) {
                const ingredient = drinkData[`strIngredient${i}`];
                const measure = drinkData[`strMeasure${i}`];

                // Break the loop if no more ingredients are present
                if (!ingredient) break;

                ingredientsList += `<li>${measure} ${ingredient}</li>`;
            }

            return ingredientsList;
        }
        function getInstructionsListdrinks(drinkData) {
            let instructionsList = '';

            // Iterate through the ingredients and measures
            const instruction_String = drinkData.strInstructions;
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

        updateCarouselCellsMaindrinks();