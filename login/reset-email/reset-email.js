$( document ).ready(function() {
    /* Al fer click es mostrar la taula demanada */
    $('#reset').click(checkEmail);
    $('#mssg').html("");
    
});

//var urlCheckEmail = "./php/checkEmail.php"
var urlCheckEmail = "http://dualtest.tonitorrescuenca.com/checkEmail.php"
function checkEmail(){
    var email = $('#email').val();
    
    $.ajax({
        url: urlCheckEmail,
        dataType: "jsonp",
        jsonp: "callback",
        data: {email:email},
        beforeSend: function () {
            //$("#modalBodyDelete").html('Eliminando...');
        },
        success: function (respJSON) {
        
            var alertNull = '<div class="alert alert-danger" role="alert">El Email no nos llega, intentelo más tarde!</div>';
            var alertEnviado = '<div class="alert alert-success" role="alert"> Todo correcto. Comprueba tu correo! <i class="fas fa-check"></i></div>';
            var alertInputVacio = '<div class="alert alert-danger" role="alert">¡Lo sentimos! No podemos identificar esta cuenta de correo electrónico</div>';
            var alertNoEnviado = '<div class="alert alert-danger" role="alert">No se ha podido enviar el Email, intentalo más tarde.</div>';
            var alertSql = '<div class="alert alert-danger" role="alert">El servidor no funciona bien, intentalo más tarde o contacte con soporte. Error SQL.</div>';
            switch(respJSON.status){
                case 'enviado':
                    $('#mssg').html(alertEnviado);
                    break;
                case "null":
                    $('#mssg').html(alertNull);
                    break;
                case "noresult":
                    $('#mssg').html(alertInputVacio);
                    break;
                case "noenviado":
                    $('#mssg').html(alertNoEnviado);
                    break;
                case "sql":
                    $('#mssg').html(alertSql);
                    break;
            }
        },
        error:function (xhr, ajaxOptions, thrownError) {
            //$("#formUpdateUser").html('No se ha podido ELIMINAR el Usuario.');
          }
    });
}