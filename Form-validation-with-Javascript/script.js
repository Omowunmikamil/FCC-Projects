const calorieCounter = document.getElementById('calorie-counter'); // get the form element
const budgetNumberInput = document.getElementById('budget'); // get the budget input
const entryDropdown = document.getElementById('entry-dropdown'); // get the entry dropdown
const addEntryButton = document.getElementById('add-entry'); // get the add entry button
const clearButton = document.getElementById('clear'); // get the clear button
const output = document.getElementById('output'); // get the output element
let isError = false; // set the isError flag to false

// Function to clean the input string
function cleanInputString(str) {
  const regex = /[+-\s]/g; // create a regex to match +, - and space characters globally
  return str.replace(regex, ''); // replace the matched characters with an empty string
}

// Function to check if the input string is invalid
function isInvalidInput(str) {
  const regex = /\d+e\d+/i; // create a regex to match scientific notation
  return str.match(regex); // return the match
}

// Function to clear the form
function addEntry() {
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`); // get the input container
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1; // get the number of inputs
  const HTMLString = `
                    <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
                    <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
                    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
                    <input
                        type="number"
                        min="0"
                        id="${entryDropdown.value}-${entryNumber}-calories"
                        placeholder="Calories"
                    />`; // create the HTML string

  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString); // insert the HTML string into the input container
}

// Function to calculate the calories
function calculateCalories(e) {
  e.preventDefault(); // prevent the default form submission
  isError = false; // set the isError flag to false

  const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]'); // get the breakfast number inputs
  const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]'); // get the lunch number inputs
  const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]'); // get the dinner number inputs
  const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]'); // get the snacks number inputs
  const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]'); // get the exercise number inputs

  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs); // get the breakfast calories
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs); // get the lunch calories
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs); // get the dinner calories
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs); // get the snacks calories
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs); // get the exercise calories
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]); // get the budget calories
  
  // check if there is an error
  if (isError) {
    return; // return early
  }

  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories; // calculate the consumed calories
  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories; // calculate the remaining calories
  const surplusOrDeficit = remainingCalories < 0 ? 'Surplus' : 'Deficit'; // calculate the surplus or deficit
  output.innerHTML = `
                    <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
                    <hr>
                    <p>${budgetCalories} Calories Budgeted</p>
                    <p>${consumedCalories} Calories Consumed</p>
                    <p>${exerciseCalories} Calories Burned</p>
                    `; // set the output inner HTML

  output.classList.remove('hide'); // remove the hide class from the output
}

// Function to get the calories from the inputs
function getCaloriesFromInputs(list) {
  let calories = 0; // set the calories to 0

  // loop through the list
  for (const item of list) {
    const currVal = cleanInputString(item.value); // clean the input string
    const invalidInputMatch = isInvalidInput(currVal); // check if the input is invalid

    // check if there is an invalid input
    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`); // alert the user
      isError = true; // set the isError flag to true
      return null; // return early
    }
    calories += Number(currVal); // add the current value to the calories
  }
  return calories; // return the calories
}

function clearForm() {
    const inputContainers = Array.from(document.querySelectorAll('.input-container')); // get the input containers as an array of elements
    // loop through the input containers
    for (const container of inputContainers) {
      container.innerHTML = ''; // clear the input containers
    }

    budgetNumberInput.value = ''; // clear the budget input
    output.innerText = ''; // clear the output
    output.classList.add('hide'); // add the hide class to the output
}

addEntryButton.addEventListener("click", addEntry); // add an event listener to the add entry button
calorieCounter.addEventListener("submit", calculateCalories); // add an event listener to the form
clearButton.addEventListener("click", clearForm); // add an event listener to the clear button