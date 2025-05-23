import { useEffect, useState } from 'react'
import Task from './components/Task'
import { TodoContextProvider } from './context'
import uuid4 from 'uuid4'

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme"))

  const [todos, setTodos] = useState([])

  const [todo, setTodo] = useState("")

  const handleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  useEffect(() => {
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])


  const addTodo = () => {
    if(todo.length === 0) return;
    setTodos((prev) => [...prev, { id: uuid4(), todo: todo, completed: false }])
    setTodo("")
  }

  const editTodo = (id, todo) => {
    deleteTodo(id)
    setTodo(todo)
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const completeTodo = (id) => {
    setTodos((prev) => prev.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  }

  return (
    <TodoContextProvider value={{ editTodo, deleteTodo, completeTodo }}>
      <div className={`w-full h-screen ${theme === "dark" ? "dark:bg-linear-to-b from-[#000428] to-[#004e92]" : "bg-linear-to-b from-[#fc8d59] to-[#d7301f]"}`}>
        <nav>
          <div className='w-full h-20 flex justify-between items-center px-4'>
            <h1 className={`text-3xl text-center p-3 font-bold ${theme === 'dark' ? "dark:text-white" : ""}`}>Todo task App</h1>
            <button
              className={`text-bold p-2 rounded-full w-[40px] cursor-pointer flex justify-center items-center  backdrop-blur-lg ${theme === "dark" ? "dark:text-white bg-white/45" : "bg-black/80"}`}
              onClick={handleTheme}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
        </nav>

        <section className='w-full h-[83%] sm:h-[80%]'>
          <div className={`w-full h-full sm:w-[80%] sm:mx-auto rounded-lg p-2 sm:p-4 backdrop-blur-sm  flex flex-col gap-2 ${theme === "dark" ? "bg-[#004e92]/45" : "bg-[#fc8d59]/45"}`}>
            <div className='w-full h-[50px] 2xl:h-[80px] bg-white/35 rounded-lg flex justify-center items-center px-2 py-1 gap-1'>
              <input
                type="text"
                value={todo}
                className='w-[90%] 2xl:w-full h-[85%] bg-white/45 rounded-sm px-2 outline-none 2xl:text-2xl'
                placeholder='Enter your task here...'
                onChange={(e) => setTodo(e.target.value)}
              />
              <button
                className='h-[85%] w-[100px] bg-green-400 rounded-sm font-medium 2xl:text-2xl'
                onClick={addTodo}
              >
                Save
              </button>
            </div>

            <div className='w-full h-[90%] bg-white/35 rounded-lg flex flex-col gap-2 p-2 overflow-y-auto no-scrollbar'>
              {todos.map((todo) => {
                return <Task key={todo.id} todo={todo} />
              })}
            </div>
          </div>
        </section>

      </div>
    </TodoContextProvider>
  )
}

export default App
