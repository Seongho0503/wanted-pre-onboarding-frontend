import axios from "axios";

// axios 인스턴스
// create() 매서드를 사용해 사용자 정의 구성을 사용하는 axios 생성
export const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// export const GET_PRODUCT_API = `${BASE_URL}/products`
// 특정 패스파라미터 앞에 해당 변수 넣어 API 주소 세팅
