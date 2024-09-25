const nomeMusica = document.getElementById('nome-musica');
const musica = document.getElementById('musica');
const play = document.getElementById('botao-play');


nomeMusica.innerText = 'Não dá pra continuar';
musica.pause();

function tocarMusica() {
    play.querySelector('.bi').classList.remove('bi bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi bi-pause-circle-fill');
    musica.play();
}

play.addEventListener('click', tocarMusica);
