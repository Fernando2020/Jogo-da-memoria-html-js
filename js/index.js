var sorteio = [];
var img = [];
var imgSucesso = [];
var acertos = 0;
var erros = 0;
var html = "";
var extensaoImagem = ".jpg";
var virarImagens = false;
function atualizar(){
	reiniciar();
    html = "";
	sorteio = [];
	while(sorteio.length < 24){
		var aleatorio = Math.floor(Math.random() * 24); 
		if(sorteio.indexOf(aleatorio + 1) == -1){
			sorteio.push(aleatorio + 1);
		}
    }
    html += "<table>";
    html += "<tr>";
    for(var i=0; i<sorteio.length; i++){
		html += "<td><img src='../img/frente" + extensaoImagem + "' id='" + sorteio[i] + "' onclick='recebeImagem(this)'></td>";
        html += ((i+1)%6==0) ? "</tr><tr>" : "";
    }
	html += "</table>";
	document.getElementById('tabelaComponente').innerHTML = html;
}

function recebeImagem(imagem){
	if(img.length>0 && (img[0] === imagem || img[1] === imagem)){
		resposta("SELECIONE UMA IMAGEM DIFERENTE!");virarImagensAuxiliar();return;
	}

	if(virarImagens)virarImagensAuxiliar();

	if(imagemEncontrada(imagem))return;

	img.push(imagem);
	virar(imagem);
	if(img.length==2){
		compare();
	}
}

function compare(){
	if(parseInt(img[0].id)%2==0){
		if(parseInt(img[0].id) === (parseInt(img[1].id)+1))
			resposta("sim");
		else 
			resposta("nao");
	}
	else{
		if(parseInt(img[0].id) === (parseInt(img[1].id)-1))
			resposta("sim");
		else 
			resposta("nao");
	}
}

function resposta(resposta){
	var msg = "";
	if(resposta == "sim"){
		acertos += 1;
		msg = "PARABÉNS VOCÊ ACERTOU!";
		imgSucesso.push(img[0]);
		imgSucesso.push(img[1]);
		limparArray();
	}else if(resposta == "nao"){
		erros += 1;
		msg = "INFELIZMENTE VOCÊ ERROU!";
		virarImagens = true;
	}else{
		msg = resposta;
	}
	document.getElementById("pontos").innerHTML=msg;
	document.getElementById("resposta").innerHTML="Acertos: " + acertos + " / Erros: " + erros;
}

function reiniciar(){
	acertos = 0;
	erros = 0;
	resposta("INÍCIO DO JOGO");
	imgSucesso = [];
	limparArray();
}

function virarSelecinadas(){
	for(var i=0; i<img.length; i++){
		img[i].src = img[i].src.replace(img[i].id + extensaoImagem ,"frente" + extensaoImagem);
	}
}

function virar(imagem){
	if(imagem.src.indexOf("frente" + extensaoImagem)>-1)
		imagem.src = imagem.src.replace("frente" + extensaoImagem, imagem.id + extensaoImagem);
	else
		imagem.src = imagem.src.replace(imagem.id + extensaoImagem, "frente" + extensaoImagem);
}

function limparArray(){
	img = [];
}

function virarImagensAuxiliar(){
	virarSelecinadas();
	limparArray();
	virarImagens = false;
}

function imagemEncontrada(imagem){
	return (imgSucesso.length>0 && imgSucesso.indexOf(imagem)>-1) ? true:false;
}