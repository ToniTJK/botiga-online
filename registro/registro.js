// Cambiar los IDs de estas mierdas y poner los del registro

$( document ).ready(function() {
    /* Al fer click es mostrar la taula demanada */
    $('#login').click(insertUser);

});

var urlInsertUser = "./php/insertar_usuario.php";
function insertUser(){
    var userNombre = $("#nombre").val();
    var userEmail = $("#email").val();
    var userPassword = $("#password").val();
    var userRepeatPassword = $("#repeatPassword").val();


    $.ajax({
        url: urlInsertUser,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            userNombre:userNombre,
            userEmail:userEmail,
            userPassword:userPassword,
            userRepeatPassword:userRepeatPassword
        },
        beforeSend: function () {
            //$("#divAdd").html('Creando Usuario...');
        },
        success: function (respJSON) {
            var json = JSON.parseJSON(respJSON);
            alert(json);



            // OIGA RECONTRA PELOTUDO TE QUEDASTE AQUI XDX DXDXDXdx
            // Deberían de salir mensajes de error....?



        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#divAdd").html('Ha habido un pinche error.');
          }
    });
}


// Hacer que compare las contraseñas y te deje proceder si lo escribes bien
