
<template>
  <div class="container">

    <div class="row">
      <div class="col-lg-12">
        <h2>{{schema.label}} Detail</h2>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <table class="table table-striped table-hover">
          <tbody>
            <tr v-for="attr in schema.attributes" :key="attr._id">
              <td class='text-left'>
                <strong>
                  {{attr.label}}
                </strong>
              </td>
              <td>{{record.attributes[attr.identifier]}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
export default {
  props: ['schema', 'record']
}
</script>


