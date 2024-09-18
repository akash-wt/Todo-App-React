import { useState,useEffect } from 'react';
import { CreateTodo } from './components/CreateTodo';
import { Todos } from './components/todos';
import axios from 'axios';

function App() {
  const [todos,setTodos]=useState([]);


  useEffect(  ()=>{
     axios.get("http://localhost:3000/todos")
    .then((data)=>{
      console.log(data.data);
setTodos(data.data);
    }).catch((err)=>{console.log(err);
    })
  },[]);
    

  
  
  return (
    <>
     <CreateTodo setTodos={setTodos}/>
     <Todos todo={todos}/>
    </>
  )
}

export default App
