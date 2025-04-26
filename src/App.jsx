import {TodoProvider} from "./contexts/todo-context.jsx";
import Todos from "./components/todos.jsx";


const App = () => {
    return (
        <TodoProvider>
            <div style={{ padding: "20px" }}>
                <Todos />
            </div>
        </TodoProvider>
    );
};

export default App;
