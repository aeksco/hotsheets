// Generator index file
var Generator = require('yeoman-generator');
var classify = require('underscore.string/classify');

// // // //

module.exports = class extends Generator {

  prompting() {
    return this.prompt([
      {
        type    : 'input',
        name    : 'name',
        message : 'Your resource name (i.e. user, blog_post, device_version, etc.)',
        default : this.appname // Default to current folder name
      },
      {
        type    : 'input',
        name    : 'route',
        message : 'Resource route (i.e. users, blog_posts, device_versions, etc.) \n This will be used to define the client-side and API routes for the resource. ',
        default : this.appname // Default to current folder name
      }
    ]).then((answers) => {
      this.name = answers.name.toLowerCase()
      this.route = answers.route.toLowerCase()
      this.title = classify(this.name)
    });
  }

  // writing to file
  paths() {
    this.destinationRoot();
    this.destinationPath('index.js')
  }

  // writing to file
  writing() {

    // client/src/store/resource/actions.js
    this.fs.copyTpl(
      this.templatePath('actions.js'),
      this.destinationPath('../src/store/' + this.name + '/actions.js'),
      { resource_name: this.name, resource_title: this.title }
    );

    // client/src/store/resource/factory.js
    this.fs.copyTpl(
      this.templatePath('factory.js'),
      this.destinationPath('../src/store/' + this.name + '/factory.js'),
      { resource_name: this.name, resource_title: this.title, resource_route: this.route }
    );

    // client/src/store/resource/getters.js
    this.fs.copyTpl(
      this.templatePath('getters.js'),
      this.destinationPath('../src/store/' + this.name + '/getters.js'),
      { resource_name: this.name, resource_title: this.title }
    );

    // client/src/store/resource/index.js
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath('../src/store/' + this.name + '/index.js'),
      { resource_name: this.name, resource_title: this.title }
    );

    // client/src/store/resource/mutations.js
    this.fs.copyTpl(
      this.templatePath('mutations.js'),
      this.destinationPath('../src/store/' + this.name + '/mutations.js'),
      { resource_name: this.name, resource_title: this.title }
    );

    // client/src/store/resource/state.js
    this.fs.copyTpl(
      this.templatePath('state.js'),
      this.destinationPath('../src/store/' + this.name + '/state.js'),
      { resource_name: this.name, resource_title: this.title }
    );

    // Logs instructions to the user
    console.log(`\n\n Done! \n Add the following lines to /src/store/index.js: \n\n \t import ${this.route} from './${this.route}'\n\n and add the '${this.route}' variable to the Vuex store's 'modules' object. \n\n`)

  }

};

