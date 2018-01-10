import AbstractFactory from '../lib/factory'

// // // //

// Creates new AbstractFactory instance
const <%= schema.label %>Factory = new AbstractFactory({
  API_ROOT: '/api/<%= schema.plural_identifier %>',
  REDIRECT_SUCCESS: '#/<%= schema.plural_identifier %>',
  messages: {
    CREATE_SUCCESS: 'Created <%= schema.label %>.',
    UPDATE_SUCCESS: 'Updated <%= schema.label %>.',
    DESTROY_SUCCESS: 'Destroyed <%= schema.label %>.'
  }
})

// // // //

export default <%= schema.label %>Factory
