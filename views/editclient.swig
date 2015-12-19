{% extends "./base.swig" %}

{% block jsFiles %}
	<script src="/js/dist/components/editClient.js"></script>
{% endblock jsFiles %}

{% block cssFiles %}
  <link rel="stylesheet" href="/styles/editClient.css">
{% endblock cssFiles %}

{% block body %}
<div class="col-lg-12">
	<div class="col-lg-12 color-black" id="edit-client"></div>
</div>

<script type="text/javascript">
    var client = "{{clientID}}"
    var urlClient = "/client/" + "{{clientID}}"

    var data = [
      {url: "/", name: "Asistencia Clientes"},
      {url: "/agregar-cliente/", name: "Agregar Cliente"},
      {url: "#", name: "Editar Cliente", active: "active"},
    ]
</script>
{% endblock body %}