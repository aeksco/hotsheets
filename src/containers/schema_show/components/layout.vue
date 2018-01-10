
<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8">
        <h2>{{schema.label_plural}}</h2>
      </div>

      <div class="col-lg-4 text-right">
        <a class='btn btn-outline-success' :href=" '#/schemas/' + schema._id + '/records/new' ">
          <i class="fa fa-fw fa-plus mr-2"></i>
          New {{ schema.label }}
        </a>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <RecordTable :schema="schema" :records="records"/>
      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import RecordTable from '@/components/RecordTable'

export default {
  props: ['schema', 'records'],
  components: {
    RecordTable
  }
}
</script>


