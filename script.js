// Particles Animation
const canvas = document.getElementById("particles-canvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const particles = []
const particleCount = 80

class Particle {
  constructor() {
    this.reset()
  }

  reset() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 3 + 1
    this.speedX = Math.random() * 0.5 - 0.25
    this.speedY = Math.random() * 0.5 - 0.25
    this.opacity = Math.random() * 0.5 + 0.2
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
  }

  draw() {
    ctx.fillStyle = `rgba(138, 156, 255, ${this.opacity})`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()

    // Glow effect
    ctx.shadowBlur = 15
    ctx.shadowColor = "rgba(138, 156, 255, 0.5)"
  }
}

// Initialize particles
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle())
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  particles.forEach((particle) => {
    particle.update()
    particle.draw()
  })

  requestAnimationFrame(animate)
}

animate()

// Resize canvas
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      })
    }
  })
})

// Add parallax effect to hero
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroContent = document.querySelector(".hero-content")
  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`
    heroContent.style.opacity = 1 - scrolled / 600
  }
})
