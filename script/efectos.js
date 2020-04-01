var ronda = 1;
var puntuacion = 0;
var tiempo = 30;
var estado = [0, 0, 0, 0];
var temporizador;

$(document).ready(function() {
  $(".masCuatro").hide();

  $("#empezar").click(function() {
    $("#titulo").hide();
    $(".masCuatro").show();
    start();
  });

  $("#siguiente").click(function() {
    check();
  });
});

function start() {
  //Cabecera
  console.log(tiempo);
  temporizador = setInterval(function() { //Temporizador
    if (tiempo < 0) { //Fin de la partida
      alert("Fin de la partida. Puntuación: "+puntuacion);
      clearInterval(temporizador);
    }
    var timing = new Date(0);
    timing.setSeconds(tiempo);
    timing = timing.toISOString().substr(14, 5)
    $("#temporizador").empty();
    if (tiempo <= 5) {
      timing = "<a class='text-danger'>" + timing + "</a>";
    }
    $("#temporizador").append(timing);
    tiempo--;
  }, 1000);
  actualizaRonda();
  actualizaPuntuacion();

  //Inicializacion de los numeros
  actualizaEntrada();
  limpiaInput();

}

function actualizaEntrada() {
  for (var j = 0; j < 4; j++) {
    var elem = "#elem" + String(j + 1) + "_in";
    estado[j] = Math.round(Math.random() * 10);
    for (var k = 0; k < j; k++) {
      while (estado[k] === estado[j]) { //Asegura numeros distintos
        estado[j] = Math.round(Math.random() * 10);
      }
    }
    $(elem).empty();
    $(elem).append("<h3> " + String(estado[j]) + "</h3>");
  }

}

function actualizaPuntuacion() {
  $("#puntuacion").empty();
  $("#puntuacion").append("Puntuación: " + String(puntuacion));
}

function actualizaRonda() {
  $("#ronda").empty();
  $("#ronda").append("Ronda " + String(ronda));
}

function limpiaInput(){
  for (var i = 0; i < 4; i++) {
    var elem = "#elem" + String(i + 1) + "_out";
      $(elem).removeClass("text-success");
      $(elem).removeClass("text-danger");
      $(elem).val('');
  }
}

function check() {
  clearInterval(temporizador);
  for (var i = 0; i < 4; i++) {
    var elem = "#elem" + String(i + 1) + "_out";
    if (parseInt($(elem).val()) === (estado[i] + 4)) {
      $(elem).addClass("text-success");
      puntuacion++;
    } else {
      $(elem).addClass("text-danger");
    }
  }
  actualizaPuntuacion();
  setTimeout(function() {
    ronda++;
    start();

  }, 1500);



}
