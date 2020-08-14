const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

addRandomUser();
addRandomUser();
addRandomUser();

// Fetch random user and add money
async function addRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  // console.log(data);
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }
  addData(newUser);
}

// Double the money
function doubleMoney() {
  data = data.map(newUser => {
    return { ...newUser, money: newUser.money * 2 }
  });

  updateDOM();
};

// Sort by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM()
}

// Add new object to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

function updateDOM(providedData = data) {
  // Clear main
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  // Loop through each person
  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element)
  })

}

function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67
}

// Event listeners
addUserBtn.addEventListener('click', addRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);

