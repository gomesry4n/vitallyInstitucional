const telas = document.querySelectorAll(".tela");
const passos = document.querySelectorAll(".passo");
const abas = document.querySelectorAll(".aba");
const listas = document.querySelectorAll(".passos");
const btnSolicitar = document.querySelector("#btnSolicitar");

// mostra uma tela do celular e marca o passo correspondente
function mostrarTela(id) {
  telas.forEach((t) => t.classList.toggle("ativa", t.id === id));
  passos.forEach((p) => p.classList.toggle("ativo", p.dataset.tela === id));
}

passos.forEach((p) => {
  p.addEventListener("click", () => mostrarTela(p.dataset.tela));
});

// troca entre paciente e secretário(a)
abas.forEach((aba) => {
  aba.addEventListener("click", () => {
    abas.forEach((a) => a.classList.toggle("ativa", a === aba));
    listas.forEach((l) =>
      l.classList.toggle("oculto", l.dataset.perfil !== aba.dataset.perfil)
    );
    const primeiro = document.querySelector(
      `.passos[data-perfil="${aba.dataset.perfil}"] .passo`
    );
    mostrarTela(primeiro.dataset.tela);
  });
});

// botões que levam para outra tela
document.querySelectorAll("[data-ir]").forEach((b) => {
  b.addEventListener("click", () => mostrarTela(b.dataset.ir));
});

// seleção de especialidade, dia e horário
function selecionado(id) {
  const chip = document.querySelector(`#${id} .chip.sel`);
  return chip ? chip.textContent : "";
}

document.querySelectorAll(".chips").forEach((grupo) => {
  grupo.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    grupo.querySelectorAll(".chip").forEach((c) => {
      c.classList.toggle("sel", c === chip);
    });
    // só libera o botão depois de escolher um horário
    btnSolicitar.disabled = selecionado("g-horario") === "";
  });
});

// preenche o resumo e a lista com a consulta escolhida
btnSolicitar.addEventListener("click", () => {
  const esp = selecionado("g-especialidade");
  const dia = selecionado("g-dia");
  const hora = selecionado("g-horario");

  document.querySelector("#res-esp").textContent = esp;
  document.querySelector("#res-dia").textContent = dia;
  document.querySelector("#res-hora").textContent = hora;
  document.querySelector("#nova-titulo").textContent = esp;
  document.querySelector("#nova-info").textContent = `${dia} · ${hora}`;
});

// cancelar (paciente) e confirmar (secretário/a)
document.addEventListener("click", (e) => {
  const cancelar = e.target.closest(".cancelar");
  const confirmar = e.target.closest(".confirmar");
  const botao = cancelar || confirmar;
  if (!botao) return;

  const status = botao.parentElement.querySelector(".status");
  if (cancelar) {
    status.textContent = "Cancelada";
    status.className = "status cancel";
  } else {
    status.textContent = "Confirmada";
    status.className = "status ok";
  }
  botao.remove();
});
