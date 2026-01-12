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


  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
      modalTitle.textContent = item.dataset.title || 'Portfolio';
      modalImage.src = item.dataset.image;   // ⭐ 추가
      modal.classList.add('open');
    });
  });

  modalOverlay.addEventListener('click', closeModal);
  modalClose.addEventListener('click', closeModal);

  function closeModal() {
    modal.classList.remove('open');
  }

});
