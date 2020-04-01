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
  temporizador = setInterval(function() { //Temporizador
    if (tiempo < 0) { //Fin de la partida
      alert("Fin de la partida");
      clearInterval(temporizador);
    }
    var timing = new Date(0);
    timing.setSeconds(tiempo);
    timing = timing.toISOString().substr(14, 5)
    $("#temporizador").empty();
    if (tiempo <= 5) {
      console.log("Hola");
      timing = "<a class='text-danger'>" + timing + "</a>";
    }
    $("#temporizador").append(timing);
    tiempo--;
  }, 1000);
  $("#ronda").append("Ronda " + String(ronda));
  $("#puntuacion").append("Puntuación: " + String(puntuacion));


  //Inicializacion de los numeros
  for (var j = 0; j < 4; j++) {
    estado[j] = Math.round(Math.random() * 9);
    for (var k = 0; k < j; k++) {
      while (estado[k] === estado[j]) { //Asegura numeros distintos
        estado[j] = Math.round(Math.random() * 9);
      }
    }
  }
  $("#elem1_in").append("<h3> " + String(estado[0]) + "</h3>");
  $("#elem2_in").append("<h3> " + String(estado[1]) + "</h3>");
  $("#elem3_in").append("<h3> " + String(estado[2]) + "</h3>");
  $("#elem4_in").append("<h3> " + String(estado[3]) + "</h3>");

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



}
