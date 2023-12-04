var results = JSON.parse(document.getElementById('results').textContent);

var Name = new Typed('#recipeNameAndIngredients', {
    strings: [`${results['name']} <br><br>Ingredients:`],
    typeSpeed: 5,
    showCursor: false,
});

var ingredientList = document.getElementById('ingredientList');
var stepList = document.getElementById('stepList');

// Function to create and append a new list item with typing animation
function appendItemWithAnimation(parentList, items, index) {
// Check if there are more items
if (index < items.length) {
    const item = items[index];

    // Create a new list item
    var listItem = document.createElement('li');
    // Create a span for typing animation
    var spanElement = document.createElement('span');
    listItem.appendChild(spanElement);
    parentList.appendChild(listItem);

    // Initialize Typed for the span element
    var typed = new Typed(spanElement, {
    strings: [item],
    typeSpeed: 5,
    showCursor: false,
    onComplete: function () {
        // Move on to the next item
        appendItemWithAnimation(parentList, items, index + 1);
    },
    });
}
}

// Start the sequence of animations for the first list
appendItemWithAnimation(ingredientList, results['ingredients'], 0);

// Start the sequence of animations for the second list
appendItemWithAnimation(stepList, results['recipe'], 0);

var form = document.getElementById("aiForm");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);
