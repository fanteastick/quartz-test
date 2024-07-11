document.addEventListener("DOMContentLoaded", () => {
    // const userPref = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
    // const currentTheme = localStorage.getItem("theme") ?? userPref  
    // const theme = currentTheme === "light" ? "light_protanopia" : "dark_protanopia"
    const theme = "light_protanopia"
    const existingGiscusContainer = document.getElementById('giscus-container');
  
    if (existingGiscusContainer) {
      // Remove the existing Giscus instance
      existingGiscusContainer.innerHTML = '';
    }
  
    // Create a new container element for Giscus
    const newGiscusContainer = document.createElement('div class={classNames(displayClass)}');
    newGiscusContainer.id = 'giscus-container';
    document.body.appendChild(newGiscusContainer);
  
    // Create a new script element with the updated data-theme attribute
    const newScript = document.createElement('script');
    newScript.src = 'https://giscus.app/client.js';
    newScript.setAttribute('data-repo', 'fanteastick/quartz-test');
    newScript.setAttribute('data-repo-id', 'R_kgDOMVIwGw');
    newScript.setAttribute('data-category', 'Announcements');
    newScript.setAttribute('data-category-id', 'DIC_kwDOMVIwG84Cguqi');
    newScript.setAttribute('data-mapping', 'specific');
    newScript.setAttribute('data-term', 'Guestbook');
    newScript.setAttribute('data-strict', '0');
    newScript.setAttribute('data-reactions-enabled', '0');
    newScript.setAttribute('data-emit-metadata', '0');
    newScript.setAttribute('data-input-position', 'top');
    newScript.setAttribute('data-theme', theme);
    newScript.setAttribute('data-lang', 'en');
    newScript.setAttribute('data-loading', 'lazy');
    newScript.setAttribute('crossOrigin', 'anonymous');
    newScript.async = true;
  
    // Append the new script to the Giscus container
    newGiscusContainer.appendChild(newScript);
  })