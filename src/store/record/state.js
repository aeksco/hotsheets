
// Record Module State
const state = {
  collection: [
    {
      _id: 'rec_32976293799615',
      schema_id: 'schema_29321443037762',
      attributes: {
        name: 'Al Schwaa',
        location: 'Troy, NY',
        phone: '1234567890'
      }
    },
    {
      _id: 'rec_83122409943633',
      schema_id: 'schema_29321443037762',
      attributes: {
        name: 'John Doe',
        location: 'NY, NY',
        phone: '0987654321'
      }
    },
    {
      _id: 'rec_50813637509925',
      schema_id: 'schema_22881179555990',
      attributes: {
        contact_id: 'rec_32976293799615',
        amount: '500.00',
        payment_received: true,
        date: '2018-01-10',
        invoice_id: 'IN_00001'
      }
    },
    {
      _id: 'rec_20022846283213',
      schema_id: 'schema_22881179555990',
      attributes: {
        contact_id: 'rec_32976293799615',
        amount: '200.00',
        payment_received: null,
        date: '2018-01-25',
        invoice_id: 'IN_00002'
      }
    },
    {
      _id: 'rec_56277813766977',
      schema_id: 'schema_22881179555990',
      attributes: {
        contact_id: 'rec_83122409943633',
        amount: '25.25',
        payment_received: null,
        date: '2018-01-17',
        invoice_id: 'IN_00003'
      }
    },
    {
      _id: 'rec_10283797663298',
      schema_id: 'schema_85414304137721',
      attributes: {
        job_id: 'JB_00001',
        client: 'rec_32976293799615',
        invoice: 'rec_50813637509925',
        status: 'Completed'
      }
    },
    {
      _id: 'rec_33864531983515',
      schema_id: 'schema_85414304137721',
      attributes: {
        job_id: 'JB_00002',
        client: 'rec_83122409943633',
        invoice: 'rec_56277813766977',
        status: 'In-Progress'
      }
    }
  ]
}

export default state
