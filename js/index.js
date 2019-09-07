var sorteio = [];
	var html = "";
	function refresh(){
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
            html += "<td><img src=../img/" + sorteio[i] + ".jpg></td>";
            html += ((i+1)%6==0) ? "</tr><tr>" : "";
        }
		html += "</table>";
		document.getElementById('tabelaComponente').innerHTML = html;
	}