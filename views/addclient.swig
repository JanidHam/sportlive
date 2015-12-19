{% extends "./base.swig" %}

{% block jsFiles %}
	<script src="/js/dist/components/addClient.js"></script>
{% endblock jsFiles %}

{% block body %}
<div class="col-lg-12">
	<div class="col-lg-12" id="new-client"></div>
</div>

<script type="text/javascript">
    var data = [
      {url: "/", name: "Asistencia Clientes"},
      {url: "/agregar-cliente/", name: "Agregar Cliente", active: "active"},
    ]
</script>
{% endblock body %}