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
const subtractButtons = document.querySelectorAll("[subtract-button]");
const deleteSubmitButtons = document.querySelectorAll("[delete-submit-button]");
const deleteExpenseButtons = document.querySelectorAll(
  "[delete-expense-button]"
);
const amountInputs = document.getElementsByClassName("dollar-amount");
const amountExpenseInputs = document.getElementsByClassName(
  "dollar-amount-expense"
);
const tableRows = document.querySelectorAll("tr");

const listItems = document.querySelectorAll("#list li");
const expenseButton = document.querySelector("[add-expense-button]");
const incomeButton = document.querySelector("[add-income-button]");

let netTotal = [];
let buttonIndexes = [];
let buttonExpenseIndexes = [];
const indexInputList = [0, 1, 2];
const indexInputExpenseList = [3, 4, 5, 6, 7];
let tableRowList = [];

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

for (const amountExpenseInput of amountExpenseInputs) {
  amountExpenseInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitExpenseClick(amountExpenseInput.getAttribute("data-input-index"));
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

deleteSubmitButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const clickedButton = event.target.closest("button");
    deleteSubmitItem(clickedButton.getAttribute("data-input-index"));
  });
});

deleteExpenseButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const clickedButton = event.target.closest("button");
    deleteExpenseItem(clickedButton.getAttribute("data-input-index"));
  });
});

subtractButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const clickedButton = event.target.closest("button");
    submitExpenseClick(clickedButton.getAttribute("data-input-index"));
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

function deleteExpenseItem(buttonIndex) {
  for (const row of tableRowList) {
    const rowIndexList = row.getAttribute("data-input-index");
    const rowClassList = row.getAttribute("class");

    if (buttonIndex === rowIndexList && rowClassList === "expense-row") {
      row.style.display = "none";
    }
  }

  for (const row of tableRows) {
    const rowIndex = row.getAttribute("data-input-index");
    const rowClass = row.getAttribute("class");
    if (buttonIndex === rowIndex && rowClass === "expense-row") {
      row.style.display = "none";
    }
  }

  const findIndex = netTotal.findIndex(
    (object) => object.expenseIndex === buttonIndex
  );
  netTotal[findIndex].expenseNumber = 0;

  let totalSubmit = 0;
  let totalExpense = 0;
  let total = 0;

  for (const obj of netTotal) {
    totalSubmit += obj.submitNumber;
    totalExpense += obj.expenseNumber;
  }
  total = totalSubmit + totalExpense;
  dollar.textContent = total;
}

function deleteSubmitItem(buttonIndex) {
  for (const row of tableRowList) {
    const rowIndexList = row.getAttribute("data-input-index");
    const rowClassList = row.getAttribute("class");

    if (buttonIndex === rowIndexList && rowClassList === "submit-row") {
      row.style.display = "none";
    }
  }

  for (const row of tableRows) {
    const rowIndex = row.getAttribute("data-input-index");
    const rowClass = row.getAttribute("class");
    if (buttonIndex === rowIndex && rowClass === "submit-row") {
      row.style.display = "none";
    }
  }

  const findIndex = netTotal.findIndex(
    (object) => object.submitIndex === buttonIndex
  );
  netTotal[findIndex].submitNumber = 0;

  let totalSubmit = 0;
  let totalExpense = 0;
  let total = 0;

  for (const obj of netTotal) {
    totalSubmit += obj.submitNumber;
    totalExpense += obj.expenseNumber;
  }
  total = totalSubmit + totalExpense;
  dollar.textContent = total;
}

function submitNumberClick(buttonIndex) {
  let num = null;
  let matchedIndex = null;

  for (let i = 0; i < amountInputs.length; i++) {
    const input = amountInputs[i];
    if (
      buttonIndex === input.getAttribute("data-input-index") &&
      input.value !== ""
    ) {
      num = parseInt(input.value);
      matchedIndex = input.getAttribute("data-input-index");

      if (buttonIndexes.includes(matchedIndex)) {
        const findIndex = netTotal.findIndex(
          (object) => object.submitIndex === matchedIndex
        );
        netTotal[findIndex].submitNumber = num;

        break;
      } else {
        const newObject = {
          submitIndex: matchedIndex,
          expenseIndex: null,
          submitNumber: num,
          expenseNumber: null,
        };
        netTotal.push(newObject);

        buttonIndexes.push(matchedIndex);

        break;
      }
    }
  }

  let totalSubmit = 0;
  let totalExpense = 0;
  let total = 0;

  for (const obj of netTotal) {
    totalSubmit += obj.submitNumber;
    totalExpense += obj.expenseNumber;
  }
  total = totalSubmit + totalExpense;
  dollar.textContent = total;
}

function submitExpenseClick(buttonIndex) {
  let num = null;
  let matchedIndex = null;

  for (let i = 0; i < amountExpenseInputs.length; i++) {
    const input = amountExpenseInputs[i];

    if (
      buttonIndex === input.getAttribute("data-input-index") &&
      input.value !== ""
    ) {
      num = parseInt(input.value);
      matchedIndex = input.getAttribute("data-input-index");

      if (buttonExpenseIndexes.includes(matchedIndex)) {
        const findIndex = netTotal.findIndex(
          (object) => object.expenseIndex === matchedIndex
        );
        netTotal[findIndex].expenseNumber = -num;
        break;
      } else {
        newObject = {
          submitIndex: null,
          expenseIndex: matchedIndex,
          submitNumber: null,
          expenseNumber: -num,
        };
        netTotal.push(newObject);
        buttonExpenseIndexes.push(matchedIndex);
        break;
      }
    }
  }

  let totalSubmit = 0;
  let totalExpense = 0;
  let total = 0;

  for (const obj of netTotal) {
    totalSubmit += obj.submitNumber;
    totalExpense += obj.expenseNumber;
  }
  total = totalSubmit + totalExpense;
  dollar.textContent = total;
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

  newRow.setAttribute("data-input-index", newIndex);
  newRow.classList.add("submit-row");
  tableRowList.push(newRow);
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.classList.add("delete-submit-button");
  deleteButton.setAttribute("data-input-index", newIndex);
  indexInputList.length = 0;

  dollarInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitNumberClick(dollarInput.getAttribute("data-input-index"));
    }
  });

  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const clickedButton = event.target.closest("button");
    submitNumberClick(clickedButton.getAttribute("data-input-index"));
  });

  deleteButton.addEventListener("click", (event) => {
    event.preventDefault();
    const clickedButton = event.target.closest("button");
    deleteSubmitItem(clickedButton.getAttribute("data-input-index"));
  });

  const newForm = document.createElement("form");
  newForm.setAttribute("id", "form");

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

  for (let i = 0; i < amountExpenseInputs.length; i++) {
    const input = amountExpenseInputs[i];
    indexInputExpenseList.push(input.getAttribute("data-input-index"));
  }

  let highestNumber = Math.max(...indexInputExpenseList);
  let newIndex = parseInt(highestNumber) + 1;
  indexInputExpenseList.push(newIndex);
  dollarInput.setAttribute("data-input-index", newIndex);

  dollarInput.classList.add("dollar-amount-expense");

  expenseCell.textContent = expenseInput.value;

  const subtractButton = document.createElement("button");
  subtractButton.textContent = ">";
  subtractButton.classList.add("subtract-button-new");
  subtractButton.setAttribute("data-input-index", newIndex);

  newRow.setAttribute("data-input-index", newIndex);
  newRow.classList.add("expense-row");
  tableRowList.push(newRow);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.classList.add("delete-expense-button");
  deleteButton.setAttribute("data-input-index", newIndex);
  indexInputExpenseList.length = 0;

  dollarInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitExpenseClick(dollarInput.getAttribute("data-input-index"));
    }
  });

  subtractButton.addEventListener("click", (event) => {
    event.preventDefault();
    const clickedButton = event.target.closest("button");
    submitExpenseClick(clickedButton.getAttribute("data-input-index"));
  });

  deleteButton.addEventListener("click", (event) => {
    event.preventDefault();
    const clickedButton = event.target.closest("button");
    deleteExpenseItem(clickedButton.getAttribute("data-input-index"));
  });

  const newForm = document.createElement("form");
  newForm.setAttribute("id", "form");

  newForm.appendChild(dollarInput);
  newForm.appendChild(subtractButton);
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
  } else if (clickedText === "Income") {
    incomeCard.style.display = "block";
    listTitleExpense.classList.remove("list-item-active");
    expenseCard.style.display = "none";
    listTitleIncome.classList.add("list-item-active");
  }
}
