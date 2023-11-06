const form = document.querySelector("[new-item]");

const table = document.querySelector("[card-table]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSubmit();
});

function handleSubmit() {
  const incomeInput = document.querySelector("[add-new]");
  const newRow = document.createElement("tr");
  const incomeCell = document.createElement("td");
  const dollarCell = document.createElement("td");
  dollarCell.classList.add("input");
  const dollarInput = document.createElement("input");
  dollarInput.type = "text";
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
