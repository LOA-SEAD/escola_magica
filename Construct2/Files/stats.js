function sendData(correta,pergunta,nroPergunta,respostas,escolhida,acertou,tamanho){
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
        info.levelId = nroPergunta;
        info.choices = respostas;
        info.choice = escolhida;
        info.win = acertou;
        info.size = tamanho;
        info.gameType = 'multipleChoice';
        $.ajax({
            type: "POST",
            url: path,
            data: info,
            success: function(data) {
            }
        })
	});
	/*console.log(pergunta);
	console.log(correta);
	console.log(nroPergunta);
	console.log(respostas);
	console.log(escolhida);
    console.log(acertou);
    console.log(tamanho);*/
}

function sendPlayData(dano,fase,setor){
	var info = {};
    var path;
    if(window.location.hostname == "localhost" ){   // for localhost tests
        path = "/exported-resource/saveStats" //VAI MUDAR
    }else {                                 // for web version in production, electron and crosswalk versions
        path = "http://remar.dc.ufscar.br/exported-resource/saveStats" //VAI MUDAR
	}
	$.getJSON("remar.json", function(json) {
        info.exportedResourceId = json.exportedResourceId;
        info.damage = dano;
        info.level = fase;
        info.sector = setor;
        info.gameType = 'gameStatsEscolaMagica';
        $.ajax({
            type: "POST",
            url: path,
            data: info,
            success: function(data) {
            }
        })
    });
	/*console.log(dano);
	console.log(fase);
	console.log(setor);*/
}

function sendTimeData(tempo){
	var info = {};
    var path;
    if(window.location.hostname == "localhost" ){   // for localhost tests
        path = "/exported-resource/saveStats"
    }else {                                 // for web version in production, electron and crosswalk versions
        path = "http://remar.dc.ufscar.br/exported-resource/saveStats"
    }
    $.getJSON("remar.json", function(json) {
        info.exportedResourceId = json.exportedResourceId;
        info.time = tempo;
        info.gameType = 'tempo';
        $.ajax({
            type: "POST",
            url: path,
            data: info,
            success: function(data) {
            }
        })
    });
    /*console.log(tempo);*/
}

function sendRankingData(pontos){
    var info = {};
    var path;
    if(window.location.hostname == "localhost" ){   // for localhost tests
        path = "/exported-resource/saveStats"
    }else {                                 // for web version in production, electron and crosswalk versions
        path = "http://remar.dc.ufscar.br/exported-resource/saveStats"
    }
    $.getJSON("remar.json", function(json) {
        info.exportedResourceId = json.exportedResourceId;
        info.score = pontos;
        info.gameType = 'ranking';
        $.ajax({
            type: "POST",
            url: path,
            data: info,
            success: function(data) {
            }
        })
    });
    /*console.log(pontos);*/
}