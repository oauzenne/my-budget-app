const form = document.querySelector("[new-item]");
const expenseForm = document.querySelector("[new-expense-item]");

const table = document.querySelector("[card-table]");
const expenseTable = document.querySelector("[expense-card-table]");

const cardDisplay = document.querySelector("[card-display-container]");
const cardTitle = document.querySelector("[card-display-title]");
const cardList = document.querySelector("[card-display-list]");
 
const expenseCard = document.querySelector("[expense-div]");
const incomeCard = document.querySelector("[income-div]");
const listTitleIncome = document.querySelector("[list-title-income]");
const listTitleExpense = document.querySelector("[list-title-expense]");

const listItems = document.querySelectorAll("#list li");
let activeDiv = "Income";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSubmit();
});

expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleExpenseSubmit();
});

listItems.forEach((listItem) => {
  listItem.addEventListener("click", () => {
    activeDiv = listItem.innerText;
    renderCards(activeDiv);
  });
});

function handleSubmit() {
  const incomeInput = document.querySelector("[add-new]");
  const newRow = document.createElement("tr");
  const incomeCell = document.createElement("td");
  const dollarCell = document.createElement("td");
  dollarCell.classList.add("input");
  const dollarInput = document.createElement("input");
  dollarInput.type = "number";
  dollarInput.placeholder = "$$$";

  dollarInput.classList.add("dollar-amount");

  incomeCell.textContent = incomeInput.value;
  dollarCell.appendChild(dollarInput);

  newRow.appendChild(incomeCell);
  newRow.appendChild(dollarCell);
  table.appendChild(newRow);
  incomeInput.value = "";
  return newRow;
}

function handleExpenseSubmit() {
  const expenseInput = document.querySelector("[add-new-expense]");
  const newRow = document.createElement("tr");
  const expenseCell = document.createElement("td");
  const dollarCell = document.createElement("td");
  dollarCell.classList.add("input");
  const dollarInput = document.createElement("input");
  dollarInput.type = "number";
  dollarInput.placeholder = "$$$";

  dollarInput.classList.add("dollar-amount");

  expenseCell.textContent = expenseInput.value;
  dollarCell.appendChild(dollarInput);

  newRow.appendChild(expenseCell);
  newRow.appendChild(dollarCell);
  expenseTable.appendChild(newRow);
  expenseInput.value = "";
  return newRow;
}

function renderCards(clickedText) {
  if (clickedText === "Expenses") {
    expenseCard.style.display = "block";
    listTitleExpense.classList.add("list-item-active");
    incomeCard.style.display = "none";
    listTitleIncome.classList.remove("list-item-active");
    console.log(incomeCard.display);
  } else if (clickedText === "Income") {
    incomeCard.style.display = "block";
    listTitleExpense.classList.remove("list-item-active");
    expenseCard.style.display = "none";
    listTitleIncome.classList.add("list-item-active");
  }
}
