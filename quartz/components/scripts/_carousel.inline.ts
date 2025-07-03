// from https://gist.github.com/pinei/14545e81e8629eed72b55fce1cbd7822
// 07/03/2025


interface CarouselInstance {
  currentIndex: number
  goToSlide: (index: number) => void
  destroy: () => void
}

// Cache for initialized carousels to avoid re-processing
const initializedCarousels = new WeakSet<HTMLElement>()

document.addEventListener("DOMContentLoaded", () => {
  const contentArea =
    document.querySelector("article") ||
    document.querySelector("#quartz-body .center") ||
    document.body

  initAllCarousels(contentArea)
  setupCarouselObserver(contentArea)

  // Make initCarousel available globally
  ;(window as any).initCarousel = initCarousel
})

// Initializes all carousels within the specified container
function initAllCarousels(container: Element): void {
  const carousels = container.querySelectorAll<HTMLElement>(
    '.quartz-carousel[data-needs-init="true"]',
  )
  carousels.forEach(initCarousel)
}

// Setup a MutationObserver to watch for new carousels being added to the DOM
function setupCarouselObserver(contentArea: Element): void {
  let debounceTimer: number | null = null

  const observer = new MutationObserver((mutations) => {
    const hasNewCarousels = mutations.some((mutation) =>
      Array.from(mutation.addedNodes).some((node) => {
        if (node.nodeType !== Node.ELEMENT_NODE) return false

        const element = node as HTMLElement

        // Check if the node itself is a carousel
        if (
          element.classList?.contains("quartz-carousel") &&
          element.getAttribute("data-needs-init") === "true"
        ) {
          return true
        }

        // Check for nested carousels
        return element.querySelectorAll?.('.quartz-carousel[data-needs-init="true"]').length > 0
      }),
    )

    if (hasNewCarousels) {
      // Debounce to avoid multiple rapid initializations
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = window.setTimeout(() => initAllCarousels(contentArea), 50)
    }
  })

  observer.observe(contentArea, {
    childList: true,
    subtree: true,
  })
}

// Create a modal for displaying images in full screen
function createImageModal(): HTMLElement {
  const modal = document.createElement("div")
  modal.className = "carousel-image-modal"
  modal.innerHTML = `
    <div class="carousel-modal-overlay">
      <div class="carousel-modal-content">
        <button class="carousel-modal-close" aria-label="Close modal">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
        <img class="carousel-modal-image" src="" alt="" />
      </div>
    </div>
  `

  document.body.appendChild(modal)
  return modal
}

// Show the image in a modal when clicked
function showImageModal(img: HTMLImageElement): void {
  let modal = document.querySelector(".carousel-image-modal") as HTMLElement

  if (!modal) {
    modal = createImageModal()
  }

  const modalImg = modal.querySelector(".carousel-modal-image") as HTMLImageElement
  const closeBtn = modal.querySelector(".carousel-modal-close") as HTMLButtonElement
  const overlay = modal.querySelector(".carousel-modal-overlay") as HTMLElement

  // Set image source and alt
  modalImg.src = img.src
  modalImg.alt = img.alt

  // Show modal
  modal.style.display = "flex"
  document.body.style.overflow = "hidden"

  // Close handlers
  const closeModal = () => {
    modal.style.display = "none"
    document.body.style.overflow = ""
  }

  // Remove existing listeners to avoid duplicates
  closeBtn.onclick = null
  overlay.onclick = null

  closeBtn.onclick = closeModal
  overlay.onclick = (e) => {
    if (e.target === overlay) {
      closeModal()
    }
  }

  // Keyboard handler (Escape key)
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal()
      document.removeEventListener("keydown", handleKeyDown)
    }
  }

  document.addEventListener("keydown", handleKeyDown)
}

// Initialize a carousel and return an instance
function initCarousel(carousel: HTMLElement): CarouselInstance | null {
  // Prevent re-initialization using WeakSet
  if (initializedCarousels.has(carousel) || carousel.getAttribute("data-needs-init") !== "true") {
    return null
  }

  // Mark as initialized
  initializedCarousels.add(carousel)
  carousel.removeAttribute("data-needs-init")

  const slidesContainer = carousel.querySelector<HTMLElement>(".quartz-carousel-slides")
  if (!slidesContainer) {
    return null
  }

  const slides = slidesContainer.querySelectorAll<HTMLElement>(".quartz-carousel-slide")
  const dotsContainer = carousel.querySelector<HTMLElement>(".quartz-carousel-dots")
  const prevButton = carousel.querySelector<HTMLButtonElement>(".quartz-carousel-prev")
  const nextButton = carousel.querySelector<HTMLButtonElement>(".quartz-carousel-next")

  let currentIndex = 0

  // Early return for single slide
  if (slides.length <= 1) {
    hideNavigationElements()
    setupImageClickHandlers()
    return createCarouselInstance()
  }

  setupDots()
  setupNavigation()
  setupKeyboardNavigation()
  setupTouchNavigation()
  setupImageClickHandlers()

  // Initialize first slide
  goToSlide(0)

  function hideNavigationElements(): void {
    prevButton?.style.setProperty("display", "none")
    nextButton?.style.setProperty("display", "none")
    dotsContainer?.style.setProperty("display", "none")
  }

  function setupImageClickHandlers(): void {
    slides.forEach((slide) => {
      const img = slide.querySelector("img")
      if (img) {
        img.style.cursor = "pointer"
        img.addEventListener(
          "click",
          (e) => {
            e.stopPropagation()
            showImageModal(img)
          },
          { passive: true },
        )
      }
    })
  }

  function setupDots(): void {
    if (!dotsContainer) return

    // Use DocumentFragment for better performance
    const fragment = document.createDocumentFragment()

    slides.forEach((_, index) => {
      const dot = document.createElement("span")
      dot.className = index === 0 ? "dot active" : "dot"
      dot.addEventListener("click", () => goToSlide(index), { passive: true })
      fragment.appendChild(dot)
    })

    dotsContainer.innerHTML = ""
    dotsContainer.appendChild(fragment)
  }

  function setupNavigation(): void {
    const handlePrevClick = (e: Event): void => {
      e.preventDefault()
      goToSlide(currentIndex - 1)
    }

    const handleNextClick = (e: Event): void => {
      e.preventDefault()
      goToSlide(currentIndex + 1)
    }

    prevButton?.addEventListener("click", handlePrevClick, { passive: false })
    nextButton?.addEventListener("click", handleNextClick, { passive: false })
  }

  // Setup keyboard navigation (Arrow keys)
  function setupKeyboardNavigation(): void {
    carousel.setAttribute("tabindex", "0")
    carousel.addEventListener(
      "keydown",
      (e: KeyboardEvent) => {
        switch (e.key) {
          case "ArrowLeft":
            e.preventDefault()
            goToSlide(currentIndex - 1)
            break
          case "ArrowRight":
            e.preventDefault()
            goToSlide(currentIndex + 1)
            break
        }
      },
      { passive: false },
    )
  }

  // Setup touch navigation (swipe gestures)
  function setupTouchNavigation(): void {
    let touchStartX = 0
    let touchEndX = 0

    carousel.addEventListener(
      "touchstart",
      (e: TouchEvent) => {
        touchStartX = e.changedTouches[0].screenX
      },
      { passive: true },
    )

    carousel.addEventListener(
      "touchend",
      (e: TouchEvent) => {
        touchEndX = e.changedTouches[0].screenX
        handleSwipe()
      },
      { passive: true },
    )

    function handleSwipe(): void {
      const minSwipeDistance = 50
      const swipeDistance = touchEndX - touchStartX

      if (Math.abs(swipeDistance) < minSwipeDistance) return

      if (swipeDistance < 0) {
        goToSlide(currentIndex + 1) // Swipe left -> next
      } else {
        goToSlide(currentIndex - 1) // Swipe right -> prev
      }
    }
  }

  // Function to go to a specific slide
  function goToSlide(index: number): void {
    // Handle wrapping
    currentIndex = ((index % slides.length) + slides.length) % slides.length

    // Use transform for better performance
    if (slidesContainer) {
      slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`
    }

    // Update dots efficiently
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll<HTMLElement>(".dot")
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex)
      })
    }
  }

  // Create and return the carousel instance that references the carousel element
  function createCarouselInstance(): CarouselInstance {
    return {
      currentIndex,
      goToSlide,
      destroy: () => {
        initializedCarousels.delete(carousel)
        carousel.setAttribute("data-needs-init", "true")
      },
    }
  }

  return createCarouselInstance()
}