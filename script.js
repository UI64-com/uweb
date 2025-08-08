function showContent() {
  console.log("showContent");
  runTransition(() => {
    // content logic goes here later if needed
  });
}

function runTransition(callback = () => {}) {

  // 1. Create the wave animation element
  const waveContainer = document.getElementById('t-holder');
  const wave = document.createElement('div');
  wave.className = 'wave-overlay animate-wave';
  waveContainer.appendChild(wave);

  // 2. load content after 0.8s (mid-animation)
  loadContent()

  // 3. Remove wave and call callback at animation end (1.6s total)
  wave.addEventListener('animationend', () => {
    wave.remove();
    callback();
  }, { once: true });
}

// when swap was needed
function swapContent() {
    const container = document.getElementById('transition');
    const placeholder = container.querySelector('.content') || container;

    // setTimeout(() => {
    //   console.log('800')
    // }, 800);

    setTimeout(() => {
    const url = container.querySelector('#info') ? 'logo.html' : 'info.html';

    fetch(url)
      .then(res => res.text())
      .then(html => {
        placeholder.innerHTML = html;
        placeholder.className = 'content'; // restore .content class
      });
  }, 800);
}

function loadContent() {
  const container = document.getElementById('transition');
  const svg = container.querySelector('.responsive-svg');
  const centerContainer = container.querySelector('.center-container');
  const existingInfo = container.querySelector('#info');

  setTimeout(() => {
    if (existingInfo) {
      // info.html is already loaded – remove it
      existingInfo.remove();

      // Restore SVG width
      if (svg) svg.classList.remove('responsive-svg-shrinked');

      // Restore min-height
      if (centerContainer) centerContainer.classList.remove('lower-min-height');
    } else {
      // info.html not loaded – fetch and append it
      fetch('info.html')
        .then(res => res.text())
        .then(html => {
          const temp = document.createElement('div');
          temp.innerHTML = html;
          const infoContent = temp.querySelector('#info');
          if (infoContent) {
            container.appendChild(infoContent);

            // Shrink SVG
            if (svg) svg.classList.add('responsive-svg-shrinked');

            // Remove min-height
            if (centerContainer) centerContainer.classList.add('lower-min-height');
          }
        });
    }
  }, 800);
}
