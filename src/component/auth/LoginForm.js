import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import axios from "axios";

const LoginForm = ({ loginForm }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    pwd: "",
  });

  // 유효성 검사 state
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPwd, setIsValidPwd] = useState(false);

  // 로그인 버튼 비활성화
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (isValidEmail && isValidPwd) {
      setIsDisabled(false);
    } else setIsDisabled(true);
  }, [isValidEmail, isValidPwd]);

  const emailChangeHandler = (e) => {
    const value = e.target.value;
    setForm({
      ...form,
      [e.target.name]: value,
    });
    if (!value.includes("@")) {
      setIsValidEmail(false);
    } else setIsValidEmail(true);
  };

  const pwdChangeHandler = (e) => {
    const value = e.target.value;
    setForm({
      ...form,
      [e.target.name]: value,
    });
    if (value.length < 8) {
      setIsValidPwd(false);
    } else setIsValidPwd(true);
  };

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

  // 유효성 검사
  // const formToggle = () => {
  //   !form.email.includes("@")
  //     ? setEmail("@을 포함시켜주세요")
  //     : setEmail("올바른 이메일 형식입니다");
  //   form.pwd.length < 7
  //     ? setPwd("8자리를 입력해주세요")
  //     : setPwd("올바른 비밀번호 형태입니다.");
  //   if (form.email.includes("@") && form.pwd.length > 7) setIsDisabled(true);
  // };

  // 회원 가입
  const signupForm = () => {
    navigate("/signup");
  };

  return (
    <div className="LoginForm">
      <h1>로그인</h1>

      <input
        data-testid="email-input"
        name="email"
        value={form.email}
        placeholder="이메일을 입력하세요"
        onChange={emailChangeHandler}
      />
      <div>
        <input
          data-testid="password-input"
          name="pwd"
          value={form.pwd}
          placeholder="비밀번호를 입력하세요"
          onChange={pwdChangeHandler}
        />
      </div>
      <div>
        <button
          data-testid="signin-button"
          onClick={loginCheck}
          disabled={isDisabled}
        >
          로그인
        </button>

        <div>
          <button data-testid="signup-button" onClick={signupForm}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
