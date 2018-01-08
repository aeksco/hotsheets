import AbstractFactory from '../lib/factory'

// // // //

// Creates new AbstractFactory instance
const <%= resource_title %>Factory = new AbstractFactory({
  API_ROOT: '/api/<%= resource_route %>',
  REDIRECT_SUCCESS: '/#/<%= resource_route %>',
  messages: {
    CREATE_SUCCESS: 'Created <%= resource_title %>.',
    UPDATE_SUCCESS: 'Updated <%= resource_title %>.',
    DESTROY_SUCCESS: 'Destroyed <%= resource_title %>.'
  }
})

// // // //

export default <%= resource_title %>Factory
