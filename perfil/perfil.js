$( document ).ready(function() {
    /* Al entrar en el perfil cargamos la  */
    showProfile();
    showHistorial();
    $("#editPrivateUser").on('click', savePassword);
});

var alertErrorServidor = '<div class="alert alert-danger" role="alert"><strong>Error de Servidor!</strong> Contacte con un administrador.</div>';
var alertEmail = '<div class="alert alert-danger" role="alert"><strong>Email</strong> no válido.</div>';
var urlShowProfile = "./php/showProfile.php";
function showProfile(){
    $.ajax({
        url: urlShowProfile,
        dataType: "jsonp",
        jsonp: "callback",
        data: {},
        beforeSend: function () {
            $("#info").html('Cargando...');
        },
        success: function (data) {
            var user = data.info;
            var status = data.status;
            switch(status){
                case "true":
                    var rol = "user";
                    var defaultPath = "";
                    for(var k = 0; k < user.length; k++){
                        if(user[k].imagen == "" || user[k].imagen == "null")
                            defaultPath = "profile.png";
                        else 
                            defaultPath = user[k].imagen;

                        if(user[k].rol == "admin")
                            rol = user[k].rol

                        var img = '<img class="imagen img-circle img-responsive img-center" src="../uploads/user/'+defaultPath+'" alt="img profile">';
                        var container = "<h3>"+user[k].nombre+" <small>"+user[k].apellido+"</small></h3>";
                            container += '<div class="col-md-12">';
                                container += '<p> <i class="far fa-envelope"></i> <strong>Email:</strong> '+user[k].email+'</p>';
                                container += '<p> <i class="fas fa-globe-asia"></i> <strong>Provincia:</strong> '+user[k].provincia+'</p>';
                                container += '<p> <i class="fas fa-city"></i> <strong>Ciudad:</strong> '+user[k].ciudad+'</p>';
                                container += '<p> <i class="far fa-clock"></i> <strong>Miembro desde:</strong> '+user[k].fecha_creacion+'</p>';
                            container += '</div>';
                            container += '<div class="col-md-12">';
                                container += '<a id="btnOpenModal" data-idUser="'+user[k].id_usuario+'" class="btn btn-info" data-toggle="modal" data-target="#modalEdit"> Editar Perfil <i class="fas fa-user-edit"></i></a>';
                            container += '</div>';
                            }
                    $("#imgProfile").html(img);
                    $("#info").html(container);
                    $('#btnOpenModal').click(openModalEditUser);
                    
                    var btnAdminPanel = '<a href="../admin-panel/admin-panel.html" class="btn btn-primary" target="_blank">Admin Panel <i class="fas fa-sign-out-alt"></i></a> ';
                    if(rol == "admin")
                        $("#info").append(btnAdminPanel);
                break;
                case "NoUsers":
                    console.log("No Users // redirect");
                break;
                case "false":
                    console.log("Error de Servidor");
                break;
                case "redirect":
                    window.location.replace("../login/login.html");
                break;
            }
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#table").html('No se ha podido añadir los Usuarios.');
          }
    });
}

/* Mostrar info del usuario que se le ha hecho click para el update */
var urlShowModalByUserId = "./php/showModalByUserId.php";
function openModalEditUser(){
    var idUser = $(this).attr("data-idUser");
    $.ajax({
        url: urlShowModalByUserId,
        dataType: "jsonp",
        jsonp: "callback",
        data: {idUser:idUser},
        beforeSend: function () {
            $("#modalContainer").html('Cargando...');
        },
        success: function (resp) {
            var data = resp.output;
            switch(resp.status){
                case "true":
                    var modal = "<form id='formUpdateUser' method='post'>";
                    for(var k = 0; k < data.length; k++){
                        //modal += '<div class="form-group"><label for="">id:</label><input id="inputId" type="text" name="id" placeholder="'+data[k].id_usuario+'" value="'+data[k].id_usuario+'" readonly></div>';    
                        modal += '<div class="form-group"><label for="">Nombre:</label><input id="inputNombre" type="text" name="nombre" placeholder="'+data[k].nombre+'" value="'+data[k].nombre+'"></div>';
                        modal += '<div class="form-group"><label for="">Apellidos:</label><input id="inputApellido" type="text" name="apellidos" placeholder="'+data[k].apellido+'" value="'+data[k].apellido+'"></div>';
                        modal += '<div class="form-group"><label for="">Email:</label><input id="inputEmail" type="email" name="email" placeholder="'+data[k].email+'" value="'+data[k].email+'"></div>';
                        modal += '<div class="form-group"><label for="">Provincia:</label><input id="inputProvincia" type="text" name="provincia" placeholder="'+data[k].provincia+'" value="'+data[k].provincia+'"></div>';
                        modal += '<div class="form-group"><label for="">Ciudad:</label><input id="inputCiudad" type="text" name="ciudad" placeholder="'+data[k].ciudad+'" value="'+data[k].ciudad+'"></div>';
                        modal += '<div class="form-group"><label for="">Imagen:</label><input id="inputImagen" type="file" name="imagen" placeholder="'+data[k].imagen+'" value="'+data[k].imagen+'"></div>';
                        //modal += '<div class="form-group"><label for="">Rol:</label><select id="inputRol"><option value="'+data[k].rol+'">'+data[k].rol+'</option><option value="user">user</option><option value="admin">admin</option></select></div>'; 
                        modal += '<span id="alertMssg"></span>';   
                    }
                    modal += '</form>';
                    $("#modalContainer").html(modal);
                    $('#editUser').click(updateUser);
                break;
                case "noUserFound":
                    $("#modalContainer").html(alertFalse);
                break;
            }
            
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#modalContainer").html('No se ha podido cargar el Formulario.');
          }
    }); 
}

var urlUploadImageUser = "./php/uploadUserImage.php";
function updateUser(){
    var userId = $('#btnOpenModal').attr("data-idUser");
    var userNombre = $('#inputNombre').val();
    var userApellido = $('#inputApellido').val();
    var userEmail = $('#inputEmail').val();
    var userProvincia = $('#inputProvincia').val();
    var userCiudad = $('#inputCiudad').val();
    //var userImagen = $('#inputImagen').val();
    var data = {};

    /* user Imagen = variable con el nombre de la imagen subida*/
    var userImagen;
    var thereisImage;
    /*  En el caso de que no se quiera subir una imagen nueva... Es Opcional. */
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
          
        /*console.log("file => "+image);
        console.log("Name => "+name);
        console.log("Ext => "+ext);
        console.log("fsize => "+fsize);
        console.log("------------------");*/

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
            form_data.append("file", document.getElementById('inputImagen').files[0]);
                $.ajax({
                    url: urlUploadImageUser,
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
                        requestUpdateUser(userId, userNombre, userApellido, userEmail, userProvincia, userCiudad, userImagen);
                    }
                });
            break;
            case "no":
                /*  En el caso de que no se quiera subir una imagen nueva... */
                requestUpdateUser(userId, userNombre, userApellido, userEmail, userProvincia, userCiudad, userImagen);  
            break;
        } /* End Switch */
}

var urlUpdateByUserId = "./php/updateByUserId.php";
function requestUpdateUser(userId, userNombre, userApellido, userEmail, userProvincia, userCiudad, userImagen){
    if(userImagen == '')
        var data = {userId:userId, userNombre:userNombre,userApellido:userApellido,userEmail:userEmail,userProvincia:userProvincia,userCiudad:userCiudad};
    else
        var data = {userId:userId, userNombre:userNombre,userApellido:userApellido,userEmail:userEmail,userProvincia:userProvincia,userCiudad:userCiudad, userImagen:userImagen};
     
        $.ajax({
        url: urlUpdateByUserId,
        dataType: "jsonp",
        jsonp: "callback",
        data: data,
        beforeSend: function () {
            //$("#formUpdateUser").html('Actualizando...');
        },
        success: function (resp) {
            switch(resp.status){
                case "true":
                    $('#modalEdit').modal('hide');
                    showProfile();
                break;
                case "false":
                    $('#alertMssg').html(alertErrorServidor);
                break;
                case "email":
                    $('#alertMssg').html(alertEmail);
                break;
            }
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#modalContainer").html('No se ha podido actualizar el Usuario.');
          }
    });
}

var urlShowHistorial = "./php/showHistorial.php";
function showHistorial(){
    $.ajax({
        url: urlShowHistorial,
        dataType: "jsonp",
        jsonp: "callback",
        data: {},
        beforeSend: function () {
            $("#table").html('Cargando...');
        },
        success: function (data) {
            var juego = data.info;
            var status = data.status;
            switch(status){
                case "true":
                /*echo "<div data-idu='".$row['id_articulo_juego']."' class='divclick card col-md-3 col-sm-4'style='margin-top:15px;''>
                            <img class='card-img-top' style='width: 100%;height:150px;' src='".$row['imagen']."' alt='Card image cap'>
                            <div class='card-body'>
                                    <h4 class='card-title'><stron>".$row['nombre']."</strong></h4>
                                    <a class='precio' href='#'>".$row['precio']." €</a>
                            </div>
                    </div>";*/
                    $("#divHistorial").html("");
                    for(var k = 0; k < juego.length; k++){
                        //var img = '<img class="imagen img-circle img-responsive img-center" src="../uploads/user/'+defaultPath+'" alt="img profile">';
                        var container = '<div class="card col-md-4" style="width: 18rem;">';
                        //container += "<div data-idu='"+juego[k].id_articulo_juego+"' class='divclick card col-md-3 col-sm-4'style='margin-top:15px;";
                                container += '<img class="card-img-top" style="width: 100%;height:150px;" src="../uploads/games/'+juego[k].imagen+'" alt="Card image cap">';
                                container += '<div class="card-body">';
                                    container += "<h4 class='card-title'><strong>"+juego[k].nombre+"</strong></h4>";
                                    container += "<a class='precio' href='#'>"+juego[k].precio+" €</a>";
                                container += '</div>';
                            container += '</div>';
                            $("#divHistorial").append(container);
                    }
                    
                break;
                case "false":
                    console.log("Error de Servidor");
                break;
                case "redirect":
                    //window.location.replace("../login/login.html");
                break;
            }
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#table").html('No se ha podido añadir los Usuarios.');
          }
    });
}

//#alertConfiguracion
var urlSavePassword = "./php/savePassword.php";
function savePassword(){
    var userOldPassword = $('#oldPassword').val();
    var userNewPassword = $('#newPassword').val();
    var userNewRepeatPassword = $('#newRepeatPassword').val();
    $.ajax({
        url: urlSavePassword,
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            userOldPassword:userOldPassword,
            userNewPassword:userNewPassword,
            userNewRepeatPassword:userNewRepeatPassword
        },
        beforeSend: function () {
            //$("#formUpdateUser").html('Actualizando...');
        },
        success: function (resp) {
            var alertPwNo = '<div class="alert alert-danger" role="alert">Tu <strong>contraseña</strong> no es la que indicas.</div>';
            var alertPwNoCoin = '<div class="alert alert-danger alert-dismissible" role="alert">Las <strong> contraseñas</strong> no coinciden.</div>';
            var alertPwYes = '<div class="alert alert-success" role="alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Contraseña</strong> actualizada correctamente.</div>';
            switch(resp.status){
                case "true":
                    $('#modalEditPrivate').modal('hide');
                    $('#alertConfiguracion').html(alertPwYes);
                break;
                case "false":
                    $('#alertMssgPassword').html(alertErrorServidor);
                break;
                case "pwno":
                    $('#alertMssgPassword').html(alertPwNo);
                break;
                case "pwnoCoincide":
                    $('#alertMssgPassword').html(alertPwNoCoin);
                break;
            }
        },
        error:function (xhr, ajaxOptions, thrownError) {
            $("#modalContainer").html('No se ha podido actualizar el Usuario.');
          }
    });
}