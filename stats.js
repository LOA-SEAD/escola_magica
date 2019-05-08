function sendData(correta,pergunta,nroPergunta,respostas,escolhida,acertou,tamanho,nroFase,nivel){
    var info = {};
    var path;
    if(window.location.hostname == "localhost" ){   // for localhost tests
        path = "/stats/saveChallengeStats"
    }else {                                 // for web version in production, electron and crosswalk versions
        path = "http://remar.dc.ufscar.br/stats/saveChallengeStats"
    }
    $.getJSON("remar.json", function(json) {
        info.exportedResourceId = json.exportedResourceId;
        info.question = correta;
        info.correctAnswer = pergunta;
        info.challengeId = nroPergunta;
        info.choices = respostas;
        info.answer = escolhida;
        info.win = acertou;
        info.levelSize = tamanho;
        info.levelId = nroFase;
        info.levelName = nivel;
        info.challengeType = 'multipleChoice';
        $.ajax({
            type: "POST",
            url: path,
            data: info,
            success: function(data) {
            }
        })
    });
}

function sendPlayData(dano,fase,setor){
    var info = {};
    var path;
    if(window.location.hostname == "localhost" ){   // for localhost tests
        path = "/stats/saveDamageStats"
    }else {                                 // for web version in production, electron and crosswalk versions
        path = "http://remar.dc.ufscar.br/stats/saveDamageStats"
    }
    $.getJSON("remar.json", function(json) {
        info.exportedResourceId = json.exportedResourceId;
        info.damage = dano;
        info.level = fase;
        info.sector = setor;

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
        path = "/stats/saveRankingStats"
    }else {                                 // for web version in production, electron and crosswalk versions
        path = "http://remar.dc.ufscar.br/stats/saveRankingStats"
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

function sendPlaytimeData(tempo,tipo,idJogo,idNivel,nomeNivel,idDesafio){
    var info = {};
    var path;
    if(window.location.hostname == "localhost" ){   // for localhost tests
        path = "/stats/saveTimeStats"
    }else {                                 // for web version in production, electron and crosswalk versions
        path = "http://remar.dc.ufscar.br/stats/saveTimeStats"
    }
    $.getJSON("remar.json", function(json) {
        info.exportedResourceId = json.exportedResourceId;
        info.time = tempo;
        info.timeType = tipo;
        info.gameId = idJogo;
        if (idNivel != null){
            info.levelId = idNivel;
        }
        if (nomeNivel != null){
            info.levelName = nomeNivel;
        }
        if (idDesafio != null){
            info.challengeId = idDesafio;
        }

        $.ajax({
            type: "POST",
            url: path,
            data: info,
            success: function(data) {
            }
        })
    });
    console.log(tempo);
    console.log(tipo);
    console.log(idJogo);
    if (idNivel != null){
        console.log(idNivel);
    }
    if (nomeNivel != null){
        console.log(nomeNivel);
    }
    if (idDesafio != null){
        console.log(idDesafio);
    }
}