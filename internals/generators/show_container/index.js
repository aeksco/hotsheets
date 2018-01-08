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
  paths() {
    this.destinationRoot();
    this.destinationPath('index.js')
  }

  // writing to file
  writing() {

    // client/src/containers/resource_show/index.vue
    this.fs.copyTpl(
      this.templatePath('index.vue'),
      this.destinationPath('../src/containers/' + this.name + '_show/index.vue'),
      { resource_name: this.name, resource_title: this.title, resource_route: this.route }
    );

    // client/src/containers/resource_show/layout.vue
    this.fs.copyTpl(
      this.templatePath('components/layout.vue'),
      this.destinationPath('../src/containers/' + this.name + '_show/components/layout.vue'),
      { resource_name: this.name, resource_title: this.title, resource_route: this.route }
    );
  }

};

