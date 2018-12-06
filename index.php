<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pagina Home</title>
    <!-- jQuery first -->
    <script type="text/javascript" src="./assets/js/jquery.js"></script>

    <!-- Bootstrap -->
    <link rel="stylesheet" href="./assets/bootstrap/dist/css/bootstrap.min.css" />
    <script type="text/javascript" src="./assets/bootstrap/dist/js/bootstrap.min.js"></script>

    <!-- script js -->
    <script type="text/javascript" src="./assets/js/script.js"></script>

    <!-- Font Awesome 5+ -->
    <script src="./node_modules/@fortawesome/fontawesome-free/js/all.js"></script>

    <!-- Styles -->
    <link rel="stylesheet" href="./assets/css/style.css"> <!-- CSS -->

    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

  </head>
  <body>
    <nav class="cabecera">
		<div class="toggle">

			<a href="index.php" ><img class="logo" src="img\logo_5.png"></a>
			<a  onclick="abrirMenu()"><i class="fas fa-bars"></i></a>
		</div>
		<div class="logo-grande">
			<a href="index.php" ><img class="logo" src="img\logo_5.png"></a>
		</div>
        <div class="cercadorr" style="float:left; margin-top: 20px;margin-left: 350px"><input type="text" placeholder="Search.."></div>
		<ul id="menuu" class="carrito-perfil">
			<li><a href=""><i class="fas fa-user fa-2x"></i> </a></li>
			<li><a href=""><i class="fas fa-shopping-cart fa-2x"></i></a></li>
		</ul>
	</nav>

    <!-- Header Carousel -->
    <header id="myCarousel" class="carousel slide">
        <!-- Indicators -->
        <ol class="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>

        <!-- Wrapper for slides -->
        <div class="carousel-inner">
            <div class="item active">
                <div class="fill" style="background-image:url('https://i.redd.it/d3wvqyn560jy.png');"></div>
                <div class="carousel-caption">
                    <h2>Caption 1</h2>
                </div>
            </div>
            <div class="item">
                <div class="fill" style="background-image:url('https://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_PokemonLetsGoEevee_enGB_image1600w.jpg');"></div>
                <div class="carousel-caption">
                    <h2>Caption 2</h2>
                </div>
            </div>
            <div class="item">
                <div class="fill" style="background-image:url('https://3.bp.blogspot.com/-Kc0eQeWh39U/WeKQA4qVVrI/AAAAAAAAAIg/k6D_5zIVW_EKsmpZEW_B3RGrUwUm99JNwCPcBGAYYCw/s1600/PlayerUnknowns-Battlegrounds-03-HD-blurred.png');"></div>
                <div class="carousel-caption">
                    <h2>Caption 3</h2>
                </div>
            </div>
        </div>
    </header>

    <!-- Page Content -->
    <div class="container">

        <!-- Marketing Icons Section -->
        <div class="col-md-12 ">
            <div class="col-md-12">
                <h2><strong>Novedades</strong></h2>
            </div>
            <div class="container">
            	<div class="row">
            	
        

        <?php
        require "./baseDatos/dbConect.php";
        $lasql = "select * from articulos_juegos limit 8";

        $result=mysqli_query($cnx, $lasql);

        // $id_articulo_juego=1;
        // $laconsulta = mysqli_prepare($cnx, $lasql);
        // mysqli_stmt_bind_param($laconsulta);

        // mysqli_stmt_execute($laconsulta);

        // mysqli_stmt_bind_result($laconsulta, $imagen);

         while ($row = $result -> fetch_array()) {

                echo "<div data-idu='".$row['id_articulo_juego']."' class='divclick card col-md-3 col-sm-4'style='margin-top:15px;''>
                            <img class='card-img-top' style='width: 100%;height:150px;' src='".$row['imagen']."' alt='Card image cap'>
                            <div class='card-body'>
                                    <h4 class='card-title'><stron>".$row['nombre']."</strong></h4>
                                    <a class='precio' href='#'>".$row['precio']." €</a>
                            </div>
                    </div>";
                 

         }

        //mysqli_stmt_close($laconsulta);
        //mysqli_close($conexio);

        ?>
        <!-- Portfolio Section -->
                
                </div>
            </div>


        <div class="row">
            <div class="col-lg-12 ">
                <h2 class="page-header"><strong>Mas vendidos</strong></h2>
            
            <div data-idu="9" class="divclick col-md-3 col-sm-6">
                <a href="">
                    <img class="img-responsive img-portfolio img-hover" src="https://eteknix-eteknixltd.netdna-ssl.com/wp-content/uploads/2018/11/battlefield-5-banner2-800x450.jpg" alt="">
                    <span>Battlefield</span>
                </a>
            </div>
            <div data-idu="10" class="divclick col-md-3 col-sm-6">
                <a href="portfolio-item.html">
                    <img class="img-responsive img-portfolio img-hover" src="https://s1.gaming-cdn.com/images/products/186/screenshot/grand-theft-auto-v-wallpaper-5.jpg" alt="">
                    <span>GTA V</span>
                </a>
            </div>
            <div data-idu="11"  class="divclick col-md-3 col-sm-6">
                <a href="portfolio-item.html">
                    <img class="img-responsive img-portfolio img-hover" src="https://wpblink.com/sites/default/files/wallpaper/games/69292/euro-truck-simulator-2-hd-wallpapers-hd-69292-8529013.png" alt="">
                    Euro Truck Simulator 2
                </a>
            </div>
            <div data-idu="12" class="divclick col-md-3 col-sm-6">
                <a href="info_producto.php">
                    <img class="img-responsive img-portfolio img-hover" src="https://www.comunidadxbox.com/wp-content/imagenes/monster-hunter-world-first-review-almost-perfect-logo.jpg.optimal.jpg" alt="">
                    <span>Monster Hunter</span>
                </a>
            </div>
            </div>
        </div>
        <!-- /.row -->

        <!-- Features Section -->
        <div class="row">
            <div class="col-lg-12">
                <h2 class="page-header"><strong>Futuros lanzamientos</strong></h2>
            </div>
            <div class="col-md-6 listaa">

            	<!-- <ul>
					  <li>Coffee</li>
					  <li>Tea</li>
					  <li>Milk</li>
			
			</ul> -->
			
            <p style="font-size: 13pt;">Aqui les mostramos una lista de los futuros juegos que estaran disponibles en nuestra plataforma.</p>
            <ol>
                <li><strong>Pokemon: </strong>Eevee/Pikachu</li>
                <li><strong>Darksiders 3</strong></li>
                <li><strong>Just Cause 4</strong></li>
                <li><strong>Super Smash Bros</strong> Ultimate</li>
        		<li><strong>New Super Mario Bros</strong> U Deluxe</li>
    	 	   	<li><strong>The Last of Us 2</strong></li>
            </ol>
            </div>
            <div class="col-md-6">
                <img class="img-responsive" src="img/futurosjuegos.gif" alt="">
            </div>
        </div>
        <!-- /.row -->

        <!-- Footer -->
        <footer class="" style="background-color:#ddffcc; padding-top: 20px;padding-bottom: 20px; ">

            <!-- Footer Links -->
            <div class="container-fluid text-center text-md-left">

              <!-- Grid row -->
              <div class="row">

                <!-- Grid column -->
                <div class="col-md-6 mt-md-0 mt-3">

                  <!-- Content -->
                  <h5 class="text-uppercase">Fast Key</h5>
                  <p>Pagina creada con fines educativos. xD</p>

                </div>
                <!-- Grid column -->

                

                <!-- Grid column -->
                <div class="col-md-3 mb-md-0 mb-3">

                    <!-- Links -->
                    <ul class="list-unstyled">
                      <li>
                        <a href="#!"><i class="fab fa-instagram fa-2x" style="color:#e4405f;"></i></a>
                      </li>
                      <li>
                        <a href="#!"><i class="fab fa-youtube fa-2x" style="color:#cd201f;"></i></a>
                      </li>
                    </ul>

                  </div>
                  <!-- Grid column -->

                  <!-- Grid column -->
                  <div class="col-md-3 mb-md-0 mb-3">

                    <!-- Links -->
                    <ul class="list-unstyled">
                      <li>
                        <a href="#!"><i class="fab fa-twitter fa-2x" style="color:#2DAAE2;"></i></a>
                      </li>
                      <li>
                        <a href="#!"><i class="fab fa-facebook fa-2x" style="color:#3b5999;"></i></a>
                      </li>
                    </ul>

                  </div>
                  <!-- Grid column -->

              </div>
              <!-- Grid row -->

            </div>
            <!-- Footer Links -->

            <!-- Copyright -->
            <div class="footer-copyright text-center py-3">© 2018 Copyright:
              <a href="https://mdbootstrap.com/education/bootstrap/"> Fast Keys</a>
            </div>
            <!-- Copyright -->

        </footer>
    </div>
  </body>
</html>
