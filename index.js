const fetchBook = () => {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Fetch error");
      }
    })
    .then((books) => {
      const row = document.querySelector("#books");
      books.forEach((element) => {
        const col = document.createElement("col");
        col.classList.add("col");
        const card = document.createElement("div");
        card.classList.add("card");
        card.id = element.asin;

        card.innerHTML = `<img src=${element.img} class="card-img-top" alt="...">
        <div class="card-body">
            <p class="card-text fw-bold">${element.title}</p>
            <p class="card-text">Category: ${element.category}</p>
            <p class="card-text">Price: ${element.price}€</p>
            <button class="btn btn-dark mb-3 addToCart">Add to cart</button>
            <button class="btn btn-danger mb-3 delete">Delete</button>
        </div>`;

        col.appendChild(card);
        row.appendChild(col);
      });

      const btnsAdd = document.querySelectorAll(".addToCart");
      const cart = document.querySelector(".cart");
      btnsAdd.forEach((btn) => {
        btn.addEventListener("click", () => {
          card = btn.closest(".card");
          const li = document.createElement("li");
          li.innerHTML = `
          <div class="d-flex p-1 ">
            <img src="${card.children[0].currentSrc}"/>
              <div class="d-flex flex-column">
                <p class="dropdown-item fw-semibold px-1 py-0 mb-0">${card.children[1].children[0].innerHTML}</p>
                <p class="dropdown-item px-1 mb-0">${card.children[1].children[2].innerHTML}</p>
              </div>
            </div>  
            <div class="d-flex justify-content-end">
            <button class=" btn btn-danger me-3  deleteFromCart ">Delete</button>
            </div>
          <hr class="bg-body-tertiary">`;
          cart.appendChild(li);
          const btnsCart = document.querySelectorAll(".deleteFromCart");
          btnsCart.forEach((btn) => {
            btn.addEventListener("click", () => {
              btn.closest("li").remove();
            });
          });
        });

        const btns = document.querySelectorAll(".delete");
        btns.forEach((btn) => {
          btn.addEventListener("click", () => {
            btn.closest(".col").remove();
          });
        });
      });
    });
};

fetchBook();
