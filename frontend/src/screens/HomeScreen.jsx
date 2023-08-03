import React, { createRef, useEffect, useRef, useState } from "react";
import styles from "./styles/Homescreen.module.scss";
import { SlOptionsVertical } from "react-icons/sl";
import { getAllTask, postTask, deleteTask } from "../api/taskApi";
const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const optionModalRef = useRef([]);
  optionModalRef.current = tasks.map(
    (element, i) => optionModalRef.current[i] ?? createRef()
  );
  const getTasks = async () => {
    await getAllTask().then((res) => setTasks(res));
  };
  useEffect(() => {
    getTasks();
    console.log(optionModalRef.current);
  }, []);
  const handelSubmit = async (e) => {
    e.preventDefault();
    await postTask({ title, description }).then((res) => console.log(res));
    setTitle("");
    setDescription("");
    getTasks();
  };
  const handelDelete = async (id) => {
    await deleteTask(id);
    getTasks();
  };
  const enableOption = (index) => {
    console.log(optionModalRef.current[index].current);
    if (optionModalRef.current[index].current.style.display === "flex") {
      console.log("none");
      optionModalRef.current[index].current.style.display = "none";
    } else {
      console.log("flex");
      optionModalRef.current[index].current.style.display = "flex";
    }
  };
  return (
    <section className={`txt-style ${styles.mainSection}`}>
      <div>
        <h1>add new task</h1>
        <form className={styles.taskForm} onSubmit={(e) => handelSubmit(e)}>
          <div>
            <label htmlFor="title">title</label>
            <input
              type="text"
              placeholder="enter title"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="desc">decription</label>
            <textarea
              name="description"
              id="desc"
              cols="30"
              rows="10"
              placeholder="enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button type="submit">add task</button>
          </div>
        </form>
      </div>
      <div className={styles.taskListSecion}>
        <h1>task lists</h1>
        <div className={styles.taskListBox}>
          {tasks.length > 0 ? (
            tasks.map((item, index) => (
              <div key={index}>
                <button onClick={() => enableOption(index)}>
                  <SlOptionsVertical />
                </button>
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                <p>{item.createdAt.slice(0, item.createdAt.indexOf("T"))}</p>
                <div
                  ref={optionModalRef.current[index]}
                  style={{ display: "none" }}
                >
                  <button onClick={() => handelDelete(item._id)}>delete</button>
                </div>
              </div>
            ))
          ) : (
            <div>
              <h1>no task created</h1>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeScreen;
