function sendData(correta,pergunta,nroPergunta,respostas,escolhida,acertou,tamanho,nivel){
	var info = {};
    var path;
    if(window.location.hostname == "localhost" ){   // for localhost tests
        path = "/exported-resource/saveStats"
    }else {                                 // for web version in production, electron and crosswalk versions
        path = "http://remar.dc.ufscar.br/exported-resource/saveStats"
	}
	$.getJSON("remar.json", function(json) {
        info.exportedResourceId = json.exportedResourceId;
        info.question = correta;
        info.answer = pergunta;
        info.challengeId = nroPergunta;
        info.choices = respostas;
        info.choice = escolhida;
        info.win = acertou;
        info.size = tamanho;
        info.levelName = nivel;
        info.gameType = 'multipleChoice';
        $.ajax({
            type: "POST",
            url: path,
            data: info,
            success: function(data) {
            }
        })
	});
	console.log(pergunta);
	console.log(correta);
	console.log(nroPergunta);
	console.log(respostas);
	console.log(escolhida);
    console.log(acertou);
    console.log(tamanho);
    console.log(nivel)
}

function sendPlayData(dano,fase,setor){
	var info = {};
    var path;
    if(window.location.hostname == "localhost" ){   // for localhost tests
        path = "/exported-resource/savePlayStats"
    }else {                                 // for web version in production, electron and crosswalk versions
        path = "http://remar.dc.ufscar.br/exported-resource/savePlayStats"
	}
	$.getJSON("remar.json", function(json) {
        info.exportedResourceId = json.exportedResourceId;
        info.damage = dano;
        info.level = fase;
        info.sector = setor;
        info.gameType = 'EscolaMagica';
        $.ajax({
            type: "POST",
            url: path,
            data: info,
            success: function(data) {
            }
        })
    });
	console.log(dano);
	console.log(fase);
	console.log(setor);
}

function sendRankingData(pontos){
    var info = {};
    var path;
    if(window.location.hostname == "localhost" ){   // for localhost tests
        path = "/exported-resource/saveScore"
    }else {                                 // for web version in production, electron and crosswalk versions
        path = "http://remar.dc.ufscar.br/exported-resource/saveScore"
    }
    $.getJSON("remar.json", function(json) {
        info.exportedResourceId = json.exportedResourceId;
        info.score = pontos;
        $.ajax({
            type: "POST",
            url: path,
            data: info,
            success: function(data) {
            }
        })
    });
    console.log(pontos);
}