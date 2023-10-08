let paginaActual = 1;

const consultarApi = async () => {
  try {
    if (paginaActual == 1) {
      document.querySelector("#anterior").disabled = true;
    } else {
      document.querySelector("#anterior").disabled = false;
    }

    if (paginaActual == 42) {
      document.querySelector("#siguiente").disabled = true;
    } else {
      document.querySelector("#siguiente").disabled = false;
    }

    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${paginaActual}`
    );
    const data = await response.json();

    let cards = "";
    let options =
      '<option value="todos" selected>Todos los personajes</option>';
    data.results.forEach((personaje, i) => {
      if (i <= 17) {
        cards += `<div class="col-12 col-lg-4 mt-3" id="card-${i}">
        <div class="card w-100">
          <img src="${personaje.image}" class="card-img-top" alt="img" >
          <div class="card-body">
          <p class="card-text"><span class="fw-bolder">${personaje.name}</span> - <span class="text-danger">${personaje.origin.name}</span> </p>
        </div>
        </div>
      </div>`;

        options += `<option value="${i}">${personaje.name}</option>`;
      }
    });
    document.querySelector("#contenedor_cards").innerHTML = cards;
    document.querySelector("#select_personaje").innerHTML = options;
  } catch (error) {
    alert(`Error: ${error}`);
  }
};

consultarApi();

const paginaSiguiente = () => {
  paginaActual += 1;
  consultarApi();
  document.documentElement.scrollTop = 0;
};

const paginaAnterior = () => {
  paginaActual -= 1;
  consultarApi();
  document.documentElement.scrollTop = 0;
};

const changePersonaje = (select) => {
  const value = select.value;
  const contenedor = document.querySelector("#contenedor_cards");
  const cards = contenedor.querySelectorAll(".col-12, .col-lg-4, .mt-3");

  if (value == "todos") {
    cards.forEach((card, i) => {
      card.classList.remove("d-none");
    });
  } else {
    cards.forEach((card, i) => {
      if (card.id != `card-${value}`) {
        card.classList.add("d-none");
      } else {
        card.classList.remove("d-none");
      }
    });
  }
};
