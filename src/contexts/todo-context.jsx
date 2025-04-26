import {createContext, useReducer} from "react";

const TodoContext = createContext();

const generateId = () => Math.random();

const ACTIONS = {
    ADD_TODO: "add-todo",
    DELETE_TODO: "delete-todo",
    FILTER_BY_DONE: "filter-by-done",
    EDIT_TODO: "edit-todo",
    EDIT_ASSIGNEES: "edit-assignees",
    EDIT_PRIORITY: "edit-priority",
    EDIT_STATUS: "edit-status",
    EDIT_TITLE: "edit-title",
}

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case ACTIONS.ADD_TODO:
            return [...state, {
                id: generateId(),
                value: payload.value,
                priority: payload.priority || "low", // default
                status: payload.status || "todo" // default
            }];

        case ACTIONS.DELETE_TODO:
            return (state.filter((todo) => todo.id !== payload.id));

        case ACTIONS.EDIT_PRIORITY:
            return state.map((todo) =>
                todo.id === payload.id ? { ...todo, priority: payload.priority } : todo
            );

        case ACTIONS.EDIT_STATUS:
            return state.map((todo) =>
                todo.id === payload.id ? { ...todo, status: payload.status } : todo
            );
        case ACTIONS.EDIT_TITLE:
            return state.map((todo) =>
                todo.id === payload.id ? { ...todo, value: payload.value } : todo
            );

        default: return state;
    }
}

const TodoProvider = ({children}) => {
    const [todos, dispatch] = useReducer(reducer, []);

    const addTodo = (todo) => {
        dispatch({
            type: ACTIONS.ADD_TODO,
            payload: {
                value: todo.value,
                priority: todo.priority,
                status: todo.status
            }
        });
    };

    const editPriority = (id, priority) => {
        dispatch({ type: ACTIONS.EDIT_PRIORITY, payload: { id, priority } });
    };

    const editStatus = (id, status) => {
        dispatch({ type: ACTIONS.EDIT_STATUS, payload: { id, status } });
    };

    const editTitle = (id, value) => {
        dispatch({ type: ACTIONS.EDIT_TITLE, payload: { id, value } });
    };


    const deleteTodo = (id) => {
        dispatch({type: ACTIONS.DELETE_TODO, payload: {id}})
    }

    return (
        <TodoContext.Provider value={{ todos, addTodo, deleteTodo, editPriority, editStatus, editTitle }}>
            {children}
        </TodoContext.Provider>

    )
}

export {TodoContext, TodoProvider}
