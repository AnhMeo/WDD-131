//  arrays.js
const steps = ["one", "two", "three"];
function listTemplate(step) {
  return `<li>${step}</li>`;//the html string made from step
}
const stepsHtml = steps.map(listTemplate);// use map to convert the list from strings to HTML
console.log(stepsHtml);


const lettergrades = ['A', 'B', 'A']
function getgradepoints(letter) {
    let points = 0;
    if (letter === 'A') {
        points = 4;
    } else if (letter === 'B') {
        points = 3;
    }
    return points;
}
const gradepoints = lettergrades.map(getgradepoints);
console.log(gradepoints);

const totalgpa = gradepoints.reduce(function (total, item) {
    return total + item;
})
const gpa = totalgpa / gradepoints.length;
console.log(gpa);

const fruits = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];
const longfruit = fruits.filter((fruit) => fruit.length > 6);
console.log(longfruit);

const nombres = [12, 34, 21, 54];
const luckynombre = 21;
let luckynombreindex = nombres.indexOf(luckynombre);
console.log(luckynombreindex);

document.querySelector("#myList").innerHTML = stepsHtml.join('');// set the innerHTML