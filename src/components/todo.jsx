import { useContext, useState } from "react";
import { TodoContext } from "../contexts/todo-context.jsx";

const Todo = ({ todo }) => {
    const { deleteTodo, editPriority, editStatus, editTitle } = useContext(TodoContext);

    // Manage edit mode
    const [isEditmode, setIsEditmode] = useState(false);
    const [inputValue, setInputValue] = useState(todo.value);

    const handlePriorityChange = (e) => {
        editPriority(todo.id, e.target.value);
    };

    const handleStatusChange = (e) => {
        editStatus(todo.id, e.target.value);
    };

    const handleTitleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleEdit = () => {
        setIsEditmode(!isEditmode); // Toggle edit mode
        if (isEditmode) {
            // Save the edited title if exiting edit mode
            editTitle(todo.id, inputValue);
        }
    };

    return (
        <div className="todo-item">
            <div className="todo-header">
                <p><strong>Title:</strong></p>
                {isEditmode ? (
                    <input
                        value={inputValue}
                        onChange={handleTitleChange}
                        type="text"
                        className="todo-title-input"
                    />
                ) : (
                    <span>{todo.value}</span>
                )}
            </div>

            {/* Priority */}
            <div className="todo-details">
                <p><strong>Priority:</strong> </p>
                {isEditmode ? (
                    <select value={todo.priority} onChange={handlePriorityChange}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                ) : (
                    <span>{todo.priority}</span>
                )}
            </div>

            {/* Status */}
            <div className="todo-details">
                <p><strong>Status:</strong> </p>
                {isEditmode ? (
                    <select value={todo.status} onChange={handleStatusChange}>
                        <option value="todo">To do</option>
                        <option value="doing">Doing</option>
                        <option value="done">Done</option>
                    </select>
                ) : (
                    <span>{todo.status}</span>
                )}
            </div>

            {/* Action buttons */}
            <div className="todo-actions">
                <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                    Delete
                </button>
                <button className="edit-btn" onClick={handleEdit}>
                    {isEditmode ? "Save" : "Edit task"}
                </button>
            </div>
        </div>
    );
};

export default Todo;
