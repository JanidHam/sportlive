<!DOCTYPE html>
<html>
  <head>
    <title>SPORTLIVE</title>

    <!-- Viewport mobile tag for sensible mobile support -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    
    <!--  
        Stylesheets and Preprocessors
        ==============================

        You can always bring in CSS files manually with `<link>` tags, or asynchronously
        using a solution like AMD (RequireJS).  Or, if you like, you can take advantage 
        of Sails' conventional asset pipeline (boilerplate Gruntfile).

        By default, stylesheets from your `assets/styles` folder are included
        here automatically (between STYLES and STYLES END). Both CSS (.css) and LESS (.less)
        are supported. In production, your styles will be minified and concatenated into
        a single file.
        
        To customize any part of the built-in behavior, just edit `tasks/pipeline.js`.
        For example, here are a few things you could do:
            
            + Change the order of your CSS files
            + Import stylesheets from other directories
            + Use a different or additional preprocessor, like SASS, SCSS or Stylus
    -->

    <!--STYLES-->
    <link rel="stylesheet" href="/styles/asistenciaClientes.css">
    <link rel="stylesheet" href="/styles/bootstrap.min.css">
    <link rel="stylesheet" href="/styles/importer.css">
    <link rel="stylesheet" href="/styles/style-responsive.css">
    <link rel="stylesheet" href="/styles/style.css">
    <!--STYLES END-->
    {% block cssFiles %}{% endblock cssFiles %}
  </head>

  <body>
      <section id="container" >
      <!-- **********************************************************************************************************************************************************
      TOP BAR CONTENT & NOTIFICATIONS
      *********************************************************************************************************************************************************** -->
      <!--header start-->
      <header class="header black-bg">
              <div class="sidebar-toggle-box">
                  <div class="fa fa-bars tooltips" data-placement="right" data-original-title="Ocultar Barra Lateral"></div>
              </div>
            <!--logo start-->
            <a href="index.html" class="logo"><b>SPORTLIVE</b></a>
            <!--logo end-->            
            </div>
            <div class="top-menu">
              <ul class="nav pull-right top-menu">
                    <li><button class="btn btn-danger logOut" id="logout">Salir</button></li>
              </ul>
            </div>
        </header>
      <!--header end-->
      
      <!-- **********************************************************************************************************************************************************
      MAIN SIDEBAR MENU
      *********************************************************************************************************************************************************** -->
      <!--sidebar start-->
      <aside id ="sidebar-react">
          
      </aside>
      <!--sidebar end-->
      
      <!-- **********************************************************************************************************************************************************
      MAIN CONTENT
      *********************************************************************************************************************************************************** -->
      <!--main content start-->
      <section id="main-content">
          <section class="wrapper">

              <div class="row">
                  <div class="col-lg-12 main-chart">
                  {% block body %}{% endblock body %}
                  </div><!-- /col-lg-12 END SECTION MIDDLE -->
              </div><!--/row -->
          </section>
      </section>

      <!--main content end-->
  </section>
    



    <!--
        Client-side Templates
        ========================

        HTML templates are important prerequisites of modern, rich client applications.
        To work their magic, frameworks like Backbone, Angular, Ember, and Knockout require
        that you load these templates client-side.

        By default, your Gruntfile is configured to automatically load and precompile
        client-side JST templates in your `assets/templates` folder, then
        include them here automatically (between TEMPLATES and TEMPLATES END).
        
        To customize this behavior to fit your needs, just edit `tasks/pipeline.js`.
        For example, here are a few things you could do:

            + Import templates from other directories
            + Use a different template engine (handlebars, jade, dust, etc.)
            + Internationalize your client-side templates using a server-side
              stringfile before they're served.
    -->

    <!--TEMPLATES-->
    
    <!--TEMPLATES END-->


    <!--

      Client-side Javascript
      ========================

      You can always bring in JS files manually with `script` tags, or asynchronously
      on the client using a solution like AMD (RequireJS).  Or, if you like, you can 
      take advantage of Sails' conventional asset pipeline (boilerplate Gruntfile).

      By default, files in your `assets/js` folder are included here
      automatically (between SCRIPTS and SCRIPTS END).  Both JavaScript (.js) and
      CoffeeScript (.coffee) are supported. In production, your scripts will be minified
      and concatenated into a single file.
      
      To customize any part of the built-in behavior, just edit `tasks/pipeline.js`.
      For example, here are a few things you could do:
          
          + Change the order of your scripts
          + Import scripts from other directories
          + Use a different preprocessor, like TypeScript

    -->

    <!--SCRIPTS-->
    <script src="/js/dependencies/sails.io.js"></script>
    <script src="/js/jquery.js"></script>
    <!--SCRIPTS END-->
    <!-- <script src="/js/dist/components/clientsAsists.js"></script> -->
    {% block jsFiles %}{% endblock jsFiles %}
    <!-- <script src="/js/dist/components/addClient.js"></script> -->
    <!-- <script src="js/dist/components/sidebar/sideBar.js" ></script> -->
  </body>
</html>
