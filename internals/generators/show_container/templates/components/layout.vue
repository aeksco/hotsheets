g
<template>
  <div class="container">
    <a href="/#/<%= resource_route %>">Back</a>
    <h2><%= resource_title %> Show - {{model.name}}</h2>
  	<hr>

    <!-- Edit Link -->
  	<a class='btn btn-secondary' :href="'/#/<%= resource_route %>/' + model._id + '/edit'">
      Edit <%= resource_title %>
    </a>

    <!-- Opens Destroy Confirmation Modal -->
    <b-btn variant="danger" v-b-modal.confirm-modal>Destroy</b-btn>

    <!-- Bootstrap Modal Component -->
    <b-modal id="confirm-modal" title="Destroy <%= resource_title %>?" @ok="onConfirm">
      <p class="my-4">Are you sure you want to destroy this <%= resource_title %>?</p>
    </b-modal>

  </div>
</template>

<!-- // // // //  -->

<script>
import store from '@/store'

export default {
  props: ['model'],
  methods: {
    onConfirm () {
      return store.dispatch('<%= resource_name %>/destroy', this.model._id)
    }
  }
}
</script>


