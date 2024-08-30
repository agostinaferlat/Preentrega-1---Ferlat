import mongoose from "mongoose";

const ticketCollection = "ticket";

const ticketSchema = new mongoose.Schema({

  code: {
    type: String, 
    required: true,
    default: function() {
      const ticketCode = Math.random().toString(36).substr(2, 9);
      return ticketCode;
    }
  },
  purchase_datatime: {
    type: Date, 
    default: function() {
      const dateGMTMinus3 = new Date(Date.now() - 3 * 60 * 60 * 1000);
      return dateGMTMinus3;
    },
  },
  amount: {type: Number, required: true},
  purchaser: {type: String, required:true},

});

ticketSchema.pre("find", function (){
  this.populate("products.product")
});

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);