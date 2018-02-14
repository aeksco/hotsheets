import AbstractFactory from '../lib/factory'

// // // //

// Creates new AbstractFactory instance
const <%= schema.label %>Factory = new AbstractFactory({
  API_ROOT: '/api/<%= schema.identifier_plural %>',
  REDIRECT_SUCCESS: '#/<%= schema.identifier_plural %>',
  messages: {
    CREATE_SUCCESS: 'Created <%= schema.label %>.',
    UPDATE_SUCCESS: 'Updated <%= schema.label %>.',
    DESTROY_SUCCESS: 'Destroyed <%= schema.label %>.'
  }
})

// // // //

export default <%= schema.label %>Factory
