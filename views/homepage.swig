{% extends "./base.swig" %}

{% block jsFiles %}
	<script src="/js/dist/components/clientsAsists.js"></script>
{% endblock jsFiles %}

{% block body %}
<div class="col-lg-12">
    <div id="table-clients"></div>
</div>


<script type="text/javascript">
    var data = [
      {url: "/", name: "Asistencia Clientes", active: "active"},
      {url: "agregar-cliente/", name: "Agregar Cliente"},
    ]
</script>
{% endblock body %}