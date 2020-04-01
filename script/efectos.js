var ronda = 1;
var puntuacion = 0;
var tiempo = 180;
var tiempoEsconder = 8000;
var estado = [0, 0, 0, 0];
var suma = 4;
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
  temporizador = setInterval(function() { //Temporizador
    if (tiempo < 0) { //Fin de la partida
      alert("Fin de la partida. Puntuación: " + puntuacion);
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
  actualizaSumas();
  limpiaInput();

  //Esconde numeros
  setTimeout(function() {
    escondeEntrada();
  }, tiempoEsconder);


}

function check() {
  clearInterval(temporizador);
  for (var i = 0; i < 4; i++) {
    var elem = "#elem" + String(i + 1) + "_out";
    if (parseInt($(elem).val()) === (estado[i] + suma)) {
      $(elem).addClass("text-success");
      puntuacion++;
    } else {
      $(elem).addClass("text-danger");
    }
  }
  actualizaPuntuacion();
  muestraEntrada();
  setTimeout(function() {
    ronda++;
    reduceTiempoEsconder();
    console.log(tiempoEsconder);
    start();

  }, 1500);



}

function escondeEntrada() {
  for (var j = 0; j < 4; j++) {
    var elem = "#elem" + String(j + 1) + "_in";
    $(elem).empty();
    $(elem).append("<h3>???</h3>");
  }
}

function muestraEntrada() {
  for (var j = 0; j < 4; j++) {
    var elem = "#elem" + String(j + 1) + "_in";
    $(elem).empty();
    $(elem).append("<h3> " + String(estado[j]) + "</h3>");
  }
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
    muestraEntrada();
  }

}
function actualizaSumas() {
  suma = Math.round(Math.random() * 4);
  $(".sumas").empty();
  $(".sumas").append("+"+String(suma));

}
function actualizaPuntuacion() {
  $("#puntuacion").empty();
  $("#puntuacion").append("Puntuación: " + String(puntuacion));
}

function actualizaRonda() {
  $("#ronda").empty();
  $("#ronda").append("Ronda " + String(ronda));
}

function limpiaInput() {
  for (var i = 0; i < 4; i++) {
    var elem = "#elem" + String(i + 1) + "_out";
    $(elem).removeClass("text-success");
    $(elem).removeClass("text-danger");
    $(elem).val('');
  }
}

function reduceTiempoEsconder() {
  if (tiempoEsconder > 3000) {
    tiempoEsconder -= 250;
  } else if (tiempoEsconder > 1500) {
    tiempoEsconder -= 200;
  } else if (tiempoEsconder > 500){
    tiempoEsconder -= 100;
  }
}
