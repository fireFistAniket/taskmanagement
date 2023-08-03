const postTask = async (taskDetails) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/task/add`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(taskDetails),
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const getAllTask = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/task/`, {
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const deleteTask = async (taskId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/task/${taskId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export { postTask, getAllTask, deleteTask };
