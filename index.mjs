function calculateWater(arr) {
  const n = arr.length;
  let lmax = new Array(n);
  let rmax = new Array(n);
  let res = new Array(n);
  let sum = 0;
  lmax[0] = arr[0];
  rmax[n - 1] = arr[n - 1];
  for (let i = 1; i < n; i++) {
    lmax[i] = Math.max(lmax[i - 1], arr[i]);
  }
  for (let i = n - 2; i >= 0; i--) {
    rmax[i] = Math.max(rmax[i + 1], arr[i]);
  }
  for (let i = 0; i < n; i++) {
    res[i] = Math.min(lmax[i], rmax[i]);
    sum += res[i] - arr[i];
  }
  return [res, sum];
}

function handleSubmit(e) {
  e.preventDefault();
  const inputArr = input.value.split(",");
  const arr = inputArr.map((element) => parseInt(element));
  var [waterArr, sum] = calculateWater(arr);
  var maxi = Math.max(...arr);
  const inputTable = document.querySelector("#input-table");
  const outputTable = document.querySelector("#output-table");
  inputTable.innerHTML = "";
  outputTable.innerHTML = "";
  //  Render rows
  for (let i = 0; i <= maxi; i++) {
    const InputTableRow = document.createElement("tr");
    const OutputTableRow = document.createElement("tr");
    // Render columns
    for (let j = 0; j < inputArr.length; j++) {
      const inputTD = document.createElement("td");
      const outputTD = document.createElement("td");

      if (inputArr[j] <= maxi - i && waterArr[j] <= maxi - i) {
        inputTD.classList.add("empty");
        outputTD.classList.add("empty");
      } else if (waterArr[j] > inputArr[j]) {
        inputTD.classList.add("water");
        outputTD.classList.add("water");
        waterArr[j] -= 1;
      } else {
        inputTD.classList.add("solid");
        outputTD.classList.add("empty");
      }
      InputTableRow.appendChild(inputTD);
      OutputTableRow.appendChild(outputTD);
    }
    inputTable.appendChild(InputTableRow);
    outputTable.appendChild(OutputTableRow);
  }
  const output = document.querySelector("#output");
  output.innerHTML = `Water Stored: ${sum} units`;
}

var input = document.getElementById("input-text");
const submitBtn = document.getElementById("submit-button");
submitBtn.addEventListener("click", handleSubmit);
