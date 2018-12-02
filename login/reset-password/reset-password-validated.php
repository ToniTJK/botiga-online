<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    
    <meta http-equiv="Content-Security-Policy" 
              content="img-src 'self' 
              http://localhost
              http://localhost:8888
              http://dualtest.tonitorrescuenca.com
              http://tonitorrescuenca.com
              data: gap: https://ssl.gstatic.com 
              'unsafe-inline' 'unsafe-eval'; media-src *;">
    <title>FastKeys Reset Password</title>
    <!-- jQuery first -->
    <script type="text/javascript" src="../../assets/js/jquery.js"></script>

    <!-- Bootstrap -->
    <link rel="stylesheet" href="../../assets/bootstrap/dist/css/bootstrap.min.css" />
    <script type="text/javascript" src="../../assets/bootstrap/dist/js/bootstrap.min.js"></script>

    <!-- script js -->
    <script type="text/javascript" src="./reset-password-validated.js"></script>

    <!-- Font Awesome 5+ -->
    <script src="../../node_modules/@fortawesome/fontawesome-free/js/all.js"></script>

    <!-- Styles -->
    <link rel="stylesheet" href="./reset-password-validated.css"/>
  </head>
  <body>
    <div class="container">

      <div class="jumbotron">
        <img src="../../img/Logo_5.png" alt="logo FastKeys">
        <!--<h2>Log In</h2>-->
        <div id="mssg"></div>
        <form class="formResetPassword">
          <div class="inputPassword">
            <div class="input-group">
              <span class="input-group-addon"><i class="fas fa-at"></i></span>
              <input id="password" type="password" class="form-control" name="password" placeholder="Password" required>
            </div>
          </div>
          <?php echo $_GET['id']; ?>
          <div class="inputRepeatPassword">
            <div class="input-group">
              <span class="input-group-addon"><i class="fas fa-at"></i></span>
              <input id="repeatPassword" type="password" class="form-control" name="repeatPassword" placeholder="Repeat Password" required>
            </div>
          </div>

            <a id="reset" class="btn btn-success" value="reset">Cambiar</a>
            <div class="links">
              <a href="../../registro/registro.html">Registrate!</a>   <a href="../login.html">Log In</a>
            </div>
        </form>
      </div>
    </div>

  </body>
</html>
