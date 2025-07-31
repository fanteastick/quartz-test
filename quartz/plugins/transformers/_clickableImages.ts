// From https://github.com/vazome/quartz-clickable-images-zoom-plugin
// 07/03/2025

import { QuartzTransformerPlugin } from "../types"
import { Root } from "hast"
import { visit } from "unist-util-visit"

export const ClickableImages: QuartzTransformerPlugin = () => {

  return {
    name: "ClickableImages",
    htmlPlugins() {
      return [
        () => {
          return (tree: Root, _file) => {
            visit(tree, "element", (node: any, index, parent) => {
              if (node.tagName === "img" && parent && index !== undefined &&
                !(
                  node.properties &&
                  node.properties.className &&
                  node.properties.className.includes("inline-icons")
                )) {
                // Get the current img src which should already be resolved
                const originalSrc = node.properties?.src
                const originalAlt = node.properties?.alt || ""
                
                if (!originalSrc) return

                // Add lightbox classes and data attributes to the img
                node.properties.className = (node.properties.className || []).concat(["lightbox-image"])
                node.properties["data-src"] = originalSrc
                node.properties["data-alt"] = originalAlt
                node.properties.loading = "lazy"

                // Create a wrapper div
                const wrapper = {
                  type: "element",
                  tagName: "div",
                  properties: {
                    className: ["lightbox-wrapper"],
                    "data-lightbox": "true"
                  },
                  children: [node]
                }

                // Replace the img with the wrapper in the parent
                parent.children[index] = wrapper
              }
            })
          }
        },
      ]
    },
    externalResources() {
      return {
        css: [
          {
            inline: true,
            content: `
/* Lightbox Image Styles */
.lightbox-wrapper {
  display: inline-block;
  cursor: pointer;
  transition: transform 0.2s ease;
  margin: 0;
}

.lightbox-wrapper:hover {
  transform: scale(1.02);
}

.lightbox-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;
}

/*.lightbox-image:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}*/

/* Modal/Lightbox Overlay */
.lightbox-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  backdrop-filter: blur(5px);
}

.lightbox-modal.active {
  opacity: 1;
  visibility: visible;
}

.lightbox-modal img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  transform: scale(0.8);
  transition: transform 0.3s ease;
}

.lightbox-modal.active img {
  transform: scale(1);
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  z-index: 1001;
  background: rgba(0, 0, 0, 0.4);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.lightbox-close:hover {
  background: rgba(0, 0, 0, 0.5);
}

/* Prevent body scroll when modal is open */
body.lightbox-open {
  overflow: hidden;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .lightbox-modal img {
    max-width: 95%;
    max-height: 95%;
  }

  .lightbox-close {
    top: 10px;
    right: 15px;
    font-size: 1.5rem;
    width: 35px;
    height: 35px;
  }
}
            `,
          },
        ],
        js: [
          {
            loadTime: "afterDOMReady",
            contentType: "inline",
            script: `
              // Lightbox functionality
              function initLightbox() {
                // Remove existing modal if it exists
                const existingModal = document.querySelector('.lightbox-modal');
                if (existingModal) {
                  existingModal.remove();
                }

                // Create modal elements
                const modal = document.createElement('div');
                modal.className = 'lightbox-modal';
                
                const closeBtn = document.createElement('button');
                closeBtn.className = 'lightbox-close';
                closeBtn.innerHTML = '×';
                closeBtn.setAttribute('aria-label', 'Close lightbox');
                
                const img = document.createElement('img');
                img.style.display = 'none';
                
                modal.appendChild(closeBtn);
                modal.appendChild(img);
                document.body.appendChild(modal);                // Function to open lightbox
                function openLightbox(imageSrc, imageAlt, originalImg) {
                  img.src = imageSrc;
                  img.alt = imageAlt || '';
                  img.style.display = 'block';
                  modal.classList.add('active');
                  document.body.classList.add('lightbox-open');
                  
                  // Preload the image and set appropriate size
                  const preloadImg = new Image();
                  preloadImg.onload = () => {
                    img.src = imageSrc;
                    
                    // Get original image size on page
                    const originalRect = originalImg ? originalImg.getBoundingClientRect() : null;
                    const originalDisplayWidth = originalRect ? originalRect.width : 0;
                    const originalDisplayHeight = originalRect ? originalRect.height : 0;
                    
                    // Smart scaling based on image size
                    const viewportWidth = window.innerWidth;
                    const viewportHeight = window.innerHeight;
                    const imageWidth = preloadImg.naturalWidth;
                    const imageHeight = preloadImg.naturalHeight;
                    
                    // Calculate appropriate display size
                    let targetWidth, targetHeight;
                    
                    // Ensure lightbox image is at least 1.5x the size it appears on page
                    const minDisplayWidth = Math.max(
                      originalDisplayWidth * 1.5,
                      Math.min(500, viewportWidth * 0.7)
                    );
                    const minDisplayHeight = Math.max(
                      originalDisplayHeight * 1.5,
                      Math.min(400, viewportHeight * 0.7)
                    );
                    
                    // Calculate scale to meet minimum size requirements
                    const scaleForWidth = minDisplayWidth / imageWidth;
                    const scaleForHeight = minDisplayHeight / imageHeight;
                    const minScale = Math.max(scaleForWidth, scaleForHeight, 1); // At least 1x (never smaller than original)
                    
                    // Limit maximum scale to prevent pixelation
                    const maxScale = Math.min(3, viewportWidth * 0.9 / imageWidth, viewportHeight * 0.9 / imageHeight);
                    const finalScale = Math.min(minScale, maxScale);
                    
                    targetWidth = Math.min(imageWidth * finalScale, viewportWidth * 0.9);
                    targetHeight = Math.min(imageHeight * finalScale, viewportHeight * 0.9);
                      img.style.width = targetWidth + 'px';
                    img.style.height = 'auto';
                  };
                  preloadImg.src = imageSrc;
                }

                // Function to close lightbox
                function closeLightbox() {
                  modal.classList.remove('active');
                  document.body.classList.remove('lightbox-open');
                  setTimeout(() => {
                    img.style.display = 'none';
                    img.src = '';
                  }, 300);
                }

                // Event listeners
                closeBtn.addEventListener('click', closeLightbox);
                
                modal.addEventListener('click', (e) => {
                  if (e.target === modal) {
                    closeLightbox();
                  }
                });

                // Keyboard support
                document.addEventListener('keydown', (e) => {
                  if (e.key === 'Escape' && modal.classList.contains('active')) {
                    closeLightbox();
                  }
                });                // Add click handlers to all lightbox images
                const lightboxWrappers = document.querySelectorAll('.lightbox-wrapper');
                lightboxWrappers.forEach(wrapper => {
                  wrapper.addEventListener('click', (e) => {
                    e.preventDefault();
                    const img = wrapper.querySelector('.lightbox-image');
                    if (img) {
                      const src = img.getAttribute('data-src') || img.src;
                      const alt = img.getAttribute('data-alt') || img.alt;
                      openLightbox(src, alt, img);
                    }
                  });
                });

                // Clean up function
                if (window.addCleanup) {
                  window.addCleanup(() => {
                    if (modal && modal.parentNode) {
                      modal.parentNode.removeChild(modal);
                    }
                    document.body.classList.remove('lightbox-open');
                  });
                }
              }

              // Initialize on page load and navigation
              document.addEventListener('nav', initLightbox);
              
              // Initialize immediately if DOM is already ready
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initLightbox);
              } else {
                initLightbox();
              }
            `,
          },
        ],
      }
    },
  }
}