$( document ).ready(function() {
    /* Al fer click es mostrar la taula demanada */
    $('#key').click(showKeys);
    $('#game').click(showGames);
    $('#user').click(showUsers);

    $('#insertUser').click(insertUser);
    /* Mostrar Users al arribar a la página.. */
    $('#table').html(showUsers);
    
});

function showKeys(){
    /* CHECK NAV */
    var isActiveKey = $("#key").hasClass("active");

    if(!isActiveKey){  
        $("#key").addClass("active");
        $("#game").removeClass("active"); 
        $("#user").removeClass("active");  
    }
}

/* 
//////////////////////////////////////////   Users   ////////////////////////////////////////////// 
*/
/* Mostrar Usuarios */
var urlShowUsers = "./php/showUsers.php";
function showUsers(){
    /* CHECK NAV */
    var isActiveUser = $("#user").hasClass("active");

    if(!isActiveUser){  
        $("#user").addClass("active");
        $("#game").removeClass("active"); 
        $("#key").removeClass("active");  
    }


    $.ajax({
        url: urlShowUsers,
        dataType: "jsonp",
        jsonp: "callback",
        data: {},
        beforeSend: function () {
            $("#table").html('Cargando...');
        },
        success: function (respJSON) {
            var div;
            div = '<div class="form-group"><label for="">Nombre</label><input id="insertNombre" type="text" name="nombre" placeholder="nombre" value=""></div>';
            div += '<div class="form-group"><label for="">Apellidos</label><input id="insertApellido" type="text" name="apellidos" placeholder="apellidos" value=""></div>';
            div += '<div class="form-group"><label for="">Email</label><input id="insertEmail" type="email" name="email" placeholder="email" value=""></div>';
            div += '<div class="form-group"><label for="">Ubicacion</label><input id="insertUbicacion" type="text" name="ubicacion" placeholder="ubicacion" value=""></div>';
            div += '<div class="form-group"><label for="">Provincia</label><input id="insertProvincia" type="text" name="provincia" placeholder="provincia" value=""></div>';
            div += '<div class="form-group"><label for="">Ciudad</label><input id="insertCiudad" type="text" name="ciudad" placeholder="ciudad" value=""></div>';
            div += '<div class="form-group"><label for="">telefono</label><input id="insertTelefono" type="text" name="telefono" placeholder="telefono" value=""></div>';
            div += '<div class="form-group"><label for="">imagen</label><input id="insertImagen" type="text" name="imagen" placeholder="imagen" value=""></div>';
            
            var buttonAddUser = "<a class='btn btn-success' data-toggle='modal' data-target='#modalAdd'><i class='fas fa-user-plus'></i> Añadir Usuario</a>";
            var table = "<div class='col-lg-12'>";
            table+= "<table>";
            table += "<tbody><tr> <td>id</td> <td>nombre</td> <td>apellido</td> <td>ubicacion</td> <td>provincia</td> <td>ciudad</td> <td>email</td> <td>telefono</td> <td>imagen</td> </tr> </tr></tbody>";
            for(var k = 0; k < respJSON.length; k++){
                table += "<tr> <td>"+respJSON[k].id_usuario+"</td> <td>"+respJSON[k].nombre+"</td> <td>"+respJSON[k].apellido+"</td> <td>"+respJSON[k].ubicacion+"</td> <td>"+respJSON[k].provincia+"</td> <td>"+respJSON[k].ciudad+"</td> <td>"+respJSON[k].email+"</td> <td>"+respJSON[k].telefon+"</td> <td>"+respJSON[k].imagen+"</td>";
                table += "<td> <a class='editarUsuario btn btn-warning' data-toggle='modal' data-target='#modalEdit' data-idUser='"+respJSON[k].id_usuario+"'><i class='fas fa-edit'></i> Editar</a> </td>";
                table += '<td> <a class="btn btn-danger" onclick="putIdInInput('+respJSON[k].id_usuario+',\'' + respJSON[k].nombre + '\')" data-toggle="modal" data-target="#modalDelete"><i class="fas fa-trash-alt"></i> Eliminar</a> </td> </tr>';
            }
            table += "</table></div>";
            $("#table").html(buttonAddUser);
            $("#table").append(table);
            $('#formInsertUser').html(div);
            $('.editarUsuario').click(editUser);
            $('#deleteUser').click(deleteUser);
            //$('#eliminarUsuario').click(putIdInInput);
            //onclick='putIdInInput("+respJSON[k].id_usuario+")'
            
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#table").html('No se ha podido cargar los Usuarios.');
          }
    });
}

var urlInsertUser = "./php/insertNewUser.php";
function insertUser(){
    var userNombre = $("#insertNombre").val();
    var userApellido = $("#insertApellido").val();
    var userEmail = $("#insertEmail").val();
    var userUbicacion = $("#insertUbicacion").val();
    var userProvincia = $("#insertProvincia").val();
    var userCiudad = $("#insertCiudad").val();
    var userTelefono = $("#insertTelefono").val();
    var userImagen = $("#insertImagen").val();

    $.ajax({
        url: urlInsertUser,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
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
            $("#divAdd").html('Creando Usuario...');
        },
        success: function (respJSON) {
            $('#modalAdd').modal('hide');
            showUsers();
            
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#divAdd").html('No se ha podido añadir Usuarios.');
          }
    });
}

/* Mostrar info del usuario que se le ha hecho click para el update */
var urlSelectUserById = "./php/showUserById.php";
function editUser(){
    var idUser = $(this).attr("data-idUser");
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

/* Editar Usuario */
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
            $('#modalEdit').modal('hide');
            showUsers();
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#formUpdateUser").html('No se ha podido actualizar el Usuario.');
          }
    });
}

/* Guardar id del usuario que se va a eliminar por el Modal */
var thisIdUser;
function putIdInInput(id, user){
    var nombreId = user;
    thisIdUser = id;
    var modalBody = "<h3 class='alert alert-danger' role='alert'>¿Estas seguro que quieres eliminar a <strong>"+nombreId+"</strong>?</h3>";
    $("#modalBodyDelete").html(modalBody);

}

/* Eliminar Usuario */
var urlDeleteUserById = "./php/deleteUserById.php";
function deleteUser(){
    $.ajax({
        url: urlDeleteUserById,
        dataType: "jsonp",
        jsonp: "callback",
        data: {userId:thisIdUser},
        beforeSend: function () {
            //$("#modalBodyDelete").html('Eliminando...');
        },
        success: function (respJSON) {
            thisIdUser = "";
            $('#modalDelete').modal('hide');
            showUsers();
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#formUpdateUser").html('No se ha podido ELIMINAR el Usuario.');
          }
    });
}

/* 
//////////////////////////////////////////   GAMES   ////////////////////////////////////////////// 
*/
function showGames(){
    /* CHECK NAV */
    var isActiveGame = $("#game").hasClass("active");

    if(!isActiveGame){  
        $("#game").addClass("active");
        $("#user").removeClass("active"); 
        $("#key").removeClass("active");  
    }
/*
    $.ajax({
        url: urlShowUsers,
        dataType: "jsonp",
        jsonp: "callback",
        data: {},
        beforeSend: function () {
            $("#table").html('Cargando...');
        },
        success: function (respJSON) {
            var div;
            div = '<div class="form-group"><label for="">Nombre</label><input id="insertNombre" type="text" name="nombre" placeholder="nombre" value=""></div>';
            div += '<div class="form-group"><label for="">Apellidos</label><input id="insertApellido" type="text" name="apellidos" placeholder="apellidos" value=""></div>';
            div += '<div class="form-group"><label for="">Email</label><input id="insertEmail" type="email" name="email" placeholder="email" value=""></div>';
            div += '<div class="form-group"><label for="">Ubicacion</label><input id="insertUbicacion" type="text" name="ubicacion" placeholder="ubicacion" value=""></div>';
            div += '<div class="form-group"><label for="">Provincia</label><input id="insertProvincia" type="text" name="provincia" placeholder="provincia" value=""></div>';
            div += '<div class="form-group"><label for="">Ciudad</label><input id="insertCiudad" type="text" name="ciudad" placeholder="ciudad" value=""></div>';
            div += '<div class="form-group"><label for="">telefono</label><input id="insertTelefono" type="text" name="telefono" placeholder="telefono" value=""></div>';
            div += '<div class="form-group"><label for="">imagen</label><input id="insertImagen" type="text" name="imagen" placeholder="imagen" value=""></div>';
            
            var buttonAddUser = "<a class='btn btn-success' data-toggle='modal' data-target='#modalAdd'><i class='fas fa-user-plus'></i> Añadir Usuario</a>";
            var table = "<div class='col-lg-12'>";
            table+= "<table>";
            table += "<tbody><tr> <td>id</td> <td>nombre</td> <td>apellido</td> <td>ubicacion</td> <td>provincia</td> <td>ciudad</td> <td>email</td> <td>telefono</td> <td>imagen</td> </tr> </tr></tbody>";
            for(var k = 0; k < respJSON.length; k++){
                table += "<tr> <td>"+respJSON[k].id_usuario+"</td> <td>"+respJSON[k].nombre+"</td> <td>"+respJSON[k].apellido+"</td> <td>"+respJSON[k].ubicacion+"</td> <td>"+respJSON[k].provincia+"</td> <td>"+respJSON[k].ciudad+"</td> <td>"+respJSON[k].email+"</td> <td>"+respJSON[k].telefon+"</td> <td>"+respJSON[k].imagen+"</td>";
                table += "<td> <a class='editarUsuario btn btn-warning' data-toggle='modal' data-target='#modalEdit' data-idUser='"+respJSON[k].id_usuario+"'><i class='fas fa-edit'></i> Editar</a> </td>";
                table += '<td> <a class="btn btn-danger" onclick="putIdInInput('+respJSON[k].id_usuario+',\'' + respJSON[k].nombre + '\')" data-toggle="modal" data-target="#modalDelete"><i class="fas fa-trash-alt"></i> Eliminar</a> </td> </tr>';
            }
            table += "</table></div>";
            $("#table").html(buttonAddUser);
            $("#table").append(table);
            $('#formInsertUser').html(div);
            $('.editarUsuario').click(editUser);
            $('#deleteUser').click(deleteUser);
            //$('#eliminarUsuario').click(putIdInInput);
            //onclick='putIdInInput("+respJSON[k].id_usuario+")'
            
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#table").html('No se ha podido cargar los Usuarios.');
          }
    });*/
}