import { callApi } from "../utils/callApi";
const baseUrl = `/tasks`;

export const addTask = async (taskDetails) => {
  try {
    console.log("taskDetils", taskDetails);
    const addTaskRes = await callApi(
      baseUrl,
      "POST",
      taskDetails
    );
    return addTaskRes;
  } catch (error) {}
};

export const updateTask = async (updatedTaskDetails) => {
  try {
    console.log("updatedTaskDetails",updatedTaskDetails)
    const updateTaskRes = await callApi(
      `${baseUrl}/${updatedTaskDetails.id}`,
      "PUT",
      updatedTaskDetails,
    );

    return updateTaskRes;
  } catch (error) {
    console.log("error in update tasks", error);
  }
};

export const deleteTask = async (taskDetails) => {
  try {
    const deleteTaskRes = await callApi(
      `${baseUrl}/${taskDetails.id}`,
      "DELETE",
      {}
    );
    return deleteTaskRes;
  } catch (error) {
    console.log("error in add tasks", error);
  }
};

export const getTasks = async () => {
  try {
    const getTaskRes = await axios.get(`${baseUrl}`);
    console.log(getTaskRes);
    return getTaskRes.data;
  } catch (error) {
    console.log("error in get tasks", error);
  }
};
