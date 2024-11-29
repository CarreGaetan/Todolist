import './TaskList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Reorder } from "framer-motion";

function TaskList({
    tasks,
    setTasks,
    setSelectedTask,
    editId,
    editedTask,
    setEditedTask,
    saveTask,
    toggleCheckbox,
    editMode,
    deleteTask,
}) {
    return (
        <Reorder.Group
            axis="y" // Réorganisation verticale
            values={tasks} // Liste des tâches actuelles
            onReorder={setTasks} // Fonction appelée pour réordonner les tâches
            className="task-list"
        >
            {tasks.filter((task) => !task.checked).map((task) => (
                <Reorder.Item key={task.id} value={task} className="task-item" onClick={() => setSelectedTask(task)}>
                        {editId === task.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editedTask}
                                    onChange={(e) => setEditedTask(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && saveTask(task.id)}
                                />
                                <button className="button" onClick={() => saveTask(task.id)}>
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
                </Reorder.Item>
            ))}
        </Reorder.Group>
    );
}

export default TaskList;
