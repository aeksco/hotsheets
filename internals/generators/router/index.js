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

    // client/src/store/resource/actions.js
    this.fs.copyTpl(
      this.templatePath('router.js'),
      this.destinationPath('../src/routers/' + this.name + '.js'),
      { resource_name: this.name, resource_title: this.title, resource_route: this.route }
    );

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

