import { useState, useEffect } from "react";
 
export default function Try1() {
    const initialTaskState = {
        text: "",
        compleated: false,
    };
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState(initialTaskState);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedTasks = localStorage.getItem("tasks");
            if (storedTasks) {
                setTasks(JSON.parse(storedTasks));
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }, [tasks]);

    function AddNewTask(event) {
        event.preventDefault()
        if (newTask.text.trim()) {
            setTasks([...tasks, newTask]);
            setNewTask(initialTaskState);
        }
    }
    function handleCompleted(index) {
        let result = tasks.map((task, index2) => (
            index2 === index ? {...task, compleated: !task.compleated} : task
        ))
        setTasks(result);
    }
    function deleteTask(index) {
        if(window.confirm("Do you really want to delete")) {
            let result = tasks.filter((_, index2) => index !== index2)
            setTasks(result);
        }
    }
    return(
        <div>
            <form onSubmit={AddNewTask}>
                <input type="text" onChange={(e) => setNewTask({...newTask, text: e.target.value})} value={newTask.text}/>
                <input type="submit"/>
            </form>
            <ol>
                {tasks.map((task, index)=> (
                    <li className={task.compleated === true ? "gray-text" : ""}key={index}>
                        <label>
                            <input type="checkbox" onChange={() => handleCompleted(index)}/>
                            {task.text}
                        </label>
                        <span onClick={() => deleteTask(index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                            </svg>
                        </span>  
                    </li>
                ))}
            </ol>
        </div>
    )
}