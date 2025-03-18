async function fetchData(fileName, elementId) {
    try {
        const response = await fetch(`data/${fileName}.json`);
        const data = await response.json();
        const contentDiv = document.getElementById(`${elementId}-content`);
        contentDiv.innerHTML = renderData(data, fileName);
    } catch (error) {
        console.error(`Error fetching ${fileName}:`, error);
        document.getElementById(`${elementId}-content`).innerHTML = "<p>Error loading data.</p>";
    }
}

function renderData(data, fileName) {
    if (fileName === "publications") {
        return data.map(item => `<p><strong>${item.title}</strong><br>Authors: ${item.authors}<br>${item.journal || item.conference}<br>${item.date}<br>${item.doi || item.location || ''}</p>`).join("");
    } else if (fileName === "skills") {
        return data.map(item => `<p>${item}</p>`).join("");
    } else if(fileName === "experiences"){
        return data.map(item => `<p><strong>${item.title}</strong><br>${item.company}<br>${item.start_date} - ${item.end_date}<br>${item.responsibilities.map(resp => `<li>${resp}</li>`).join('')}</p>`).join("");
    }else if (fileName === "books_patents"){
        return data.map(item => `<p><strong>${item.title}</strong><br> ${item.authors || item.publication_number || ""}<br>${item.publisher || item.book || item.status || ""} <br> ${item.isbn || item.publication_date || item.date || ""}</p>`).join("");
    }
    else {
        return data.map(item => `<p>${JSON.stringify(item)}</p>`).join("");
    }
}

fetchData("qualifications", "qualifications");
fetchData("experiences", "experiences");
fetchData("publications", "publications");
fetchData("books_patents", "books-patents");
fetchData("skills", "skills");
fetchData("about", "about");

// Contact details in footer
fetch("data/about.json")
    .then(response => response.json())
    .then(aboutData => {
        const contact = aboutData[0];
        document.getElementById("footer-contact").innerHTML = `
            <p>Email: ${contact.email}</p>
            <p>Address: ${contact.address}</p>
            <p>Phone: 9996642884, 7206901555</p>
        `;
    });