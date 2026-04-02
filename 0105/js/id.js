const backBtn = document.getElementById("backBtn");
const goPw = document.getElementById("goPw");

const methodRadios = document.querySelectorAll('input[name="method"]');
const phoneForm = document.getElementById("phoneForm");
const emailForm = document.getElementById("emailForm");

const nameInput = document.getElementById("userName");
const phoneInput = document.getElementById("userPhone");
const emailInput = document.getElementById("userEmail");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("findIdForm");

/* 뒤로가기 */
backBtn.addEventListener("click", () => {
  history.length > 1
    ? history.back()
    : (location.href = "login.html");
});

/* 비밀번호 찾기 이동 */
goPw.addEventListener("click", () => {
  location.href = "pw.html";
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
  const nameFilled = nameInput.value.trim() !== "";

  const phoneFilled =
    !phoneForm.classList.contains("hidden") &&
    phoneInput.value.trim() !== "";

  const emailFilled =
    !emailForm.classList.contains("hidden") &&
    emailInput.value.trim() !== "";

  submitBtn.disabled = !(nameFilled && (phoneFilled || emailFilled));
}

nameInput.addEventListener("input", checkForm);
phoneInput.addEventListener("input", checkForm);
emailInput.addEventListener("input", checkForm);

/* submit */
form.addEventListener("submit", e => {
  e.preventDefault();
  location.href = "login.html";
});
