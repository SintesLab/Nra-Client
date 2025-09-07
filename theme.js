document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("dark-mode-toggle");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme) {
    if (currentTheme === "dark-mode") {
      document.body.classList.add("dark-mode");
      toggleButton.textContent = "☀️";
    } else {
      document.body.classList.remove("dark-mode");
      toggleButton.textContent = "🌙";
    }
  } else {
    // Default to light mode
    document.body.classList.remove("dark-mode");
    toggleButton.textContent = "🌙";
  }

  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    let theme = "light-mode";
    if (document.body.classList.contains("dark-mode")) {
      theme = "dark-mode";
      toggleButton.textContent = "☀️";
    } else {
      toggleButton.textContent = "🌙";
    }
    localStorage.setItem("theme", theme);
  });
});
