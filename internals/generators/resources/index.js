// Generator index file
var Generator = require('yeoman-generator');
var classify = require('underscore.string/classify');

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
      {
        type    : 'input',
        name    : 'name',
        message : 'Your resource name (i.e. user, blog_post, device_version, etc.)',
        default : 'blog_post' // Default to current folder name
      },
      {
        type    : 'input',
        name    : 'route',
        message : 'Resource route (i.e. users, blog_posts, device_versions, etc.) \n This will be used to define the client-side and API routes for the resource. ',
        default : 'blog_posts' // Default to current folder name
      }
    ]).then((answers) => {
      this.name = answers.name.toLowerCase()
      this.route = answers.route.toLowerCase()
      this.title = classify(this.name)
    });
  }

  // writing to file
  writing() {

    // LIST CONTAINER

    // client/src/containers/resource_list/index.vue
    this.fs.copyTpl(
      this.templatePath('../../list_container/templates/index.vue'),
      this.destinationPath('../src/containers/' + this.name + '_list/index.vue'),
      { resource_name: this.name, resource_title: this.title, resource_route: this.route }
    );

    // client/src/containers/resource_list/layout.vue
    this.fs.copyTpl(
      this.templatePath('../../list_container/templates/components/layout.vue'),
      this.destinationPath('../src/containers/' + this.name + '_list/components/layout.vue'),
      { resource_name: this.name, resource_title: this.title, resource_route: this.route }
    );

    // client/src/containers/resource_list/components/list.vue
    this.fs.copyTpl(
      this.templatePath('../../list_container/templates/components/list.vue'),
      this.destinationPath('../src/containers/' + this.name + '_list/components/list.vue'),
      { resource_name: this.name, resource_title: this.title, resource_route: this.route }
    );

    // SHOW CONTAINER

    // client/src/containers/resource_show/index.vue
    this.fs.copyTpl(
      this.templatePath('../../show_container/templates/index.vue'),
      this.destinationPath('../src/containers/' + this.name + '_show/index.vue'),
      { resource_name: this.name, resource_title: this.title, resource_route: this.route }
    );

    // client/src/containers/resource_show/layout.vue
    this.fs.copyTpl(
      this.templatePath('../../show_container/templates/components/layout.vue'),
      this.destinationPath('../src/containers/' + this.name + '_show/components/layout.vue'),
      { resource_name: this.name, resource_title: this.title, resource_route: this.route }
    );

    // EDIT CONTAINER

    // client/src/containers/resource_edit/index.vue
    this.fs.copyTpl(
      this.templatePath('../../edit_container/templates/index.vue'),
      this.destinationPath('../src/containers/' + this.name + '_edit/index.vue'),
      { resource_name: this.name, resource_title: this.title, resource_route: this.route }
    );

    // client/src/containers/resource_edit/layout.vue
    this.fs.copyTpl(
      this.templatePath('../../edit_container/templates/components/layout.vue'),
      this.destinationPath('../src/containers/' + this.name + '_edit/components/layout.vue'),
      { resource_name: this.name, resource_title: this.title, resource_route: this.route }
    );

    // NEW_CONTAINER

    // client/src/containers/resource_new/index.vue
    this.fs.copyTpl(
      this.templatePath('../../new_container/templates/index.vue'),
      this.destinationPath('../src/containers/' + this.name + '_new/index.vue'),
      { resource_name: this.name, resource_title: this.title, resource_route: this.route }
    );

    // client/src/containers/resource_new/layout.vue
    this.fs.copyTpl(
      this.templatePath('../../new_container/templates/components/layout.vue'),
      this.destinationPath('../src/containers/' + this.name + '_new/components/layout.vue'),
      { resource_name: this.name, resource_title: this.title, resource_route: this.route }
    );

    // ROUTER

    // client/src/routers/resource.js
    this.fs.copyTpl(
      this.templatePath('../../router/templates/router.js'),
      this.destinationPath('../src/routers/' + this.name + '.js'),
      { resource_name: this.name, resource_title: this.title, resource_route: this.route }
    );

    // STORE

    // client/src/store/resource/actions.js
    this.fs.copyTpl(
      this.templatePath('../../store/templates/actions.js'),
      this.destinationPath('../src/store/' + this.name + '/actions.js'),
      { resource_name: this.name, resource_title: this.title }
    );

    // client/src/store/resource/factory.js
    this.fs.copyTpl(
      this.templatePath('../../store/templates/factory.js'),
      this.destinationPath('../src/store/' + this.name + '/factory.js'),
      { resource_name: this.name, resource_title: this.title, resource_route: this.route }
    );

    // client/src/store/resource/getters.js
    this.fs.copyTpl(
      this.templatePath('../../store/templates/getters.js'),
      this.destinationPath('../src/store/' + this.name + '/getters.js'),
      { resource_name: this.name, resource_title: this.title }
    );

    // client/src/store/resource/index.js
    this.fs.copyTpl(
      this.templatePath('../../store/templates/index.js'),
      this.destinationPath('../src/store/' + this.name + '/index.js'),
      { resource_name: this.name, resource_title: this.title }
    );

    // client/src/store/resource/mutations.js
    this.fs.copyTpl(
      this.templatePath('../../store/templates/mutations.js'),
      this.destinationPath('../src/store/' + this.name + '/mutations.js'),
      { resource_name: this.name, resource_title: this.title }
    );

    // client/src/store/resource/state.js
    this.fs.copyTpl(
      this.templatePath('../../store/templates/state.js'),
      this.destinationPath('../src/store/' + this.name + '/state.js'),
      { resource_name: this.name, resource_title: this.title }
    );

    // Logs instructions to the user
    console.log(`\n\n Done! \n Add the following lines to /src/store/index.js: \n\n \t import ${this.route} from './${this.route}'\n\n and add the '${this.route}' variable to the Vuex store's 'modules' object. \n\n`)

    // Logs instructions
    let import_snippet = `import { ${this.title}ListRoute, ${this.title}ShowRoute, ${this.title}NewRoute, ${this.title}EditRoute } from './${this.name}'`
    let route_snippet = `
      ${this.title}ListRoute,
      ${this.title}ShowRoute,
      ${this.title}NewRoute,
      ${this.title}EditRoute,
    `
    console.log(`Done! \n\nPut the following in src/routers/index.dj \n\n ${import_snippet} \n\n ${route_snippet} \n\n`)


  }

};

