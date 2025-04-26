import { useState } from "react";
import "../App.css";

const AddTaskModal = ({ defaultStatus, onClose, onSave }) => {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("low");
    const [status, setStatus] = useState(defaultStatus);
    const [selectedAssignees, setSelectedAssignees] = useState([]);

    const availableAssignees = ["John", "Alice", "Bob", "Jane"];

    const handleSubmit = () => {
        if (title.trim() === "") return;

        onSave({
            value: title,
            priority,
            status,
            assignees: selectedAssignees,
        });
    };

    const handleAssigneeChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedAssignees((prev) => [...prev, value]);
        } else {
            setSelectedAssignees((prev) => prev.filter((assignee) => assignee !== value));
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Add New Task</h3>

                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="modal-input"
                />

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="modal-input"
                >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="modal-input"
                >
                    <option value="todo">To do</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                </select>


                <div className="modal-input">
                    <strong>Assignees:</strong>
                    <div className="assignees-checkboxes">
                        {availableAssignees.map((assignee) => (
                            <label key={assignee} style={{ display: "block", marginTop: "5px" }}>
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
                </div>

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                    <button className="save-btn" onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default AddTaskModal;
