import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { addTask } from "../services/taskService";
import { toast, ToastContainer } from "react-toastify";

const AddTaskModal = ({taskList, setTaskList, saveToLocalStorage}) => {

    const [taskDetails, setTaskDetails] = useState({id : "", title : "", desc: "", status:"incomplete"});

    const onTaskAdd = async() => {
        if(!taskDetails.title) alert("Please fill all details");
        else{
            const taskToAdd = {...taskDetails, id:uuidv4()};
            const res = await addTask(taskToAdd);
            const newTaskList = [...taskList, taskToAdd ];
            setTaskList(newTaskList);
            saveToLocalStorage(newTaskList)
            setTaskDetails({id : "", title : "", desc: "", status:"incomplete"})
            toast.success("Task Added")
        }
    }
    return (<>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
       
        <dialog id="add_task_modal" className="modal">
            <ToastContainer containerId={"add_task"} />
            <div className="modal-box">
                <h3 className="font-bold text-2xl mb-2">Add Task</h3>
                <div className="add-task-body">
                <input type="text" value={taskDetails.title} placeholder="Task title" className="input input-bordered w-full max-w-xs mb-4" onChange={(e) => {setTaskDetails({...taskDetails, title: e.target.value})}}
                 />
                <input type="text" value={taskDetails.desc} placeholder="Description" className="input input-bordered w-full max-w-xs" onChange={(e) => {setTaskDetails({...taskDetails, desc: e.target.value})}} />

                </div>
                <div className="modal-action">
                <button className="btn btn-primary" onClick={onTaskAdd}>Save</button>
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog></>)
}
export default AddTaskModal;