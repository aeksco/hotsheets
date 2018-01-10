g
<template>
  <div class="container">
    <a href="#/<%= schema.plural_identifier %>">Back</a>
    <h2><%= schema.label %> Show - {{model.name}}</h2>
  	<hr>

    <!-- Edit Link -->
  	<a class='btn btn-secondary' :href="'#/<%= schema.plural_identifier %>/' + model._id + '/edit'">
      Edit <%= schema.label %>
    </a>

    <!-- Opens Destroy Confirmation Modal -->
    <b-btn variant="danger" v-b-modal.confirm-modal>Destroy</b-btn>

    <!-- Bootstrap Modal Component -->
    <b-modal id="confirm-modal" title="Destroy <%= schema.label %>?" @ok="onConfirm">
      <p class="my-4">Are you sure you want to destroy this <%= schema.label %>?</p>
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
      return store.dispatch('<%= schema.identifier %>/destroy', this.model._id)
    }
  }
}
</script>


