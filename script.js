const nomeMusica = document.getElementById("nome-musica");
const nomeBanda = document.getElementById("nome-banda");
const capaAlbum = document.getElementById("capa-album");
const musica = document.getElementById("musica");
const avancar = document.getElementById("botao-avancar");
const voltar = document.getElementById("botao-voltar");
const botaoPlay = document.getElementById("botao-play");
const botaoLike = document.getElementById("botao-like");
const progresso = document.getElementById("progresso-atual");
const progressoContainer = document.getElementById("progresso-container");
const botaoEmbaralhar = document.getElementById("botao-embaralhar");
const botaoRepetir = document.getElementById("botao-repetir");
const tempoTotal = document.getElementById("tempo-total");
const tempoAtual = document.getElementById("tempo-atual");


const doceLuar = {
    nomeMusica: 'Doce Luar',
    nomeBanda: 'Idolos de Vidro',
    capa: 'capa',
    musica: 'doce_luar',
    liked: false
};
const naoDaPraContinuar = {
    nomeMusica: 'Não Dá Pra Continuar',
    nomeBanda: 'Idolos de Vidro',
    capa: 'capa',
    musica: 'nao_da_pra_continuar',
    liked: false
};
const osCorvosEOEspantalho = {
    nomeMusica: 'Os Corvos E O Espantalho',
    nomeBanda: 'Idolos de Vidro',
    capa: 'capa',
    musica: 'os_corvos',
    liked: false
};
let tocando = false;
let embaralhado = false;
let repetindo = false;
const originalAlbum = [doceLuar, naoDaPraContinuar, osCorvosEOEspantalho];
let albumEmbaralhado = [...originalAlbum];
let index = 0;



function tocarMusica(){
    musica.play();
    botaoPlay.querySelector('.bi').classList.add('bi-pause-circle-fill');
    botaoPlay.querySelector('.bi').classList.remove('bi-play-circle-fill');
    tocando = true;
}

function pausarMusica(){
    musica.pause();
    botaoPlay.querySelector('.bi').classList.add('bi-play-circle-fill');
    botaoPlay.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    tocando = false;
}

function estaTocando(){
    if(tocando === true){
        pausarMusica();
    }
    else{
        tocarMusica();
    }
}

function curtirMusica(){
    if(albumEmbaralhado[index].liked === true){
        botaoLike.querySelector('.bi').classList.remove('bi-heart');
        botaoLike.querySelector('.bi').classList.add('bi-heart-fill');
        botaoLike.classList.add("botao-ativado");
    }
    else{
        botaoLike.querySelector('.bi').classList.remove('bi-heart-fill');
        botaoLike.querySelector('.bi').classList.add('bi-heart');
        botaoLike.classList.remove("botao-ativado");
    }
}

function iniciarMusica(){
    capaAlbum.src = `images/${albumEmbaralhado[index].capa}.png`;
    musica.src = `musicas/${albumEmbaralhado[index].musica}.MP3`;
    nomeMusica.innerText = albumEmbaralhado[index].nomeMusica;
    nomeBanda.innerText = albumEmbaralhado[index].nomeBanda;
    curtirMusica();
}

function voltarMusica(){
    if(index === 0){
        index = albumEmbaralhado.length - 1;
    }
    else{
        index -= 1;
    }
    iniciarMusica();
    tocarMusica();
}

function avancarMusica(){
    if(index === albumEmbaralhado.length - 1){
        index = 0;
    }
    else{
        index += 1;
    }
    iniciarMusica();
    tocarMusica();
}

function atualizaProgresso(){
    musica.currentTime
    musica.duration
    const larguraBarra = (musica.currentTime/musica.duration) * 100;
    progresso.style.setProperty("--progresso", `${larguraBarra}%`);
    tempoAtual.innerText = toHHMMSS(musica.currentTime);
}
function toHHMMSS(numeroOriginal){
    let hora = Math.floor(numeroOriginal / 3600);
    let minuto = Math.floor((numeroOriginal - hora * 3600) / 60);
    let segundo = Math.floor((numeroOriginal - hora * 3600 - minuto * 60));
    return `${minuto.toString().padStart(2, '0')}:${segundo.toString().padStart(2, '0')}`;
}

function atualizaTempoTotal(){
    tempoTotal.innerText = toHHMMSS(musica.duration);
}


function pulePara(event){
    const largura = progressoContainer.clientWidth;
    const posicaoClick = event.offsetX;
    const puleNoTempo = (posicaoClick/largura) * musica.duration;
    musica.currentTime = puleNoTempo;
}

function embaralharPlaylist(listaAntesDeEmbaralhar){
    const tamanho = listaAntesDeEmbaralhar.length;
    let indexAtual = tamanho - 1;
    while(indexAtual > 0){
        let indexEmbaralhado = Math.floor(Math.random() * tamanho);
        let aux = listaAntesDeEmbaralhar[indexAtual];
        listaAntesDeEmbaralhar[indexAtual] = listaAntesDeEmbaralhar[indexEmbaralhado];
        listaAntesDeEmbaralhar[indexEmbaralhado] = aux;
        indexAtual -= 1;
    }
}

function botaoEmbaralharPlaylist(){
    if(embaralhado === false){
        embaralhado = true;
        embaralharPlaylist(albumEmbaralhado);
        botaoEmbaralhar.classList.add("botao-ativado");
    }
    else{
        embaralhado = false;
        albumEmbaralhado = [...originalAlbum];
        botaoEmbaralhar.classList.remove("botao-ativado");
    }
}

function botaoRepetirPlaylist(){
    if(repetindo === false){
        repetindo = true;
        botaoRepetir.classList.add("botao-ativado");
    }
    else{
        repetindo = false;
        botaoRepetir.classList.remove("botao-ativado");
    }
}

function proximaOuRepete(){
    if(repetindo === false){
        avancarMusica();
    }
    else{
        tocarMusica();
    }
}

function botaoCurtirMarcado(){
    if(albumEmbaralhado[index].liked === false){
        albumEmbaralhado[index].liked = true;
    }
    else{
        albumEmbaralhado[index].liked = false;
    }
    curtirMusica();
}

iniciarMusica();

botaoPlay.addEventListener('click', estaTocando);
avancar.addEventListener('click', avancarMusica);
voltar.addEventListener('click', voltarMusica);
musica.addEventListener('timeupdate', atualizaProgresso);
musica.addEventListener('ended', proximaOuRepete);
musica.addEventListener('loadedmetadata', atualizaTempoTotal);
botaoLike.addEventListener('click', botaoCurtirMarcado);
progressoContainer.addEventListener('click', pulePara);
botaoEmbaralhar.addEventListener('click', botaoEmbaralharPlaylist);
botaoRepetir.addEventListener('click', botaoRepetirPlaylist);
