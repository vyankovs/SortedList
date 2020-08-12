let arr = [];
let ul = document.createElement("ul");
let btn = document.createElement("button");
let search = document.createElement("input");
search.placeholder = "Search by name";
btn.innerHTML = "sort by name ASC";
document.body.appendChild(btn);
document.body.appendChild(search);
document.body.appendChild(ul);
let sortingOrder = true;

let url = "https://jsonplaceholder.typicode.com/users";
let data = fetch(url)
  .then((res) => res.json())
  .then((data) => {
    arr = data;
    toList(data);
  });

function toList(arr) {
  ul.innerHTML = "";
  arr.forEach(
    (i) => (ul.innerHTML += `<li>${i.name} lives in ${i.address.city}</li>`)
  );
}

function sortbyName(btn) {
  sortingOrder
    ? arr.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      })
    : arr.sort((a, b) => {
        if (b.name < a.name) return -1;
        if (b.name > a.name) return 1;
        return 0;
      });

  toList(arr);
  sortingOrder = !sortingOrder;
  btn.innerText = "sort by name " + (sortingOrder ? "ASC" : "DESC");
}

function searchbyName() {
  toList(
    arr.filter((i) => i.name.toLowerCase().includes(search.value.toLowerCase()))
  );
}

//Event listeners

btn.onclick = function () {
  sortbyName(this);
};
search.addEventListener("input", searchbyName);
