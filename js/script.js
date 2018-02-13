$(function() {
  let server = $("#server");
  server.val(location.href);
  $("#btnMostrar").on("click",enviar);
  
});

let enviar = function(){    
    let tiempoInicial = new Date();
    let estados = ['NO INICIADA', 'CARGANDO', 'CARGADO','INTERACTIVO', 'COMPLETADO'];
    String.prototype.transformaCaracteresEspeciales = function () {
        return unescape(escape(this).
            replace(/%0A/g, '<br/>').
            replace(/%3C/g, '&lt;').
            replace(/%3E/g, '&gt;'));
    }

  $.ajax({
            type: "GET",
            url: $("#server").val(),
            dataType: "text",
            error: function (jqXHR) {
                tiempoFinal = new Date();
                let milisegundos = tiempoFinal - tiempoInicial;
                $("#divContenidosArchivo").html("");
                $("#ulEstadoPeticion").html('<li>[' + milisegundos + ' mseg.] ' + estados[jqXHR.readyState]+'</li>');
                $("#ulCodigosEstado").html("Estado Servidor: " + jqXHR.status + ", " + jqXHR.statusText);
                $("#pCabeceras").html(jqXHR.getAllResponseHeaders().transformaCaracteresEspeciales());
            }
        }) 
            .done(function (contenido, text, jqXHR) {
                tiempoFinal = new Date();
                let milisegundos = tiempoFinal - tiempoInicial;
                $("#divContenidosArchivo").html("<xmp>" + contenido + "</xmp>");
                $("#ulEstadoPeticion").html('<li>[' + milisegundos + ' mseg.] ' + estados[jqXHR.readyState]+'</li>');
                $("#ulCodigosEstado").html("Estado Servidor: " + jqXHR.status + ", " + jqXHR.statusText);
                $("#pCabeceras").html(jqXHR.getAllResponseHeaders().transformaCaracteresEspeciales());
            })
            .fail(function (jqXHR) {
                tiempoFinal = new Date();
                let milisegundos = tiempoFinal - tiempoInicial;
                $("#divContenidosArchivo").html("");
                $("#ulEstadoPeticion").html('<li>[' + milisegundos + ' mseg.] ' + estados[jqXHR.readyState]+'</li>');
                $("#ulCodigosEstado").html("Estado Servidor: " + jqXHR.status + ", " + jqXHR.statusText);
                $("#pCabeceras").html(jqXHR.getAllResponseHeaders().transformaCaracteresEspeciales());
            });
    };