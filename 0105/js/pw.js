const backBtn = document.getElementById("backBtn");
const goId = document.getElementById("goId");

const methodRadios = document.querySelectorAll('input[name="method"]');
const phoneForm = document.getElementById("phoneForm");
const emailForm = document.getElementById("emailForm");

const idInput = document.getElementById("userId");
const phoneInput = document.getElementById("userPhone");
const emailInput = document.getElementById("userEmail");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("findPwForm");

/* 뒤로가기 */
backBtn.addEventListener("click", () => {
  history.length > 1
    ? history.back()
    : (location.href = "login.html");
});

/* 아이디 찾기 이동 */
goId.addEventListener("click", () => {
  location.href = "id.html";
});

/* 방법 변경 */
methodRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    if (radio.value === "phone") {
      phoneForm.classList.remove("hidden");
      emailForm.classList.add("hidden");
    } else {
      phoneForm.classList.add("hidden");
      emailForm.classList.remove("hidden");
    }
    submitBtn.disabled = true;
  });
});

/* 입력 체크 */
function checkForm() {
  const idFilled = idInput.value.trim() !== "";

  const phoneFilled =
    !phoneForm.classList.contains("hidden") &&
    phoneInput.value.trim() !== "";

  const emailFilled =
    !emailForm.classList.contains("hidden") &&
    emailInput.value.trim() !== "";

  submitBtn.disabled = !(idFilled && (phoneFilled || emailFilled));
}

idInput.addEventListener("input", checkForm);
phoneInput.addEventListener("input", checkForm);
emailInput.addEventListener("input", checkForm);

/* submit */
form.addEventListener("submit", e => {
  e.preventDefault();
  location.href = "login.html";
});
