import { useState, useEffect } from "react";
import { callApi } from "../utils/callApi";
import "../styles/taskList.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { updateTask } from "../services/taskService";
import NavBottom from "./NavBottom";
import AddTaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";
import TaskView from "./TaskView";
import { delay } from "../utils/utils";
const TaskList = () => {
  const [taskList, setTaskList] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [statFilter, setStatFilter] = useState("All");
  const [loadingTasks, setLoadingTasks] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoadingTasks(true)
        const res = await callApi("/tasks", "GET", {});
        delay(2000)
        if (!res.error) {
          setTaskList(res);
          saveToLocalStorage(res);
        }
        else{
          const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
          console.log(storedTasks,"storedTasks")
          // Ensure storedTasks is an array
          setTaskList(Array.isArray(storedTasks) ? storedTasks : []);
        }
        setLoadingTasks(false);

      
    };
    fetchTasks();
  }, []);

 

  const saveToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Update task status
  const onTaskUpdate = async (e, task) => {
    
    const updatedTask = { ...task, status: e.target.checked ? "complete" : "incomplete" };
    console.log(e.target.checked,task)
    const res = await updateTask(updatedTask);

    if (res.status === updatedTask.status) {
      const updatedTaskList = prevTasks => prevTasks.map(t => (t.id !== updatedTask.id ? t : updatedTask))
      setTaskList(updatedTaskList);
      saveToLocalStorage(updatedTaskList)
    }
  };

 
  // Generate Task List Rows
  const generateTaskList = (tasks) => {
    return tasks.length ? tasks.map(task => (
      (statFilter === "All" || task.status === statFilter.toLowerCase()) && <tr key={task.id}>
      <th>
        <input
          checked={task.status === "complete"}
          type="checkbox"
          className="checkbox"
          onChange={(e) => onTaskUpdate(e, task)}
        />
      </th>
      <td className="task-title" onClick={() => document.getElementById(`task_view_${task.id}`).showModal()}> {task.title} </td>
      <td>
        <span className={task.status === "complete" ? "task-complete" : "task-incomplete"}>
          {task.status}
        </span>
      </td>
      <td className="flex align-center justify-between text-xl">
        <button onClick={() => document.getElementById(`edit_task_modal_${task.id}`).showModal()}>
          <FaEdit />
        </button>
        <button onClick={() => document.getElementById(`delete_task_modal_${task.id}`).showModal()}>
          <MdDelete />
        </button>
      </td>
      <EditTaskModal taskList={taskList} setTaskList={setTaskList} taskToUpdate={task} saveToLocalStorage = {saveToLocalStorage} />
      <DeleteTaskModal taskList={taskList} setTaskList={setTaskList} taskToDelete={task} saveToLocalStorage = {saveToLocalStorage} />
      <TaskView task={task} />
      
    </tr>
    )) : <h1 className="text-xl text-center">No Data Found!</h1>
  };

  // Handle Search Input Change
  const handleSearchBar = (e) => {
    setSearchVal(e.target.value);
  };

   // Filter tasks based on search value
   
   const filteredTasks = taskList.length ? taskList.filter(task => 
    (task?.title?.includes(searchVal) || task?.description?.includes(searchVal)) 
  ) : [];

  // Determine which tasks to display
  const tasksToDisplay = searchVal ? filteredTasks : taskList;

  return (
    <div className="task-list-container">
      <div className="header-section flex justify-between">
        <h1 className="text-xl font-bold p-2">Tasker</h1>
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-2/4 max-w-xs"
          onChange={handleSearchBar}
          value={searchVal}
        />
      </div>
      <div className="overflow-x-auto table-main-div">
        <table className="table table-zebra p-0 m-0">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { loadingTasks ? <h3 className="text-xl text-center w-full">Loading data...</h3> : generateTaskList(tasksToDisplay)}
          </tbody>
        </table>
      </div>
      <NavBottom setStatFilter={setStatFilter} statFilter={statFilter}  />
      <AddTaskModal taskList={taskList} setTaskList={setTaskList} saveToLocalStorage = {saveToLocalStorage} />
    </div>
  );
};

export default TaskList;
