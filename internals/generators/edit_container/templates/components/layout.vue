
<template>
  <div class="container">
    <a :href="'#/<%= schema.plural_identifier %>/' + id">Back</a>
    <h2><%= schema.label %> Edit - {{model.name}}</h2>
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
        <button class="btn btn-primary">Update</button>
      </div>
    </form>

  </div>
</template>

<!-- // // // //  -->

<script>
import store from '@/store'

export default {
  props: ['id'],
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      return store.dispatch('<%= schema.identifier %>/fetchModel', this.id)
    },
    formSubmit () {
      // TODO - validations
      return store.dispatch('<%= schema.identifier %>/update', this.model)
    }
  },
  computed: {
    model () {
      return store.getters['<%= schema.identifier %>/current']
    }
  }

}
</script>


