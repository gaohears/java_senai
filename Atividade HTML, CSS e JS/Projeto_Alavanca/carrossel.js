let posicao = 0;
const faixa = document.querySelector(".faixa");
const total = document.querySelectorAll(".slide").length;
function mostrarSlide() {
    faixa.style.transform = `translateX(-${posicao * 100}%)`;
}
function slideSeguinte() {
    posicao++
    if (posicao >= total) {
        posicao = 0;
    }
    mostrarSlide()
}
function slideAnterior() {
    posicao--
    if (posicao < 0) {
        posicao = total - 1;
    }
    mostrarSlide()
}