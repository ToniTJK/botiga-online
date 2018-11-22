$( document ).ready(function() {
    /* Al fer click es mostrar la taula demanada */
    $('#key').click(showKeys);
    $('#game').click(showGames);
    $('#user').click(showUsers);

    
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
            div += '<div class="form-group"><label for="">Provincia</label><input id="insertProvincia" type="text" name="provincia" placeholder="provincia" value=""></div>';
            div += '<div class="form-group"><label for="">Ciudad</label><input id="insertCiudad" type="text" name="ciudad" placeholder="ciudad" value=""></div>';
            div += '<div class="form-group"><label for="">imagen</label><input id="insertImagen" type="text" name="imagen" placeholder="imagen" value=""></div>';
            div += '<div class="form-group"><label for="">rol</label><select id="insertRol"><option value="user">user</option><option value="admin">admin</option</select></div>';
            var buttonSubmitModalAdd = '<button type="button" class="btn btn-info" data-dismiss="modal">Cerrar</button><button id="btnInsertUser" type="button" class="btn btn-success">Guardar Datos</button>';
            var buttonAddUser = "<a class='btn btn-success' data-toggle='modal' data-target='#modalAdd'><i class='fas fa-user-plus'></i> Añadir Usuario</a>";
            var buttonDeleteModal = '<button type="button" class="btn btn-info" data-dismiss="modal">Cerrar</button><button id="deleteUser" type="button" class="btn btn-danger">Eliminar Usuario</button>';
            var buttonUpdateModal = '<button type="button" class="btn btn-info" data-dismiss="modal">Cerrar</button><button id="updateUser" type="button" class="btn btn-danger">Editar Usuario</button>';
    
            var table = "<div class='col-lg-12'>";
            table+= "<table>";
            table += "<tbody><tr> <td>id</td> <td>nombre</td> <td>apellido</td> <td>email</td> <td>provincia</td> <td>Ciudad</td> <td>fecha de creación</td> <td>imagen</td> <td>rol</td> </tr> </tr></tbody>";
            for(var k = 0; k < respJSON.length; k++){
                table += "<tr> <td>"+respJSON[k].id_usuario+"</td> <td>"+respJSON[k].nombre+"</td> <td>"+respJSON[k].apellido+"</td> <td>"+respJSON[k].email+"</td> <td>"+respJSON[k].provincia+"</td> <td>"+respJSON[k].ciudad+"</td> <td>"+respJSON[k].fecha_creacion+"</td> <td>"+respJSON[k].imagen+"</td> <td>"+respJSON[k].rol+"</td>";
                table += "<td> <a class='editarUsuario btn btn-warning' data-toggle='modal' data-target='#modalEdit' data-idUser='"+respJSON[k].id_usuario+"'><i class='fas fa-edit'></i> Editar</a> </td>";
                table += '<td> <a class="btn btn-danger" onclick="putIdInInput('+respJSON[k].id_usuario+',\'' + respJSON[k].nombre + '\')" data-toggle="modal" data-target="#modalDelete"><i class="fas fa-trash-alt"></i> Eliminar</a> </td> </tr>';
            }
            table += "</table></div>";

            /* AÑADIR TABLA */
            $("#table").html(buttonAddUser);
            $("#table").append(table);
            $('#formInsertUser').html(div);
            /* AÑADIR BOTONES EN LOS MODALES */
            $('#modalFooterAdd').html(buttonSubmitModalAdd);
            $('#modalFooterDelete').html(buttonDeleteModal);
            $('#modalFooterEdit').html(buttonUpdateModal);
            /* CRUD USUARIO */
            $('.editarUsuario').click(editUser);
            $('#deleteUser').click(deleteUser);
            $('#btnInsertUser').click(insertUser);
            
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#table").html('No se ha podido añadir los Usuarios.');
          }
    });
}

var urlInsertUser = "./php/insertNewUser.php";
function insertUser(){
    var userNombre = $("#insertNombre").val();
    var userApellido = $("#insertApellido").val();
    var userEmail = $("#insertEmail").val();
    var userProvincia = $("#insertProvincia").val();
    var userCiudad = $("#insertCiudad").val();
    var userRol = $("#insertRol").val();
    var userImagen = $("#insertImagen").val();

    $.ajax({
        url: urlInsertUser,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            userNombre:userNombre,
            userApellido:userApellido,
            userEmail:userEmail,
            userProvincia:userProvincia,
            userCiudad:userCiudad,
            userRol:userRol,
            userImagen:userImagen
        },
        beforeSend: function () {
            //$("#divAdd").html('Creando Usuario...');
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
                modal += '<div class="form-group"><label for="">Provincia</label><input id="inputProvincia" type="text" name="provincia" placeholder="'+respJSON[k].provincia+'" value="'+respJSON[k].provincia+'"></div>';
                modal += '<div class="form-group"><label for="">Ciudad</label><input id="inputCiudad" type="text" name="ciudad" placeholder="'+respJSON[k].ciudad+'" value="'+respJSON[k].ciudad+'"></div>';
                modal += '<div class="form-group"><label for="">Imagen</label><input id="inputImagen" type="text" name="imagen" placeholder="'+respJSON[k].imagen+'" value="'+respJSON[k].imagen+'"></div>';
                modal += '<div class="form-group"><label for="">Rol</label><select id="inputRol"><option value="'+respJSON[k].rol+'">'+respJSON[k].rol+'</option><option value="user">user</option</select><option value="admin">admin</option</select></div>';    
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
    var userProvincia = $("#inputProvincia").val();
    var userCiudad = $("#inputCiudad").val();
    var userImagen = $("#inputImagen").val();
    var userRol = $("#inputRol").val();

    $.ajax({
        url: urlUpdateUserById,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            userId:userId,
            userNombre:userNombre,
            userApellido:userApellido,
            userEmail:userEmail,
            userProvincia:userProvincia,
            userCiudad:userCiudad,
            userImagen:userImagen,
            userRol:userRol
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

var urlShowGames = "./php/showGames.php"
function showGames(){
    /* CHECK NAV */
    var isActiveGame = $("#game").hasClass("active");

    if(!isActiveGame){  
        $("#game").addClass("active");
        $("#user").removeClass("active"); 
        $("#key").removeClass("active");  
    }

    $.ajax({
        url: urlShowGames,
        dataType: "jsonp",
        jsonp: "callback",
        data: {},
        beforeSend: function () {
            $("#table").html('Cargando...');
        },
        success: function (respJSON) {
            var div;
            div = '<div class="form-group"><label for="">Nombre</label><input id="insertNombre" type="text" name="nombre" placeholder="nombre" value=""></div>';
            div += '<div class="form-group"><label for="">Descripcion</label><input id="insertDescripcion" type="text" name="descripcion" placeholder="descripcion" value=""></div>';
            div += '<div class="form-group"><label for="">Imagen</label><input id="insertImagen" type="email" name="imagen" placeholder="imagen" value=""></div>';
            div += '<div class="form-group"><label for="">Video</label><input id="insertVideo" type="text" name="video" placeholder="video" value=""></div>';
            div += '<div class="form-group"><label for="">Precio</label><input id="insertPrecio" type="number" name="precio" placeholder="precio" value=""></div>';
            var buttonSubmitModalAdd = '<button type="button" class="btn btn-info" data-dismiss="modal">Cerrar</button><button id="btnInsertGame" type="button" class="btn btn-success">Guardar Game</button>';
            var buttonAddUser = "<a class='btn btn-success' data-toggle='modal' data-target='#modalAdd'><i class='fas fa-user-plus'></i> Añadir Juego</a>";
            var buttonDeleteModal = '<button type="button" class="btn btn-info" data-dismiss="modal">Cerrar</button><button id="deleteGame" type="button" class="btn btn-danger">Eliminar Juego</button>';
            var buttonUpdateModal = '<button type="button" class="btn btn-info" data-dismiss="modal">Cerrar</button><button id="updateGame" type="button" class="btn btn-danger">Editar Juego</button>';
    
            var table = "<div class='col-lg-12'>";
            table+= "<table>";
            table += "<tbody><tr> <td>id</td> <td>nombre</td> <td>descripcion</td> <td>imagen</td> <td>video</td> <td>precio</td> </tr> </tr> </tbody>";
            for(var k = 0; k < respJSON.length; k++){
                table += "<tr> <td>"+respJSON[k].id_articulo_juego+"</td> <td>"+respJSON[k].nombre+"</td> <td>"+respJSON[k].descripcion+"</td> <td>"+respJSON[k].imagen+"</td> <td>"+respJSON[k].video+"</td> <td>"+respJSON[k].precio+"</td>";
                table += "<td> <a class='editarGame btn btn-warning' data-toggle='modal' data-target='#modalEdit' data-idGame='"+respJSON[k].id_articulo_juego+"'><i class='fas fa-edit'></i> Editar</a> </td>";
                table += '<td> <a class="btn btn-danger" onclick="putIdInInput('+respJSON[k].id_articulo_juego+',\'' + respJSON[k].nombre + '\')" data-toggle="modal" data-target="#modalDelete"><i class="fas fa-trash-alt"></i> Eliminar</a> </td> </tr>';
            }
            table += "</table></div>";
            $("#table").html(buttonAddUser);
            $("#table").append(table);
            $('#formInsertUser').html(div);
            $('#modalFooterAdd').html(buttonSubmitModalAdd);
            $('#modalFooterDelete').html(buttonDeleteModal);
            $('#modalFooterEdit').html(buttonUpdateModal);
            
            $('#btnInsertGame').click(insertNewGame);
            $('.editarGame').click(editFormGame);
            $('#deleteGame').click(deleteGame);
            
                   
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#table").html('No se ha podido añadir los Usuarios.');
          }
    });
}

var urlInsertNewGame = "./php/insertNewGame.php"
function insertNewGame(){
    var gameNombre = $("#insertNombre").val();
    var gameDescripcion = $("#insertDescripcion").val();
    var gameImagen = $("#insertImagen").val();
    var gameVideo = $("#insertVideo").val();
    var gamePrecio = $("#insertPrecio").val();

    $.ajax({
        url: urlInsertNewGame,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            gameNombre:gameNombre,
            gameDescripcion:gameDescripcion,
            gameImagen:gameImagen,
            gameVideo:gameVideo,
            gamePrecio:gamePrecio
        },
        beforeSend: function () {
            //$("#divAdd").html('Creando Usuario...');
        },
        success: function (respJSON) {
            $('#modalAdd').modal('hide');
            showGames();
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#divAdd").html('No se ha podido añadir Usuarios.'+xhr);
          }
    });
}

/* Eliminar Usuario */
var urlDeleteGameById = "./php/deleteGameById.php";
function deleteGame(){
    $.ajax({
        url: urlDeleteGameById,
        dataType: "jsonp",
        jsonp: "callback",
        data: {gameId:thisIdUser},
        beforeSend: function () {
            //$("#modalBodyDelete").html('Eliminando...');
        },
        success: function (respJSON) {
            thisIdUser = "";
            $('#modalDelete').modal('hide');
            showGames();
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#formUpdateUser").html('No se ha podido ELIMINAR el Juego.');
          }
    });
}

/* Mostrar info del juego que se le ha hecho click para el update */
var urlSelectGameById = "./php/showGameById.php";
function editFormGame(){
    var idGame = $(this).attr("data-idGame");
    $.ajax({
        url: urlSelectGameById,
        dataType: "jsonp",
        jsonp: "callback",
        data: {idGame:idGame},
        beforeSend: function () {
            $("#divEditUser").html('Cargando...');
        },
        success: function (respJSON) {
            var modal = "<div id='formulario' ";
            modal += "<form id='formUpdateUser' method='post'>";
            for(var k = 0; k < respJSON.length; k++){
                modal += '<div class="form-group"><label for="">id</label><input id="inputId" type="text" name="id" placeholder="'+respJSON[k].id_articulo_juego+'" value="'+respJSON[k].id_articulo_juego+'" readonly></div>';    
                modal += '<div class="form-group"><label for="">Nombre</label><input id="inputNombre" type="text" name="nombre" placeholder="'+respJSON[k].nombre+'" value="'+respJSON[k].nombre+'"></div>';
                modal += '<div class="form-group"><label for="">Descripcion</label><input id="inputDescripcion" type="text" name="descripcion" placeholder="'+respJSON[k].descripcion+'" value="'+respJSON[k].descripcion+'"></div>';
                modal += '<div class="form-group"><label for="">Imagen</label><input id="inputImagen" type="email" name="imagen" placeholder="'+respJSON[k].imagen+'" value="'+respJSON[k].imagen+'"></div>';
                modal += '<div class="form-group"><label for="">Video</label><input id="inputVideo" type="text" name="video" placeholder="'+respJSON[k].video+'" value="'+respJSON[k].video+'"></div>';
                modal += '<div class="form-group"><label for="">Precio</label><input id="inputPrecio" type="number" name="precio" placeholder="'+respJSON[k].precio+'" value="'+respJSON[k].precio+'"></div>';
                    
            }
            modal += '</form></div>';
            $("#divEditUser").html(modal);
            $('#updateGame').click(updateGame);
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#divEditUser").html('No se ha podido cargar el Formulario.');
          }
    }); 
}

/* EDITAR JUEGO */
var urlUpdateGameById = "./php/updateGameById.php";
function updateGame(){
    var gameId = $("#inputId").val();
    var gameNombre = $("#inputNombre").val();
    var gameDescripcion = $("#inputDescripcion").val();
    var gameImagen = $("#inputImagen").val();
    var gameVideo = $("#inputVideo").val();
    var gamePrecio = $("#inputPrecio").val();

    $.ajax({
        url: urlUpdateGameById,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            gameId:gameId,
            gameNombre:gameNombre,
            gameDescripcion:gameDescripcion,
            gameImagen:gameImagen,
            gameVideo:gameVideo,
            gamePrecio:gamePrecio
        },
        beforeSend: function () {
            $("#formUpdateUser").html('Actualizando...');
        },
        success: function (respJSON) {
            $('#modalEdit').modal('hide');
            showGames();
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#formUpdateUser").html('No se ha podido actualizar el Usuario.');
          }
    });
}