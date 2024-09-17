const express = require("express");
const { zodSchema } = require("./zodSchema");
const mongoose = require('mongoose');
const Todo = require("./models/todo");
const wrapAsync = require("./wrapAsync");


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//---------------------------------
const url='mongodb://127.0.0.1:27017/Todo-App';
mongoose.connect(url)
    .then(() => console.log('Connected!'))
    .catch((err) => {
        console.log(err);

    });

//------------------------------------------

app.get("/todos", wrapAsync(async (req, res) => {
    const todos = await Todo.find({});
    res.status(200).send(todos);
}))



app.post("/todo", wrapAsync(async (req, res) => {

    const isValidSchema = zodSchema.safeParse(req.body);
    if (!isValidSchema.success) {
        console.log(
            isValidSchema.error.issues.map((issue) => issue.message)
        );
        return res.status(400).json({
            msg: "you sent the wrong inputs",
            errors: isValidSchema.error.issues.map((issue) => ({
                message: issue.message,
                path: issue.path,
            })),
        })
    }
    try {
        const todo = new Todo(req.body);
        await todo.save();
        return res.status(201).json({ mas: todo._id })
    }
    catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }


}));


app.put("/completed", wrapAsync(async (req, res) => {
    const id = req.body.id;
    const todo = await Todo.findByIdAndUpdate(id, { completed: true }, { new: true });
    res.send(todo);
}))

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
});

app.listen(port, () => {
    console.log("app is listing on ", port);

})