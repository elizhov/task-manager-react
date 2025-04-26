import { useContext, useState } from "react";
import { TodoContext } from "../contexts/todo-context.jsx";
import Todo from "./Todo.jsx";
import "../App.css";

const TodoColumn = ({ title, statusFilter, assignees }) => {
    const { todos, addTodo } = useContext(TodoContext);
    const [inputValue, setInputValue] = useState("");
    const [priority, setPriority] = useState("low");
    const [status, setStatus] = useState(statusFilter);
    const [assignedTo, setAssignedTo] = useState([]);
    const [isAddingTask, setIsAddingTask] = useState(false);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAssigneeChange = (e) => {
        const options = e.target.selectedOptions;
        const selectedAssignees = Array.from(options).map(option => option.value);
        setAssignedTo(selectedAssignees);
    };

    const addtoTodo = () => {
        if (inputValue.trim() !== "") {
            addTodo({ value: inputValue, priority, status, assignees: assignedTo });
            setInputValue("");
            setPriority("low");
            setStatus(statusFilter);
            setAssignedTo([]);
            setIsAddingTask(false);
        }
    };

    return (
        <div className="todo-column">
            <h2>{title}</h2>

            {todos.filter(todo => todo.status === statusFilter).map(todo => (
                <Todo key={todo.id} todo={todo} />
            ))}

            <button onClick={() => setIsAddingTask(true)} className="add-task-btn">Add Task</button>

            {isAddingTask && (
                <div className="add-task-form">
                    <input
                        value={inputValue}
                        onChange={handleChange}
                        type="text"
                        placeholder="Task title"
                    />
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                    </select>

                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="todo">To do</option>
                        <option value="doing">Doing</option>
                        <option value="done">Done</option>
                    </select>

                    <select multiple value={assignedTo} onChange={handleAssigneeChange}>
                        <option value="">Select Assignees</option>
                        {assignees.map((assignee, index) => (
                            <option key={index} value={assignee}>
                                {assignee}
                            </option>
                        ))}
                    </select>

                    <button onClick={addtoTodo}>Add</button>
                    <button onClick={() => setIsAddingTask(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default TodoColumn;
