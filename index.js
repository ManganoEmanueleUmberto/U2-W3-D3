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
          console.dir(card);
          const li = document.createElement("li");
          li.innerHTML = `
            <p class="dropdown-item fw-semibold">${card.children[1].children[0].innerHTML}</p>
            <p class="dropdown-item">${card.children[1].children[2].innerHTML}</p>
            <button class=" btn btn-danger ms-3 deleteFromCart">Delete</button>
          <hr class="bg-body-tertiary">`;
          cart.appendChild(li);
        });

        const btnsCart = document.querySelectorAll(".deleteFromCart");

        btnsCart.forEach((btn) => {
          btn.addEventListener("click", () => {
            btn.closest("li").remove();
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
