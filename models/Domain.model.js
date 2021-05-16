const { Schema, model } = require("mongoose");

const DomainSchema = new Schema({
    id: String,
    type: String,
    registrar: String,
    jarm: Number,
    creation_date: Number,
    last_dns_records_date: Number,
    last_https_certificate_date: Number,
    last_modification_date: Number,
    last_update_date: Number,
    whois: String,
    whois_date: Number,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    myNote: {type: Schema.Types.ObjectId, ref: 'Note'},
});

const DomainModel = model("Domain", DomainSchema);

module.exports = DomainModel;
