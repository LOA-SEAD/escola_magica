function sendData(correta,pergunta,nroPergunta,respostas,escolhida,acertou,tamanho,nroFase,nivel){
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
        info.correctAnswer = pergunta;
        info.challengeId = nroPergunta;
        info.choices = respostas;
        info.answer = escolhida;
        info.win = acertou;
        info.size = tamanho;
        info.levelId = nroFase;
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
	console.log("sendData");
	console.log("Pergunta " + nroPerguntas + ": " + pergunta);
	console.log("Resposta correta: " + correta);
	console.log("Alternativas: " + respostas);
	console.log("Resposta submetida: " + escolhida);
    console.log("Acertou? "	+ acertou);
    console.log("Tamanho: " + tamanho);
    console.log("Fase " + nroFase + " - " + nivel);
}

function sendPlayData(dano,fase,setor){
	var info = {};
    var path;
    if(window.location.hostname == "localhost" ){   // for localhost tests
        path = "/exported-resource/saveDamageStats"
    }else {                                 // for web version in production, electron and crosswalk versions
        path = "http://remar.dc.ufscar.br/exported-resource/saveDamageStats"
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
	console.log("sendPlayData");
	console.log("Número de danos: " + dano);
	console.log("Fase " + fase + " - " + setor);
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
    console.log("sendRankingData");
    console.log("Pontuação: " + pontos);
}

function sendPlaytimeData(tempo,tipo,idJogo,idNivel,nomeNivel,idDesafio){
    var info = {};
    var path;
    if(window.location.hostname == "localhost" ){   // for localhost tests
        path = "/exported-resource/saveTimeStats"
    }else {                                 // for web version in production, electron and crosswalk versions
        path = "http://remar.dc.ufscar.br/exported-resource/saveTimeStats"
    }
    $.getJSON("remar.json", function(json) {
        info.exportedResourceId = json.exportedResourceId;
        info.time = tempo;
        info.type = tipo;
        info.gameId = idJogo;
        if (idNivel != null){
            info.levelId = idNivel;
            info.levelName = nomeNivel;
        }
        if (idDesafio != null){
            info.challengeId = idDesafio;
        }
        info.gameType = 'ConclusionTime';
        $.ajax({
            type: "POST",
            url: path,
            data: info,
            success: function(data) {
            }
        })
    });
    console.log("sendPlaytimeData");
    console.log("Tempo: " + tempo + "s");
    console.log("Tipo: " + tipo);
    console.log("Nome do jogo: " + idJogo);
    if (idNivel != null){
        console.log("Fase " + idNivel + " - " + nomeNivel);
    }
    if (idDesafio != null){
        console.log("Desafio: " + idDesafio);
    }
}