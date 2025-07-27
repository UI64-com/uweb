function showContent() {
  console.log("showContent");
  runTransition(() => {
    // You can add content logic here later if needed
  });
}

// function runTransition(callback = () => {}) {
//   const container = document.getElementById('transition');
//   container.querySelectorAll('.strip').forEach(s => s.remove());

//   const placeholder = container.querySelector('div') || container;

//   // We defer the content toggle until the middle of the animation.
//   // So no immediate content change here.

//   const totalStrips = 10;
//   let completedStrips = 0;
//   let stripsSlidIn = 0; // count strips that finished sliding in

//   // Prepare content fetch promise if we need to show logo.html
//   const loadContent = (htmlReferer) =>
//     fetch(htmlReferer)
//       .then(res => res.text())
//       .then(html => {
//         placeholder.innerHTML = html;
//       });

//   for (let i = 0; i < totalStrips; i++) {
//     const strip = document.createElement('div');
//     strip.className = 'strip';
//     strip.style.top = `calc(${i * 10}% - ${i > 0 ? 1 : 0}px)`;

//     const gray = Math.max(20, 60 - i * 4);
//     strip.style.backgroundColor = `rgb(${gray}, ${gray}, ${gray})`;
//     strip.style.animationDelay = `${i * 80}ms`;

//     const directionIn = i % 2 === 0 ? 'left-in' : 'right-in';

//     container.appendChild(strip);
//     void strip.offsetWidth; // Force reflow
//     strip.classList.add(directionIn);

//     strip.addEventListener('animationend', async (e) => {
//       if (e.animationName === 'slideInLeft' || e.animationName === 'slideInRight') {
//         stripsSlidIn++;

//         // After all strips have slid in, swap content
//         if (stripsSlidIn === totalStrips) {
//           if (container.querySelector('#info') !== null) {
//             await loadContent("logo.html");  // load logo.html content
//           } else {
//             await loadContent("info.html");  // load logo.html content
//           }

//           // Now trigger slide out for all strips
//           container.querySelectorAll('.strip').forEach((strip, idx) => {
//             strip.classList.remove('left-in', 'right-in');
//             const outDir = idx % 2 === 0 ? 'left-out' : 'right-out';
//             strip.classList.add(outDir);
//             strip.style.animationDelay = '0ms';
//           });
//         }
//       } else if (e.animationName === 'slideOutLeft' || e.animationName === 'slideOutRight') {
//         strip.remove();
//         completedStrips++;
//         if (completedStrips === totalStrips) {
//           callback();
//         }
//       }
//     });
//   }
// }

 function runTransition(callback = () => {}) {
      const container = document.getElementById('transition');
      const placeholder = container.querySelector('.content') || container;

      const wave = document.createElement('div');
      wave.className = 'wave-overlay animate-wave';
      container.appendChild(wave);

      wave.addEventListener('animationend', async () => {
        // Swap content at halfway point (timed to match animation visually)
        if (container.querySelector('#info')) {
          await loadContent('logo.html');
        } else {
          await loadContent('info.html');
        }

        wave.remove();
        callback();
      });

      function loadContent(url) {
        return fetch(url)
          .then(res => res.text())
          .then(html => {
            placeholder.innerHTML = html;
            placeholder.className = 'content'; // restore content class
          });
      }
    }