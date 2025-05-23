import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { useTodo } from "../context";

const Task = ({todo}) => {
    
    const {editTodo, deleteTodo, completeTodo} = useTodo()

    const complete = () =>{
        completeTodo(todo.id)
    }

    const handleEdit = () =>{
        editTodo(todo.id, todo.todo)
    }

    const handleDelete = () =>{
        deleteTodo(todo.id)
    }

    return (
        <>
            <div className={`w-full h-[100px] md:h-[80px] px-2 py-1 flex items-center justify-around rounded-lg gap-1 ${todo.completed ? "bg-green-400" : "bg-white/65"}`}>
                <div className='w-[20px] flex justify-center items-center'>
                    <input
                        type="checkbox"
                        className={`w-3.5 2xl:w-5 h-3.5 2xl:h-5 border`}
                        checked={todo.completed}
                        onChange={complete}
                    />
                </div>

                <div className='w-[70%] md:w-[80%]'>
                    <textarea
                    className={`w-full h-[90px] md:h-[50px] 2xl:text-2xl outline-none wrap-break-word no-scrollbar resize-none ${todo.completed ? "line-through" : ""}`}
                    id={todo.id}
                    value={todo.todo}
                    readOnly
                    />
                </div>

                <div className='h-[90px] md:h-[50px] w-[55px] md:w-[150px] 2xl:w-[200px] flex flex-col md:flex-row items-center justify-around md:gap-1 lg:gap-2'>
                    <button 
                    className='px-1 py-1 md:py-2 2xl:py-3 text-xl 2xl:text-2xl rounded-md w-full md:w-1/2 bg-blue-500 font-medium flex justify-center items-center text-white/85'
                    onClick={handleEdit}
                    >
                        <TbEdit/>
                    </button>

                    <button 
                    className='px-1 py-1 md:py-2 2xl:py-3 text-xl 2xl:text-2xl rounded-md w-full md:w-1/2 bg-red-500 font-medium flex justify-center items-center text-white/85'
                    onClick={handleDelete}
                    >
                        <MdDelete />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Task
