import Vue from 'vue'
import Router from 'vue-router'

// Module routes
import { MainHomeRoute } from './main'
import { AuthLoginRoute, AuthRegisterRoute } from './auth'
import { UserListRoute, UserShowRoute } from './user'
import { SchemaListRoute, SchemaNewRoute, SchemaShowRoute, SchemaEditRoute, RecordNewRoute, RecordEditRoute, RecordShowRoute } from './schema'
import { ApplicationListRoute, ApplicationShowRoute, ApplicationNewRoute, ApplicationEditRoute } from './application'

// Vue Router setup
Vue.use(Router)

// Exports new Router instance
export default new Router({
  routes: [
    MainHomeRoute,
    AuthLoginRoute,
    AuthRegisterRoute,
    UserListRoute,
    UserShowRoute,
    SchemaListRoute,
    SchemaNewRoute,
    SchemaShowRoute,
    SchemaEditRoute,
    RecordNewRoute,
    RecordEditRoute,
    RecordShowRoute,
    ApplicationListRoute,
    ApplicationNewRoute,
    ApplicationShowRoute,
    ApplicationEditRoute
  ]
})
