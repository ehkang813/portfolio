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
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');

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
  const modalImages = document.querySelectorAll('#modal-image'); // 중복 id 모두 선택
  const modalDesc = document.querySelector('.modal-desc');
  const modalLink = document.getElementById('modal-link');       // ✅ 선언 추가
  const modalImageWrap = document.querySelector('.modal-image-wrap');

  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
      modalTitle.textContent = item.dataset.title || 'Portfolio';
      modalDesc.innerHTML = item.dataset.desc || '';

      // 두 개의 #modal-image 모두 src 세팅
      modalImages.forEach(img => {
        img.src = item.dataset.image || '';
      });

      // 피그마 링크 처리
      const link = item.dataset.link;
      if (link) {
        modalLink.href = link;
        modalImageWrap.style.display = 'block'; // 링크 있으면 wrap 보이기
      } else {
        modalLink.removeAttribute('href');
        modalImageWrap.style.display = 'none';  // 링크 없으면 wrap 숨기기
      }

      modal.classList.add('open');
      document.body.classList.add('modal-open');
    });
  });

  modalOverlay.addEventListener('click', closeModal);
  modalClose.addEventListener('click', closeModal);

  function closeModal() {
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
  }

});


// Google Forms 제출
const scriptURL = 'https://script.google.com/macros/s/AKfycbzj7FiC9rCYVmGiZ9FNo0bcYX8Rt_iESjHr4rU5FNajMIEr1ZiGCVGZhVLtKR2rMc20/exec';
const form = document.getElementById('g-form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const submitBtn = form.querySelector('.btn-submit');
  submitBtn.disabled = true;
  submitBtn.innerText = "Sending...";

  fetch(scriptURL, {
    method: 'POST',
    body: new FormData(form)
  })
  .then(response => {
    alert('메시지가 성공적으로 전송되었습니다! 강은혜 디자이너가 곧 연락드릴게요.');
    submitBtn.disabled = false;
    submitBtn.innerText = "Submit";
    form.reset();
  })
  .catch(error => {
    console.error('Error!', error.message);
    alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    submitBtn.disabled = false;
    submitBtn.innerText = "Submit";
  });
});


/* =====================
   PROJECT FLOW (FINAL)
===================== */

const projectSteps = document.querySelectorAll('#project .step');
const summaryImage = document.getElementById('summary-image');
const prevBtn = document.querySelector('.summary-nav.prev');
const nextBtn = document.querySelector('.summary-nav.next');
const implBackBtn = document.querySelector('.impl-nav-back');

const summaryImages = [
  './images/nes_01.jpg',
  './images/nes_02.jpg',
  './images/nes_03.jpg',
  './images/nes_04.jpg',
  './images/nes_05.jpg',
  './images/nes_06.jpg',
  './images/nes_07.jpg',
  './images/nes_08.jpg',
  './images/nes_09.jpg',
  './images/nes_10.jpg'
];

let currentIndex = 0;

const projectIframe = document.querySelector('.device-frame iframe');
const iframeSrc = projectIframe.getAttribute('src');

function resetIframe() {
  projectIframe.setAttribute('src', iframeSrc);
}

function showStep(index) {
  projectSteps.forEach(step => step.classList.remove('active'));
  projectSteps[index].classList.add('active');

  if (index === 1) { // SUMMARY
    prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
    nextBtn.style.display = 'block';
    implBackBtn.style.display = 'none';
  }

  if (index === 2) { // IMPLEMENTATION
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    implBackBtn.style.display = 'block';
  }
}

function updateSummaryNav() {
  prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
}

/* PROJECT 시작 */
function startProject() {
  currentIndex = 0;
  summaryImage.src = summaryImages[currentIndex];
  updateSummaryNav();

  showStep(0); // COVER

  setTimeout(() => {
    showStep(1); // SUMMARY
  }, 3000);

  updateSummaryNav();
}

/* ◀ SUMMARY 이전 */
prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    summaryImage.src = summaryImages[currentIndex];
    updateSummaryNav();
  }
});

/* ▶ SUMMARY 다음 */
nextBtn.addEventListener('click', () => {
  if (currentIndex < summaryImages.length - 1) {
    currentIndex++;
    summaryImage.src = summaryImages[currentIndex];
    updateSummaryNav();
  } else {
    showStep(2); // IMPLEMENTATION
    resetIframe();
  }
});

/* ◀ IMPLEMENTATION → SUMMARY 복귀 */
implBackBtn.addEventListener('click', () => {
  showStep(1); // SUMMARY
  currentIndex = summaryImages.length - 1;
  summaryImage.src = summaryImages[currentIndex];
  updateSummaryNav();
});

/* PROJECT 메뉴 클릭 */
document.querySelectorAll('a[href="#project"]').forEach(link => {
  link.addEventListener('click', () => {
    startProject();
  });
});
