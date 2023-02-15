import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";

const LoginForm = ({ loginForm }) => {
  const navigate = useNavigate();

  // if (!localStorage.get("token")) {
  //   () => <navigate to="/" />;
  // }

  // return (
  //   // 로그인돼있을때
  //   () => <navigate to="todo" />
  // );

  const [form, setForm] = useState({
    email: "",
    pwd: "",
  });

  const [isPossible, setIsPossible] = useState(false);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  // const loginCheck = async () => {
  //   axios
  //     .post("https://pre-onboarding-selection-task.shop/auth/signin", {
  //       email: body.email,
  //       password: body.pwd,
  //     })
  //     .then(function (res) {
  //       console.log(res);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  const loginCheck = () => {
    axios(
      {
        method: "post",
        url: "https://pre-onboarding-selection-task.shop/auth/signin",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          email: form.email,
          password: form.pwd,
        }),
      },
      { withCredentials: true }
    ).then((res) => {
      let access_token = res.data.access_token;
      localStorage.setItem("access_token", access_token);
      console.log(`access_token: ${access_token}`);
      if (res.request.status === 200) {
        navigate("/todo");
      }
    });
  };

  // .post("https://pre-onboarding-selection-task.shop/", body)
  // .then((res) => {
  //   console.log(res.data);
  // });
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

  // 회원 가입
  const signupForm = () => {
    navigate("/signup");
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
            onClick={loginCheck}
          >
            로그인
          </button>
        ) : (
          <button data-testid="signin-button" onClick={loginCheck}>
            로그인
          </button>
        )}
        <button data-testid="signup-button" onClick={signupForm}>
          회원가입
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
