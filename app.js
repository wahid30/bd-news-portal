// set the show catagory section
const setCatagory = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySetCatagory(data));
};

const displaySetCatagory = (data) => {
  const accessTheCategory = data.data.news_category;
  // console.log(accessTheCategory);
  accessTheCategory.forEach((data) => {
    // console.log(data);
    const { category_name } = data;
    const catagoryParent = document.getElementById("catagory-items");
    const createDiv = document.createElement("div");
    createDiv.classList.add("col");
    createDiv.innerHTML = `
    <p>${category_name}</p>
    `;
    catagoryParent.appendChild(createDiv);
    // console.log(category_name);
  });
};

setCatagory();
