
<template>
  <table class="table table-striped table-hover">

    <!-- Table Header -->
    <thead>
    <% for (index in schema.attributes) { %>
      <th>
        <%= schema.attributes[index].label %>
        <i class="fa fa-fw fa-question-circle-o" v-b-tooltip.hover.bottom :title="<%= schema.attributes[index].help %>" ></i>
      </th>
    <% } %>
      <th></th>
    </thead>

    <!-- Table Body -->
    <tbody>
      <tr v-for="m in collection", v-bind:key="m._id">
      <% for (index in schema.attributes) { %>
        <td>{{m.<%= schema.attributes[index].identifier %>}}</td>
      <% } %>
      </tr>
    </tbody>

  </table>

</template>

<!-- // // // //  -->

<script>
export default {
  props: ['collection']
}
</script>


