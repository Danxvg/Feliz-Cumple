/* =========================
   🌌 ESTRELLAS (AUTO)
========================= */
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.zIndex = "-1";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let estrellas = [];

for (let i = 0; i < 100; i++) {
  estrellas.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    speed: Math.random() * 0.5
  });
}

function animarEstrellas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  estrellas.forEach(e => {
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(34, 197, 94, 0.8)";
    ctx.fill();

    e.y += e.speed;

    if (e.y > canvas.height) {
      e.y = 0;
      e.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(animarEstrellas);
}

animarEstrellas();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


/* =========================
   ✍️ TYPEWRITER
========================= */
const titulo = document.querySelector("#inicio h1");
const subtitulo = document.querySelector("#inicio p");

if (titulo && subtitulo) {
  const textoTitulo = titulo.textContent;
  const textoSub = subtitulo.textContent;

  titulo.textContent = "";
  subtitulo.textContent = "";

  let i = 0;
  let j = 0;

  function escribirTitulo() {
    if (i < textoTitulo.length) {
      titulo.textContent += textoTitulo.charAt(i);
      i++;
      setTimeout(escribirTitulo, 60);
    } else {
      escribirSub();
    }
  }

  function escribirSub() {
    if (j < textoSub.length) {
      subtitulo.textContent += textoSub.charAt(j);
      j++;
      setTimeout(escribirSub, 35);
    }
  }

  window.addEventListener("load", escribirTitulo);
}


/* =========================
   🎬 SECCIONES OCULTAS
========================= */
const btn = document.getElementById("btnAbrir");
const secciones = document.querySelectorAll(".seccion:not(#inicio)");

secciones.forEach(sec => {
  sec.style.display = "none";
});


/* =========================
   🎯 BOTÓN → IR A "MENSAJE"
========================= */
if (btn) {
  btn.addEventListener("click", () => {

    /* mostrar secciones */
    secciones.forEach((sec, i) => {
      setTimeout(() => {

        sec.style.display = "flex";
        sec.style.opacity = "0";
        sec.style.transform = "translateY(40px)";
        sec.style.transition = "all 0.8s ease";

        setTimeout(() => {
          sec.style.opacity = "1";
          sec.style.transform = "translateY(0)";
        }, 50);

      }, i * 300);
    });

    /* esperar a que aparezca y luego bajar */
    setTimeout(() => {
      const mensaje = document.getElementById("mensaje");
      if (mensaje) {
        mensaje.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }, 400);

    /* 🎧 música */
    const audio = document.querySelector("audio");
    if (audio) {
      audio.play().catch(() => {});
    }

  });
}


/* =========================
   ✨ SCROLL ANIMACIONES
========================= */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.2 });

secciones.forEach(sec => observer.observe(sec));


/* =========================
   💫 PARALLAX SUAVE
========================= */
window.addEventListener("scroll", () => {
  document.body.style.backgroundPositionY = window.scrollY * 0.2 + "px";
});