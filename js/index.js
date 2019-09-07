var sorteio = [];
var img = [];
var acertos = 0;
var erros = 0;
var html = "";
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
        html += "<td><img src='../img/" + sorteio[i] + ".jpg' id='img_" + sorteio[i] + "' onclick='recebeImagem(this)'></td>";
        html += ((i+1)%6==0) ? "</tr><tr>" : "";
    }
	html += "</table>";
	document.getElementById('tabelaComponente').innerHTML = html;
}

function recebeImagem(id){
	if(img.length>0 && img[0] === id){
		resposta("SELECIONE UMA IMAGEM DIFERENTE!");return;
	}
	img.push(id);
	if(img.length==2)
		compare();}

function compare(){
	if(parseInt(img[0].id.replace("img_", ""))%2==0){
		if(parseInt(img[0].id.replace("img_", "")) === (parseInt(img[1].id.replace("img_",""))+1))
			resposta("sim");
		else 
			resposta("nao");
	}
	else{
		if(parseInt(img[0].id.replace("img_", "")) === (parseInt(img[1].id.replace("img_",""))-1))
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
	}else if(resposta == "nao"){
		erros += 1;
		msg = "INFELIZMENTE VOCÊ ERROU!";
	}else{
		msg = resposta;
	}
	document.getElementById("pontos").innerHTML=msg;
	document.getElementById("resposta").innerHTML="Acertos: " + acertos + " / Erros: " + erros;
	img = [];
}

function reiniciar(){
	acertos = 0;
	erros = 0;
	resposta("INÍCIO DO JOGO");
}