const { Todo } = require("../../models/todo");

const { requestError } = require("../../helpers");


const updateTodo = async (req, res) => {
  const { id } = req.params;
  const {description:newDescription} = req.body;
  console.log('this is description',req.params)
  // const {complete:prevComplete} = await Todo.findById(id)


  const result = await Todo.findByIdAndUpdate(id, {description:newDescription});
console.log(result)

  if (!result) {
    throw requestError(404, "Not found");
  }
  // res.json(result);
  res.json({
    message:"Todo updated successfully",
    // id:result._id
    description:result.description
  });
};

module.exports = updateTodo;
