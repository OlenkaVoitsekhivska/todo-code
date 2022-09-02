const { Todo } = require("../../models/todo");

const listTodos = async (req, res) => {

  const result = await Todo.find({}) 
const updatedRes = result.map(({_id,description,complete})=>{
return{
  id:_id,
  description,
  complete
}
})
  res.json(updatedRes);
};

module.exports = listTodos;
