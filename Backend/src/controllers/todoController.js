const Todo = require("../models/Todo");

async function createTodo(req, res) {
    try {
        const data = req.body;

        const todo = await Todo.create({
            title: req.body.title,
            user: req.user.id
        });

        res.status(201).json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getTodos(req, res) {
    try {
       const todos = await Todo.find({
    user: req.user.id
});
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
async function updateTodo(req, res) {
    try {
        const { id } = req.params;
        const data = req.body;

        Todo.findOneAndUpdate({
    _id: id,
    user: req.user.id
})

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        return res.status(200).json({
            message: "Todo updated successfully",
            todo
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}
async function deleteTodo(req, res) {
    try {
        const { id } = req.params;  
        

        Todo.findOneAndDelete({
    _id: id,
    user: req.user.id
})
        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        return res.status(200).json({
            message: "Todo deleted successfully",
            todo
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo

};

