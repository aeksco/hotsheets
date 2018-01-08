
<template>
  <div class="container">
    <a href="/#/<%= resource_route %>">Back</a>
    <h2><%= resource_title %> - New</h2>
    <hr>

    <form v-on:submit.prevent="formSubmit">
      <div class="form-group">
        <label name="<%= resource_name %>_label">Label</label>
        <input type="text" class="form-control" v-model="model.label" id="<%= resource_name %>_label" required>
      </div>

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
  name: '<%= resource_name %>_new',

  // TODO - abstract this into ProjectForm mixin?
  data () {
    return {
      model: {}
    }
  },

  methods: {

    // TODO - abstract this into ProjectForm mixin?
    formSubmit () {
      console.log('formSubmit!')
      console.log(this.model.label)

      // Assembles the payload being sent to the server
      let model = {
        label: this.model.label
      }

      return store.dispatch('<%= resource_name %>/create', model)
    }
  }
}
</script>


