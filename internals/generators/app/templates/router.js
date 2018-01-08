
const <%= module_name %>Router = require('../base/router').extend({

  login() {
    return new LoginRoute({ container: this.container });
  }

});

// // // //

module.exports = <%= module_name %>Router;
