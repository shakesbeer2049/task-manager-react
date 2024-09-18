import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { addTask, updateTask } from "../services/taskService";
import { ToastContainer, toast } from "react-toastify";

const EditTaskModal = ({ taskList, setTaskList, taskToUpdate, saveToLocalStorage }) => {
      // Update task state when taskToUpdate changes
      useEffect(() => {
        setTaskDetails({
            id: taskToUpdate.id,
            title: taskToUpdate.title,
            description: taskToUpdate.description,
            status: taskToUpdate.status
        });
    }, [taskToUpdate]);

    const [taskDetails, setTaskDetails] = useState({ id: taskToUpdate.id, title: taskToUpdate.title, description: taskToUpdate.description, status: taskToUpdate.status });

    const onTaskUpdate = async () => {
        if (!taskDetails.title) alert("Please fill all details");
        else {
            
            const res = await updateTask(taskDetails);
            const updatedTaskList = taskList.map(task => task.id !== taskToUpdate.id ? task : taskDetails)
            setTaskList(updatedTaskList);
            saveToLocalStorage(updatedTaskList)
            toast.success("Task Updated")
            
            // setTaskDetails({id : "", title : "", description: "", status:"incomplete"})
        }
    }
    return (<>
        {/* Open the modal using document.getElementById('ID').showModal() method */}

        <dialog id={`edit_task_modal_${taskToUpdate.id}`} className="modal">
            <ToastContainer containerId={"update_task"} />
            <div className="modal-box">
                <h3 className="font-bold text-2xl mb-2">Add Task</h3>
                <div className="edit-task-body">
                    <input type="text" value={taskDetails.title} placeholder="Task title" className="input input-bordered w-full max-w-xs mb-4" onChange={(e) => { setTaskDetails({ ...taskDetails, title: e.target.value }) }}
                    />
                    <input type="text" value={taskDetails.description} placeholder="Description" className="input input-bordered w-full max-w-xs" onChange={(e) => { setTaskDetails({ ...taskDetails, description: e.target.value }) }} />

                </div>
                <div className="modal-action">
                    <button className="btn btn-primary" onClick={onTaskUpdate}>Update</button>
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog></>)
}
export default EditTaskModal;