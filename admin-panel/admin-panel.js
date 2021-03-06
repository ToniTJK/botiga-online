$( document ).ready(function() {
    /* Al fer click es mostrar la taula demanada */
    $('#key').click(showKeys);
    $('#game').click(showGames);
    $('#user').click(showUsers);

    /* Mostrar Users al arribar a la página.. */
    $('#table').html(showUsers);
});

/* 
//////////////////////////////////////////   Users   ////////////////////////////////////////////// 
*/
/* Mostrar Usuarios */
/* Variable para que el active de la paginacion se compruebe la primera vez */
var onceUser = true;
var urlShowUsers = "./php/user/showUsers.php";
function showUsers(pages = 1){
    /* CHECK NAV */
    var isActiveUser = $("#user").hasClass("active");

    if(!isActiveUser){  
        $("#user").addClass("active");
        $("#game").removeClass("active"); 
        $("#key").removeClass("active");  
    }

    if (typeof pages === "undefined" || pages === null) { 
        pages = 1; 
      }
    
    $.ajax({
        url: urlShowUsers,
        dataType: "jsonp",
        jsonp: "callback",
        data: {page:pages},
        beforeSend: function () {
            $("#table").html('Cargando...');
        },
        success: function (respJSON) {
            var usuarios = respJSON.data1;
            var total_pages = respJSON.data2;
            /* div de Añadir Usuario */
            var div;
            div = '<div class="form-group"><label for="">Nombre</label><input id="insertNombre" type="text" name="nombre" placeholder="nombre" value=""></div>';
            div += '<div class="form-group"><label for="">Apellidos</label><input id="insertApellido" type="text" name="apellidos" placeholder="apellidos" value=""></div>';
            div += '<div class="form-group"><label for="">Email **</label><input id="insertEmail" type="email" name="email" placeholder="email" value=""></div>';
            div += '<div class="form-group"><label for="">Password **</label><input id="insertPassword" type="password" name="password" placeholder="password" value=""></div>';
            div += '<div class="form-group"><label for="">Repeat Password **</label><input id="insertRepeatPassword" type="password" name="password" placeholder="repeat password" value=""></div>';
            div += '<div class="form-group"><label for="">Provincia</label><input id="insertProvincia" type="text" name="provincia" placeholder="provincia" value=""></div>';
            div += '<div class="form-group"><label for="">Ciudad</label><input id="insertCiudad" type="text" name="ciudad" placeholder="ciudad" value=""></div>';
            div += '<div class="form-group"><label for="">imagen</label><input id="insertImagen" type="file" name="imagen" placeholder="imagen" value=""></div>';
            div += '<div class="form-group"><label for="">rol</label><select id="insertRol"><option value="user">user</option><option value="admin">admin</option></select></div>';
            div += '<span id="alertaMssg"></span>';
            var buttonSubmitModalAdd = '<button type="button" class="btn btn-info" data-dismiss="modal">Cerrar</button><button id="btnInsertUser" type="button" class="btn btn-success">Guardar Datos</button>';
            var buttonAddUser = "<a class='btn btn-success' data-toggle='modal' data-target='#modalAdd'><i class='fas fa-user-plus'></i> Añadir Usuario</a>";
            var buttonDeleteModal = '<button type="button" class="btn btn-info" data-dismiss="modal">Cerrar</button><button id="deleteUser" type="button" class="btn btn-danger">Eliminar Usuario</button>';
            var buttonUpdateModal = '<button type="button" class="btn btn-info" data-dismiss="modal">Cerrar</button><button id="updateUser" type="submit" class="btn btn-danger">Editar Usuario</button>';
    
            var table = "<div class='table-responsive col-lg-12'>";
            table+= "<table>";
            table += "<tbody><tr> <td>id</td> <td>nombre</td> <td>apellido</td> <td>email</td> <td>provincia</td> <td>Ciudad</td> <td>fecha creación</td> <td>imagen</td> <td>rol</td> </tr> </tr></tbody>";
            for(var k = 0; k < usuarios.length; k++){
                table += "<tr> <td>"+usuarios[k].id_usuario+"</td> <td>"+usuarios[k].nombre+"</td> <td>"+usuarios[k].apellido+"</td> <td>"+usuarios[k].email+"</td> <td>"+usuarios[k].provincia+"</td> <td>"+usuarios[k].ciudad+"</td> <td>"+usuarios[k].fecha_creacion+"</td> <td>"+usuarios[k].imagen+"</td> <td>"+usuarios[k].rol+"</td>";
                table += "<td> <a class='editarUsuario btn btn-warning' data-toggle='modal' data-target='#modalEdit' data-idUser='"+usuarios[k].id_usuario+"'><i class='fas fa-edit'></i> Editar</a> </td>";
                table += '<td> <a class="btn btn-danger" onclick="putIdInInput('+usuarios[k].id_usuario+',\'' + usuarios[k].nombre + '\')" data-toggle="modal" data-target="#modalDelete"><i class="fas fa-trash-alt"></i> Eliminar</a> </td> </tr>';
            }
            table += "</table></div>";
            
            /* PAGINATION */
            var output_pagination = "<span id='divPagination'>";
            for(var i=1; i<=total_pages; i++){
              output_pagination += "<span class='pagination pagination_link_user' id='"+i+"'>"+i+"</span>"; 
            }
            output_pagination += "</span>";

            /* AÑADIR TABLA */
            $("#table").html(buttonAddUser);
            $("#table").append(output_pagination);
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

            /* PAGINATION */ 
            $('.pagination_link_user').click(passPaginationUser);
            checkPaginationUser(pages)
               
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#table").html('No se ha podido añadir los Usuarios.');
          }
    });
}

/* PAGINATION USERS */
function passPaginationUser(){
    var page = $(this).attr("id"); 
    showUsers(page);
}

function checkPaginationUser(pages){
    /* PAGINATION ACTIVE */
    if(onceUser == true ){
        $("#divPagination .pagination").each(function( i ) {
            if(i === 0){
                $(this).addClass('activePage');
            }
        });  
        onceUser = false;
    } else {
        pages = pages - 1;
        $("#divPagination .pagination").each(function( i ) {
            var isPageActive = $(this).hasClass("activePage");
            console.log("I:"+i+ " p: "+pages);
            if(i == pages){
                $(this).addClass("activePage"); 
                console.log("add");
            } else {
                $(this).removeClass("activePage"); 
                console.log("remove");
            }
        }); 
    } 
}

var urlInsertUser = "./php/user/insertNewUser.php";
//var urlInsertUserImage = "./php/user/updateUserImage.php";
function insertUser(){
    /* Values of Inputs */
    var userNombre = $("#insertNombre").val();
    var userApellido = $("#insertApellido").val();
    var userEmail = $("#insertEmail").val();
    var userPassword = $("#insertPassword").val();
    var userRepeatPassword = $("#insertRepeatPassword").val();
    var userProvincia = $("#insertProvincia").val();
    var userCiudad = $("#insertCiudad").val();
    var userRol = $("#insertRol").val();

    /* user Imagen = variable con el nombre de la imagen subida*/
    var userImagen;
    var thereisImage;
    /*  En el caso de que no se quiera subir una imagen nueva... Es Opcional. */
    if($("#insertImagen").val() == ''){
        thereisImage = "no";
    } else {
        thereisImage = "ok";
        var image = document.getElementById("insertImagen").files[0];
        var name = image.name;
        var ext = name.split('.').pop().toLowerCase();
        
        if(jQuery.inArray(ext, ['gif','png','jpg','jpeg']) == -1) 
            thereisImage = "ext";

        var fsize = image.size;
        if(fsize > 2000000)
            thereisImage = "size";
        
        // Checks   
        //console.log("file => "+image);
        //console.log("Name => "+name);
        //console.log("Ext => "+ext);
        //console.log("fsize => "+fsize);
        //console.log("------------------");
    }

    var alertExt = '<div class="alert alert-danger" role="alert"><strong>Oh snap! Extensión no válida!</strong></div>';
    var alertSize = '<div class="alert alert-danger" role="alert"><strong>Oh snap! El tamaño de la imagen es demasiado grande</strong></div>';
    switch(thereisImage){
        case "ext":
        $('#alertaMssg').html(alertExt);
        break;
        case "size":
        $('#alertaMssg').html(alertSize);
        break;
        case "ok":
            var form_data = new FormData();
            form_data.append("file", document.getElementById('insertImagen').files[0]);
                $.ajax({
                    url: urlUpdateUserImage,
                    method:"POST",
                    data: form_data,
                    dataType: "jsonp",
                    jsonp: "callback",
                    contentType: false,
                    cache: false,
                    processData: false,
                    beforeSend:function(){},   
                    success:function(data)
                    {
                        //console.log("---- SUCCESS ----");
                        //console.log("Status =>"+data.status);
                        //console.log("Path =>"+data.imagen_name);
                        if(data.status === "error")
                            alert("No se ha podido subir la imagen, contacte con un Administrador!");
                        else
                            userImagen = data.imagen_name;
                        
                        /* En cuanto se suba la imagen se updatean los datos */
                        requestNewUser(userNombre, userApellido, userEmail, userPassword, userRepeatPassword, userProvincia, userCiudad, userImagen, userRol);
                    }
                });
        break;
        case "no":
            requestNewUser(userNombre, userApellido, userEmail, userPassword, userRepeatPassword, userProvincia, userCiudad, userImagen, userRol);
        break;
    }
    
}

function requestNewUser(userNombre, userApellido, userEmail, userPassword, userRepeatPassword, userProvincia, userCiudad, userImagen, userRol){
    if(userImagen == '')
        var data = {userNombre:userNombre, userApellido:userApellido, userEmail:userEmail, userPassword:userPassword, userRepeatPassword:userRepeatPassword, userProvincia:userProvincia, userCiudad:userCiudad, userRol:userRol};
    else
        var data = {userNombre:userNombre, userApellido:userApellido, userEmail:userEmail, userPassword:userPassword, userRepeatPassword:userRepeatPassword, userProvincia:userProvincia, userCiudad:userCiudad, userImagen:userImagen, userRol:userRol};
   
    //console.log(data);
    var alertPW = '<div class="alert alert-danger" role="alert"><strong>Oh! Las contraseñas no coinciden!</strong></div>';
    var alertObli = '<div class="alert alert-danger" role="alert"><strong>Ojito con los ** ! Rellena los campos obligatorios!</strong></div>';
    var alertFalse = '<div class="alert alert-danger" role="alert"><strong>Error de Servidor, contacte con un admisitrador.</strong></div>';
    var alertEmail = '<div class="alert alert-danger" role="alert"><strong>El Email no es valido.</strong></div>';
    $.ajax({
        url: urlInsertUser,
        dataType: "jsonp",
        jsonp: "callback",
        data: data,
        beforeSend: function () {
            //$("#divAdd").html('Creando Usuario...');
        },
        success: function (data) {
            switch(data.status){
                case "pw":
                    $('#alertaMssg').html(alertPW);
                break;
                case "obli":
                    $('#alertaMssg').html(alertObli);
                break;
                case "true":
                    $('#modalAdd').modal('hide');
                    showUsers();
                break;
                case "false":
                    $('#alertaMssg').html(alertFalse);
                case "email":
                    $('#alertaMssg').html(alertEmail);
                break;
            } 
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#divAdd").html('No se ha podido añadir Usuarios.');
          }
    });
}

/* Mostrar info del usuario que se le ha hecho click para el update */
var urlSelectUserById = "./php/user/showUserById.php";
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
                modal += '<div class="form-group"><label for="">id:</label><input id="inputId" type="text" name="id" placeholder="'+respJSON[k].id_usuario+'" value="'+respJSON[k].id_usuario+'" readonly></div>';    
                modal += '<div class="form-group"><label for="">Nombre:</label><input id="inputNombre" type="text" name="nombre" placeholder="'+respJSON[k].nombre+'" value="'+respJSON[k].nombre+'"></div>';
                modal += '<div class="form-group"><label for="">Apellidos:</label><input id="inputApellido" type="text" name="apellidos" placeholder="'+respJSON[k].apellido+'" value="'+respJSON[k].apellido+'"></div>';
                modal += '<div class="form-group"><label for="">Email:</label><input id="inputEmail" type="email" name="email" placeholder="'+respJSON[k].email+'" value="'+respJSON[k].email+'"></div>';
                modal += '<div class="form-group"><label for="">Provincia:</label><input id="inputProvincia" type="text" name="provincia" placeholder="'+respJSON[k].provincia+'" value="'+respJSON[k].provincia+'"></div>';
                modal += '<div class="form-group"><label for="">Ciudad:</label><input id="inputCiudad" type="text" name="ciudad" placeholder="'+respJSON[k].ciudad+'" value="'+respJSON[k].ciudad+'"></div>';
                modal += '<div class="form-group"><label for="">Imagen:</label><input id="inputImagen" type="file" name="imagen" placeholder="'+respJSON[k].imagen+'" value="'+respJSON[k].imagen+'"></div>';
                modal += '<span id="imgMssg"></span>';
                modal += '<div class="form-group"><label for="">Rol:</label><select id="inputRol"><option value="'+respJSON[k].rol+'">'+respJSON[k].rol+'</option><option value="user">user</option><option value="admin">admin</option></select></div>';    
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
var urlUpdateUserById = "./php/user/updateUserById.php";
var urlUpdateUserImage = "./php/user/updateUserImage.php";
function updateUser(){
    /* Values of Inputs */
    var userId = $("#inputId").val();
    var userNombre = $("#inputNombre").val();
    var userApellido = $("#inputApellido").val();
    var userEmail = $("#inputEmail").val();
    var userProvincia = $("#inputProvincia").val();
    var userCiudad = $("#inputCiudad").val();
    var userRol = $("#inputRol").val();

    /* user Imagen = variable con el nombre de la imagen subida*/
    var userImagen;
    var thereisImage;
    /*  En el caso de que no se quiera subir una imagen nueva... */
    if($("#inputImagen").val() == ''){
        thereisImage = "no";
    } else {
        thereisImage = "ok";
        var image = document.getElementById("inputImagen").files[0];
        var name = image.name;
        var ext = name.split('.').pop().toLowerCase();
        
        if(jQuery.inArray(ext, ['gif','png','jpg','jpeg']) == -1) 
            thereisImage = "ext";

        var fsize = image.size;
        if(fsize > 2000000)
            thereisImage = "size";

        /* Checks   
        console.log("file => "+image);
        console.log("Name => "+name);
        console.log("Ext => "+ext);
        console.log("fsize => "+fsize);
        console.log("------------------");
        */
    }
    

    var alertExt = '<div class="alert alert-danger" role="alert"><strong>Oh snap! Extensión no válida!</strong></div>';
    var alertSize = '<div class="alert alert-danger" role="alert"><strong>Oh snap! El tamaño de la imagen es demasiado grande</strong></div>';
    switch(thereisImage){
        case "ext":
        $('#imgMssg').html(alertExt);
        break;
        case "size":
        $('#imgMssg').html(alertSize);
        break;
        case "ok":
            var form_data = new FormData();
            form_data.append("file", document.getElementById('inputImagen').files[0]);
                $.ajax({
                    url: urlUpdateUserImage,
                    method:"POST",
                    data: form_data,
                    dataType: "jsonp",
                    jsonp: "callback",
                    contentType: false,
                    cache: false,
                    processData: false,
                    beforeSend:function(){},   
                    success:function(data)
                    {
                            //console.log("Status =>"+data.status);
                            //console.log("Path =>"+data.imagen_name);
                            if(data.status === "error")
                                alert("No se ha podido subir la imagen, contacte con un Administrador!");
                            else
                                userImagen = data.imagen_name;
                        
                        /* En cuanto se suba la imagen se updatean los datos */
                        requestUpdateUser(userId, userNombre, userApellido, userEmail, userProvincia, userCiudad, userImagen, userRol);
                    }
                });
        break;
        case "no":
            /*  En el caso de que no se quiera subir una imagen nueva... */
            requestUpdateUser(userId, userNombre, userApellido, userEmail, userProvincia, userCiudad, userImagen, userRol);  
        break;
    } /* End Switch */
    //requestUpdateUser();
}

function requestUpdateUser(userId, userNombre, userApellido, userEmail, userProvincia, userCiudad, userImagen, userImagen, userRol){
    if(userImagen == '')
        var data = {userId:userId, userNombre:userNombre, userApellido:userApellido, userEmail:userEmail, userProvincia:userProvincia, userCiudad:userCiudad, userRol:userRol};
    else
        var data = {userId:userId, userNombre:userNombre, userApellido:userApellido, userEmail:userEmail, userProvincia:userProvincia, userCiudad:userCiudad, userImagen:userImagen, userRol:userRol};
     
        $.ajax({
        url: urlUpdateUserById,
        dataType: "jsonp",
        jsonp: "callback",
        data: data,
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
var urlDeleteUserById = "./php/user/deleteUserById.php";
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

var urlShowGames = "./php/game/showGames.php";
var onceGames = true;
function showGames(pages = 1){
    /* CHECK NAV */
    var isActiveGame = $("#game").hasClass("active");

    if(!isActiveGame){  
        $("#game").addClass("active");
        $("#user").removeClass("active"); 
        $("#key").removeClass("active");  
    }

    /* Prevent null / undefined of pages */
    if (pages == null || typeof pages === 'undefined' || !pages ) 
        pages = 0;
    

    $.ajax({
        url: urlShowGames,
        dataType: "jsonp",
        jsonp: "callback",
        data: {page:pages},
        beforeSend: function () {
            $("#table").html('Cargando...');
        },
        success: function (respJSON) {
            var game = respJSON.data1;
            var total_pages = respJSON.data2;
            /* div = Modal de Añadir Juego */
            var div;
            div = '<div class="form-group"><label for="">Nombre **</label><input id="insertNombre" type="text" name="nombre" placeholder="nombre" value=""></div>';
            div += '<div class="form-group"><label for="">Descripcion **</label><textarea id="insertDescripcion" class="form-control" type="text" name="descripcion" placeholder="descripcion" rows="5"></textarea></div>';
            div += '<div class="form-group"><label for="">Imagen **</label><input id="insertImagen" type="file" name="imagen" placeholder="imagen" value=""></div>';
            div += '<div class="form-group"><label for="">Video </label><input id="insertVideo" type="file" name="video" placeholder="video" value=""></div>';
            div += '<div class="form-group"><label for="">Precio **</label><input id="insertPrecio" type="number" name="precio" placeholder="precio" value=""></div>';
            div += '<span id="alertMssgNewGame"></span>';
            var buttonSubmitModalAdd = '<button type="button" class="btn btn-info" data-dismiss="modal">Cerrar</button><button id="btnInsertGame" type="button" class="btn btn-success">Guardar Game</button>';
            var buttonAddUser = "<a class='btn btn-success' data-toggle='modal' data-target='#modalAdd'><i class='fas fa-user-plus'></i> Añadir Juego</a>";
            var buttonDeleteModal = '<button type="button" class="btn btn-info" data-dismiss="modal">Cerrar</button><button id="deleteGame" type="button" class="btn btn-danger">Eliminar Juego</button>';
            var buttonUpdateModal = '<button type="button" class="btn btn-info" data-dismiss="modal">Cerrar</button><button id="updateGame" type="button" class="btn btn-danger">Editar Juego</button>';
    
            var table = "<div class='table-responsive col-lg-12'>";
            table+= "<table>";
            table += "<tbody><tr> <td>id</td> <td>nombre</td> <td>descripcion</td> <td>imagen</td> <td>video</td> <td>precio</td> </tr> </tr> </tbody>";
            for(var k = 0; k < game.length; k++){
                table += "<tr> <td>"+game[k].id_articulo_juego+"</td> <td>"+game[k].nombre+"</td> <td>"+game[k].descripcion+"</td> <td>"+game[k].imagen+"</td> <td>"+game[k].video+"</td> <td>"+game[k].precio+"€</td>";
                table += "<td> <a class='editarGame btn btn-warning' data-toggle='modal' data-target='#modalEdit' data-idGame='"+game[k].id_articulo_juego+"'><i class='fas fa-edit'></i> Editar</a> </td>";
                table += '<td> <a class="btn btn-danger" onclick="putIdInInput('+game[k].id_articulo_juego+',\'' + game[k].nombre + '\')" data-toggle="modal" data-target="#modalDelete"><i class="fas fa-trash-alt"></i> Eliminar</a> </td> </tr>';
            }
            table += "</table></div>";

            /* PAGINATION */
            var output_pagination = "<span id='divPagination'>";
            for(var i=1; i<=total_pages; i++){
              output_pagination += "<span class='pagination pagination_link_game' id='"+i+"'>"+i+"</span>"; 
            }
            output_pagination += "</span>";

            /* AÑADIR TABLA */
            $("#table").html(buttonAddUser);
            $("#table").append(output_pagination);
            $("#table").append(table);
            $('#formInsertUser').html(div);
            /* AÑADIR BOTONES EN LOS MODALES */
            $('#modalFooterAdd').html(buttonSubmitModalAdd);
            $('#modalFooterDelete').html(buttonDeleteModal);
            $('#modalFooterEdit').html(buttonUpdateModal);
            /* CRUD GAME */
            $('#btnInsertGame').click(insertNewGame);
            $('.editarGame').click(editFormGame);
            $('#deleteGame').click(deleteGame);
            /* PAGINATION */ 
            $('.pagination_link_game').click(passPaginationGame);
            checkPaginationGames(pages);
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#table").html('No se ha podido añadir los Usuarios.');
          }
    });
}

/* PAGINATION USERS */
function passPaginationGame(){
    var page = $(this).attr("id");
    showGames(page);
}

function checkPaginationGames(pages){
    /* PAGINATION ACTIVE */
    if(onceGames == true ){
        $("#divPagination .pagination_link_game").each(function( i ) {
            if(i === 0){
                $(this).addClass('activePage');
                console.log("I:"+i+ " p: "+pages);
            }
        });  
        onceGames = false;
    } else {
        pages = pages - 1;
        $("#divPagination .pagination_link_game").each(function( i ) {
            var isPageActive = $(this).hasClass("activePage");
            console.log("I:"+i+ " p: "+pages);
            if(i == pages){
                $(this).addClass("activePage"); 
                console.log("add");
            } else {
                $(this).removeClass("activePage"); 
                console.log("remove");
            }
        }); 
    } 
}

var urlInsertNewGame = "./php/game/insertNewGame.php";
var urlUploadGameImage = "./php/game/uploadGameImage.php";
function insertNewGame(){
    var gameNombre = $("#insertNombre").val();
    var gameDescripcion = $("#insertDescripcion").val();
    var gameImagen = $("#insertImagen").val();
    var gameVideo = $("#insertVideo").val();
    var gamePrecio = $("#insertPrecio").val();

    /* user Imagen = variable con el nombre de la imagen subida*/
    var gameImagen;
    var thereisImage;

    if($("#insertImagen").val() == ''){
        thereisImage = "no";
    } else {
        thereisImage = "ok";
        var image = document.getElementById("insertImagen").files[0];
        var name = image.name;
        var ext = name.split('.').pop().toLowerCase();
        
        if(jQuery.inArray(ext, ['gif','png','jpg','jpeg']) == -1) 
            thereisImage = "ext";

        var fsize = image.size;
        if(fsize > 2000000)
            thereisImage = "size";
        
        /* Checks   
        console.log("file => "+image);
        console.log("Name => "+name);
        console.log("Ext => "+ext);
        console.log("fsize => "+fsize);
        console.log("------------------");
        */
    }

    var alertExt = '<div class="alert alert-danger" role="alert"><strong>Oh snap! Extensión no válida!</strong></div>';
    var alertSize = '<div class="alert alert-danger" role="alert"><strong>Oh snap! El tamaño de la imagen es demasiado grande</strong></div>';
    var alertNo = '<div class="alert alert-danger" role="alert"><strong>Oh!</strong> Es obligatorio indicar una imagen.</div>';
    switch(thereisImage){
        case "ext":
        $('#alertMssgNewGame').html(alertExt);
        break;
        case "size":
        $('#alertMssgNewGame').html(alertSize);
        break;
        case "ok":
            var form_data = new FormData();
            form_data.append("file", document.getElementById('insertImagen').files[0]);
                $.ajax({
                    url: urlUploadGameImage,
                    method:"POST",
                    data: form_data,
                    dataType: "jsonp",
                    jsonp: "callback",
                    contentType: false,
                    cache: false,
                    processData: false,
                    beforeSend:function(){},   
                    success:function(data)
                    {
                        //console.log("---- SUCCESS ----");
                        //console.log("Status => "+data.status);
                        //console.log("Path => "+data.imagen_name);
                        if(data.status === "error")
                            alert("No se ha podido subir la imagen, contacte con un Administrador!");
                        else
                            gameImagen = data.imagen_name;
                        
                        /* En cuanto se suba la imagen se updatean los datos */
                        requestNewGame(gameNombre, gameDescripcion, gameImagen, gameVideo, gamePrecio);
                    }
                });
        break;
        case "no":
        $('#alertMssgNewGame').html(alertNo);
        break;
    }
}

function requestNewGame(gameNombre, gameDescripcion, gameImagen, gameVideo, gamePrecio){
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
        success: function (data) {
            var alertFalse = '<div class="alert alert-danger" role="alert"><strong>Error de Servidor.</strong> Contacte con un administrador.</div>';
            var alertObli = '<div class="alert alert-danger" role="alert"><strong>Ojito con los ** !</strong> Rellena los campos obligatorios.</div>';
            switch(data.status){
                case "true":
                    $('#modalAdd').modal('hide');
                    showGames();
                break;
                case "false":
                $('#alertMssgNewGame').html(alertFalse);
                break;
                case "obli":
                $('#alertMssgNewGame').html(alertObli);
                break;
            }
            
            
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#divAdd").html('No se ha podido añadir Usuarios.'+xhr);
          }
    });
}

/* Eliminar Juego */
var urlDeleteGameById = "./php/game/deleteGameById.php";
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
var urlSelectGameById = "./php/game/showGameById.php";
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
                modal += '<div class="form-group"><label for="">id:</label><input id="inputId" type="text" name="id" placeholder="'+respJSON[k].id_articulo_juego+'" value="'+respJSON[k].id_articulo_juego+'" readonly></div>';    
                modal += '<div class="form-group"><label for="">Nombre:</label><input id="inputNombre" type="text" name="nombre" placeholder="'+respJSON[k].nombre+'" value="'+respJSON[k].nombre+'"></div>';
                modal += '<div class="form-group"><label for="">Descripcion:</label><textarea class="form-control" id="inputDescripcion" type="text" name="descripcion" placeholder="'+respJSON[k].descripcion+'" rows="5" value="'+respJSON[k].descripcion+'">'+respJSON[k].descripcion+'</textarea></div>';
                modal += '<div class="form-group"><label for="">Imagen:</label><input id="inputImagen" type="file" name="imagen" placeholder="'+respJSON[k].imagen+'" value="'+respJSON[k].imagen+'"></div>';
                modal += '<div class="form-group"><label for="">Video:</label><input id="inputVideo" type="file" name="video" placeholder="'+respJSON[k].video+'" value="'+respJSON[k].video+'"></div>';
                modal += '<div class="form-group"><label for="">Precio:</label><input id="inputPrecio" type="number" name="precio" placeholder="'+respJSON[k].precio+'" value="'+respJSON[k].precio+'"></div>';
                modal += '<span id="alertaMssgUpdate"></span>';  
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
var urlUpdateGameById = "./php/game/updateGameById.php";
function updateGame(){
    var gameId = $("#inputId").val();
    var gameNombre = $("#inputNombre").val();
    var gameDescripcion = $("#inputDescripcion").val();
    //var gameImagen = $("#inputImagen").val();
    var gameVideo = $("#inputVideo").val();
    var gamePrecio = $("#inputPrecio").val();

    /* user Imagen = variable con el nombre de la imagen subida*/
    var gameImagen;
    var thereisImage;
    /*  En el caso de que no se quiera subir una imagen nueva... */
    if($("#inputImagen").val() == ''){
        thereisImage = "no";
    } else {
        thereisImage = "ok";
        var image = document.getElementById("inputImagen").files[0];
        var name = image.name;
        var ext = name.split('.').pop().toLowerCase();
        
        if(jQuery.inArray(ext, ['gif','png','jpg','jpeg']) == -1) 
            thereisImage = "ext";

        var fsize = image.size;
        if(fsize > 2000000)
            thereisImage = "size";
        /*
        console.log("file => "+image);
        console.log("Name => "+name);
        console.log("Ext => "+ext);
        console.log("fsize => "+fsize);
        console.log("------------------");
        */
    }

    var alertExt = '<div class="alert alert-danger" role="alert"><strong>Oh snap! Extensión no válida!</strong></div>';
    var alertSize = '<div class="alert alert-danger" role="alert"><strong>Oh snap! El tamaño de la imagen es demasiado grande</strong></div>';
    switch(thereisImage){
        case "ext":
        $('#alertaMssgUpdate').html(alertExt);
        break;
        case "size":
        $('#alertaMssgUpdate').html(alertSize);
        break;
        case "ok":
            var form_data = new FormData();
            form_data.append("file", document.getElementById('inputImagen').files[0]);
                $.ajax({
                    url: urlUploadGameImage,
                    method:"POST",
                    data: form_data,
                    dataType: "jsonp",
                    jsonp: "callback",
                    contentType: false,
                    cache: false,
                    processData: false,
                    beforeSend:function(){},   
                    success:function(data)
                    {
                            //console.log("Status =>"+data.status);
                            //console.log("Path =>"+data.imagen_name);
                            if(data.status === "error")
                                alert("No se ha podido subir la imagen, contacte con un Administrador!");
                            else
                                gameImagen = data.imagen_name;
                        
                        /* En cuanto se suba la imagen se updatean los datos */
                        requestUpdateGame(gameId, gameNombre, gameDescripcion, gameImagen, gameVideo, gamePrecio);
                    }
                });
        break;
        case "no":
            requestUpdateGame(gameId, gameNombre, gameDescripcion, gameImagen, gameVideo, gamePrecio);
        break;
    } /* End Switch */
}

function requestUpdateGame(gameId, gameNombre, gameDescripcion, gameImagen, gameVideo, gamePrecio){
    if(gameImagen == '')
        var data = {gameId:gameId, gameNombre:gameNombre, gameDescripcion:gameDescripcion, gameVideo:gameVideo, gamePrecio:gamePrecio};
    else
        var data = {gameId:gameId, gameNombre:gameNombre, gameDescripcion:gameDescripcion, gameImagen:gameImagen, gameVideo:gameVideo, gamePrecio:gamePrecio};
    console.log(data); 
    $.ajax({
        url: urlUpdateGameById,
        dataType: "jsonp",
        jsonp: "callback",
        data: data,
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

/* 
//////////////////////////////////////////   KEYS   ////////////////////////////////////////////// 
*/

var urlShowKeys = "./php/key/showKeys.php";
var onceKeys = true;
function showKeys(pages){
    /* CHECK NAV */
    var isActiveKey = $("#key").hasClass("active");

    if(!isActiveKey){  
        $("#key").addClass("active");
        $("#game").removeClass("active"); 
        $("#user").removeClass("active");  
    }

    /* Prevent null / undefined of pages */
    if (pages == null || typeof pages == 'undefined') 
        pages = 0;

    $.ajax({
        url: urlShowKeys,
        dataType: "jsonp",
        jsonp: "callback",
        data: {page:pages},
        beforeSend: function () {
            $("#table").html('Cargando...');
        },
        success: function (respJSON) {
            var llaves = respJSON.data1;
            var total_pages = respJSON.data2;
            var div;
            div = '<div class="form-group"><label for="">Llave **</label><input id="insertLlave" type="text" name="llave" placeholder="llave" value=""></div>';
            div += '<span id="mssgNewKey"></span>';
            var buttonSubmitModalAdd = '<button type="button" class="btn btn-info" data-dismiss="modal">Cerrar</button><button id="btnInsertKey" type="button" class="btn btn-success">Guardar Llave</button>';
            var buttonAddUser = "<a class='btn btn-success' data-toggle='modal' data-target='#modalAdd'><i class='fas fa-user-plus'></i> Añadir Llave</a>";
            var buttonDeleteModal = '<button type="button" class="btn btn-info" data-dismiss="modal">Cerrar</button><button id="deleteKey" type="button" class="btn btn-danger">Eliminar Llave</button>';
            var buttonUpdateModal = '<button type="button" class="btn btn-info" data-dismiss="modal">Cerrar</button><button id="updateKey" type="button" class="btn btn-danger">Editar Llave</button>';
    
            var table = "<div class='table-responsive col-lg-12'>";
            table+= "<table>"; 
            table += "<tbody><tr> <td>id</td> <td>nombre</td> <td>llave</td> <td>id de juego</td> </tr> </tr> </tbody>";
            for(var k = 0; k < llaves.length; k++){
                table += "<tr> <td>"+llaves[k].id_llaves+"</td> <td>"+llaves[k].nombre+"</td> <td>"+llaves[k].llave+"</td> <td>"+llaves[k].id_articulo_juego+"</td>";
                table += "<td> <a class='editarKey btn btn-warning' data-toggle='modal' data-target='#modalEdit' data-idKey='"+llaves[k].id_llaves+"'><i class='fas fa-edit'></i> Editar</a> </td>";
                table += '<td> <a class="btn btn-danger" onclick="putIdInInput('+llaves[k].id_llaves+',\'' + llaves[k].nombre + '\')" data-toggle="modal" data-target="#modalDelete"><i class="fas fa-trash-alt"></i> Eliminar</a> </td> </tr>';
            }
            table += "</table></div>";

            /* PAGINATION */
            var output_pagination = "<span id='divPagination'>";
            for(var i=1; i<=total_pages; i++){
              output_pagination += "<span class='pagination pagination_link_key' id='"+i+"'>"+i+"</span>"; 
            }
            output_pagination += "</span>";

            /* AÑADIR TABLA */
            $("#table").html(buttonAddUser);
            $("#table").append(output_pagination);
            $("#table").append(table);
            $('#formInsertUser').html(div);
            /* AÑADIR BOTONES EN LOS MODALES */
            $('#modalFooterAdd').html(buttonSubmitModalAdd);
            $('#modalFooterDelete').html(buttonDeleteModal);
            $('#modalFooterEdit').html(buttonUpdateModal);
            /* CRUD LLAVE */
            $('#btnInsertKey').click(insertNewKey);
            $('.editarKey').click(editFormKey);
            $('#deleteKey').click(deleteKey);  
            /* PAGINATION */ 
            $('.pagination_link_key').click(passPaginationKey);
            checkPaginationKeys(pages);
            var formType = "add";
            rellenarComboBox(formType);
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#table").html('No se ha podido añadir los Usuarios.');
          }
    });
}

/* PAGINATION LLAVES */
function passPaginationKey(){
    var page = $(this).attr("id");
    showKeys(page);
}

function checkPaginationKeys(pages){
    /* PAGINATION ACTIVE */
    if(onceKeys == true ){
        $("#divPagination .pagination").each(function( i ) {
            if(i === 0){
                $(this).addClass('activePage');
            }
        });  
        onceKeys = false;
    } else {
        pages = pages - 1;
        $("#divPagination .pagination").each(function( i ) {
            var isPageActive = $(this).hasClass("activePage");
            console.log("I:"+i+ " p: "+pages);
            if(i == pages){
                $(this).addClass("activePage"); 
                console.log("add");
            } else {
                $(this).removeClass("activePage"); 
                console.log("remove");
            }
        }); 
    } 
}

var urlInsertNewKey = "./php/key/insertNewKey.php"
function insertNewKey(){
    var keyLlave = $("#insertLlave").val();
    var keyIdJuego = $("#inputIdJuego").val();
    //var keyIdJuego = $("#insertIdJuego").val();

    $.ajax({
        url: urlInsertNewKey,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            keyLlave:keyLlave,
            keyIdJuego:keyIdJuego
        },
        beforeSend: function () {
            //$("#divAdd").html('Creando Usuario...');
        },
        success: function (respJSON) {
            var alertObli = '<div class="alert alert-danger" role="alert"><strong>Ojo con los **.</strong> Tienes que rellenar los campos requeridos.</div>';
            var alertFalse = '<div class="alert alert-danger" role="alert"><strong>Oh!</strong> Error de Servidor. Contacte con un administrador.</div>';
                switch(respJSON.status){
                    case "true":
                        $('#modalAdd').modal('hide');
                        showKeys();
                    break;
                    case "obli":
                        $('#mssgNewKey').html(alertObli);
                    break;
                    case "false":
                        $('#mssgNewKey').html(alertFalse);
                    break;
                }
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#divAdd").html('No se ha podido añadir Llaves.'+xhr);
          }
    });
}

/* Eliminar Llave */
var urlDeleteKeyById = "./php/key/deleteKeyById.php";
function deleteKey(){
    $.ajax({
        url: urlDeleteKeyById,
        dataType: "jsonp",
        jsonp: "callback",
        data: {keyId:thisIdUser},
        beforeSend: function () {
            //$("#modalBodyDelete").html('Eliminando...');
        },
        success: function (respJSON) {
            thisIdUser = "";
            $('#modalDelete').modal('hide');
            showKeys();
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#formUpdateUser").html('No se ha podido ELIMINAR el Juego.');
          }
    });
}

/* Mostrar info de la llave que se le ha hecho click para el update */
var urlSelectKeyById = "./php/key/showKeyById.php";
function editFormKey(){
    var idKey = $(this).attr("data-idKey");
    $.ajax({
        url: urlSelectKeyById,
        dataType: "jsonp",
        jsonp: "callback",
        data: {idKey:idKey},
        beforeSend: function () {
            $("#divEditUser").html('Cargando...');
        },
        success: function (respJSON) {
            
            var modal = "<form id='formUpdateUser' method='post'>";
            for(var k = 0; k < respJSON.length; k++){
                modal += '<div class="form-group"><label for="">id:</label><input id="inputId" type="number" name="id" placeholder="'+respJSON[k].id_llaves+'" value="'+respJSON[k].id_llaves+'" readonly></div>';    
                modal += '<div class="form-group"><label for="">Llave:</label><input id="inputLlave" type="text" name="llave" placeholder="'+respJSON[k].llave+'" value="'+respJSON[k].llave+'"></div>';
                //modal += '<div class="form-group"><label for="">Id Juego:</label><input id="inputIdJuego" type="number" name="inputIdJuego" placeholder="'+respJSON[k].id_articulo_juego+'" value="'+respJSON[k].id_articulo_juego+'"></div>';
            }
            modal += '</form>';
            $("#divEditUser").html(modal);
            $('#updateKey').click(updateKey);
            
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#divEditUser").html('No se ha podido cargar el Formulario.');
          }
    }); 
    var formType = "edit";
    rellenarComboBox(formType);
    /* coger el valor del select option // Sim esto se confunde con el select option de Añadir llave. */
    $(document).on('change','#inputIdJuego',function(){
        selectedTextInputKey = $(this).val();
   });
}

var urlRellenarComboBox = "./php/key/rellenarComboBox.php";
function rellenarComboBox(formType){
    $.ajax({
        url: urlRellenarComboBox,
        dataType: "jsonp",
        jsonp: "callback",
        data: {},
        beforeSend: function () {
            $("#divEditUser").html('Cargando...');
        },
        success: function (respJSON) {
            var juegos = respJSON.data;
            var comboBox = '<div class="form-group"><label for="">Id del Juego:</label><select class="inputIdJuego2" id="inputIdJuego">';
            for(var k = 0; k < juegos.length; k++){
                comboBox += '<option value="'+juegos[k].id_articulo_juego+'">"'+juegos[k].nombre+'"</option>';
            }
            comboBox += '</select></div>';
            if(formType == "add")
                $("#formInsertUser").append(comboBox);
            else
                $("#divEditUser").append(comboBox);
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#divEditUser").html('No se ha podido cargar el Formulario.');
          }
    });
}

/* EDITAR JUEGO */
var urlUpdateKeyById = "./php/key/updateKeyById.php";
var selectedTextInputKey;
function updateKey(){
    var keyId = $("#inputId").val();
    var keyLlave = $("#inputLlave").val();
    //var keyIdJuego = $("#inputIdJuego").val();
    alert(keyId +" "+ keyLlave +" "+ selectedTextInputKey +" "+ $(".inputIdJuego2").val());
    $.ajax({
        url: urlUpdateKeyById,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            keyId:keyId,
            keyLlave:keyLlave,
            keyIdJuego:selectedTextInputKey
        },
        beforeSend: function () {
            $("#formUpdateUser").html('Actualizando...');
        },
        success: function (respJSON) {
            $('#modalEdit').modal('hide');
            showKeys();
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#formUpdateUser").html('No se ha podido actualizar el Usuario.');
          }
    });
}