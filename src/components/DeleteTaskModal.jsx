import { deleteTask } from "../services/taskService";



const DeleteTaskModal = ({taskList, setTaskList, taskToDelete, saveToLocalStorage}) => {
    const onTaskDelete = async() => {  
            const res = await deleteTask(taskToDelete);
            const updatedTaskList = taskList.filter(task => task.id !== taskToDelete.id)
            setTaskList(updatedTaskList);
            saveToLocalStorage(updatedTaskList);
    }
    return (<>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
       
        <dialog id={`delete_task_modal_${taskToDelete.id}`} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-2xl mb-2">Add Task</h3>
                <div className="add-task-body">
                <h3>Do you want to delete this task?</h3>
                </div>
                <div className="modal-action">
                <button className="btn btn-error" onClick={onTaskDelete}>Delete</button>
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog></>)

}

export default DeleteTaskModal;