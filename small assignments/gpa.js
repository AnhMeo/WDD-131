function getGrades(inputSelector) {
    const gradesInput = document.querySelector(inputSelector).value;
    return gradesInput.split(',').map(grade => grade.trim());
}

function convertGrade(grade) {
    const gradeMap = {
        'A': 4.0,
        'A-': 3.7,
        'B+': 3.3,
        'B': 3.0,
        'B-': 2.7,
        'C+': 2.3,
        'C': 2.0,
        'C-': 1.7,
        'D+': 1.3,
        'D': 1.0,
        'F': 0.0
    };
    return gradeMap[grade.toUpperCase()] || 0; // Default to 0 if grade is not recognized
}

function calculateGPA(grades) {
    const totalPoints = grades.reduce((sum, grade) => sum + convertGrade(grade), 0);
    return (totalPoints / grades.length).toFixed(2); // Fixed to 2 decimal places
}

function outputGPA(gpa, selector) {
    document.querySelector(selector).textContent = `Your GPA is: ${gpa}`;
}

function clickHandler() {
    const grades = getGrades('#grades');

    // Check if grades array is empty
    if (grades.length === 0 || grades[0] === "") {
        outputGPA("Please enter at least one grade.", '#output');
        return; // Exit the function early
    }

    const gpa = calculateGPA(grades);
    outputGPA(gpa, '#output');
}

// Event listener for button click
document.querySelector('#submitButton').addEventListener('click', clickHandler);