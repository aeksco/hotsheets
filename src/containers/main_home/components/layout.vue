<template lang='pug'>
  .row.h-100.align-items-center
    .col-lg-12

      //- .row.my-4
      //-   .col-lg-12.text-center
      //-     img.welcome-logo(src='/static/icon_white.svg')

      .row.my-4
        .col-lg-12.text-center
          p.welcome-text WELCOME

      .row.my-4
        .col-lg-12.text-center
          p.lead
            a(href='https://github.com/aeksco', target='_blank')  HotSheets
            |  is an open-source platform for building on-the-fly user interfaces for tabular data.

      .row.py-2
        .col-lg-12.text-center
          p.lead Define your schema and its attributes - HotSheets does the rest.

      .row.justify-content-center
        .col-lg-4
          a.btn.btn-light.btn-block.btn-lg(href='/#/schemas')
            i.fa.fa-fw.fa-list-alt.mr-2
            | Let's get started.

</template>

<script>
  export default {
    name: 'main_home'
  }
</script>

<style lang="sass">
  img.welcome-logo
    height: 4rem
    width: 4rem

  .welcome-text
    letter-spacing: .6rem
    font-weight: 300
    font-size: 2rem
</style>
