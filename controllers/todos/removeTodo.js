const { Todo } = require("../../models/todo");

const { requestError } = require("../../helpers");

const removeTodo = async (req, res) => {
  const { id } = req.params;
  const result = await Todo.findByIdAndRemove(id);
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.status(200).json({
    message: "todo deleted",
    id
  });
};

module.exports = removeTodo;
