/* ===============================
   HERO SLIDER (INFINITE LOOP - FIXED)
================================ */
const track = document.querySelector(".hero-track");
const slides = Array.from(document.querySelectorAll(".hero-slide"));
const dots = document.querySelectorAll(".hero-dots .dot");

let currentIndex = 1;
let isTransitioning = false;
const intervalTime = 3000;
let autoSlide;

/* clone 생성 */
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

/* 초기 위치 */
track.style.transition = "none";
track.style.transform = "translateX(-100%)";

/* 이동 함수 */
function moveTo(index, withTransition = true) {
  if (withTransition && isTransitioning) return;

  if (withTransition) {
    isTransitioning = true;
    track.style.transition = "transform 0.5s ease";
  } else {
    track.style.transition = "none";
  }

  track.style.transform = `translateX(-${index * 100}%)`;
  currentIndex = index;

  dots.forEach((dot, i) => {
    dot.classList.toggle(
      "active",
      i === (currentIndex - 1 + dots.length) % dots.length
    );
  });

  if (!withTransition) {
    isTransitioning = false; // 🔥 transition 없는 경우 즉시 해제
  }
}

/* transition 끝나면 위치 보정 */
track.addEventListener("transitionend", () => {
  isTransitioning = false;

  if (currentIndex === 0) {
    moveTo(slides.length, false);
  }

  if (currentIndex === slides.length + 1) {
    moveTo(1, false);
  }
});

/* 자동 슬라이드 */
function startAutoSlide() {
  autoSlide = setInterval(() => {
    moveTo(currentIndex + 1, true);
  }, intervalTime);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

/* dot 클릭 */
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    stopAutoSlide();
    moveTo(index + 1, true);
    startAutoSlide();
  });
});

/* 초기 실행 */
moveTo(1, false);
startAutoSlide();

const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("sideMenuOverlay");

menuBtn.addEventListener("click", () => {
  sideMenu.classList.add("open");
  overlay.classList.add("show");
});

overlay.addEventListener("click", () => {
  sideMenu.classList.remove("open");
  overlay.classList.remove("show");
});






document.addEventListener('DOMContentLoaded', () => {

  // 모든 디바이스에서 실행
  document.querySelectorAll('.h-scroll').forEach(scrollEl => {

    /* === wrapper 생성 === */
    const wrap = document.createElement('div');
    wrap.className = 'h-scroll-wrap';

    scrollEl.parentNode.insertBefore(wrap, scrollEl);
    wrap.appendChild(scrollEl);

    /* === 버튼 생성 === */
    const prevBtn = document.createElement('button');
    prevBtn.className = 'h-nav-btn prev';
    prevBtn.innerHTML = '〈 ';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'h-nav-btn next';
    nextBtn.innerHTML = '〉';

    wrap.appendChild(prevBtn);
    wrap.appendChild(nextBtn);

    /* === 이동 거리 계산 === */
    const getScrollAmount = () => {
      const containerWidth = scrollEl.offsetWidth;
      return containerWidth * 0.8; // 컨테이너 너비의 80%만큼 이동
    };

    /* === 버튼 표시/숨김 업데이트 === */
    const updateButtonVisibility = () => {
      const scrollLeft = scrollEl.scrollLeft;
      const maxScroll = scrollEl.scrollWidth - scrollEl.offsetWidth;
      
      // 왼쪽 끝에 있으면 prev 버튼 숨김
      if (scrollLeft <= 1) {
        prevBtn.classList.add('hidden');
      } else {
        prevBtn.classList.remove('hidden');
      }
      
      // 오른쪽 끝에 있으면 next 버튼 숨김
      if (scrollLeft >= maxScroll - 1) {
        nextBtn.classList.add('hidden');
      } else {
        nextBtn.classList.remove('hidden');
      }
    };

    /* === 클릭 이벤트 === */
    prevBtn.addEventListener('click', () => {
      scrollEl.scrollBy({
        left: -getScrollAmount(),
        behavior: 'smooth'
      });
    });

    nextBtn.addEventListener('click', () => {
      scrollEl.scrollBy({
        left: getScrollAmount(),
        behavior: 'smooth'
      });
    });

    /* === 스크롤 이벤트 감지 === */
    scrollEl.addEventListener('scroll', updateButtonVisibility);
    
    // 초기 버튼 상태 설정
    updateButtonVisibility();
    
    // 윈도우 리사이즈 시에도 업데이트
    window.addEventListener('resize', updateButtonVisibility);

  });
});