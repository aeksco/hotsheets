
// Schema Module State
const state = {
  collection: [
    {
      label: 'Contact',
      identifier: 'contact',
      _id: 'schema_29321443037762',
      relations: [
        {
          type: 'HAS_MANY',
          schema_id: 'schema_22881179555990'
        },
        {
          type: 'HAS_MANY',
          schema_id: 'schema_85414304137721'
        }
      ],
      attributes: [
        {
          order: 0,
          label: 'Name',
          help: 'Name of the individual',
          required: false,
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
      label_plural: 'Contacts',
      plural_identifier: 'contacts'
    },
    {
      label: 'Invoice',
      identifier: 'invoice',
      _id: 'schema_22881179555990',
      relations: [
        {
          type: 'BELONGS_TO',
          schema_id: 'schema_29321443037762'
        },
        {
          type: 'HAS_MANY',
          schema_id: 'schema_85414304137721'
        }
      ],
      attributes: [
        {
          order: 0,
          label: 'Invoice ID',
          help: 'Unique Invoice ID',
          required: true,
          datatype: 'TEXT',
          datatypeOptions: {},
          identifier: 'invoice_id',
          unique: true,
          _id: 'attr_5'
        },
        {
          order: 1,
          label: 'Contact',
          help: 'Contact to whom the invoice has been sent.',
          required: true,
          datatype: 'SCHEMA',
          datatypeOptions: {
            schema_id: 'schema_29321443037762',
            schema_attribute_identifier: 'name'
          },
          identifier: 'contact_id',
          _id: 'attr_1'
        },
        {
          order: 2,
          label: 'Amount',
          help: 'The amount of USD for the invoice',
          required: true,
          datatype: 'NUMBER',
          datatypeOptions: {},
          identifier: 'amount',
          _id: 'attr_2'
        },
        {
          order: 3,
          label: 'Payment Received',
          help: 'Indicates whether or not payment has been received.',
          required: false,
          datatype: 'BOOL',
          datatypeOptions: {},
          identifier: 'payment_received',
          _id: 'attr_3'
        },
        {
          order: 4,
          label: 'Date',
          help: 'Date the invoice was sent out.',
          required: true,
          datatype: 'DATE',
          datatypeOptions: {},
          identifier: 'date',
          _id: 'attr_4'
        }
      ],
      label_plural: 'Invoices',
      plural_identifier: 'invoice'
    },
    {
      label: 'Job',
      identifier: 'job',
      _id: 'schema_85414304137721',
      relations: [
        {
          type: 'BELONGS_TO',
          schema_id: 'schema_29321443037762'
        },
        {
          type: 'BELONGS_TO',
          schema_id: 'schema_22881179555990'
        }
      ],
      attributes: [
        {
          order: 1,
          label: 'Job ID',
          help: 'Unique ID',
          required: true,
          datatype: 'TEXT',
          datatypeOptions: {},
          identifier: 'job_id',
          unique: true,
          _id: 'attr_1'
        },
        {
          order: 2,
          label: 'Contact',
          help: 'Contact for whom the Job is being done',
          required: true,
          datatype: 'SCHEMA',
          datatypeOptions: {
            schema_id: 'schema_29321443037762',
            schema_attribute_identifier: 'name'
          },
          identifier: 'contact_id',
          _id: 'attr_2'
        },
        {
          order: 3,
          label: 'Invoice',
          help: 'Invoice for this Job',
          required: false,
          datatype: 'SCHEMA',
          datatypeOptions: {
            schema_id: 'schema_22881179555990',
            schema_attribute_identifier: 'invoice_id'
          },
          identifier: 'invoice_id',
          _id: 'attr_3'
        },
        {
          order: 4,
          label: 'Status',
          help: 'Status of the Job',
          required: false,
          datatype: 'TEXT',
          datatypeOptions: {},
          identifier: 'status',
          _id: 'attr_4'
        }
      ],
      label_plural: 'Jobs',
      plural_identifier: 'jobs'
    }
  ],
  selectedAttribute: null
}

export default state
