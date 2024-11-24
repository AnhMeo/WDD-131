import recipes from './recipes.mjs';

function random(num) {
	return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
	const listLength = list.length;
	const randomNumber = random(listLength);
	return list[randomNumber];
}

// to test
console.log(getRandomListEntry(recipes));


// Function to generate HTML for tags below!!
function tagsTemplate(tags) {
    // Loop through the tags array and create a <span> for each tag
    return tags.map(tag => `<span class="recipe-tag">${tag}</span>`).join('');  // Join all tags with no space between them
  }
  
  // Function to generate HTML for the rating below!!
  function ratingTemplate(rating) {
    // Begin the rating span element with an accessible label
    let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
  
    // Loop through 5 stars to display the correct number of filled and empty stars
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        html += '⭐';  // Filled star for rating
      } else {
        html += '☆';  // Empty star for rating
      }
    }
  
    // Closing the rating span element
    html += `</span>`;
    
    // Return the HTML string
    return html;
  }
  
  // Recipe template below!!
  function recipeTemplate(recipe) {
    return `
      <div class="recipe-wrapper">
        <article class="recipe">
          <img src="${recipe.image}" alt="${recipe.name}" />
  
          <div class="recipe-inner">
            <!-- Use the tagsTemplate to generate the tags -->
            ${tagsTemplate(recipe.tags)}
            
            <h1 class="recipe-name">${recipe.name}</h1>
  
            <!-- Use the ratingTemplate to generate the rating stars -->
            ${ratingTemplate(recipe.rating)}
  
            <div class="recipe-details">
              <p>${recipe.description}</p>
            </div>
          </div>
        </article>
      </div>
    `;
  }
  
  // Example recipe object
  const recipe = {
    imageUrl: 'apple-crisp.jpg',
    name: 'Apple Crisp',
    tags: ['dessert', 'fall', 'easy'],
    rating: 4,
    description: 'This apple crisp recipe is a simple yet delicious fall dessert that\'s great served warm with vanilla ice cream.'
  };
  
  // Testing the recipeTemplate with the example recipe
  console.log(recipeTemplate(recipe));
  
  
  // Assuming you want to append it to the main content section of the page
  document.querySelector('main').innerHTML += recipeTemplate(recipe);
  
// Initialize the page with a random recipe
function init() {
    const recipe = getRandomListEntry(recipes); // Get a random recipe
    renderRecipes([recipe]); // Render the random recipe by passing it as an array
  }
  
  // Run init when the page loads
  document.addEventListener('DOMContentLoaded', init);
  
  // Function to render the list of recipes to the page
  function renderRecipes(recipeList) {
    const recipesContainer = document.querySelector('main');
    const recipesHTML = recipeList.map(recipe => recipeTemplate(recipe)).join('');
    recipesContainer.innerHTML = recipesHTML;
  }
  
  
  // Search handler function that handles the search functionality below!!
  function searchHandler(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // Get the search input value and convert it to lowercase
    const query = document.querySelector('.search-bar input').value.toLowerCase();
  
    // Pass the query into the filterRecipes function
    const filteredRecipes = filterRecipes(query);
  
    // Render the filtered recipes
    renderRecipes(filteredRecipes);
  }
  
  // Function to filter the recipes based on the query below!!
  function filterRecipes(query) {
    // Filter recipes based on the query being present in the name, description, tags, or ingredients
    return recipes
      .filter(recipe => {
        // Check if the query is in the name, description, tags, or ingredients
        return (
          recipe.name.toLowerCase().includes(query) ||
          recipe.description.toLowerCase().includes(query) ||
          recipe.tags.some(tag => tag.toLowerCase().includes(query)) ||
          (recipe.ingredients && recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query)))
        );
      })
      .sort((a, b) => a.name.localeCompare(b.name));  // Sort alphabetically by name
  }
  
  // Event listener for the search button
  document.querySelector('.search-bar button').addEventListener('click', searchHandler);