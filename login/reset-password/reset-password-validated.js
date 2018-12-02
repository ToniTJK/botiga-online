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
        dataType: "json",
        jsonp: "callback",
        data: {email:email},
        beforeSend: function () {
            //$("#modalBodyDelete").html('Eliminando...');
        },
        success: function (respJSON) {
            console.log(respJSON.status);
            alert(respJSON.status);
            /*
            var alertSql = '<div class="alert alert-danger" role="alert">Error de Base de Datos, Contacte con Admin</div>';
            var alertTrue = '<div class="alert alert-success" role="alert"> Accediendo... <i class="fas fa-check"></i></div>';
            var alertFalse = '<div class="alert alert-danger" role="alert">Error en Usuario/Contraseña</div>';
            var alertNull = '<div class="alert alert-warning" role="alert">Te has dejado el Usuario/Contraseña!</div>';
            switch(respJSON.status){
                case 'true':
                    $('#mssg').html(alertTrue);
                    setTimeout(function(){ $(location).attr('href', 'http://localhost:8888/botiga-online/'); }, 500);
                    break;
                case "sql":
                    $('#mssg').html(alertSql);
                    break;
                case "false":
                    $('#mssg').html(alertFalse);
                    break;
                case "null":
                    $('#mssg').html(alertNull);
                    break;
                }
            */
            
            
        },
        error:function (xhr, ajaxOptions, thrownError) {
            //$("#formUpdateUser").html('No se ha podido ELIMINAR el Usuario.');
          }
    });
}