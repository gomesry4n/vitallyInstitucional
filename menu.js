const menu = document.querySelector(".menu-lateral");
const fundo = document.querySelector(".fundo-menu");
const icon = document.querySelector(".menu-icon");

function fecharMenu() {
  menu.classList.remove("ativo");
  fundo.classList.remove("ativo");
}

icon.addEventListener("click", () => {
  menu.classList.toggle("ativo");
  fundo.classList.toggle("ativo");
});

fundo.addEventListener("click", fecharMenu);

document.querySelectorAll(".menu-lateral a").forEach((link) => {
  link.addEventListener("click", fecharMenu);
});
