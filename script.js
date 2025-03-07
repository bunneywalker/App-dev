document.addEventListener("DOMContentLoaded", function () {
    
    if (document.getElementById("coursesBody")) {
        fetch("https://bunneywalker.github.io/App-dev/coursestaken.json")
            .then(response => response.json())
            .then(data => {
                displayCourses(data.courses);
            })
            .catch(error => console.error("Error fetching JSON:", error));
    }
});
let header = document.querySelector("header");
    let r = 0;
    let increasing = true; 

    function smoothBlackToDarkRed() {
        if (increasing) {
            r += 1.5; 
            if (r >= 150) increasing = false; 
        } else {
            r -= 1.5; 
            if (r <= 0) increasing = true; 
        }

        header.style.backgroundColor = `rgb(${Math.round(r)}, 0, 0)`; 

        requestAnimationFrame(smoothBlackToDarkRed); 
    }

    smoothBlackToDarkRed();
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

    fetch("coursestaken.json")
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
