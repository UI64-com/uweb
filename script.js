function showContent() {
  console.log("showContent");
  runTransition(() => {
    // You can add content logic here later if needed
  });
}

function runTransition(callback = () => {}) {

  // 1. Create the wave animation element
  const waveContainer = document.getElementById('t-holder');
  const wave = document.createElement('div');
  wave.className = 'wave-overlay animate-wave';
  waveContainer.appendChild(wave);

  // 2. Swap content after 0.8s (mid-animation)
  swapContent()

  // 3. Remove wave and call callback at animation end (1.6s total)
  wave.addEventListener('animationend', () => {
    wave.remove();
    callback();
  }, { once: true });
}

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