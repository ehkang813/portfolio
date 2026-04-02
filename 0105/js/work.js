const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const cta = document.querySelector(".cta");

let current = 0;
let startX = 0;

function updateSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("prev", "next", "active");

    if (i === index) {
      slide.classList.add("active");
    } else if (i < index) {
      slide.classList.add("prev");
    } else {
      slide.classList.add("next");
    }
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

/* 최초 상태 세팅 */
updateSlide(current);

/* 자동 슬라이드 1회 */
function autoSlideOnce() {
  const timer = setInterval(() => {
    if (current < slides.length - 1) {
      current++;
      updateSlide(current);
    } else {
      clearInterval(timer);
    }
  }, 3000);
}

autoSlideOnce();

/* Swipe */
document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;

  if (startX - endX > 50 && current < slides.length - 1) current++;
  if (endX - startX > 50 && current > 0) current--;

  updateSlide(current);
});

/* Pagination */
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    current = i;
    updateSlide(current);
  });
});

/* CTA */
cta.addEventListener("click", () => {
  window.location.href = "login.html";
});
