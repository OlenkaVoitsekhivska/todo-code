const {Todo} = require('../../models/todo')

const toggleComplete = async (req, res) => {
    // const {_id: owner} = req.user;
    // const result = await todo.create({...req.body, owner});
    const { id } = req.params;
    const previous = await Todo.findById(id)

    const result = await Todo.findByIdAndUpdate(id, {complete: !previous.complete},{new:true});
    console.log('this is result', result)
    res.status(201).json({
      message:"Todo successfully added",
      id:result._id,
      complete:result.complete
    });
  };

module.exports = toggleComplete;