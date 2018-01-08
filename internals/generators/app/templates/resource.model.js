const mongoose = require('mongoose')
const Schema = mongoose.Schema

// // // //

const <%= resource_name %> = new Schema({
    label: String
},
    // Collection options
    {
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'updatedOn'
        },
        versionKey: false
    }
);

// // // //

module.exports = mongoose.model('<%= resource_name %>', <%= resource_name %>)
