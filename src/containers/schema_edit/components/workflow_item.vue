
<template>
  <li :class="className">
    <div class="row d-flex align-items-center">

      <div class="col-lg-1 text-left d-flex align-items-center">
        <i class="fa fa-lg fa-fw fa-bars mr-3"></i>
      </div>

      <div class="col-lg-8">

        <!-- TEXT -->
        <span class="badge" v-if="item.datatype === 'TEXT'">
          <i class="fa fa-quote-left mr-2"></i>
          {{item.label}}
        </span>

        <!-- NUMBER -->
        <span class="badge" v-if="item.datatype === 'NUMBER'">
          <i class="fa fa-hashtag mr-2"></i>
          {{item.label}}
        </span>

        <!-- SCHEMA -->
        <span class="badge" v-if="item.datatype === 'SCHEMA'">
          <i class="fa fa-link mr-2"></i>
          {{item.label}}
        </span>

        <!-- DATE -->
        <span class="badge" v-if="item.datatype === 'DATE'">
          <i class="fa fa-calendar-o mr-2"></i>
          {{item.label}}
        </span>

        <!-- BOOL -->
        <span class="badge" v-if="item.datatype === 'BOOL'">
          <i class="fa fa-check-square-o mr-2"></i>
          {{item.label}}
        </span>

        <!-- MACRO PREVIEW -->
        <span class="d-flex" v-if="item.datatype === 'MACRO'">
          <span class="badge">
            <i class="fa fa-cogs mr-2"></i>
          </span>

          <span class="d-flex align-items-center" v-for="m, i in item.value" v-bind:key="m.id">
            <span class="badge bordered border-warning" v-if='m.position === 1'>{{m.key}}</span>
            <span class="badge bordered border-info" v-if='m.position === 2'>{{m.key}}</span>
            <span class="badge bordered border-success" v-if='m.position === 3'>{{m.key}}</span>
            <i class="fa fa-fw fa-plus mx-1" v-if="i < item.value.length - 1"></i>
          </span>
        </span>

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
      let css = ['list-group-item']

      if (this.item.type === 'KEY_DOWN') {
        // css.push('list-group-item-primary')
        css.push('list-group-item-success')
        // css.push('list-group-item-dark')
      } else if (this.item.type === 'KEY_UP') {
        // css.push('list-group-item-success')
        css.push('list-group-item-warning')
        css.push('draggable')
      } else if (this.item.type === 'FINISH') {
        css.push('list-group-item-dark')
      } else {
        css.push('bg-dark text-light')
        css.push('draggable')
      }

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
