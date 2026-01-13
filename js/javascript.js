// =====================
// Section Navigation
// =====================

const sections = document.querySelectorAll('.section');
const dots = document.querySelectorAll('.dot-nav li');
const navLinks = document.querySelectorAll('.main-nav a');

function updateNavigation() {
  const scrollY = window.scrollY;

  sections.forEach((section, index) => {
    const top = section.offsetTop - 120;
    const height = section.offsetHeight;

    if (scrollY >= top && scrollY < top + height) {
      // dot 활성화
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');

      // header 메뉴 활성화
      navLinks.forEach(link => link.classList.remove('active'));
      navLinks[index].classList.add('active');
    }
  });
}

// dot 클릭
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const target = document.getElementById(dot.dataset.target);
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// header 메뉴 클릭
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// 스크롤 이벤트
window.addEventListener('scroll', updateNavigation);





/* work 카테고리 전환 */
document.addEventListener("DOMContentLoaded", () => {

  /* ===== 카테고리 전환 ===== */
  const categoryBtns = document.querySelectorAll('.category-btn');
  const grids = document.querySelectorAll('.portfolio-grid');

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.category;

      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      grids.forEach(grid => {
        grid.classList.remove('active');
        if (grid.dataset.category === target) {
          grid.classList.add('active');
        }
      });
    });
  });

  
  /* ===== 모달 ===== */
const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalClose = document.querySelector('.modal-close');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDesc = document.querySelector('.modal-desc');

document.querySelectorAll('.portfolio-item').forEach(item => {
  item.addEventListener('click', () => {
    modalTitle.textContent = item.dataset.title || 'Portfolio';
    modalImage.src = item.dataset.image || '';
    modalDesc.innerHTML = item.dataset.desc || ''; // ✅ 이것만

    modal.classList.add('open');
    document.body.classList.add('modal-open'); // ✅ 추가
  });
});

modalOverlay.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);

function closeModal() {
  modal.classList.remove('open');
  document.body.classList.remove('modal-open'); // ✅ 추가
}


});



// javascript.js 맨 아래에 추가
const scriptURL = 'https://script.google.com/macros/s/AKfycbzj7FiC9rCYVmGiZ9FNo0bcYX8Rt_iESjHr4rU5FNajMIEr1ZiGCVGZhVLtKR2rMc20/exec';
const form = document.getElementById('g-form');

form.addEventListener('submit', e => {
  e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
  
  // 전송 중 버튼 비활성화 (마케팅 UI 에티켓!)
  const submitBtn = form.querySelector('.btn-submit');
  submitBtn.disabled = true;
  submitBtn.innerText = "Sending...";

  fetch(scriptURL, { 
    method: 'POST', 
    body: new FormData(form)
  })
  .then(response => {
    alert('메세지가 성공적으로 접수되었습니다!');
    submitBtn.disabled = false;
    submitBtn.innerText = "Submit";
    form.reset(); // 폼 초기화
  })
  .catch(error => {
    console.error('Error!', error.message);
    alert('오류가 발생했습니다. 다시 시도해주세요.');
    submitBtn.disabled = false;
    submitBtn.innerText = "Submit";
  });
});
