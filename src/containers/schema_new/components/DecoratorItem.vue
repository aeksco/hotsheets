
<template>
  <li :class="className">
    <div class="row d-flex align-items-center">

      <div class="col-lg-1 text-left d-flex align-items-center">
        <i class="fa fa-lg fa-fw fa-bars mr-3"></i>
      </div>

      <div class="col-lg-5">

        <!-- TEXT -->
        <span class="badge">
          <i class="fa fa-quote-left mr-2"></i>
          {{item.label}}
        </span>

      </div>

      <div class="col-lg-3">
      </div>

      <div class="col-lg-3 text-right controls"
      >
        <button class="btn btn-sm btn-outline-secondary" v-b-tooltip.hover.top title="Edit" @click="edit(item)">
          <i class="fa fa-fw fa-pencil"></i>
        </button>

        <button class="btn btn-sm btn-outline-danger" v-b-tooltip.hover.top title="Remove" @click="remove(item)">
          <i class="fa fa-fw fa-trash"></i>
        </button>
      </div>

    </div>
  </li>
</template>

<!-- // // // //  -->

<script>
export default {
  props: ['item', 'remove', 'edit'],
  computed: {
    className () {
      let css = ['list-group-item', 'bg-dark', 'text-light', 'draggable']
      return css.join(' ')
    },
    removable () {
      return true
    }
  }
}
</script>

<style lang='sass' scoped>

  .list-group-item
    border-left: .25rem solid #666666

  .list-group-item:hover i.fa-bars
    opacity: 1

  .list-group-item:hover .controls
    opacity: 1

  i.fa-bars
    transition: opacity .25s ease-in
    opacity: 0

  .badge
    font-weight: 300
    padding: .3rem .3rem

    &.bordered
      border: 1px solid

  .controls
    transition: opacity .25s ease-in
    opacity: 0

</style>
