function renderTable(data) {
  //create empty table
  let table = document.createElement("table");

  //build out table headers and rows
  let col = [];

  for (let i = 0; i < data.length; i++) {
    for (let key in data[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }

  let tr = table.insertRow(-1);

  for (let i = 0; i < col.length; i++) {
    let th = document.createElement("th");

    th.innerHTML = col[i].toUpperCase();
    tr.appendChild(th);
  }

  for (let i = 0; i < data.length; i++) {
    tr = table.insertRow(-1);

    for (let j = 0; j < col.length; j++) {
      let tabCell = tr.insertCell(-1);
      tabCell.innerHTML = data[i][col[j]];
    }
  }

  // Add table to container
  let divContainer = document.getElementById("showData");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);
}

//Asynchronously retrieve JSON data from API endpoint declared in server.js
async function getCities() {
  let response = await fetch("/api/cities");
  let data = await response.json();

  return data;
}

// Execute all functions
getCities().then((data) => {
  const button = document.getElementById("sort");

  //Filter out non-Oregon results from data
  const oregonCities = data.filter((item) => item.State === "Oregon");

  //add eventListener to re-run renderTable on sort button click and display sort option
  button.onclick = () => {
    let sortedCities;

    button.classList.toggle("sort-desc");

    if (button.classList.contains("sort-desc")) {
      sortedCities = oregonCities.sort((a, b) => (a.city > b.city ? 1 : -1));
      button.innerHTML = "Sort by City Z-A";
    } else {
      sortedCities = oregonCities.sort((a, b) => (a.city < b.city ? 1 : -1));
      button.innerHTML = "Sort by City A-Z";
    }

    renderTable(sortedCities);
  };

  renderTable(oregonCities);
});
