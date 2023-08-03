import { useEffect } from "react";
import HomeScreen from "./screens/HomeScreen.Jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function App() {
  const isLoggedIn = useSelector((state) => state.logIn.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <HomeScreen />
    </>
  );
}

export default App;
