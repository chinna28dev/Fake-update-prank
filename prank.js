(() => {
  if (window.__fakeUpdateActive) return;
  window.__fakeUpdateActive = true;

  const overlay = document.createElement("div");
  overlay.id = "fup-overlay";
  overlay.innerHTML = `
    <div class="fup-logo">
      <span></span><span></span><span></span><span></span>
    </div>
    <div class="fup-title">Working on updates</div>
    <div class="fup-subtitle">
      <span id="fup-percent">0</span>% complete
    </div>
    <div class="fup-bar-track">
      <div class="fup-bar-fill" id="fup-bar-fill"></div>
    </div>
    <div class="fup-warning">Do not turn off your computer</div>
  `;
  document.documentElement.appendChild(overlay);

  // Prevent scrolling behind the overlay
  const prevOverflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = "hidden";

  const percentEl = overlay.querySelector("#fup-percent");
  const fillEl = overlay.querySelector("#fup-bar-fill");

  // Fake progress that creeps up, stalls, jumps a little, never quite finishes
  let percent = 0;
  const milestones = [12, 27, 28, 44, 61, 73, 74, 89, 96, 99];
  let mi = 0;

  function tick() {
    if (!window.__fakeUpdateActive) return;
    if (mi < milestones.length) {
      const target = milestones[mi];
      if (percent < target) {
        percent += 1;
      } else {
        mi++;
      }
    }
    percentEl.textContent = percent;
    fillEl.style.width = percent + "%";
    const delay = Math.random() < 0.15 ? 800 + Math.random() * 1200 : 90 + Math.random() * 160;
    setTimeout(tick, delay);
  }
  tick();

  // ---- Secret exit: click the top-left corner 5 times within 3 seconds ----
  let clickCount = 0;
  let clickTimer = null;
  const exitZone = document.createElement("div");
  exitZone.id = "fup-exit-zone";
  overlay.appendChild(exitZone);

  exitZone.addEventListener("click", () => {
    clickCount++;
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => (clickCount = 0), 3000);
    if (clickCount >= 5) {
      dismiss();
    }
  });

  // ---- Secret exit: type "exit" anywhere ----
  let typed = "";
  function onKeyDown(e) {
    typed = (typed + e.key.toLowerCase()).slice(-4);
    if (typed === "exit") dismiss();
  }5
  document.addEventListener("keydown", onKeyDown);

  function dismiss() {
    window.__fakeUpdateActive = false;
    document.removeEventListener("keydown", onKeyDown);
    document.documentElement.style.overflow = prevOverflow;
    overlay.remove();
  }
})();
