// Javascript #
// courses.js
const aCourse = {
  code: "CSE121b",
  name: "Javascript Language",
  sections: [
    {
        sectionNumber : 1, roomNum : 'STC 353', enrolled : 26, days: 'TTh', instructor: 'Bro T'
    },
    {
        sectionNumber : 2, roomNum : 'STC 347', enrolled : 28, days: 'TTh', instructor: 'Sis A'
    },
  ],
};

function setCourseInfo(course) {
    const courseName = document.querySelector('#courseName');
    const courseCode = document.querySelector('#courseCode');
    courseName.textContent = course.name;
    courseCode.textContent = course.code;
}