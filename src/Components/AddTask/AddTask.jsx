import './AddTask.scss'

function AddTask({ newTodo, setNewTodo, addTask}) {
    return (
        <div className="add_task">
                    <input 
                        type="text"
                        placeholder='Entrez une tâche'
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addTask()} />
                    <button onClick={addTask}>Ajouter</button>
                </div>
    )
}

export default AddTask