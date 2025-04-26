import {TodoProvider} from "./contexts/todo-context.jsx";
import Todos from "./components/todos.jsx";
import "./App.css"

const App = () => {
    return (
        <TodoProvider>
            <div className="app">
                <h1>To-do App</h1>
                <Todos />
            </div>
        </TodoProvider>
    );
}

export default App;
