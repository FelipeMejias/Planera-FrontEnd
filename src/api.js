import axios from "axios";

export const api = axios.create({
  //baseURL: "https://-----.herokuapp.com"
  baseURL: "http://localhost:5738",
});

function buildHeader(token){
    return {headers: {Authorization: `Bearer ${token}`}}
}

export const signUp = async (formData) => {
  return api.post("/signup", formData);
};

export const signIn = async (formData) => {
  return api.post("/signin", formData);
};

export const postHabit = async (habitData,token)=> {
  return api.post(`/habit`, habitData , buildHeader(token));
}

export const getHabits = async (token)=> {
    return api.get(`/habit`, buildHeader(token));
}

export const putHabit = async (id,changeData,token)=> {
    return api.put(`/habit/:${id}`, changeData , buildHeader(token));
}


export const desactivateToken = async (token) => {
  await api.patch(
    "/sessions",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};