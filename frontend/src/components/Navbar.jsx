import React, { useEffect, useRef, useState } from "react";
import { BiTask } from "react-icons/bi";
import { BiSolidUserCircle } from "react-icons/bi";
import { BsPenFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import styles from "./style/Navbar.module.scss";
import { useSelector } from "react-redux";
const Navbar = () => {
  const [user, setUser] = useState({});
  const modal = useRef();
  const isLoggedIn = useSelector((state) => state.logIn.isLoggedIn);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const handelOpenModal = () => {
    modal.current.style.display = "flex";
  };
  const handelCloseModal = () => {
    modal.current.style.display = "none";
  };
  const handelLogOut = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/user/logout`);
      localStorage.removeItem("user");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className={`txt-style ${styles.mainNav}`}>
      <div className={styles.mainNavContainer}>
        <h1 className={`logo-style ${styles.headLogo}`}>
          <a href="/">
            taskManagementSystem
            <BiTask />
          </a>
        </h1>
        {isLoggedIn === true && (
          <>
            {user && (
              <div>
                <button
                  className={styles.profileLogo}
                  onClick={handelOpenModal}
                >
                  <BiSolidUserCircle />
                </button>
                <div className={styles.profileDetailsModal} ref={modal}>
                  <div>
                    <button type="button" onClick={handelCloseModal}>
                      <RxCross2 />
                    </button>
                  </div>
                  <div>
                    <h3>name {user.name}</h3>
                    <button type="button">
                      <BsPenFill />
                    </button>
                  </div>
                  <div>
                    <h3>email {user.email}</h3>
                  </div>
                  <div>
                    <h3>password</h3>
                    <button type="button">
                      <BsPenFill />
                    </button>
                  </div>
                  <div>
                    <a href="/login" onClick={handelLogOut}>
                      log out
                    </a>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
