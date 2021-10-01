import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
}

export function Todolist(props: PropsType) {
    let [newTitle, setNewTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }
    const onClickHandlerForAddTask = () => {
        props.addTask(newTitle)
        setNewTitle('')
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            props.addTask(newTitle)
            setNewTitle('')
        }
    }
    const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }
    const changeFilterHandler = (value: FilterValuesType)=> {
        props.changeFilter(value)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTitle} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={onClickHandlerForAddTask}>+</button>
        </div>


         <ul>
            {
                props.tasks.map((t) => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={ () => removeTaskHandler(t.id)}>x</button>
                        </li>)
                    }
                )
            }
        </ul>


        <div>
            <button onClick={ () => changeFilterHandler("all") }>
                All
            </button>
            <button onClick={ () => changeFilterHandler("active") }>
                Active
            </button>
            <button onClick={ () => changeFilterHandler("completed") }>
                Completed
            </button>
        </div>
    </div>
}
