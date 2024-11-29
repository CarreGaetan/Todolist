
import { useEffect, useState } from 'react'
import Timer from '../Timer/Timer'
import AddTask from '../AddTask/AddTask'
import TaskList from '../TaskList/TaskList'
import FinishedTasks from '../FinishedTasks/FinishedTasks'
import TaskSelected from '../TaskSelected/TaskSelected'
import './Todolist.scss'

function Todolist() {

    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos')
        return savedTodos ? JSON.parse(savedTodos) : [];
    })
    const [newTodo, setNewTodo] = useState('')
    const [editId, setEditId] = useState(null)
    const [editedTask, setEditedTask] = useState('')
    const [selectedTask, setSelectedTask] = useState(null)
    const [checkedTask, setCheckedTask] = useState(false)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        if (selectedTask && !todos.find(todo => todo.id === selectedTask.id)) {
            setSelectedTask(null);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [todos]);

    function addTask() {
        if (newTodo.trim() === '') {
            return
        }

        const newTask = {
            id: todos.length + 1,
            name: newTodo,
            createdAt: new Date().toLocaleDateString(),
            checked: false,
            description: 'Ajouter une description'
        }
        setTodos([...todos, newTask])
        setNewTodo('')
    }

    function deleteTask(removedTask) {
        console.log("Tâche supprimée :", removedTask);
        console.log("Tâche sélectionnée avant suppression :", selectedTask);
    
        const updatedTodos = todos.filter(todo => todo.id !== removedTask);
        setTodos(updatedTodos);
    
        if (selectedTask && selectedTask.id === removedTask) {
            setSelectedTask(null);
        }
    }

    function editMode(id, currentName) {
        setEditId(id)
        setEditedTask(currentName)
    }

    function saveTask(id) {
        const updatedTodos = todos.map(todo => todo.id === id ? {...todo, name: editedTask} : todo)
        setTodos(updatedTodos)
        setEditId(null)
        setEditedTask('')
    }

    function toggleCheckbox(id) {
        const updatedTodos = todos.map(todo => todo.id === id ? {...todo, checked: !todo.checked} : todo)
        setTodos(updatedTodos)
    }

    function saveDescription(newDescription, id) {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, description: newDescription } : todo
        );
        setTodos(updatedTodos);
        setSelectedTask({ ...selectedTask, description: newDescription });
    }

    return (
        <div>
            <h1>To do list</h1>
            <div className="container">
                <div className="list_container">
                    <AddTask newTodo={newTodo} setNewTodo={setNewTodo} addTask={addTask} />
                    <div className='list'>
                    <TaskList
                        tasks={todos.filter((todo) => !todo.checked) // Tâches non catégorisées
                        }
                        setTasks={setTodos}
                        toggleCheckbox={toggleCheckbox}
                        editMode={editMode}
                        deleteTask={deleteTask}
                        editId={editId}
                        editedTask={editedTask}
                        setEditedTask={setEditedTask}
                        saveTask={saveTask}
                        setSelectedTask={setSelectedTask}
                    />
                        <button 
                            className='showCheckedTaskButton'
                            onClick={() => setCheckedTask(!checkedTask)}>
                                {todos.filter(todo => todo.checked).length >= 1 ?
                                checkedTask ? 'Cacher les tâches terminées' : 'Afficher les tâches terminées' : ''}
                        </button>
                    <FinishedTasks
                        tasks={todos.filter((todo) => todo.checked)} // Passer uniquement les tâches terminées
                        checkedTask={checkedTask} // Contrôle de l'affichage
                        setSelectedTask={setSelectedTask}
                        editId={editId}
                        editedTask={editedTask}
                        setEditedTask={setEditedTask}
                        saveTask={saveTask}
                        toggleCheckbox={toggleCheckbox}
                        editMode={editMode}
                        deleteTask={deleteTask}
                    />
                </div>
            </div>
            <div className="item_container">
                <div className="timer_container">
                    <Timer />
                </div>
                <div className="task_selected">
                    <TaskSelected
                        selectedTask={selectedTask}
                        saveDescription={saveDescription} />
                </div>
            </div>
        </div>
        </div>
    )
}
    
    export default Todolist