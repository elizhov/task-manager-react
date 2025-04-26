import { useState, useContext } from "react";
import { TodoContext } from "../contexts/todo-context.jsx";

const availableAssignees = ["John", "Alice", "Bob", "Jane"];


const Todo = ({ todo }) => {
    const { deleteTodo, editPriority, editStatus, editTitle, editAssignees } = useContext(TodoContext);

    const [isEditMode, setIsEditMode] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.value);
    const [newPriority, setNewPriority] = useState(todo.priority);
    const [newStatus, setNewStatus] = useState(todo.status);
    const [selectedAssignees, setSelectedAssignees] = useState(todo.assignees);

    const handleTitleChange = (e) => setNewTitle(e.target.value);
    const handlePriorityChange = (e) => setNewPriority(e.target.value);
    const handleStatusChange = (e) => setNewStatus(e.target.value);

    const handleAssigneeChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedAssignees((prev) => [...prev, value]);
        } else {
            setSelectedAssignees((prev) => prev.filter((assignee) => assignee !== value));
        }
    };

    const saveChanges = () => {
        editTitle(todo.id, newTitle);
        editPriority(todo.id, newPriority);
        editStatus(todo.id, newStatus);
        editAssignees(todo.id, selectedAssignees);
        setIsEditMode(false); // Exit edit mode
    };

    return (
        <div className="todo-item">
            <h3>{isEditMode ? <input value={newTitle} onChange={handleTitleChange} /> : todo.value}</h3>

            <p>
                <strong>Priority:</strong>
                {isEditMode ? (
                    <select value={newPriority} onChange={handlePriorityChange}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                ) : (
                    <span>{todo.priority}</span>
                )}
            </p>

            <p>
                <strong>Status:</strong>
                {isEditMode ? (
                    <select value={newStatus} onChange={handleStatusChange}>
                        <option value="todo">To Do</option>
                        <option value="doing">Doing</option>
                        <option value="done">Done</option>
                    </select>
                ) : (
                    <span>{todo.status}</span>
                )}
            </p>

            <p>
                <strong>Assignees:</strong>
                {isEditMode ? (
                    <div className="assignees-checkboxes">
                        {availableAssignees.map((assignee) => (
                            <label key={assignee}>
                                <input
                                    type="checkbox"
                                    value={assignee}
                                    checked={selectedAssignees.includes(assignee)}
                                    onChange={handleAssigneeChange}
                                />
                                {assignee}
                            </label>
                        ))}
                    </div>
                ) : (
                    <span>{todo.assignees.join(", ")}</span>
                )}
            </p>


            <div>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                <button onClick={() => (isEditMode ? saveChanges() : setIsEditMode(true))}>
                    {isEditMode ? "Save" : "Edit"}
                </button>
            </div>
        </div>
    );
};

export default Todo;
