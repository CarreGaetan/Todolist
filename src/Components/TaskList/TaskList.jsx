import './TaskList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Reorder } from "framer-motion";

function TaskList({
    tasks,
    allTasks,
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
    // Fonction pour réordonner uniquement les tâches non cochées
    const handleReorder = (newOrder) => {
        const reorderedTasks = [...allTasks];

        // Insère les tâches réordonnées à leur nouvelle position
        let nonCheckedIndex = 0;
        for (let i = 0; i < reorderedTasks.length; i++) {
            if (!reorderedTasks[i].checked) {
                reorderedTasks[i] = newOrder[nonCheckedIndex];
                nonCheckedIndex++;
            }
        }

        setTasks(reorderedTasks);
    };

    return (
        <Reorder.Group
            axis="y"
            values={tasks} // Liste des tâches non cochées
            onReorder={handleReorder} // Gérer le réordonnement complet
            className="task-list"
        >
            {tasks.map((task) => (
                <Reorder.Item key={task.id} value={task} className="task-item">
                    {editId === task.id ? (
                        <>
                            <input
                                type="text"
                                value={editedTask}
                                onChange={(e) => setEditedTask(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && saveTask(task.id)}
                            />
                            <button onClick={() => saveTask(task.id)}>
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
