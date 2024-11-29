import './TaskSelected.scss'

function TaskSelected( { selectedTask, saveDescription } ) {
    return (
        <div>
            {selectedTask ? (
                <>
                    <div className="task_name">
                            <div className="name">
                                <p>{selectedTask.name}</p>
                                <p className='createdAt'>{selectedTask.createdAt}</p>
                            </div>
                    </div>
                    <div className="task_details">
                        <p>Détails</p>
                        <textarea 
                            name="details" 
                            id="details" 
                            rows={5} 
                            value={selectedTask.description}
                            onChange={(e) => saveDescription(e.target.value, selectedTask.id)}
                        />
                    </div>
                </>
                ) : (<p>Aucune tâche selectionnée</p>) }
        </div>
    )
}

export default TaskSelected