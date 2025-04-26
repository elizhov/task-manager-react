import { useContext, useState } from "react";
import { TodoContext } from "../contexts/todo-context.jsx";
import Todo from "./Todo.jsx";
import "../App.css"

const Todos = () => {
    const [inputValue, setInputValue] = useState("");
    const [priority, setPriority] = useState("low");
    const [status, setStatus] = useState("todo");

    const { todos, addTodo } = useContext(TodoContext);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const addtoTodo = () => {
        if (inputValue.trim() !== "") {
            addTodo({ value: inputValue, priority, status });
            setInputValue("");
            setPriority("low");
            setStatus("todo");
        }
    };

    // Filtering tasks by status before rendering
    const todoTasks = todos.filter((todo) => todo.status === "todo");
    const doingTasks = todos.filter((todo) => todo.status === "doing");
    const doneTasks = todos.filter((todo) => todo.status === "done");

    return (
        <div>
            <input
                value={inputValue}
                onChange={handleChange}
                type="text"
                placeholder="Task title"
            />

            {/* Priority select */}
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
            </select>

            {/* Status select */}
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="todo">To do</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
            </select>

            <button onClick={addtoTodo}>Add</button>

            <div className="todo-container">
                <div className="todo-box">
                    <h1>To do</h1>
                    {todoTasks.length === 0 ? (
                        <p>No todos yet!</p>
                    ) : (
                        todoTasks.map((todo) => <Todo key={todo.id} todo={todo} />)
                    )}
                </div>

                <div className="todo-box">
                    <h1>Doing</h1>
                    {doingTasks.length === 0 ? (
                        <p>No todos in progress!</p>
                    ) : (
                        doingTasks.map((todo) => <Todo key={todo.id} todo={todo} />)
                    )}
                </div>

                <div className="todo-box">
                    <h1>Done</h1>
                    {doneTasks.length === 0 ? (
                        <p>No completed tasks!</p>
                    ) : (
                        doneTasks.map((todo) => <Todo key={todo.id} todo={todo} />)
                    )}
                </div>
            </div>
        </div>
    );
};

export default Todos;
