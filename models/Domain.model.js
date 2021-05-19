const { Schema, model } = require("mongoose");

const DomainSchema = new Schema({
    myDomain: {
        type: Schema.Types.Mixed
    },
    data: {
        type: Schema.Types.Mixed
    },
    myNote: [{type: Schema.Types.ObjectId, ref: 'Note'}],
    
});

const DomainModel = model("Domain", DomainSchema);

module.exports = DomainModel;
