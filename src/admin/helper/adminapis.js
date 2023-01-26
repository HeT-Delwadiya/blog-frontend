import API from "../../backend";

export const getAllUsers = (adminId, data, token) => {
       return fetch(`${API}/admin/${adminId}/users`, {
              method: "POST",
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

export const deleteUser = (adminId, userId, token) => {
       return fetch(`${API}/admin/${adminId}/user/${userId}/delete`, {
              method: "DELETE",
              headers: {
                     "Authorization": `Bearer ${token}`
              }
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const getTotalUserPages = (adminId, token) => {
       return fetch(`${API}/admin/${adminId}/users/pages`, {
              method: "GET",
              headers: {
                     "Authorization": `Bearer ${token}`
              }
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const getUser = (adminId, userId, token) => {
       return fetch(`${API}/admin/${adminId}/users/${userId}`, {
              method: "GET",
              headers: {
                     "Authorization": `Bearer ${token}`
              }
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const getPublishedPosts = (adminId, data, token) => {
       return fetch(`${API}/admin/${adminId}/posts/approved`, {
              method: "POST",
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

export const getTotalPublishedPostPages = (adminId, token) => {
       return fetch(`${API}/admin/${adminId}/posts/approved/pages`, {
              method: "GET",
              headers: {
                     "Authorization": `Bearer ${token}`
              }
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const getTotalPendingPostPages = (adminId, token) => {
       return fetch(`${API}/admin/${adminId}/posts/approval/pending/pages`, {
              method: "GET",
              headers: {
                     "Authorization": `Bearer ${token}`
              }
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const getPendingPosts = (adminId, data, token) => {
       return fetch(`${API}/admin/${adminId}/posts/approval/pending`, {
              method: "POST",
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

export const approvePost = (adminId, postId, token) => {
       return fetch(`${API}/admin/${adminId}/post/${postId}/approve`, {
              method: "PUT",
              headers: {
                     Accept : "application/json",
                     "Content-Type": "application/json",
                     "Authorization": `Bearer ${token}`
              }
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const deletePost = (adminId, postId, token) => {
       return fetch(`${API}/admin/${adminId}/post/${postId}/delete`, {
              method: "DELETE",
              headers: {
                     "Authorization": `Bearer ${token}`
              }
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}