
// Schema Module State
const state = {
  collection: [
    {
      label: 'Contact',
      identifier: 'contact',
      _id: 'schema_29321443037762',
      attributes: [
        {
          order: 1,
          label: 'Name',
          help: 'Name of the individual',
          required: true,
          datatype: 'TEXT',
          datatypeOptions: {},
          identifier: 'name',
          unique: true,
          _id: 'attr_1'
        },
        {
          order: 2,
          label: 'Location',
          help: 'Location of the individual',
          required: false,
          datatype: 'TEXT',
          datatypeOptions: {},
          identifier: 'location',
          _id: 'attr_2'
        },
        {
          order: 3,
          label: 'Phone Number',
          help: 'Phone number of the individual',
          required: false,
          datatype: 'NUMBER',
          datatypeOptions: {},
          identifier: 'phone',
          _id: 'attr_3'
        }
      ],
      label_plural: 'Contact',
      plural_identifier: 'contacts'
    }
  ],
  selectedAttribute: null
}

export default state
