let users = [];

function handleResponse(response) {
  return response.json();
}
// Aficher les données sur un tableau
const handleData = (data) => {
  let tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  //let userLines = "";
  users = data;

  // utilisation avec un map qui est une fonction des tableaux pour éviter les boucles
  const userAsTable = users.map(
    // nous allons utiliser la destructuration pour récupérer les données
    // de l'utilisateur et les afficher dans le tableau au lieu de faire de recuperer tout le user on recupère uniquement les propriétés dont on a besoin dans des variables avec les accolades
    ({ name, phone, email }) =>
      `<tr>
      <td>${name}</td>
      <td>${phone}</td>
      <td>${email}</td>
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

  const tableBody = document.getElementById("table-body");
  const gridBody = document.getElementById("grid-user");
  const gridContainer = document.getElementById("container-grid");

  if (!tableBody.classList.contains("d-none")) {
    const userFilter = users
      // ici au nous avions fait la destructuration pour récupérer les données de l'utilisateur avec name
      .filter(
        ({ name }) =>
          name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
      )
      // ici nous avons utilisé la destructuration pour récupérer les données de l'utilisateur avec name, phone et email
      .map(
        ({ name, phone, email }) =>
          `<tr>
        <td>${name}</td>
        <td>${phone}</td>
        <td>${email}</td>
  </tr>`
      );
    tableBody.innerHTML = userFilter.join("");
  }
  if (!gridContainer.classList.contains("d-none")) {
    const userFilter = users
      .filter((user) => {
        return user.name.toLowerCase().includes(searchValue.toLowerCase());
      })
      .map(
        (user) =>
          `
      <div class="col-6">
            <div class="p-3 border border-1 border-dark equal-height">
            <h5>${user.name}</h5>
            <p>${user.phone}</p>
            <p>${user.email}</p>
            </div>
      </div>
    `
      );
    gridBody.innerHTML = userFilter.join("");
  }
}
//Trier les utilisateurs par nom
document.querySelector("#sort-select").addEventListener("change", () => {
  sortUsers();
});

function sortUsers() {
  const tableBody = document.getElementById("table-body");
  const gridBody = document.getElementById("grid-user");
  const gridContainer = document.getElementById("container-grid");
  const selecta = document.querySelector("#sort-select");
  const sortValue = selecta.value;

  if (!tableBody.classList.contains("d-none")) {
    if (sortValue === "1") {
      users.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortValue === "2") {
      users.sort((a, b) => b.phone.localeCompare(a.phone));
    }
    if (sortValue === "3") {
      users.sort((a, b) => a.email.localeCompare(b.email));
    }

    handleData(users);
  }
  if (!gridContainer.classList.contains("d-none")) {
    // Trier les utilisateurs par nom de façon aphabétique methode classique trouvée sur la documentation MDN
    if (sortValue === "1") {
      users.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }
    if (sortValue === "2") {
      users.sort((a, b) => a.phone - b.phone);
    }
    if (sortValue === "3") {
      users.sort((a, b) => a.email.localeCompare(b.email));
    }

    handleData1(users);
  }
}

// Afficher les données sur une grille

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

// Fonction pour récupérer les utilisateurs depuis l'API
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
