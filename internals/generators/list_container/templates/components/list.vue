
<template>
  <div class='row'>
    <div v-for="m in collection" class='col-lg-12 mt-3'>
      <div class="card card-body bg-light">
        <h4 class="card-title">
          <a v-bind:href="'/#/<%= resource_route %>/' + m._id">{{m.label}}</a>
        </h4>
        <a class="btn btn-outline-primary" :href="'/#/<%= resource_route %>/' + m._id">Show</a>
      </div>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
export default {
  props: ['collection']
}
</script>


