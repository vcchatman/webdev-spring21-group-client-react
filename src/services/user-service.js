const BASEURL="https://webdev-group-sp2101-server.herokuapp.com"

const createUser = (user) =>
    fetch(`${BASEURL}/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.status)

const checkUserNameService=(userName) =>
    fetch(`${BASEURL}/username/${userName}`)
        .then(response=> response.status)

const checkEmailService=(email) =>
    fetch(`${BASEURL}/email/${email}`)
        .then(response=> response.status)

const findUserById = (uid) =>
    fetch(`${BASEURL}/user/${uid}`)
        .then(response => response.json())

const addEventToInterestedForUser = (uid, event) =>
    fetch(`${BASEURL}/user/${uid}/add_interested_event`, {
        method: "PUT",
        body: JSON.stringify(event),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())


export const updateUser = (uid, user) =>
    fetch(`${BASEURL}/user/${uid}/update`, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

 const deleteEventFromInterestedForUser = (uid,eid) =>
    fetch(`${BASEURL}/user/${uid}/delete_interested_event/${eid}`, {
        method: "DELETE"
    })
        .then(response => response.json())


 const addEventToAttendingForUser = (uid, event) =>
    fetch(`${BASEURL}/user/${uid}/add_attended_event`, {
        method: "PUT",
        body: JSON.stringify(event),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())


export const logIn = (user) =>
        fetch(`${BASEURL}/login`, {
            method: 'POST',
            body: JSON.stringify(user),
            credentials: "include",
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((response) => response.json()
            )

 export const logOut = () =>
        fetch(`${BASEURL}/logout`, {
            method: 'POST',
            credentials: "include",
        })
            .then(response => response.status)



 const deleteEventFromAttendingForUser = (uid,eid) =>
    fetch(`${BASEURL}/user/${uid}/delete_attended_event/${eid}`, {
        method: "DELETE"
    })
        .then(response => response.json())

const checkLoggedIn=()=>
    fetch(`${BASEURL}/currentuser`, {
        method: 'GET',
        credentials: "include"
    }).then(response => response.json())

const findEventsForUser=(id)=>
    fetch(`${BASEURL}/user/events/${id}`)
        .then(response=>response.json())

const findAllUsers=()=>
    fetch(`${BASEURL}/users`)
        .then(response=>response.json())

const deleteUser=(userId)=>
    fetch(`${BASEURL}/user/${userId}`,{
        method: 'DELETE'
    })
        .then(response=>response.json())


const api = {
    findUserById,
    addEventToInterestedForUser,
    deleteEventFromInterestedForUser,
    addEventToAttendingForUser,
    deleteEventFromAttendingForUser,
    updateUser,
    createUser,
    logIn,
    logOut,
    checkLoggedIn,
    checkUserNameService,
    checkEmailService,
    findEventsForUser,
    findAllUsers,
    deleteUser
};

export default api;