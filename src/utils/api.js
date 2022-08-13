import axios from "axios";

export const api = axios.create({
  //baseURL: "https://-----.herokuapp.com"
  baseURL: "https://planera-back.herokuapp.com",
});

function buildHeader(token){
    return {headers: {Authorization: `Bearer ${token}`}}
}

export const signUp = async (formData) => {
  return api.post("/signup", formData);
}
export const signIn = async (formData) => {
  return api.post("/signin", formData);
}


export const postHabit = async (habitData,token)=> {
  return api.post(`/habit`, habitData , buildHeader(token));
}
export const getHabits = async (token)=> {
    return api.get(`/habit`, buildHeader(token));
}
export const putHabit = async (id,changeData,token)=> {
    return api.put(`/habit/${id}`, changeData , buildHeader(token));
}
export const deleteHabit = async (id,token)=> {
  return api.delete(`/habit/${id}`,  buildHeader(token));
}


export const postGroup = async (groupData,token)=> {
  return api.post(`/group`, groupData , buildHeader(token));
}
export const getGroups = async (token)=> {
  return api.get(`/group`, buildHeader(token));
}
export const getGroup = async (id,token)=> {
  return api.get(`/group/${id}`, buildHeader(token));
}


export const exitGroup = async (groupId,token)=> {
  return api.delete(`/userGroup/${groupId}`, buildHeader(token));
}
export const changeGroupColor = async (changeData,id,token)=> {
  return api.put(`/userGroup/${id}`,changeData, buildHeader(token));
}

export const sendEnvitation = async (invitationData,id,token)=> {
  return api.post(`/userGroup/${id}`, invitationData , buildHeader(token));
}
export const getEnvitation = async (token)=> {
  return api.get(`/userGroup`, buildHeader(token));
}
export const getPendent = async (groupId,token)=> {
  return api.get(`/userGroup/${groupId}`, buildHeader(token));
}
export const aceptInvitation = async (id,token)=> {
  return api.put(`/userGroup/${id}/acept`,{}, buildHeader(token));
}
export const rejectInvitation = async (id,token)=> {
  return api.delete(`/userGroup/${id}/reject`, buildHeader(token));
}


export const postAllow = async (allowData,id,token)=> {
  return api.post(`/allow/${id}`,allowData, buildHeader(token));
}

export const findGroupHabits = async (chosenData,id,token)=> {
  return api.post(`/allow/${id}/crossboard`,chosenData, buildHeader(token));
}

export const findAllows = async (id,token)=> {
  return api.get(`/allow/${id}`, buildHeader(token));
}



export const postEvent = async (eventData,groupId,token)=> {
  return api.post(`/event/${groupId}`,eventData, buildHeader(token));
}

export const getEvents = async (token)=> {
  return api.get(`/event`, buildHeader(token));
}

export const findEventParticipants = async (id,token)=> {
  return api.get(`/event/${id}`, buildHeader(token));
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