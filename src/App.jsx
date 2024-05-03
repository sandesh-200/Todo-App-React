import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaRegEdit } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
    
  }, [])
  

  const saveTols = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = () => {
    setShowFinished(!showFinished)
    
  }
  
  


  const handleEdit = (e,id)=>{
    let t = todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveTols()

  }
  const handleDelete = (e, id)=>{
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveTols()

  }
  const handleAdd = ()=>{
    setTodos([...todos,{id:uuidv4(),todo, isCompleted:false}])
    setTodo("")
    // console.log(todos)
    saveTols()

  }
  const handleChange = (e)=>{
    setTodo(e.target.value)

  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id == id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveTols()
  }
  
  
  
  return (
    <>
    <Navbar />
    <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%] ">
      <h1 className='font-bold text-center text-3xl'>iTask - Manange your Todos at one place</h1>
      <div className="addTodo my-5 flex flex-col gap-4">
        <h2 className='text-2xl font-bold'>Add a Todo</h2>
        <div className="flex">
        <input onChange={handleChange} value={todo} type="text" id="" className='w-full rounded-full px-5 py-1 '/>
        <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 p-4 py-2 text-sm font-bold text-white rounded-full disabled:bg-violet-700 mx-2'>Add</button>
        </div>
      </div>
      <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
      <div className="h-[1px] bg-black opacity-15 w-3/4 mx-auto my-5"></div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length===0 && <div className='m-5'>No to
          dos to display</div> }
          {todos.map(item=>{
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3">
              <div className='flex gap-5'>
              <input onChange={handleCheckbox} type="checkbox" name={item.id} checked={item.isCompleted} id="" />
          <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
          <div className="buttons flex h-full">
            <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaRegEdit /></button>
            <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
          </div>
          </div>
          })}
        </div>
    </div>
    </>
  )
}

export default App
