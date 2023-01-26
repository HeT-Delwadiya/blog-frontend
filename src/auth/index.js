import API from "../backend";
import jwt_decode from "jwt-decode";

export const registerUser = (data) => {
       return fetch(`${API}/register`, {
              method: "POST",
              headers: {
                     Accept : "application/json",
                     "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const loginUser = (data) => {
       return fetch(`${API}/login`, {
              method: "POST",
              headers: {
                     Accept : "application/json",
                     "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const authenticate = (data, next) => {
       if(typeof window !== "undefined") {
              localStorage.setItem("jwt",JSON.stringify(data));
              next();
       }
}

export const logout = next => {
       if (typeof window !== "undefined") {
              localStorage.removeItem("jwt")
              next();

              return fetch(`${API}/logout`,{
                     method: "GET"
              })
              .then()
              .catch(err => console.log(err));
       }
}

export const isAuthenticated = () => {
       if (typeof window == "undefined")
              return false;
       if (localStorage.getItem("jwt")) {
              const jsonData = JSON.parse(localStorage.getItem("jwt"))
              const role = jwt_decode(jsonData.authtoken).role
              const id = jwt_decode(jsonData.authtoken)._id
              const data = {
                     _id: id,
                     name: jsonData.user.name,
                     email: jsonData.user.email,
                     role: role,
                     token: jsonData.authtoken
              }
              return data
       }   
       else
              return false;
}

export const updateUser = (data, userId, token) => {
       return fetch(`${API}/user/${userId}/update`, {
              method: "PUT",
              headers: {
                     Accept : "application/json",
                     "Content-Type": "application/json",
                     "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify(data)
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}