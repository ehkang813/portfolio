
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