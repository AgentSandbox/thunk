import {useState} from "react";
import './App.css'
import {v1} from "uuid"
import {useDispatch, useSelector} from "react-redux"
import {addTodo, deleteTodo, toggleTodo} from "./store/todoSlice.jsx";


function App() {
    const [text, setText] = useState("")

    const dispatch = useDispatch()
    const textTodo = useSelector((state) => state.todos.arr)

    const onClickHandle = () => {
        if (text) {
            dispatch(addTodo({
                id: v1(),
                text: text,
                completed: false
            }))
        }
        setText("")
    }
    return (
        <div className="App">
            <label>
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                />
                <button onClick={onClickHandle}>ADD TODO</button>
            </label>
            <ul>
                {
                    textTodo.map(t => <li key={t.id}>
                        <input
                            onClick={()=>{dispatch(toggleTodo(t.id))}}
                            type="checkbox"
                            checked={t.completed}
                        />
                        <span
                            className={t.completed?"textCompleted":""}
                        >
                            {t.text}
                        </span>
                        <span
                            onClick={()=>{dispatch(deleteTodo(t.id))}}
                            className="delete"
                        >
                            &times;
                        </span>
                    </li>)
                }
            </ul>
        </div>
    )
}

export default App
