// Runs before first paint so the saved theme never flashes.
(function () {
  try {
    var saved = localStorage.getItem("theme");
    var dark = saved ? saved === "dark" : !window.matchMedia("(prefers-color-scheme: light)").matches;
    var root = document.documentElement;
    root.classList.toggle("dark", dark);
    root.style.colorScheme = dark ? "dark" : "light";
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#0A0C0B" : "#F5F3EE");
  } catch (e) {
    /* storage blocked: keep the dark default */
  }
})();
