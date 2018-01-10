
<template>
  <div class="container">
    <a href="#/<%= schema.plural_identifier %>">Back</a>
    <h2><%= schema.label %> - New</h2>
    <hr>

    <form v-on:submit.prevent="formSubmit">
    <% for (index in schema.attributes) { %>
    <% let attr = schema.attributes[index] %>
      <div class="form-group">
        <label>
          <%= attr.label %>
          <% if (attr.required) { %><span class='text-danger'>*</span><% } %>
        </label>
        <small class="form-text text-muted"><%= attr.help %></small>
      <% if (attr.datatype === 'BOOL') { %>
        <input type="checkbox" class="form-control" v-model="model.<%=attr.identifier%>">
      <% } else if (attr.datatype === 'TEXT') { %>
        <input type="text" class="form-control" placeholder="<%= attr.label %>" v-model="model.<%=attr.identifier%>">
      <% } else if (attr.datatype === 'NUMBER') { %>
        <input type="number" class="form-control" placeholder="<%= attr.label %>" v-model="model.<%=attr.identifier%>">
      <% } else if (attr.datatype === 'DATE') { %>
        <input type="date" class="form-control" placeholder="<%= attr.label %>" v-model="model.<%=attr.identifier%>">
      <% } %>
      </div>
    <% } %>

      <div class="form-group">
        <button class="btn btn-primary">Create</button>
      </div>
    </form>

  </div>
</template>

<!-- // // // //  -->

<script>
import store from '@/store'

export default {
  name: '<%= schema.identifier %>_new',
  data () {
    return {
      model: {}
    }
  },
  methods: {
    formSubmit () {
      return store.dispatch('<%= schema.identifier %>/create', this.model)
    }
  }
}
</script>


