const backBtn = document.getElementById("backBtn");
const signupBtn = document.getElementById("signupBtn");

backBtn.addEventListener("click", () => {
  history.back();
});

/* 전체 동의 */
const agreeAll = document.getElementById("agreeAll");
const agreeItems = document.querySelectorAll(".agree-item");

agreeAll.addEventListener("change", () => {
  agreeItems.forEach(item => item.checked = agreeAll.checked);
});

agreeItems.forEach(item => {
  item.addEventListener("change", () => {
    agreeAll.checked = [...agreeItems].every(i => i.checked);
  });
});

/* 회원가입 */
signupBtn.addEventListener("click", () => {
  alert("회원가입 완료!");
  location.href = "login.html";
});
