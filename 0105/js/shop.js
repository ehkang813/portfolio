// shop.js
// Netflix-style horizontal navigation for category-bar (Shop page)

document.addEventListener('DOMContentLoaded', () => {
  const categoryBar = document.querySelector('.category-bar');
  if (!categoryBar) return;

  /* wrapper 생성 */
  const wrap = document.createElement('div');
  wrap.className = 'category-bar-wrap';
  categoryBar.parentNode.insertBefore(wrap, categoryBar);
  wrap.appendChild(categoryBar);

  /* 버튼 생성 */
  const prevBtn = document.createElement('button');
  prevBtn.className = 'h-nav-btn prev';
  prevBtn.textContent = '‹';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'h-nav-btn next';
  nextBtn.textContent = '›';

  wrap.appendChild(prevBtn);
  wrap.appendChild(nextBtn);

  /* 이동 거리 */
  const getMoveAmount = () => categoryBar.offsetWidth * 0.7;

  /* 버튼 클릭 */
  prevBtn.addEventListener('click', () => {
    categoryBar.scrollBy({
      left: -getMoveAmount(),
      behavior: 'smooth'
    });
  });

  nextBtn.addEventListener('click', () => {
    categoryBar.scrollBy({
      left: getMoveAmount(),
      behavior: 'smooth'
    });
  });

  /* 버튼 상태 업데이트 */
  const updateButtons = () => {
    const maxScroll =
      categoryBar.scrollWidth - categoryBar.clientWidth;

    if (categoryBar.scrollLeft <= 0) {
      prevBtn.classList.add('hidden');
    } else {
      prevBtn.classList.remove('hidden');
    }

    if (categoryBar.scrollLeft >= maxScroll - 1) {
      nextBtn.classList.add('hidden');
    } else {
      nextBtn.classList.remove('hidden');
    }
  };

  categoryBar.addEventListener('scroll', updateButtons);
  window.addEventListener('resize', updateButtons);

  updateButtons();
});
