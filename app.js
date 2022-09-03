// set the show catagory section
const setCatagory = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySetCatagory(data.data.news_category));
};

const displaySetCatagory = (data) => {
  data.forEach((data) => {
    // console.log(data);
    const { category_name } = data;
    const catagoryParent = document.getElementById("catagory-items");
    const createDiv = document.createElement("div");
    createDiv.classList.add("col");
    createDiv.innerHTML = `
    <button onclick="categoryId('${data.category_id}')" class="btn btn-outline-secondary">${category_name}</button>
    `;
    catagoryParent.appendChild(createDiv);
    // console.log(category_name);
  });
};

// category id
const categoryId = (search) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${search}`;
  fetch(url)
    .then((res) => res.json())
    .then((cards) => displayCard(cards));
};

setCatagory();

////////////////////////////--------------------///////////////////////////////
////////////////////////////--------------------///////////////////////////////
////////////////////////////--------------------///////////////////////////////

// set the card section
// const setCard = () => {
//   const url = `https://openapi.programming-hero.com/api/news/category/01`;
//   fetch(url)
//     .then((res) => res.json())
//     .then((cards) => displayCard(cards));
// };

const displayCard = (cards) => {
  // const accessCards = cards.data[0];
  // console.log(cards.data.length);

  // display total items
  const totalNews = document.getElementById("total-news");
  const items = cards.data.length;
  totalNews.innerText = items;
  /////////
  const cardParent = document.getElementById("my-cards");
  cardParent.innerHTML = ``;
  cards.data.forEach((cards) => {
    const { thumbnail_url, title, details, total_view } = cards;
    const { img, name } = cards.author;
    const createCardDiv = document.createElement("div");
    createCardDiv.innerHTML = `
    <div class="card mb-3 w-100">
    <div class="row g-0">
      <div class="col-md-4 ">
       <img src="${thumbnail_url}" class="img-fluid rounded-start " alt="..." />
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
                  <p>${name}</p>
               </div>
               </p>
              <p>${total_view}</p>
              <button class=" btn btn-primary">Details</button>
           </div>
           </div>
         </div>
    </div>
  </div>
    `;
    cardParent.appendChild(createCardDiv);
  });
};

// setCard();
