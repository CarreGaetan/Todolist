import './FinishedTasks.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

function FinishedTasks({
    tasks, // Liste des tâches terminées
    checkedTask, // État pour afficher/masquer les tâches terminées
    setSelectedTask,
    editId,
    editedTask,
    setEditedTask,
    saveTask,
    toggleCheckbox,
    editMode,
    deleteTask
}) {
    if (!checkedTask) {
        // Si `checkedTask` est false, ne pas afficher les tâches terminées
        return null;
    }

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id} onClick={() => setSelectedTask(task)}>
                    {editId === task.id ? (
                        <>
                            <input
                                type="text"
                                value={editedTask}
                                onChange={(e) => setEditedTask(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && saveTask(task.id)}
                            />
                            <button
                                className="button"
                                onClick={() => saveTask(task.id)}
                            >
                                <FontAwesomeIcon icon={faCheck} size="lg" />
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="name_container">
                                <input
                                    type="checkbox"
                                    checked={task.checked}
                                    onChange={() => toggleCheckbox(task.id)}
                                />
                                <div className="name">
                                    <p>{task.name}</p>
                                    <p className="createdAt">{task.createdAt}</p>
                                </div>
                            </div>
                            <div className="buttons">
                                <button onClick={() => editMode(task.id, task.name)}>
                                    <FontAwesomeIcon icon={faEdit} size="lg" />
                                </button>
                                <button onClick={() => deleteTask(task.id)}>
                                    <FontAwesomeIcon icon={faTrash} size="lg" />
                                </button>
                            </div>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default FinishedTasks;
