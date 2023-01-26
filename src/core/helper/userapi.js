import API from "../../backend";

export const getApprovedPosts = (data) => {
       return fetch(`${API}/posts`, {
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

export const getPostsByName = (data) => {
       return fetch(`${API}/posts/by/name`, {
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

export const getTotalPages = () => {
       return fetch(`${API}/posts/pages`, {
              method: "GET"
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const getPostById = (postId) => {
       return fetch(`${API}/post/${postId}`, {
              method: "GET"
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const getDraftById = (userId, draftId, token) => {
       return fetch(`${API}/user/${userId}/draft/${draftId}`, {
              method: "GET",
              headers: {
                     "Authorization": `Bearer ${token}`
              }
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const addComment = (userId, postId, data, token) => {
       return fetch(`${API}/user/${userId}/post/${postId}/comment/add`, {
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

export const removeComment = (userId, postId, data, token) => {
       return fetch(`${API}/user/${userId}/post/${postId}/comment/remove`, {
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

export const getUserById = (userId, token) => {
       return fetch(`${API}/user/${userId}`, {
              method: "GET",
              headers: {
                     Accept : "application/json",
                     "Content-Type": "application/json",
                     "Authorization": `Bearer ${token}`
              }
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const deletePost = (userId, postId, token) => {
       return fetch(`${API}/user/${userId}/post/${postId}/delete`, {
              method: "DELETE",
              headers: {
                     "Authorization": `Bearer ${token}`
              }
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const deleteDraft = (userId, draftId, token) => {
       return fetch(`${API}/user/${userId}/draft/${draftId}/delete`, {
              method: "DELETE",
              headers: {
                     "Authorization": `Bearer ${token}`
              }
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const publishDraftToPost = (userId, draftId, token) => {
       return fetch(`${API}/user/${userId}/draft/${draftId}/publish`, {
              method: "POST",
              headers: {
                     Accept : "application/json",
                     "Content-Type": "application/json",
                     "Authorization": `Bearer ${token}`
              }
       })
       .then(response => response.json())
       .catch(err => console.log(err))
}

export const createPost = (userId, data, token) => {
       return fetch(`${API}/user/${userId}/post/create`, {
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

export const createDraft = (userId, data, token) => {
       return fetch(`${API}/user/${userId}/draft/create`, {
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

export const updatePost = (userId, postId, data, token) => {
       return fetch(`${API}/user/${userId}/post/${postId}/update`, {
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

export const updateDraft = (userId, draftId, data, token) => {
       return fetch(`${API}/user/${userId}/draft/${draftId}/update`, {
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

export const publishPostFromDraft = (userId, draftId, data, token) => {
       return fetch(`${API}/user/${userId}/draft/${draftId}/publish`, {
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