import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignupForm = () => {
  const navigate = useNavigate();
  const [body, setBody] = useState({
    email: "",
    pwd: "",
  });

  const handleChange = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
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
          email: body.email,
          password: body.pwd,
        }),
      },
      { withCredentials: true }
    ).then((res) => {
      let token = res.data.access_token;
      console.log(`token: ${token}`);
      //console.log(res.data); // access_token 있음
      console.log(res.request);
      console.log(typeof res.request.status); // 서버 ok 숫자였다 number
      localStorage.setItem("access-token", token);
      console.log("로컬스토리지", localStorage);
      if (res.request.status === 201) {
        navigate("/");
      }
      //console.log(res.data);
    });
  };

  return (
    <div className="SignupForm">
      <h2>회원 가입</h2>
      <div>
        <input
          name="email"
          value={body.email}
          data-testid="email-input"
          onChange={handleChange}
          placeholder="이메일을 입력하세요"
        ></input>
        <div>
          <input
            name="pwd"
            value={body.pwd}
            data-testid="password-input"
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
          ></input>
        </div>
      </div>
      <button onClick={signup}>회원 가입</button>
      <div>
        <button onClick={() => navigate("/")}>로그인 이동</button>
      </div>
    </div>
  );
};
export default SignupForm;
