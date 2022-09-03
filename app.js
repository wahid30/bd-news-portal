// set the show catagory section
const setCatagory = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySetCatagory(data.data.news_category))
    .catch((error) => console.log(error));
};

const displaySetCatagory = (data) => {
  data.forEach((data) => {
    const { category_name } = data;
    const catagoryParent = document.getElementById("catagory-items");
    const createDiv = document.createElement("div");
    createDiv.classList.add("col");
    createDiv.innerHTML = `
    <button onclick="categoryId('${data.category_id}')" class="btn btn-outline-secondary">${category_name}</button>
    `;
    catagoryParent.appendChild(createDiv);
  });
};

// category id
const categoryId = (search) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${search}`;
  fetch(url)
    .then((res) => res.json())
    .then((cards) => displayCard(cards))
    .catch((err) => console.log(err));
  toggleSpinner(true);
};

setCatagory();

////////////////////////////--------------------///////////////////////////////
////////////////////////////--------------------///////////////////////////////
////////////////////////////--------------------///////////////////////////////

const displayCard = (cards) => {
  const totalNews = document.getElementById("total-news");
  const items = cards.data.length;
  totalNews.innerText = items ? items : "No";
  /////////
  const cardParent = document.getElementById("my-cards");
  cardParent.innerHTML = ``;
  /////////////
  cards.data.forEach((cards) => {
    const { thumbnail_url, title, details, total_view } = cards;
    const { img, name } = cards.author;
    const createCardDiv = document.createElement("div");
    createCardDiv.innerHTML = `
    <div class="card mb-3 w-100">
    <div class="row g-0">
      <div class="col-md-4 ">
       <img src="${thumbnail_url}" class="img-fluid rounded-start img-custom-width" alt="..." />
         </div>
         <div class="col-md-8">
       <div class="card-body">
             <h5 class="card-title">${title}</h5>
            <p class="card-text">
               ${
                 details.length > 550 ? details.slice(0, 550) + "...." : details
               }
             </p>
             <div class="card-text d-flex justify-content-between">
               <p>
                 <div class="d-flex gap-3">
                  <img style="width:50px" class="rounded-circle" src="${img}" alt="">
                  <p>${name ? name : "no author name"}</p>
               </div>
               </p>
              <p>Views: ${total_view ? total_view : "no views"}</p>
              <button onclick="categoryModalId('${
                cards._id
              }')" class="btn btn-primary" data-bs-toggle="modal"
              data-bs-target="#authorDetailModal">Show Details</button>
           </div>
           </div>
         </div>
    </div>
  </div>
    `;
    cardParent.appendChild(createCardDiv);
  });
  toggleSpinner(false);
};

// modal
const categoryModalId = (search) => {
  const url = `https://openapi.programming-hero.com/api/news/${search}`;
  fetch(url)
    .then((res) => res.json())
    .then((cards) => displayModal(cards.data[0]))
    .catch((error) => console.log(error));
};

/////////////
const displayModal = (search) => {
  // console.log(search.title);
  const modalTitle = document.getElementById("newsDetailModalLabel");
  modalTitle.innerText = search.author.name ? search.author.name : "No author";
  const myTitle = document.getElementById("my-Title");
  myTitle.innerHTML = `
  <p>Title: ${search.title ? search.title : "No title"}</p>
  <p>Views: ${search.total_view ? search.total_view : "No Views"}</p>
  `;
};

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("spinner");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};
