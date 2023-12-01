let velocidade_movimento = 3, gravidade = 0.5;
let pássaro = document.querySelector('.pássaro');
let img = document.getElementById('pássaro-1');
let som_ponto = new Audio('sound effects/point.mp3');
let som_fim = new Audio('sound effects/die.mp3');

let pássaro_propriedades = pássaro.getBoundingClientRect();

let fundo = document.querySelector('.fundo').getBoundingClientRect();

let valor_pontuação = document.querySelector('.valor_pontuação');
let mensagem = document.querySelector('.mensagem');
let titulo_pontuação = document.querySelector('.titulo_pontuação');

let estado_jogo = 'Início';
img.style.display = 'none';
mensagem.classList.add('estilo_mensagem');

document.addEventListener('keydown', (e) => {
    
    if(e.key == 'Enter' && estado_jogo != 'Jogar'){
        document.querySelectorAll('.tubo_sprite').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        pássaro.style.top = '40vh';
        estado_jogo = 'Jogar';
        mensagem.innerHTML = '';
        titulo_pontuação.innerHTML = 'PLACAR : ';
        valor_pontuação.innerHTML = '0';
        mensagem.classList.remove('estilo_mensagem');
        jogar();
    }
});

function jogar(){
    function mover(){
        if(estado_jogo != 'Jogar') return;

        let tubo_sprite = document.querySelectorAll('.tubo_sprite');
        tubo_sprite.forEach((element) => {
            let tubo_sprite_propriedades = element.getBoundingClientRect();
            pássaro_propriedades = pássaro.getBoundingClientRect();

            if(tubo_sprite_propriedades.right <= 0){
                element.remove();
            }else{
                if(pássaro_propriedades.left < tubo_sprite_propriedades.left + tubo_sprite_propriedades.width && pássaro_propriedades.left + pássaro_propriedades.width > tubo_sprite_propriedades.left && pássaro_propriedades.top < tubo_sprite_propriedades.top + tubo_sprite_propriedades.height && pássaro_propriedades.top + pássaro_propriedades.height > tubo_sprite_propriedades.top){
                    estado_jogo = 'Fim';
                    mensagem.innerHTML = 'FIM DE JOGO'.fontcolor('red') + '<br>PRESSIONE ENTER';
                    mensagem.classList.add('estilo_mensagem');
                    img.style.display = 'none';
                    som_fim.play();
                    return;
                }else{
                    if(tubo_sprite_propriedades.right < pássaro_propriedades.left && tubo_sprite_propriedades.right + velocidade_movimento >= pássaro_propriedades.left && element.increase_score == '1'){
                        valor_pontuação.innerHTML =+ valor_pontuação.innerHTML + 1;
                        som_ponto.play();
                    }
                    element.style.left = tubo_sprite_propriedades.left - velocidade_movimento + 'px';
                }
            }
        });
        requestAnimationFrame(mover);
    }
    requestAnimationFrame(mover);

    let pássaro_dy = 0;
    function aplicar_gravidade(){
        if(estado_jogo != 'Jogar') return;
        pássaro_dy = pássaro_dy + gravidade;
        document.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'img/Bird-2.png';
                pássaro_dy = -7.6;
            }
        });

        document.addEventListener('keyup', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'img/Bird.png';
            }
        });

        if(pássaro_propriedades.top <= 0 || pássaro_propriedades.bottom >= fundo.bottom){
            estado_jogo = 'Fim';
            mensagem.style.left = '28vw';
            window.location.reload();
            mensagem.classList.remove('estilo_mensagem');
            return;
        }
        pássaro.style.top = pássaro_propriedades.top + pássaro_dy + 'px';
        pássaro_propriedades = pássaro.getBoundingClientRect();
        requestAnimationFrame(aplicar_gravidade);
    }
    requestAnimationFrame(aplicar_gravidade);

    let separação_tubo = 0;

    let espaço_tubo = 35;

    function criar_tubo(){
        if(estado_jogo != 'Jogar') return;

        if(separação_tubo > 115){
            separação_tubo = 0;

            let posição_tubo = Math.floor(Math.random() * 43) + 8;
            let tubo_sprite_inv = document.createElement('div');
            tubo_sprite_inv.className = 'tubo_sprite';
            tubo_sprite_inv.style.top = posição_tubo - 70 + 'vh';
            tubo_sprite_inv.style.left = '100vw';

            document.body.appendChild(tubo_sprite_inv);
            let tubo_sprite = document.createElement('div');
            tubo_sprite.className = 'tubo_sprite';
            tubo_sprite.style.top = posição_tubo + espaço_tubo + 'vh';
            tubo_sprite.style.left = '100vw';
            tubo_sprite.increase_score = '1';

            document.body.appendChild(tubo_sprite);
        }
        separação_tubo++;
        requestAnimationFrame(criar_tubo);
    }
    requestAnimationFrame(criar_tubo);
}