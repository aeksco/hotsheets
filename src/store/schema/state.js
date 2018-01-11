
// Schema Module State
const state = {
  collection: [
    {
      label: 'Contact',
      identifier: 'contact',
      _id: 'schema_29321443037762',
      unqiue_id_prefix: 'CT_',
      display: {
        navbar_link: true,
        icon: 'fa-user-circle-o'
      },
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
          preferred: true,
          col_span: '6'
        },
        {
          order: 1,
          label: 'Location',
          help: 'Location of the individual',
          required: false,
          datatype: 'TEXT',
          datatypeOptions: {},
          identifier: 'location',
          _id: 'attr_2',
          col_span: '6'
        },
        {
          order: 3,
          label: 'Phone Number',
          help: 'Phone number of the individual',
          required: false,
          datatype: 'NUMBER',
          datatypeOptions: {},
          identifier: 'phone',
          _id: 'attr_3',
          col_span: '6'
        },
        {
          order: 4,
          label: 'E-Mail',
          help: 'E-Mail address associated with this Contact.',
          required: true,
          unique: false,
          preferred: false,
          col_span: '6',
          datatype: 'TEXT',
          datatypeOptions: {},
          identifier: 'email',
          _id: 'attr_26577092992831'
        },
        {
          order: 5,
          label: 'Invoices',
          help: 'Invoices associated with this person',
          required: false,
          unique: false,
          preferred: false,
          col_span: 12,
          datatype: 'HAS_MANY',
          datatypeOptions: {
            schema_id: 'schema_22881179555990'
          },
          identifier: 'invoice_ids',
          _id: 'attr_37727300204170'
        },
        {
          order: 6,
          label: 'Contact Information',
          help: 'Contact Information for this contact',
          required: false,
          unique: false,
          preferred: false,
          col_span: 6,
          datatype: 'HAS_MANY',
          datatypeOptions: {
            schema_id: 'schema_10301016043421'
          },
          identifier: 'contact_info_ids',
          _id: 'attr_63003613597957'
        },
        {
          order: 7,
          label: 'Jobs',
          help: 'Jobs worked',
          required: false,
          unique: false,
          preferred: false,
          col_span: 6,
          datatype: 'HAS_MANY',
          datatypeOptions: {
            schema_id: 'schema_85414304137721'
          },
          identifier: 'job_ids',
          _id: 'attr_63065825981008'
        }
      ],
      label_plural: 'Contacts',
      plural_identifier: 'contacts'
    },
    {
      label: 'Invoice',
      identifier: 'invoice',
      _id: 'schema_22881179555990',
      unqiue_id_prefix: 'IV_',
      display: {
        navbar_link: true,
        icon: 'fa-usd'
      },
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
      unqiue_id_prefix: 'JB_',
      display: {
        navbar_link: true,
        icon: 'fa-list-alt'
      },
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
          col_span: 6,
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
          col_span: 6,
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
          col_span: 6,
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
          col_span: 6,
          _id: 'attr_4'
        }
      ],
      label_plural: 'Jobs',
      plural_identifier: 'jobs'
    },
    {
      label: 'Contact Information',
      identifier: 'contact_info',
      _id: 'schema_10301016043421',
      unqiue_id_prefix: 'CI_',
      display: {
        navbar_link: false,
        icon: 'fa-phone-square'
      },
      attributes: [
        {
          order: 1,
          label: 'Type',
          help: 'Email / Mobile / Home / Fax / etc.',
          required: true,
          unique: false,
          preferred: false,
          col_span: 6,
          datatype: 'TEXT',
          datatypeOptions: {},
          identifier: 'type',
          _id: 'attr_48079170963292'
        },
        {
          order: 2,
          label: 'Value',
          help: 'The value associated with the type field.',
          required: false,
          unique: false,
          preferred: false,
          col_span: 6,
          datatype: 'TEXT',
          datatypeOptions: {},
          identifier: 'value',
          _id: 'attr_67835475587330'
        },
        {
          order: 3,
          label: 'Contact',
          help: 'Contact belongs to',
          required: false,
          unique: false,
          preferred: false,
          col_span: 6,
          datatype: 'SCHEMA',
          datatypeOptions: {
            schema_id: 'schema_29321443037762',
            schema_attribute_identifier: 'name'
          },
          identifier: 'contact_id',
          _id: 'attr_59406157311022'
        }
      ],
      label_plural: 'Contact Information',
      plural_identifier: 'contact_infos'
    }
  ],
  selectedAttribute: null
}

export default state
