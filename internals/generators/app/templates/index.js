const router = require('express').Router();
const controller = require('./<%= resource_name.toLowerCase() %>.controller');

// // // //

// GET /<%= resource_name.toLowerCase() %>
router.get('/', controller.list);

// POST /<%= resource_name.toLowerCase() %>
router.post('/', controller.create);

// GET /<%= resource_name.toLowerCase() %>/:id
router.get('/:id', controller.show);

// PUT /<%= resource_name.toLowerCase() %>/:id
router.put('/:id', controller.update);

// DELETE /<%= resource_name.toLowerCase() %>/:id
router.delete('/:id', controller.delete);

// // // //

module.exports = router;
