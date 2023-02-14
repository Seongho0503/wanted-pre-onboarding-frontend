import { useState } from "react";
import "./App.css";
import LoginForm from "./LoginForm";

function App() {
  // const [data, setData] = useState({
  //   email: "",
  //   pwd: "",
  // });

  const [isLogin, setIsLogin] = useState(false);
  const loginForm = (email, pwd) => {
    //axios.post('api/auth', )

    if (email === "abc@naver.com" && pwd === "abcde123!") {
      setIsLogin(true);
      console.log("로그인 성공");
    }
  };
  return (
    <div>
      <LoginForm loginForm={loginForm} />
    </div>
  );
}

export default App;
