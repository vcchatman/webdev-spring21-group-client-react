import React, {useEffect,useState}  from 'react'
import {Link, useParams} from "react-router-dom";
import eventService from "../../services/event-service";
import commentService from "../../services/comment-service";
import userService from "../../services/user-service";
import {connect} from "react-redux";
import './event-details.css';
import Moment from 'moment';
import PrimarySearchAppBar from "../utils/navBar";

const isEventInInterested=(event,user)=>{
    if(user.interested)
    {
        return user.interested.find(e=>e.id===event.id)? true:false
    }
    return false
}

const isEventInAttended=(event,user)=>{
    if(user.attending)
    {
        return user.attending.find(e=>e.id===event.id)? true:false
    }
    return false
}

const isEventOver=(eventDate,today)=>{

    return (eventDate.diff(today)<0);


}


const EventDetails = (
    {
        event,
        user,
        comments,
        findEventById,
        findUserById,
        addEventToInterestedForUser,
        deleteEventFromInterestedForUser,
        addEventToAttendingForUser,
        deleteEventFromAttendingForUser,
        findCommentsByEvent,
        addCommentForEvent,
        updateCommentForEvent

    }
) =>
{

    const [cachedItem, setCahedItem] = useState('')
    Moment.locale('en');

    var dt = (event)?event.datetime_local:null;

    const {eventId} = useParams()

    useEffect(() => {
        // alert(courseId)
        findUserById(1)
        findEventById(eventId)
        findCommentsByEvent(eventId)
    }, [])

    return (<>
        <PrimarySearchAppBar/>
        <div className="container">


            <br/>

            {/*// Event details*/}
            <div className="row">
                <div className="col-6">

                    {<div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Event Name : <b>{
                                event &&
                                event.title}</b></h5>
                            <p className="card-text">This is a great concert which usually involves 1000+ attendees.
                                Every year they perform at this festival just for the fans.</p>
                        </div>
                        {
                            event &&
                            <ul className="list-group list-group-flush">
                            <li className="list-group-item">Artist: {
                                event &&
                                event.performers &&
                                event.performers.map(p => <b>{p.name}; </b>)

                                }
                            </li>
                            <li className="list-group-item">Venue: <b>
                                {
                                    event &&
                                    event.venue &&
                                    event.venue.name

                                }
                            </b>
                            </li>
                                {/*{Moment(dt).format('MM-DD-YYYY')}*/}
                            <li className="list-group-item">Date: <b>{
                                event &&
                                event.datetime_utc}</b></li>
                            {/*<li className="list-group-item">Time: <b>{Moment(dt).format('HH:mm')}</b></li>*/}
                            </ul>
                        }
                    </div>
                    }


                </div>
                <div className="col-6">

                    <div className="card h-100">
                        <img src={
                            event &&
                            event.performers &&
                            event.performers[0].image
                        }
                             className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-3">
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"

                                               onChange={
                                                   ()=>{
                                                       if(isEventInInterested(event,user))
                                                       {
                                                           deleteEventFromInterestedForUser(user.id,event.id)
                                                       }else{
                                                           addEventToInterestedForUser(user.id,event)
                                                       }

                                                   }
                                               }
                                               checked={isEventInInterested(event,user)}/>
                                        <label className="form-check-label"
                                               htmlFor="flexSwitchCheckDefault">Interested</label>
                                    </div>

                                </div>
                                <div className="col-3">
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox"
                                               id="flexSwitchCheckDefault1"
                                               onChange={
                                                   ()=>{
                                                       if(isEventInAttended(event,user))
                                                       {
                                                           deleteEventFromAttendingForUser(user.id,event.id)
                                                       }else{
                                                           addEventToAttendingForUser(user.id,event)
                                                       }

                                                   }
                                               }
                                               checked={isEventInAttended(event,user)}/>
                                        <label className="form-check-label"
                                               htmlFor="flexSwitchCheckDefault1">{
                                                   isEventOver(Moment(dt),Moment.locale())?'Attended':'Attending'
                                        }</label>
                                    </div>

                                </div>

                            </div>


                        </div>
                    </div>

                </div>
            </div>


            <br/>

            {/*// comment, photos section */}
            <div className="row">

                <div className="col">

                    <div className="card">
                        <div className="card-header">
                            <ul className="nav nav-tabs card-header-tabs">
                                <li className="nav-item">
                                    <Link className="nav-link active" to="#">Comments</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body">

                            <div className="row">
                                <div className="d-flex flex-column col">
                                    <div className="coment-bottom bg-white p-2 px-4">
                                        <div className="d-flex flex-row add-comment-section mt-4 mb-4">
                                            <img
                                                className="img-fluid img-responsive rounded-circle mr-2"
                                                src="https://st.depositphotos.com/2218212/2938/i/950/depositphotos_29387653-stock-photo-facebook-profile.jpg" width="38"/> &nbsp;
                                            <input type="text"
                                                   className="form-control mr-3"
                                                   placeholder="Add comment"
                                                   onChange={(e)=>setCahedItem(e.target.value)}
                                                   value={cachedItem}
                                            />
                                            &nbsp;
                                            <button onClick={()=>{
                                                // if(cachedItem){
                                                //     alert('Enter comment')
                                                //     return
                                                // }
                                                const com = {
                                                    user: user,
                                                    event: event,
                                                    comment: cachedItem,
                                                    userName: user.userName,
                                                    likes: 0
                                                }
                                                addCommentForEvent(com)
                                                setCahedItem('')

                                            }} className="btn btn-primary" type="button">Comment</button></div>
                                        {
                                            comments &&
                                            comments.map(comment=>

                                                <div className="commented-section mt-2">
                                                    <div className="d-flex flex-row align-items-center commented-user">
                                                        <Link to={`/profile/${comment.user.id}`}
                                                        ><h5 className="mr-2">{comment.userName}</h5></Link>
                                                    </div>
                                                    <div className="comment-text-sm">
                                                        <span>{comment.comment}</span>
                                                    </div>
                                                    <div className="reply-section">
                                                        <div className="d-flex flex-row align-items-center voting-icons">
                                                            <span className="ml-2">{comment.likes}&nbsp;</span>
                                                            <span className="dot ml-2"></span>
                                                            <Link onClick={()=>{
                                                                updateCommentForEvent(comment)
                                                            }}> <h6 className="ml-2 mt-1">&nbsp; Like</h6></Link>
                                                        </div>
                                                    </div>
                                                </div>

                                            )
                                        }



                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>

                </div>
            </div>

            <br/>

        </div>
        </>
    )
}


const stpm = (state) => {
    return {
        event: state.eventReducer.event,
        user: state.userReducer.user,
        comments:state.commentReducer.comments
    }
}
const dtpm = (dispatch) => {
    return {
        findEventById: (eid) => {
            eventService.findEventById(eid)
                .then(eventdetails => {
                    dispatch({
                        type: "FIND_EVENT_BY_ID",
                        event: eventdetails.event
                    })
                })
        },
        findUserById: (uid) =>{
            userService.findUserById(uid)
                .then(u => {
                    dispatch({
                        type: "FIND_USER_BY_ID",
                        user: u
                    })
                })
        },

        addEventToInterestedForUser: (uid,event) => {
            userService.addEventToInterestedForUser(uid, event)
                .then(user => dispatch({
                    type: "ADD_EVENT_TO_INTERESTED_FOR_USER",
                    user: user
                }))
        },
        deleteEventFromInterestedForUser: (uid,eid) => {
            userService.deleteEventFromInterestedForUser(uid,eid)
                .then(user => dispatch({
                    type: "DELETE_EVENT_FROM_INTERESTED_FOR_USER",
                    user: user
                }))
        },

        addEventToAttendingForUser: (uid,event) => {
            userService.addEventToAttendingForUser(uid, event)
                .then(user => dispatch({
                    type: "ADD_EVENT_TO_ATTENDING_FOR_USER",
                    user: user
                }))
        },
        deleteEventFromAttendingForUser: (uid,eid) => {
            userService.deleteEventFromAttendingForUser(uid,eid)
                .then(user => dispatch({
                    type: "DELETE_EVENT_FROM_ATTENDING_FOR_USER",
                    user: user
                }))
        },

        findCommentsByEvent: (eid) => {
            commentService.findCommentsForEvent(eid)
                .then(eventdetails => {
                    dispatch({
                        type: "FIND_COMMENTS_FOR_EVENT",
                        comments: eventdetails.comment
                    })
                })
        },

        addCommentForEvent: (comment) => {
            commentService.addCommentForEvent(comment)
                .then(status => {
                    dispatch({
                        type: "ADD_COMMENT_BY_USER_FOR_EVENT",
                        comment: comment
                    })
                }
                )
        },
        updateCommentForEvent: (comment) => {
            commentService.updateCommentForEvent(comment)
                .then(user => dispatch({
                    type: "UPDATE_COMMENT",
                    comment:comment
                }))
        },
        

    }
}

export default connect(stpm, dtpm)
(EventDetails)