function setLanguage(lang) {
  localStorage.setItem("language", lang);
  applyTranslations(lang);
}

function applyTranslations(lang) {
  const elements = document.querySelectorAll("[data-translate-key]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-translate-key");
    if (translations[lang][key]) {
      if (element.placeholder !== undefined) {
        element.placeholder = translations[lang][key];
      } else {
        element.textContent = translations[lang][key];
      }
    }
  });
  document.documentElement.lang = lang;
}

function getLanguage() {
  return localStorage.getItem("language") || "bg";
}

function getTranslatedText(key, ...args) {
  const lang = getLanguage();
  let text = translations[lang][key] || key;
  args.forEach((arg, index) => {
    text = text.replace(`{${index}}`, arg);
  });
  return text;
}

document.addEventListener("DOMContentLoaded", () => {
  const lang = getLanguage();
  setLanguage(lang);

  const select = document.getElementById("language-select");
  if (select) {
    select.addEventListener("change", (event) => {
      setLanguage(event.target.value);
    });
  }
});
