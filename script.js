document.addEventListener("DOMContentLoaded", function () {
    
    if (document.getElementById("coursesBody")) {
        fetch("https://bunneywalker.github.io/test9000/coursestaken.json")
            .then(response => response.json())
            .then(data => {
                displayCourses(data.courses);
            })
            .catch(error => console.error("Error fetching JSON:", error));
    }
});

function displayCourses(courses) {
    const tbody = document.getElementById("coursesBody");
    tbody.innerHTML = "";

    courses.forEach(course => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${course["year-level"]}</td>
            <td>${course.sem}</td>
            <td>${course.code}</td>
            <td>${course.description}</td>
            <td>${course.credit}</td>
        `;
        tbody.appendChild(row);
    });
}

function searchCourses() {
    const searchInput = document.getElementById("searchBar").value.toLowerCase();

    fetch("courses.json")
        .then(response => response.json())
        .then(data => {
            const filteredCourses = data.courses.filter(course =>
                course.description.toLowerCase().includes(searchInput) ||
                course.code.toLowerCase().includes(searchInput)
            );
            displayCourses(filteredCourses);
        })
        .catch(error => console.error("Error fetching JSON:", error));
}
