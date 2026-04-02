


const findId = document.getElementById("findId");
const findPw = document.getElementById("findPw");
const signup = document.getElementById("signup");

findId.addEventListener("click", e => {
  e.preventDefault();
  location.href = "id.html";
});

findPw.addEventListener("click", e => {
  e.preventDefault();
  location.href = "pw.html";
});

signup.addEventListener("click", e => {
  e.preventDefault();
  location.href = "signup.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // ✅ 기본 submit 막기

    // (나중에 로그인 검증 로직 여기에 추가 가능)

    // ✅ 로그인 성공 → 홈으로 이동
    window.location.href = "home.html";
  });
});
