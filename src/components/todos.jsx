import TodoColumn from "./TodoColumn.jsx";

const Todos = () => {
    return (
        <div className="todos-container">
            <TodoColumn title="To do" statusFilter="todo" assignees={['Alice', 'Bob', 'Charlie']}/>
            <TodoColumn title="Doing" statusFilter="doing" assignees={['Alice', 'Bob', 'Charlie']}/>
            <TodoColumn title="Done" statusFilter="done" assignees={['Alice', 'Bob', 'Charlie']}/>
        </div>
    );
};

export default Todos;
