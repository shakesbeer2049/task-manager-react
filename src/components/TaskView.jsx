

const TaskView = ({ task }) => {


    return <>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
       
        <dialog id= {`task_view_${task.id}`} className="modal">
            <div className="modal-box">
                <div className="task-head flex justify-between align-center">
                <h3 className="font-bold text-lg">{task.title}</h3>
                <span className={task.status === "complete" ? "task-complete" : "task-incomplete"}>{task.status}</span>
                </div>
                <p className="py-4">{task.description}</p>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    </>
}

export default TaskView;