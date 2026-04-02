// 뒤로가기 버튼 (홈 제외 페이지 공통)
const backBtn = document.getElementById("backBtn");

if (backBtn) {
  backBtn.addEventListener("click", () => {
    history.back();
  });
}
