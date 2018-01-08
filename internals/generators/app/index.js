// index.js

// Generator index file
var Generator = require('yeoman-generator');

// module.exports = class extends Generator {};

module.exports = class extends Generator {

  initializing(){
    this.composeWith(require.resolve('../api'));
  }

  prompting() {
    return this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : this.appname // Default to current folder name
    }, {
      type    : 'confirm',
      name    : 'cool',
      message : 'Would you like to enable the Cool feature?',
      store	  : true // Remember this next time the user uses it
    }]).then((answers) => {
      this.log('app name', answers.name);
      this.log('cool feature', answers.cool);
      this.name = answers.name
      this.cool = answers.cool
    });
  }

  method1() {
    this.log('method 1 just ran');
    this.log(this.name)
  }

  method2() {
    this.log('method 2 just ran');
    this.log(this.cool)
  }

  _private_method() {
    this.log('private hey');
  }


  priorityName() {
  	this.log('high priority!')
  }

  // writing to file
  paths() {
    this.destinationRoot();

    this.destinationPath('index.js')
  }

  // writing to file
  writing() {

    // index.html
    // this.fs.copyTpl(
    //   this.templatePath('index.html'),
    //   this.destinationPath('public/index.html'),
    //   { title: 'Templating with Yeoman' }
    // );

    // resource.model.js
    this.fs.copyTpl(
      this.templatePath('resource.model.js'),
      this.destinationPath('server/api/' + this.name.toLowerCase() + '/' + this.name.toLowerCase() + '.model.js'),
      { resource_name: this.name }
    );

    // resource.controller.js
    this.fs.copyTpl(
      this.templatePath('resource.controller.js'),
      this.destinationPath('server/api/' + this.name.toLowerCase() + '/' + this.name.toLowerCase() + '.controller.js'),
      { resource_name: this.name }
    );

    // /api/index.js
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath('server/api/' + this.name.toLowerCase() + '/index.js'),
      { resource_name: this.name }
    );

    // router.js
    // this.fs.copyTpl(
    //   this.templatePath('router.js'),
    //   this.destinationPath('public/router.js'),
    //   { module_name: 'Journey' }
    // );
  }

  // OR
  // priorityName: {
  //   method() {},
  //   method2() {}
  // }

};

