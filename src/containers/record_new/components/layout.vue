
<template>
  <div class="container">

    <div class="row">
      <div class="col-lg-12">
        <h2>New {{schema.label}}</h2>
      </div>
    </div>

    <hr>

    <RecordForm :schema="schema" :record="record" />

  </div>
</template>

<!-- // // // //  -->

<script>
import RecordForm from './record_form.vue'

export default {
  props: ['schema', 'record'],
  components: {
    RecordForm
  }
}
</script>


