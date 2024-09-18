export function Todos({ todo }) {
  return (
    <div>
      {todo.map((crrTodo) => {
        return (
          <div key={crrTodo._id}>
            <h2>{crrTodo.title}</h2>
            <p>{crrTodo.description}</p>
          </div>
        );
      })}
    </div>
  );
}
