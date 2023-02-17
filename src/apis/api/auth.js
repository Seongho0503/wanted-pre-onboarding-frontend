import axios from "axios";
import { api } from "../utils/config";

// api.get('해당 url') => 아래를 보다싶이 첫글자에 "/"가 들어가지 않는다.
//그 이유는 /을 넣으면 절대 경로가 되면서 baseUrl을 덮어쓰게 되기 때문이다.

export const authApi = {
  signup: () => api.get("/auth/signin"),
  signin: (email, pwd) =>
    api.post("auth/signin", {
      email: email,
      password: pwd,
    }),
};
