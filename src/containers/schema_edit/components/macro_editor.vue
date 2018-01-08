
<template>
  <div class="row">

    <!-- Macro -->
    <div class="col-lg-12">

      <!-- MacroList -->
      <draggable v-model='editing.value' :options="sortableOptions()" element="ul" class='list-unstyled d-flex px-4 my-2 d-flex justify-content-center align-items-center flex-row flex-wrap'>

          <!-- Child View -->
          <MacroStep v-for="item in editing.value" :key="item.order" :item="item" :macro="editing" v-if="editing.value.length"/>

          <!-- Empty View -->
          <li class="macro-step empty flex-column justify-content-center align-items-center my-2" v-if="!editing.value.length">
            <p class="lead text-center">Macro<br/><small>Execute keystrokes in a specific sequence</small></p>

            <small style="font-size: 1rem;" class="text-muted d-flex flex-row justify-content-center align-items-center">
              <div class="fa fa-fw fa-question-circle-o mr-1 d-flex flex-column"></div>
              <div class="d-flex flex-row"><span>Use the keys below, or click&nbsp;</span><span class="text-danger"><i class="fa fa-fw fa-circle text-danger"></i> record&nbsp;</span>&nbsp;and start typing</div>
            </small>
          </li>

      </draggable>

    </div>

    <!-- Keyboard Layouts -->
    <div class="col-lg-12">
      <KeyboardSelector :macro="editing" />
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import store from '@/store'
import MacroStep from './macro_step'
import KeyboardSelector from './keyboard_selector'
import draggable from 'vuedraggable'

export default {
  props: ['editing'],
  components: {
    draggable,
    MacroStep,
    KeyboardSelector
  },
  methods: {
    cycleMacroKeyPosition (macroStep) {
      store.commit('workflow/cycleMacroStepPosition', { macroStep: macroStep })
    },
    sortableOptions () {
      return {
        animation: 150,
        handle: '.key',
        ghostClass: 'ghost', // Class name for the drop placeholder
        chosenClass: 'chosen', // Class name for the chosen item
        dragClass: 'drag', // Class name for the dragging item
        // # group:
        // #   name: 'macro'
        // #   pull: false
        // #   put:  true
        fallbackTolerance: 100
      }
    }
  }
}
</script>


<style lang='sass'>


</style>
