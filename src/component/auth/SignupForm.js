import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SignupForm = () => {
  const navigate = useNavigate();

  // input state
  const [form, setForm] = useState({
    email: "",
    pwd: "",
  });

  // 유효성 검사 state
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPwd, setIsValidPwd] = useState(false);

  // 회원 가입 버튼 비활성화
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

  const signup = () => {
    axios(
      {
        method: "post",
        url: "https://pre-onboarding-selection-task.shop/auth/signup",
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
      let token = res.data.access_token;
      console.log(`token: ${token}`);
      //console.log(res.data); // access_token 있음
      console.log(res.request);
      console.log(typeof res.request.status); // 서버 ok 숫자였다 number

      console.log("로컬스토리지", localStorage);
      if (res.request.status === 201) {
        navigate("/");
      }
      //console.log(res.data);
    });
  };

  return (
    <div className="SignupForm">
      <h1>회원 가입</h1>
      <div>
        <input
          name="email"
          value={form.email}
          data-testid="email-input"
          onChange={emailChangeHandler}
          placeholder="이메일을 입력하세요"
        ></input>
        <div>
          <input
            name="pwd"
            value={form.pwd}
            data-testid="password-input"
            onChange={pwdChangeHandler}
            placeholder="비밀번호를 입력하세요"
          ></input>
        </div>
      </div>
      <button onClick={signup} disabled={isDisabled}>
        회원 가입
      </button>
      <div>
        <button onClick={() => navigate("/")}>로그인 이동</button>
      </div>
    </div>
  );
};
export default SignupForm;
