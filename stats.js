function sendData(correta,pergunta,fase,respostas,escolhida,acertou){
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
        info.levelId = fase;
        info.choices = respostas;
        info.choice = escolhida;
        //info.size = size;
        info.win = acertou;
        info.gameType = 'multipleChoice';
        $.ajax({
            type: "POST",
            url: path,
            data: info,
            success: function(data) {
            }
        })
});
/*	console.log(pergunta);
	console.log(correta);
	console.log(fase);
	console.log(respostas);
	console.log(escolhida);
	console.log(acertou);*/
}
