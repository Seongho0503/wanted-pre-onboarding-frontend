import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "./component/auth/SignInForm";
import SignupForm from "./component/auth/SignupForm";
import TodoList from "./pages/TodoList";

function App() {
  const [token, setToken] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const loginForm = (email, pwd) => {
    if (email === "abc@naver.com" && pwd === "abcde123!") {
      setIsLogin(true);
      console.log("로그인 성공");
    }
  };
  return (
    <div className="App">
      <Routes>
        localStorage ? (
        <Route path="todo" element={<TodoList />} />
        ) :
        <Route path="/" element={<LoginForm loginForm={loginForm} />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </div>
  );
}

export default App;
