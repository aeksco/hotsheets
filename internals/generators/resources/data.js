module.exports = {
  label: 'Contact',
  identifier: 'contact',
  _id: 'schema_29321443037762',
  attributes: [
    {
      order: 0,
      label: 'Name',
      help: 'Name of the individual',
      required: true,
      datatype: 'TEXT',
      datatypeOptions: {},
      identifier: 'name',
      unique: true,
      _id: 'attr_1',
      preferred: true
    },
    {
      order: 1,
      label: 'Location',
      help: 'Location of the individual',
      required: false,
      datatype: 'TEXT',
      datatypeOptions: {},
      identifier: 'location',
      _id: 'attr_2'
    },
    {
      order: 2,
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
  identifier_plural: 'contacts'
}
