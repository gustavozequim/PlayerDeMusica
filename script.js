const nomeMusica = document.getElementById("nome-musica");
const musica = document.getElementById("musica");
const play = document.getElementById("botao-play");


nomeMusica.innerText = 'Doce Luar';
musica.play();
musica.pause()

function tocarMusica() {
    play.querySelector('.bi').classList.remove('bi bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi bi-pause-circle-fill');
}

play.addEventListener('click', tocarMusica);
