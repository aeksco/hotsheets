// Generator index file
var Generator = require('yeoman-generator');
var classify = require('underscore.string/classify');
const resourceSchema = require('./data')

// // // //
// FLAGS
generateStore = false
generateRouter = true
generateList = false
generateShow = false
generateEdit = false
generateNew = false

// // // //

module.exports = class extends Generator {

  // initializing(){
  //   // this.composeWith(require.resolve('../list_container'), { parent: this });
  //   // this.composeWith(require.resolve('../show_container'), { parent: this });
  //   // this.composeWith(require.resolve('../new_container'), { parent: this });
  //   // this.composeWith(require.resolve('../edit_container'), { parent: this });
  // }

  prompting() {
    return this.prompt([
      // {
      //   type    : 'input',
      //   name    : 'name',
      //   message : 'Your resource name (i.e. user, blog_post, device_version, etc.)',
      //   default : 'blog_post' // Default to current folder name
      // }
    ]).then((answers) => {
      this.schema = resourceSchema
    });
  }

  // writing to file
  writing() {

    // // // //
    // LIST CONTAINER
    if (generateList) {
      // client/src/containers/resource_list/index.vue
      this.fs.copyTpl(
        this.templatePath('../../list_container/templates/index.vue'),
        this.destinationPath('../src/containers/' + this.schema.identifier + '_list/index.vue'),
        { schema: resourceSchema }
      );

      // client/src/containers/resource_list/layout.vue
      this.fs.copyTpl(
        this.templatePath('../../list_container/templates/components/layout.vue'),
        this.destinationPath('../src/containers/' + resourceSchema.identifier + '_list/components/layout.vue'),
        { schema: resourceSchema }
      );

      // client/src/containers/resource_list/components/list.vue
      this.fs.copyTpl(
        this.templatePath('../../list_container/templates/components/list.vue'),
        this.destinationPath('../src/containers/' + resourceSchema.identifier + '_list/components/list.vue'),
        { schema: resourceSchema  }
      );
    }

    // // // //
    // SHOW CONTAINER
    if (generateShow) {
      // client/src/containers/resource_show/index.vue
      this.fs.copyTpl(
        this.templatePath('../../show_container/templates/index.vue'),
        this.destinationPath('../src/containers/' + resourceSchema.identifier + '_show/index.vue'),
        { schema: resourceSchema  }
      );

      // client/src/containers/resource_show/layout.vue
      this.fs.copyTpl(
        this.templatePath('../../show_container/templates/components/layout.vue'),
        this.destinationPath('../src/containers/' + resourceSchema.identifier + '_show/components/layout.vue'),
        { schema: resourceSchema  }
      );
    }

    // // // //
    // EDIT CONTAINER
    if (generateEdit) {
      // client/src/containers/resource_edit/index.vue
      this.fs.copyTpl(
        this.templatePath('../../edit_container/templates/index.vue'),
        this.destinationPath('../src/containers/' + resourceSchema.identifier + '_edit/index.vue'),
        { schema: resourceSchema }
      );

      // client/src/containers/resource_edit/layout.vue
      this.fs.copyTpl(
        this.templatePath('../../edit_container/templates/components/layout.vue'),
        this.destinationPath('../src/containers/' + resourceSchema.identifier + '_edit/components/layout.vue'),
        { schema: resourceSchema }
      );
    }

    // NEW_CONTAINER
    if (generateNew) {

      // client/src/containers/resource_new/index.vue
      this.fs.copyTpl(
        this.templatePath('../../new_container/templates/index.vue'),
        this.destinationPath('../src/containers/' + resourceSchema.identifier + '_new/index.vue'),
        { schema: resourceSchema }
      );

      // client/src/containers/resource_new/layout.vue
      this.fs.copyTpl(
        this.templatePath('../../new_container/templates/components/layout.vue'),
        this.destinationPath('../src/containers/' + resourceSchema.identifier + '_new/components/layout.vue'),
        { schema: resourceSchema }
      );
    }

    // // // //
    // ROUTER
    if (generateRouter) {
      // client/src/routers/resource.js
      this.fs.copyTpl(
        this.templatePath('../../router/templates/router.js'),
        this.destinationPath('../src/routers/' + resourceSchema.identifier + '.js'),
        { schema: resourceSchema }
      );

      // Updates:
      // client/src/routers/index.js
      // let routerIndexFile = '../src/routers/index.js'
      // let routerUpdate = `
      //   // ${resourceSchema.label}ListRoute,
      //   // ${resourceSchema.label}NewRoute,
      //   // ${resourceSchema.label}ShowRoute,
      //   // ${resourceSchema.label}EditRoute
      // `
      // console.log(routerUpdate)
    }

    // // // //
    // STORE
    if (generateStore) {
      // client/src/store/resource/actions.js
      this.fs.copyTpl(
        this.templatePath('../../store/templates/actions.js'),
        this.destinationPath('../src/store/' + resourceSchema.identifier + '/actions.js'),
        { schema: resourceSchema }
      );

      // client/src/store/resource/factory.js
      this.fs.copyTpl(
        this.templatePath('../../store/templates/factory.js'),
        this.destinationPath('../src/store/' + resourceSchema.identifier + '/factory.js'),
        { schema: resourceSchema }
      );

      // client/src/store/resource/getters.js
      this.fs.copyTpl(
        this.templatePath('../../store/templates/getters.js'),
        this.destinationPath('../src/store/' + resourceSchema.identifier + '/getters.js'),
        { schema: resourceSchema }
      );

      // client/src/store/resource/index.js
      this.fs.copyTpl(
        this.templatePath('../../store/templates/index.js'),
        this.destinationPath('../src/store/' + resourceSchema.identifier + '/index.js'),
        { schema: resourceSchema }
      );

      // client/src/store/resource/mutations.js
      this.fs.copyTpl(
        this.templatePath('../../store/templates/mutations.js'),
        this.destinationPath('../src/store/' + resourceSchema.identifier + '/mutations.js'),
        { schema: resourceSchema }
      );

      // client/src/store/resource/state.js
      this.fs.copyTpl(
        this.templatePath('../../store/templates/state.js'),
        this.destinationPath('../src/store/' + resourceSchema.identifier + '/state.js'),
        { schema: resourceSchema }
      );
    }

    // Logs instructions to the user
    console.log(`\n\n Done! \n Add the following lines to /src/store/index.js: \n\n \t import ${resourceSchema.identifier_plural} from './${resourceSchema.identifier_plural}'\n\n and add the '${resourceSchema.identifier_plural}' variable to the Vuex store's 'modules' object. \n\n`)

    // Logs instructions
    let import_snippet = `import { ${resourceSchema.label}ListRoute, ${resourceSchema.label}ShowRoute, ${resourceSchema.label}NewRoute, ${resourceSchema.label}EditRoute } from './${resourceSchema.label}'`
    let route_snippet = `
      ${resourceSchema.label}ListRoute,
      ${resourceSchema.label}ShowRoute,
      ${resourceSchema.label}NewRoute,
      ${resourceSchema.label}EditRoute,
    `
    // console.log(`Done! \n\nPut the following in src/routers/index.dj \n\n ${import_snippet} \n\n ${route_snippet} \n\n`)
    console.log('DONE WITH GENERATION')

  }

};

