const addTodo = require('./addTodo');
const listTodos = require('./listTodos');
// const getTodoById = require('./gettodoById');
const removeTodo = require('./removeTodo');
const updateTodo = require('./updateTodo');
const toggleComplete = require('./toggleComplete')

module.exports ={
    addTodo,
    listTodos,
    // getTodoById,
    removeTodo,
    updateTodo,
    toggleComplete
}