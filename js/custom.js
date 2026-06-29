/* ============================================
   情書 Love Letter - 互動效果腳本
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // --- Card Flip Interaction ---
  document.querySelectorAll('.card-flipper').forEach(function (card) {
    card.addEventListener('click', function (e) {
      e.stopPropagation();
      this.classList.toggle('flipped');
    });
  });

  // --- Keyboard shortcut to reset all flipped cards ---
  document.addEventListener('keydown', function (e) {
    if (e.key === 'r' || e.key === 'R') {
      document.querySelectorAll('.card-flipper.flipped').forEach(function (card) {
        card.classList.remove('flipped');
      });
    }
  });

  // --- Auto-reset flipped cards on slide change ---
  if (typeof Reveal !== 'undefined') {
    Reveal.on('slidechanged', function () {
      document.querySelectorAll('.card-flipper.flipped').forEach(function (card) {
        card.classList.remove('flipped');
      });
    });
  }

  // --- Sparkle effect on section title slides ---
  function createSparkle(container) {
    var sparkle = document.createElement('div');
    sparkle.style.cssText = 
      'position:absolute;width:4px;height:4px;background:' + 
      (Math.random() > 0.5 ? '#D4AF37' : '#F0D77B') + 
      ';border-radius:50%;pointer-events:none;' +
      'animation:sparkle-fade 1.5s ease-out forwards;' +
      'left:' + (Math.random() * 100) + '%;' +
      'top:' + (Math.random() * 100) + '%;' +
      'box-shadow:0 0 6px rgba(212,175,55,0.6);';
    container.appendChild(sparkle);
    setTimeout(function() {
      if (sparkle.parentNode) sparkle.parentNode.removeChild(sparkle);
    }, 1500);
  }

  // Add sparkle keyframes
  var style = document.createElement('style');
  style.textContent = 
    '@keyframes sparkle-fade{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0) translateY(-20px)}}';
  document.head.appendChild(style);

  // Sparkle on section title slides
  if (typeof Reveal !== 'undefined') {
    Reveal.on('slidechanged', function (event) {
      var slide = event.currentSlide;
      if (slide && slide.classList.contains('slide-section-title')) {
        var count = 0;
        var interval = setInterval(function() {
          createSparkle(slide);
          count++;
          if (count > 15) clearInterval(interval);
        }, 100);
      }
    });
  }

  // --- Entrance animation for card grid items ---
  if (typeof IntersectionObserver !== 'undefined') {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card-grid-item').forEach(function(item, index) {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'all 0.5s ease ' + (index * 0.1) + 's';
      observer.observe(item);
    });
  }

});
