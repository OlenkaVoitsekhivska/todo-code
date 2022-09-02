const { Schema, model } = require("mongoose");

const todoSchema = Schema({
description:{
  type:String,
  required:true
},
complete:{
  type:Boolean,
  default:false
}
  // owner: {
  //   type: Schema.Types.ObjectId,
  //   ref: "user",
  // },
});

const Todo = model("todo", todoSchema);

module.exports = { Todo };
