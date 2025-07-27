function showContent() {
  console.log("showContent");
  runTransition(() => {
    // You can add content logic here later if needed
  });
}

function runTransition(callback = () => {}) {
  const container = document.getElementById('transition');
  container.querySelectorAll('.strip').forEach(s => s.remove());

  const placeholder = container.querySelector('div') || container;

  // We defer the content toggle until the middle of the animation.
  // So no immediate content change here.

  const totalStrips = 10;
  let completedStrips = 0;
  let stripsSlidIn = 0; // count strips that finished sliding in

  // Flag to indicate if we're showing or hiding content
  const showingContent = placeholder.innerHTML === '';

  // Prepare content fetch promise if we need to show logo.html
  const loadContent = () =>
    fetch('logo.html')
      .then(res => res.text())
      .then(html => {
        placeholder.innerHTML = html;
      });

  for (let i = 0; i < totalStrips; i++) {
    const strip = document.createElement('div');
    strip.className = 'strip';
    strip.style.top = `calc(${i * 10}% - ${i > 0 ? 1 : 0}px)`;

    const gray = 220 - i * 10;
    strip.style.backgroundColor = `rgb(${gray}, ${gray}, ${gray})`;
    strip.style.animationDelay = `${i * 80}ms`;

    const directionIn = i % 2 === 0 ? 'left-in' : 'right-in';

    container.appendChild(strip);
    void strip.offsetWidth; // Force reflow
    strip.classList.add(directionIn);

    strip.addEventListener('animationend', async (e) => {
      if (e.animationName === 'slideInLeft' || e.animationName === 'slideInRight') {
        stripsSlidIn++;

        // After all strips have slid in, swap content
        if (stripsSlidIn === totalStrips) {
          if (showingContent) {
            await loadContent();  // load logo.html content
          } else {
            placeholder.innerHTML = ''; // clear content
          }

          // Now trigger slide out for all strips
          container.querySelectorAll('.strip').forEach((strip, idx) => {
            strip.classList.remove('left-in', 'right-in');
            const outDir = idx % 2 === 0 ? 'left-out' : 'right-out';
            strip.classList.add(outDir);
            strip.style.animationDelay = '0ms';
          });
        }
      } else if (e.animationName === 'slideOutLeft' || e.animationName === 'slideOutRight') {
        strip.remove();
        completedStrips++;
        if (completedStrips === totalStrips) {
          callback();
        }
      }
    });
  }
}
