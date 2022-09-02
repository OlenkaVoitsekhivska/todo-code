const express = require("express");

const router = express.Router();

const {
  addTodo,
  listTodos,
  removeTodo,
  updateTodo,
  toggleComplete
} = require("../../controllers/todos");
const { wrapper } = require("../../helpers/wrapper");
// const { authenticate, validateBody, idValid } = require("../../middleware");
// const { postSchema, putSchema } = require("../../validation/validation");

// router.get("/", authenticate, wrapper(listTodos));

// router.get("/:id", idValid, authenticate, wrapper(getTodoById));

// router.post("/", authenticate, validateBody(postSchema), wrapper(addTodo));

// router.delete("/:id", idValid, authenticate, wrapper(removeTodo));


router.get("/",  wrapper(listTodos));

router.post("/", wrapper(addTodo));


router.delete("/:id",  wrapper(removeTodo));



router.put("/:id", wrapper(updateTodo));

router.patch('/:id', wrapper(toggleComplete))



module.exports = router;
