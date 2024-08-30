document.addEventListener("nav", () => {
    const element = document.getElementById('permalink')
    if (element) {
        const txt = element.innerText as string
        function onclick  () {
            navigator.clipboard.writeText(txt);
            
            // Create and show custom notification
            const notification = document.createElement('div');
            notification.textContent = 'Permalink copied to clipboard!';
            notification.className = 'custom-notification';
            // Calculate position to place the notification above the clicked element
            //@ts-ignore
            const rect = element.getBoundingClientRect();
            notification.style.position = 'fixed';
            notification.style.top = `${rect.bottom + 10}px`; // Position it 50px above the element
            notification.style.left = `${rect.left}px`; // Align with the left of the element

            document.body.appendChild(notification);
            setTimeout(() => {
            // Add class to trigger fade-out
            notification.classList.add('fade-out');
            
            // Remove notification after the fade-out animation is complete
            setTimeout(() => {
            document.body.removeChild(notification);
            }, 750); // Duration of the fade-out animation
        }, 1500)
        }
        element.addEventListener("click", onclick)
        window.addCleanup(() => element.removeEventListener("click", onclick))
    }
})