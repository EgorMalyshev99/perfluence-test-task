document.addEventListener('DOMContentLoaded', function() {
  var navigation = $('#nav-main').okayNav();
  document.querySelectorAll('.okayNav__nav--visible li').forEach((item, index) => {
    item.style.order = index;
  });

  const slidersWrap = document.querySelectorAll('.range');
  const sliders = document.querySelectorAll('.range .slider');

  [].slice.call(sliders).forEach(function(slider, index) {

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

    noUiSlider.create(slider, {
      start: 40,
      connect: [true, false],
      range: {
        'min': 0,
        'max': 100
      },
      format: wNumb({
        decimals: 0
      })
    });

    // Bind the color changing function to the update event.
    slider.noUiSlider.on('update', function() {
      slidersWrap[index].querySelector('.data-percent--left').innerText = `${slider.noUiSlider.get()}%`;
      slidersWrap[index].querySelector('.data-percent--right').innerText = `${100-slider.noUiSlider.get()}%`;
      barLeft.animate(slider.noUiSlider.get() / 100);
      barRight.animate((100 - slider.noUiSlider.get()) / 100);
    });
  });
});