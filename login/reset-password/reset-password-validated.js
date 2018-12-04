$( document ).ready(function() {
    /* Al fer click es mostrar la taula demanada */
    //$('#reset').click(checkEmail);
    $('#mssg').html("");
    //$('#cambiar').click(check);
    
});

//var urlCheckEmail = "./php/checkEmail.php"
var urlCheckPassword = "./php/checkPassword.php";
function checkPassword(id){
    var pw = $('#password').val();
    var pwr = $('#repeatPassword').val();
    console.log("pw => "+pw+" pwr => "+pwr+" id => "+id);

    $.ajax({
        url: urlCheckPassword,
        dataType: "json",
        jsonp: "callback",
        data: {id:id,pw:pw,pwr:pwr},
        beforeSend: function () {
            //$("#modalBodyDelete").html('Eliminando...');
        },
        success: function (respJSON) {
            var alertPw = '<div class="alert alert-danger" role="alert">Las contraseñas no coinciden.</div>';
            var alertTrue = '<div class="alert alert-success" role="alert"> Password cambiado correctamente! <i class="fas fa-check"></i></div>';
            var alertFalse = '<div class="alert alert-danger" role="alert">Fallo del Servidor, contacte con un admin.</div>';
            switch(respJSON.status){
                case 'true':
                    $('#mssg').html(alertTrue);
                    setTimeout(function(){ $(location).attr('href', 'http://localhost:8888/botiga-online/login/login.html'); }, 700);
                    break;
                case "pw":
                    $('#mssg').html(alertPw);
                    break;
                case "false":
                    $('#mssg').html(alertFalse);
                    break;
                }
            
            
            
        },
        error:function (xhr, ajaxOptions, thrownError) {
            //$("#formUpdateUser").html('No se ha podido ELIMINAR el Usuario.');
          }
    });
}


