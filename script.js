
document.addEventListener("DOMContentLoaded", function () {

  // Botão para alternar entre modo claro e escuro
  const botaoTema = document.getElementById("tema");

  botaoTema.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      botaoTema.textContent = "☀";
    } else {
      botaoTema.textContent = "☾";
    }
  });

  // Animação suave ao aparecerem as seções
  const elementos = document.querySelectorAll("section, .card");

  const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        observador.unobserve(entrada.target);
      }
    });
  }, {
    threshold: 0.1
  });

  elementos.forEach(function (elemento) {
    elemento.classList.add("animar");
    observador.observe(elemento);
  });

});

/* GALERIA INTERATIVA - THALLYS */

document.addEventListener("DOMContentLoaded", function () {
  const fotos = document.querySelectorAll(".paixao-fotos img");

  const lightbox = document.getElementById("lightbox");
  const imagem = document.getElementById("fotoAmpliada");
  const legenda = document.getElementById("legendaFoto");
  const contador = document.getElementById("contadorFotos");

  const fechar = document.getElementById("fecharLightbox");
  const anterior = document.getElementById("fotoAnterior");
  const proxima = document.getElementById("proximaFoto");

  if (!lightbox || !imagem || !fotos.length ||
      !fechar || !anterior || !proxima) return;

  let atual = 0;

  function mostrarFoto(indice) {
    atual = (indice + fotos.length) % fotos.length;
    imagem.src = fotos[atual].src;
    imagem.alt = fotos[atual].alt || "Foto ampliada";

    if (legenda) legenda.textContent = imagem.alt;
    if (contador) {
      contador.textContent = `${atual + 1} de ${fotos.length}`;
    }
  }

  function abrir(indice) {
    mostrarFoto(indice);
    lightbox.classList.add("ativo");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    fechar.focus();
  }

  function fecharFoto() {
    lightbox.classList.remove("ativo");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  fotos.forEach((foto, indice) => {
    foto.style.cursor = "zoom-in";
    foto.tabIndex = 0;

    foto.addEventListener("click", () => abrir(indice));

    foto.addEventListener("keydown", (e) => {
      if (e.key === "Enter") abrir(indice);
    });
  });

  fechar.addEventListener("click", fecharFoto);
  anterior.addEventListener("click", () => mostrarFoto(atual - 1));
  proxima.addEventListener("click", () => mostrarFoto(atual + 1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) fecharFoto();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("ativo")) return;

    if (e.key === "Escape") fecharFoto();
    if (e.key === "ArrowRight") mostrarFoto(atual + 1);
    if (e.key === "ArrowLeft") mostrarFoto(atual - 1);
  });
});
