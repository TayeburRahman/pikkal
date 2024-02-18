// airtable.js
const Airtable = require("airtable");

Airtable.configure({
  apiKey: process.env.AIRTABLE_ACCESS_TOKEN,
});

const AirtableBase = new Airtable({
  apiKey: process.env.AIRTABLE_BASE_ID,
}).base(process.env.AIRTABLE_BASE_ID);

module.exports = AirtableBase;
