const form = document.querySelector("[new-item]");
const expenseForm = document.querySelector("[new-expense-item]");
const table = document.querySelector("[table-body]");
const expenseTable = document.querySelector("[expense-card-table]");
const cardDisplay = document.querySelector("[card-display-container]");
const cardTitle = document.querySelector("[card-display-title]");
const cardList = document.querySelector("[card-display-list]");
const expenseCard = document.querySelector("[expense-div]");
const incomeCard = document.querySelector("[income-div]");
const listTitleIncome = document.querySelector("[list-title-income]");
const listTitleExpense = document.querySelector("[list-title-expense]");
const submitButtons = document.querySelectorAll("[submit-button]");
const deleteButton = document.querySelector("[delete-button]");
const amountInputs = document.getElementsByClassName("dollar-amount");
const listItems = document.querySelectorAll("#list li");
const expenseButton = document.querySelector("[add-expense-button]");
const incomeButton = document.querySelector("[add-income-button]");

let netTotal = [];
const indexInputList = [];

let dollar = document.querySelector("[dollar]");

dollar.textContent = 0;

let activeDiv = "Income";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSubmit();
});

expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleExpenseSubmit();
});

for (const amountInput of amountInputs) {
  amountInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitNumberClick(amountInput.getAttribute("data-input-index"));
    }
  });
}

submitButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const clickedButton = event.target.closest("button");
    submitNumberClick(clickedButton.getAttribute("data-input-index"));
  });
});

incomeButton.addEventListener("click", function (event) {
  const incomeInput = document.querySelector("[add-new]").value;
  if (!incomeInput) {
    event.preventDefault();
    alert("Please enter a value in the input field");
  }
});

expenseButton.addEventListener("click", function (event) {
  const expenseInput = document.querySelector("[add-new-expense]").value;
  if (!expenseInput) {
    event.preventDefault();
    alert("Please enter a value in the input field");
  }
});

listItems.forEach((listItem) => {
  listItem.addEventListener("click", () => {
    activeDiv = listItem.innerText;
    renderCards(activeDiv);
  });
});

function submitNumberClick(buttonIndex) {
  const num = [];
  for (let i = 0; i < amountInputs.length; i++) {
    const input = amountInputs[i];

    console.log(input.value);
    console.log(input.value === "");

    if (
      buttonIndex === input.getAttribute("data-input-index") &&
      input.value !== ""
    ) {
      num.push(parseInt(input.value));
      netTotal.push(num);
    } else if (
      buttonIndex === input.getAttribute("data-input-index") &&
      input.value === ""
    ) {
      alert("Please enter a value!");
    }
  }

  let sum = 0;

  for (const items of netTotal) {
    for (const item of items) {
      sum += item;
    }
  }
  dollar.textContent = sum;
}

function handleSubmit() {
  const incomeInput = document.querySelector("[add-new]");
  const newRow = document.createElement("tr");
  const incomeCell = document.createElement("td");
  const dollarCell = document.createElement("td");
  dollarCell.classList.add("input");
  const dollarInput = document.createElement("input");
  dollarInput.type = "number";
  dollarInput.placeholder = "$$$";

  for (let i = 0; i < amountInputs.length; i++) {
    const input = amountInputs[i];
    indexInputList.push(input.getAttribute("data-input-index"));
  }

  let highestNumber = Math.max(...indexInputList);
  let newIndex = parseInt(highestNumber) + 1;
  indexInputList.push(newIndex);
  dollarInput.setAttribute("data-input-index", newIndex);

  dollarInput.classList.add("dollar-amount");

  incomeCell.textContent = incomeInput.value;

  const submitButton = document.createElement("button");
  submitButton.textContent = ">";
  submitButton.classList.add("submit-button-new");
  submitButton.setAttribute("data-input-index", newIndex);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.classList.add("delete-button");
  deleteButton.setAttribute("data-input-index", newIndex);
  console.log(indexInputList);
  indexInputList.length = 0;

  const newForm = document.createElement("form");

  newForm.appendChild(dollarInput);
  newForm.appendChild(submitButton);
  newForm.appendChild(deleteButton);
  dollarCell.appendChild(newForm);

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

  for (let i = 0; i < amountInputs.length; i++) {
    const input = amountInputs[i];
    indexInputList.push(input.getAttribute("data-input-index"));
  }

  let highestNumber = Math.max(...indexInputList);
  let newIndex = parseInt(highestNumber) + 1;
  indexInputList.push(newIndex);
  dollarInput.setAttribute("data-input-index", newIndex);

  dollarInput.classList.add("dollar-amount");

  expenseCell.textContent = expenseInput.value;

  const submitButton = document.createElement("button");
  submitButton.textContent = ">";
  submitButton.classList.add("submit-button-new");
  submitButton.setAttribute("data-input-index", newIndex);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.classList.add("delete-button");
  deleteButton.setAttribute("data-input-index", newIndex);
  console.log(indexInputList);
  indexInputList.length = 0;

  const newForm = document.createElement("form");

  newForm.appendChild(dollarInput);
  newForm.appendChild(submitButton);
  newForm.appendChild(deleteButton);
  dollarCell.appendChild(newForm);

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
