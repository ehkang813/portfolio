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



  // 구글 앱스 스크립트 배포 후 받은 URL을 여기에 넣으세요
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwFxWtmxWHsjuN6GYwUvLFHqhkTJVl0G_KoAks7BPxNYfGFhAA_alxvOGrnDNjV_gm4wg/exec';

  fetch(scriptURL, {
    method: 'POST',
    mode: 'no-cors', // 보안(CORS) 문제 해결을 위한 설정
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(() => {
    // no-cors 모드에서는 상세 응답을 읽기 어려우므로 전송 시도가 성공하면 알림을 띄웁니다.
    alert('메시지가 성공적으로 전송되었습니다! 강은혜 디자이너가 곧 연락드릴게요.');
    form.reset();
  })
  .catch(err => {
    alert('전송 중 오류가 발생했습니다. 다시 시도해 주세요.');
    console.error('Error!', err.message);
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.innerText = 'Submit';
  });
