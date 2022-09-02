const {todo} = require("../../models/todo");


const getTodoById = async(req, res) => {
    const {id} = req.params;
    const result = await todo.findById(id);

    res.json(result);
}

module.exports = getTodoById; 