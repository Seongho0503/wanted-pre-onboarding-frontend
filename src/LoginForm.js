import { useState } from "react";
import "./App.css";

const LoginForm = ({ loginForm }) => {
  const [form, setForm] = useState({
    email: "",
    pwd: "",
  });

  const [isPossible, setIsPossible] = useState(false);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
      
  //이벤트 감지
  const handleChange = (e) => {
    formToggle();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 유효성 검사
  const formToggle = () => {
    !form.email.includes("@")
      ? setEmail("@을 포함시켜주세요")
      : setEmail("올바른 이메일 형식입니다");
    form.pwd.length < 8
      ? setPwd("8자리를 입력해주세요")
      : setPwd("올바른 비밀번호 형태입니다.");
    if (form.email.includes("@") && form.pwd.length > 8) setIsPossible(true);
  };

  const handleLogin = () => {
    loginForm(form.email, form.pwd);
  };

  return (
    <div className="LoginForm">
      <h1>로그인</h1>
      <div>
        <input
          data-testid="email-input"
          name="email"
          value={form.email}
          placeholder="이메일을 입력하세요"
          onChange={handleChange}
        />
      </div>
      <h5>{email}</h5>
      <div>
        <input
          data-testid="password-input"
          name="pwd"
          value={form.pwd}
          placeholder="비밀번호를 입력하세요"
          onChange={handleChange}
        />
      </div>
      <h5>{pwd}</h5>
      <div>
        {!isPossible ? (
          <button
            disabled="disabled"
            data-testid="signin-button"
            onClick={handleLogin}
          >
            로그인
          </button>
        ) : (
          <button data-testid="signin-button" onClick={handleLogin}>
            로그인
          </button>
        )}
        <button data-testid="signup-button">회원가입</button>
      </div>
    </div>
  );
};

export default LoginForm;
