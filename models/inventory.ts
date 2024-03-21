import { Schema, model, models } from "mongoose";

const InventorySchema = new Schema({
  name: {
    type: String,
    required: true 
  },
  description: {
    type: String
  },
  quantity: { 
    type: Number,
    default: 0
  }
});

const Inventory = models.Inventory || model("Inventory", InventorySchema);

export default Inventory;

