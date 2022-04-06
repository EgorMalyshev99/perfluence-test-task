function setSliderDefault(input, track, resetBtn) {
  [...arguments].forEach(item => item.classList.remove('active'));
  resetBtn.setAttribute('disabled', 'true');
  input.value = '';
}

function setSliderActive(input, track, resetBtn) {
  [...arguments].forEach(item => item.classList.add('active'));
  resetBtn.removeAttribute('disabled');
}

document.addEventListener('DOMContentLoaded', function() {
  var navigation = $('#nav-main').okayNav();
  document.querySelectorAll('.okayNav__nav--visible li').forEach((item, index) => {
    item.style.order = index;
  });

  const slidersWrap = document.querySelectorAll('.range');

  document.querySelectorAll('.range input[type="range"]').forEach((input, index) => {
    const valueLeft = slidersWrap[index].querySelector('.data-percent--left');
    const valueRight = slidersWrap[index].querySelector('.data-percent--right');
    const fakeTrack = slidersWrap[index].querySelector('.fake-track');
    const resetBtn = slidersWrap[index].querySelector('.reset-slider');
    let isActive = false;

    const barLeft = new ProgressBar.Circle(slidersWrap[index].querySelector('.circle--left'), {
      strokeWidth: 2,
      easing: 'linear',
      duration: 0,
      color: '#75BB5B',
      svgStyle: null
    });

    const barRight = new ProgressBar.Circle(slidersWrap[index].querySelector('.circle--right'), {
      strokeWidth: 2,
      easing: 'linear',
      duration: 0,
      color: '#9C64FF',
      svgStyle: null
    });

    barLeft.animate(0);
    barRight.animate(0);

    fakeTrack.style.width = 0;

    input.addEventListener('input', (evt) => {
      if (!isActive) {
        isActive = true;
        setSliderActive(input, fakeTrack, resetBtn);
      }
      valueLeft.innerText = `${evt.target.value}%`;
      valueRight.innerText = `${100 - evt.target.value}%`;

      barLeft.animate(input.value / 100);
      barRight.animate((100 - input.value) / 100);

      fakeTrack.style.width = `${input.value}%`;
    });

    resetBtn.addEventListener('click', () => {
      setSliderDefault(input, fakeTrack, resetBtn);
      barLeft.animate(0);
      barRight.animate(0);
      valueLeft.innerText = '';
      valueRight.innerText = '';
      isActive = false;
    });
  });
});