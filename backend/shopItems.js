const mongoose = require('mongoose');
const shopitems = new mongoose.Schema({
  
    itemURL: String,
    itemDescription: String,
    itemName: String,
    itemRating: {
        start: Number,
        count: Number
    },
    itemType: String,
    itemProceCents: Number,
    itemQuantity: Number,
    isAvailable: Boolean,
    itemId: Number
});

module.exports = mongoose.model('Shopitems', shopitems)