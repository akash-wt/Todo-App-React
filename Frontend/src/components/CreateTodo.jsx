import { useState } from "react";
import axios from "axios";

export function CreateTodo({ setTodos }) {
  const [value, setValue] = useState({ title: "", description: "" });
  function updateChange(e) {
    setValue({ ...value, [e.target.name]: e.target.value });
  }
  function handleSubmit() {
    const todo = {
      title: value.title,
      description: value.description,
    };

    axios
      .post("http://localhost:3000/todo", todo)
      .then((data) => {
        axios
          .get("http://localhost:3000/todos")
          .then((data) => {
            console.log(data.data);
            setTodos(data.data);
          })
          .catch((err) => {
            console.log(err);
          });

        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        onChange={updateChange}
        value={value.title}
        name="title"
      />
      <br />
      <input
        type="text"
        placeholder="description"
        onChange={updateChange}
        value={value.description}
        name="description"
      />
      <br />
      <button onClick={handleSubmit}> Add todo</button>
    </div>
  );
}
