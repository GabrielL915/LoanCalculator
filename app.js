const form = document.getElementById("loan-form");
form.addEventListener("submit", (event) => {
  document.getElementById("results").style.display = "none";
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);
  event.preventDefault();
});

function calculateResults() {
  document.getElementById("loading").style.display = "none";
  document.getElementById("results").style.display = "block";

  const amountInput = document.getElementById("amount");
  const interestInput = document.getElementById("interest");
  const yearsInput = document.getElementById("years");
  const monthlyPaymentOutput = document.getElementById("monthly-payment");
  const totalPaymentOutput = document.getElementById("total-payment");
  const totalInterestOutput = document.getElementById("total-interest");

  const principal = parseFloat(amountInput.value);
  const interestRate = parseFloat(interestInput.value) / 100 / 12;
  const numberOfPayments = parseFloat(yearsInput.value) * 12;

  const numerator = interestRate * Math.pow(1 + interestRate, numberOfPayments);
  const denominator = Math.pow(1 + interestRate, numberOfPayments) - 1;
  const monthlyPayment = principal * (numerator / denominator);

  if (isFinite(monthlyPayment)) {
    monthlyPaymentOutput.value = monthlyPayment.toFixed(2);
    totalPaymentOutput.value = (monthlyPayment * numberOfPayments).toFixed(2);
    totalInterestOutput.value = (
      monthlyPayment * numberOfPayments -
      principal
    ).toFixed(2);
  } else {
    showError("Please check your input values.");
  }
}

function showError(errorMessage) {
  document.getElementById("loading").style.display = "none";
  document.getElementById("results").style.display = "none";
  const errorDiv = document.createElement("div");

  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  errorDiv.className = "alert alert-danger";

  errorDiv.appendChild(document.createTextNode(errorMessage));

  card.insertBefore(errorDiv, heading.nextSibling);

  setTimeout(() => document.querySelector(".alert").remove(), 5000);
}
