document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const nav = document.querySelector("nav ul")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active")

      // Change icon based on menu state
      const icon = menuToggle.querySelector("i")
      if (nav.classList.contains("active")) {
        icon.classList.remove("fa-bars")
        icon.classList.add("fa-times")

        // Add mobile menu styles dynamically
        if (!document.getElementById("mobile-menu-styles")) {
          const style = document.createElement("style")
          style.id = "mobile-menu-styles"
          style.textContent = `
                        nav ul.active {
                            display: flex;
                            flex-direction: column;
                            position: absolute;
                            top: 80px;
                            left: 0;
                            width: 100%;
                            background-color: rgba(5, 5, 16, 0.95);
                            padding: 20px 0;
                            backdrop-filter: blur(10px);
                            z-index: 1000;
                        }
                        
                        nav ul.active li {
                            margin: 10px 0;
                            text-align: center;
                        }
                    `
          document.head.appendChild(style)
        }
      } else {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      // Close mobile menu if open
      if (nav.classList.contains("active")) {
        nav.classList.remove("active")
        const icon = menuToggle.querySelector("i")
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Header scroll effect
  const header = document.querySelector("header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.padding = "15px 0"
      header.style.backgroundColor = "rgba(5, 5, 16, 0.95)"
    } else {
      header.style.padding = "20px 0"
      header.style.backgroundColor = "rgba(5, 5, 16, 0.9)"
    }
  })

  // Parallax effect for sections
  const sections = document.querySelectorAll(".section")
  window.addEventListener("scroll", () => {
    sections.forEach((section) => {
      const scrollPosition = window.pageYOffset
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight

      if (scrollPosition > sectionTop - window.innerHeight && scrollPosition < sectionTop + sectionHeight) {
        const speed = section.classList.contains("alt-section") ? 0.05 : 0.03
        const yPos = (scrollPosition - sectionTop) * speed
        section.style.backgroundPosition = `center ${yPos}px`
      }
    })
  })

  // Form submission (prevent default)
  const newsletterForm = document.querySelector(".newsletter form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const emailInput = this.querySelector('input[type="email"]')

      if (emailInput.value.trim() === "") {
        alert("Please enter your email address")
        return
      }

      // Simulate form submission
      alert("Thank you for subscribing to our newsletter!")
      emailInput.value = ""
    })
  }

  // Add animation for elements when they come into view
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Add animation classes and observe elements
  document.querySelectorAll(".section-content").forEach((section) => {
    section.classList.add("fade-in")
    observer.observe(section)

    // Add animation styles dynamically
    if (!document.getElementById("animation-styles")) {
      const style = document.createElement("style")
      style.id = "animation-styles"
      style.textContent = `
                .fade-in {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: opacity 0.8s ease, transform 0.8s ease;
                }
                
                .fade-in.animate {
                    opacity: 1;
                    transform: translateY(0);
                }
            `
      document.head.appendChild(style)
    }
  })
})
