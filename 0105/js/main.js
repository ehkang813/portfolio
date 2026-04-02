// splash → walkthrough
setTimeout(() => {
  document.body.classList.add("fade-out");

  // work에서 슬라이드 인을 위한 플래그
  sessionStorage.setItem("fromSplash", "true");

  setTimeout(() => {
    window.location.href = "work.html";
  }, 500); // fade 중간에 이동
}, 3000);


const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const cta = document.querySelector(".cta");

let current = 0;
let startX = 0;

function updateSlide(index, instant = false) {
  slides.forEach((slide, i) => {
    slide.classList.remove("prev", "next", "active", "instant");

    if (i === index) {
      slide.classList.add("active");
      if (instant) slide.classList.add("instant");
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

/* splash에서 넘어온 경우 */
if (sessionStorage.getItem("fromSplash") === "true") {
  slides.forEach(slide => slide.classList.add("next"));

  requestAnimationFrame(() => {
    updateSlide(0);
  });

  sessionStorage.removeItem("fromSplash");
} else {
  updateSlide(0, true);
}

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
  window.location.href = "index.html";
});
