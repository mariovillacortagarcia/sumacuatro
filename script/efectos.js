$(document).ready(function() {
  $(".masCuatro").hide();

  $("#empezar").click(function() {
    $("#titulo").hide();
    $(".masCuatro").show();
    start(1, 0);
  });
});

function start(ronda, puntuacion) {
  while (true) {
    var tiempo = 3;
    var temporizador = setInterval(function() { //Temporizador
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
    var estado = [0, 0, 0, 0];

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
    break;
  }
}
