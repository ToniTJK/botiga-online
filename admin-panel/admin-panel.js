$( document ).ready(function() {
    /* Al fer click es mostrar la taula demanada */
    $('#key').click(showKeys);
    $('#game').click(showGames);
    $('#user').click(showUsers);
    /* Mostrar Users al arribar a la página. */
    $('#table').html(showUsers);
});

function showKeys(){
      alert("JJJ");
}

var urlShowUsers = "./php/showUsers.php";
function showUsers(){
    $.ajax({
        url: urlShowUsers,
        dataType: "jsonp",
        jsonp: "callback",
        data: {},
        beforeSend: function () {
            $("#table").html('Cargando...');
        },
        success: function (respJSON) {
            var table = "<div class='col-lg-12'>";
            table+= "<table>";
            table += "<tbody><tr> <td>id</td> <td>nombre</td> <td>apellido</td> <td>ubicacion</td> <td>provincia</td> <td>ciudad</td> <td>email</td> <td>telefono</td> <td>imagen</td> </tr> </tr></tbody>";
            for(var k = 0; k < respJSON.length; k++){
                table += "<tr> <td>"+respJSON[k].id_usuario+"</td> <td>"+respJSON[k].nombre+"</td> <td>"+respJSON[k].apellido+"</td> <td>"+respJSON[k].ubicacion+"</td> <td>"+respJSON[k].provincia+"</td> <td>"+respJSON[k].ciudad+"</td> <td>"+respJSON[k].email+"</td> <td>"+respJSON[k].telefon+"</td> <td>"+respJSON[k].imagen+"</td>";
                table += "<td> <a id='editarUsuario' data-toggle='modal' data-target='#modalEditUser' idUser='"+respJSON[k].id_usuario+"' class='btn btn-warning'>Editar</a> </td> <td> <a class='btn btn-danger'>Eliminar</a> </td> </tr>";
            }
            table += "</table></div>";
            $("#table").html(table);
            $('#editarUsuario').click(editUser);
            //$('#eliminarUsuario').click(deleteUser);
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#table").html('No se ha podido cargar los Usuarios.');
          }
    });
}

/* Editar Usuario */
var urlSelectUserById = "./php/showUserById.php";
function editUser(){
    var idUser = $(this).attr("idUser");
    $.ajax({
        url: urlSelectUserById,
        dataType: "jsonp",
        jsonp: "callback",
        data: {idUser:idUser},
        beforeSend: function () {
            $("#divEditUser").html('Cargando...');
        },
        success: function (respJSON) {
            var modal = "<div id='formulario' ";
            modal += "<form id='formUpdateUser' method='post'>";
            for(var k = 0; k < respJSON.length; k++){
                modal += '<div class="form-group"><label for="">id</label><input id="inputId" type="text" name="id" placeholder="'+respJSON[k].id_usuario+'" value="'+respJSON[k].id_usuario+'" readonly></div>';    
                modal += '<div class="form-group"><label for="">Nombre</label><input id="inputNombre" type="text" name="nombre" placeholder="'+respJSON[k].nombre+'" value="'+respJSON[k].nombre+'"></div>';
                modal += '<div class="form-group"><label for="">Apellidos</label><input id="inputApellido" type="text" name="apellidos" placeholder="'+respJSON[k].apellido+'" value="'+respJSON[k].apellido+'"></div>';
                modal += '<div class="form-group"><label for="">Email</label><input id="inputEmail" type="email" name="email" placeholder="'+respJSON[k].email+'" value="'+respJSON[k].email+'"></div>';
                modal += '<div class="form-group"><label for="">Ubicacion</label><input id="inputUbicacion" type="text" name="ubicacion" placeholder="'+respJSON[k].ubicacion+'" value="'+respJSON[k].ubicacion+'"></div>';
                modal += '<div class="form-group"><label for="">Provincia</label><input id="inputProvincia" type="text" name="provincia" placeholder="'+respJSON[k].provincia+'" value="'+respJSON[k].provincia+'"></div>';
                modal += '<div class="form-group"><label for="">Ciudad</label><input id="inputCiudad" type="text" name="ciudad" placeholder="'+respJSON[k].ciudad+'" value="'+respJSON[k].ciudad+'"></div>';
                modal += '<div class="form-group"><label for="">telefono</label><input id="inputTelefono" type="text" name="telefono" placeholder="'+respJSON[k].telefono+'" value="'+respJSON[k].telefono+'"></div>';
                modal += '<div class="form-group"><label for="">imagen</label><input id="inputImagen" type="text" name="imagen" placeholder="'+respJSON[k].imagen+'" value="'+respJSON[k].imagen+'"></div>';
            }
            modal += '</form></div>';
            $("#divEditUser").html(modal);
            $('#updateUser').click(updateUser);
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#divEditUser").html('No se ha podido cargar el Formulario.');
          }
    }); 
}

var urlUpdateUserById = "./php/updateUserById.php";
function updateUser(){
    var userId = $("#inputId").val();
    var userNombre = $("#inputNombre").val();
    var userApellido = $("#inputApellido").val();
    var userEmail = $("#inputEmail").val();
    var userUbicacion = $("#inputUbicacion").val();
    var userProvincia = $("#inputProvincia").val();
    var userCiudad = $("#inputCiudad").val();
    var userTelefono = $("#inputTelefono").val();
    var userImagen = $("#inputImagen").val();

    $.ajax({
        url: urlUpdateUserById,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            userId:userId,
            userNombre:userNombre,
            userApellido:userApellido,
            userEmail:userEmail,
            userUbicacion:userUbicacion,
            userProvincia:userProvincia,
            userCiudad:userCiudad,
            userTelefono:userTelefono,
            userImagen:userImagen
        },
        beforeSend: function () {
            $("#formUpdateUser").html('Actualizando...');
        },
        success: function (respJSON) {
            $('#modalEditUser').modal('hide');
            showUsers();
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#formUpdateUser").html('No se ha podido actualizar el Usuario.');
          }
    });
}

function showGames(){
    alert("JJJ");
}