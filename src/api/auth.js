import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const signUpApi = async (payload) => {
  const res = await axios.post(
    "https://pre-onboarding-selection-task.shop/auth/signup",
    payload,
    config
  );
  return res;
};

// const signup = () => {
//   axios(
//     {
//       method: "post",
//       url: "https://pre-onboarding-selection-task.shop/auth/signup",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: JSON.stringify({
//         email: form.email,
//         password: form.pwd,
//       }),
//     },
//     { withCredentials: true }
//   ).then((res) => {
//     let token = res.data.access_token;
//     console.log(`token: ${token}`);
//     //console.log(res.data); // access_token 있음
//     console.log(res.request);
//     console.log(typeof res.request.status); // 서버 ok 숫자였다 number

//     console.log("로컬스토리지", localStorage);
//     if (res.request.status === 201) {
//       navigate("/");
//     }
//     //console.log(res.data);
//   });
// };
