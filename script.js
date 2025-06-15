let users = [];

function handleResponse(response) {
  return response.json();
}

const handleData = (data) => {
  let tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  //let userLines = "";
  users = data;

  // utilisation avec un map qui est une fonction des tableaux pour éviter les boucles
  const userAsTable = users.map(
    (user) =>
      `<tr>
      <td>${user.name}</td>
      <td>${user.phone}</td>
      <td>${user.email}</td>
    </tr>`
  );
  // Deprecated c'est à dire c'est revolu je peux utiliser map qui est fonction des tableaux pour transformer les données
  /*for (let i = 0; i < data.length; i++) {
    const user = data[i];
    let userLine = `<tr>
            <td>${user.name}</td>
            <td>${user.phone}</td>
            <td>${user.email}</td>            
        <tr>`;
    userLines += userLine;
  }*/
  tableBody.innerHTML = userAsTable.join("");
};

// Recherche un utilisateur par son nom

function searchUser() {
  const searchInput = document.getElementById("search");
  const searchValue = searchInput.value;
  let tableBody = document.getElementById("table-body");

  const searchUser = users
    .filter((user) => {
      return user.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
    })
    .map(
      (user) =>
        `<tr>
    <td>${user.name}</td>
    <td>${user.phone}</td>
    <td>${user.email}</td>
  </tr>`
    );
  tableBody.innerHTML = searchUser.join("");
}

const handleData1 = (data) => {
  let userline = document.getElementById("grid-user");

  let userLines = "";

  for (let i = 0; i < data.length; i++) {
    const user = data[i];
    let userLIne = `
      <div class="col-6">
            <div class="p-3 border border-1 border-dark equal-height">
            <h5>${user.name}</h5>
            <p>${user.phone}</p>
            <p>${user.email}</p>
            </div>
      </div>
    `;
    userLines += userLIne;
  }
  userline.innerHTML = userLines;
};

function fetchUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => handleResponse(response))
    .then((data) => {
      handleData(data);
      handleData1(data);
    });
}

document.getElementById("tableau-btn").addEventListener("click", () => {
  let tableDiv = document.getElementById("container-table");
  let gridDiv = document.getElementById("container-grid");

  tableDiv.classList.remove("d-none");
  gridDiv.classList.add("d-none");
});

document.getElementById("grid-btn").addEventListener("click", () => {
  let tableDiv = document.getElementById("container-table");
  let gridDiv = document.getElementById("container-grid");

  tableDiv.classList.add("d-none");
  gridDiv.classList.remove("d-none");
});
