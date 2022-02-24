import { useState, useEffect, useContext } from 'react'
import Cookies from 'js-cookie'
import swal from 'sweetalert2'
import axios from 'axios'

import "./FriendsPage_master.css"

import customAxios from "../utilities/customAxios"
import SearchInput from "../utilityComponents/SearchInput/SearchInput"
import UserBox from "../utilityComponents/UserBox/UserBox"
import EmptyBanner from '../utilityComponents/EmptyBanner/EmptyBanner'
import PageSpinner from '../utilityComponents/PageSpinner/PageSpinner'
import AuthContext from '../utilityComponents/contexts/AuthContext'

const FriendsPage = () => {

    const [foundUsers, setFoundUsers] = useState(null)
    const [incomingRequests, setIncomingRequests] = useState([])
    const [friendsList, setFriendsList] = useState([])

    const [pageLoading, setPageLoading] = useState(true)

    const authContext = useContext(AuthContext)

    useEffect(() => {

        axios.all([
            axios({
                method: "GET",
                url: "http://localhost:5000/users/getFriends",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("authToken")}`
                }    
            }),
            axios({
                method: "GET",
                url: "http://localhost:5000/users/getFriendRequests",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("authToken")}`
                }
            })
        ])
        .then(axios.spread((res, res2) => {
            setFriendsList(res.data.friendsList)
            setIncomingRequests(res2.data.friendRequests)
            setPageLoading(false)
        }))
        .catch((err) => {
            console.log(err)
            setPageLoading(false)
        })

    }, [])

    const handleUserSearch = (searchKeyword) => {
        if(searchKeyword === ""){
            swal.fire({
                icon: "error",
                title: "Error!",
                text: "You have not input anything at the search field. Please enter some letters",
                customClass: {
                    popup: "swal-custom-popup",
                    icon: "swal-icon",
                    confirmButton: "swal-custom-confirm",
                    cancelButton: "swal-custom-cancel"
                }
            })
            return
        }

        setPageLoading(true)

        customAxios({
            method: "POST",
            url: "/users/getUsers",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${Cookies.get("authToken")}`
            },
            data: {
                searchKeyword: searchKeyword
            }
        })
        .then((res) => {
            setFoundUsers(res.data.matchingUsers)
            console.log(res.data.matchingUsers)
            setPageLoading(false)
        })
        .catch((err) => {
            console.log(err)
            setPageLoading(false)
        })
    }

    const handleAddFriendRequest = (user) => {

        swal.fire({
            icon: "question",
            title: "Confirmation",
            text: `Are you sure to send friend request to ${user.username}?`,
            showCancelButton: true,
            customClass: {
                popup: "swal-custom-popup",
                icon: "swal-icon",
                confirmButton: "swal-custom-confirm",
                cancelButton: "swal-custom-cancel"
            }
        })
        .then((res) => {
            if(res.isConfirmed){
                setPageLoading(true)

                setFoundUsers(foundUsers.map((currentUser) => {
                    if(currentUser === user){
                        return {
                            ...currentUser,
                            isFriendRequestSent: true
                        }
                    }
                    return currentUser
                }))

                customAxios({
                    method: "POST",
                    url: "/users/addFriendRequest",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${Cookies.get("authToken")}`
                    },
                    data: {
                        targetedUserId: user._id
                    }
                })
                .then((res) => {
                    setPageLoading(false)
                    swal.fire({
                        icon: "success",
                        title: "Success",
                        text: `Friend request sent to ${user.username}`,
                        customClass: {
                            popup: "swal-custom-popup",
                            icon: "swal-icon",
                            confirmButton: "swal-custom-confirm",
                            cancelButton: "swal-custom-cancel"
                        }
                    })
                })
                .catch((err) => {
                    setPageLoading(false)
                    swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Friend request failed",
                        customClass: {
                            popup: "swal-custom-popup",
                            icon: "swal-icon",
                            confirmButton: "swal-custom-confirm",
                            cancelButton: "swal-custom-cancel"
                        }
                    })
                    console.error(err.response)
                })
            }
        })
    }

    const handleAcceptFriend = (user) => {

        swal.fire({
            icon: "question",
            title: "Confirmation",
            text: `Are you sure to accept ${user.username} as a friend?`,
            showCancelButton: true,
            customClass: {
                popup: "swal-custom-popup",
                icon: "swal-icon",
                confirmButton: "swal-custom-confirm",
                cancelButton: "swal-custom-cancel"
            }
        })
        .then((res) => {
            if(res.isConfirmed){
                setPageLoading(true)

                customAxios({
                    method: "POST",
                    url: "/users/acceptFriendRequest",
                    headers:{
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${Cookies.get("authToken")}`
                    },
                    data: {
                        acceptedUserId: user._id
                    }
                })
                .then((res) => {
                    setPageLoading(false)

                    setIncomingRequests(incomingRequests.filter((currentUser) => currentUser !== user))
                    setFriendsList([...friendsList, user])

                    swal.fire({
                        icon: "success",
                        title: "Success",
                        text: `Successfully added ${user.username} as a friend`,
                        customClass: {
                            popup: "swal-custom-popup",
                            icon: "swal-icon",
                            confirmButton: "swal-custom-confirm",
                            cancelButton: "swal-custom-cancel"
                        }
                    })
                })
                .catch((err) => {
                    setPageLoading(false)
                    console.error(err.response)
                    swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to accept friend request",
                        customClass: {
                            popup: "swal-custom-popup",
                            icon: "swal-icon",
                            confirmButton: "swal-custom-confirm",
                            cancelButton: "swal-custom-cancel"
                        }
                    })
                })
            }
        })


    }

    const handleRejectFriend = (user) => {

        swal.fire({
            icon: "question",
            title: "Confirmation",
            text: `Are you sure to reject ${user.username}'s friend request?`,
            showCancelButton: true,
            customClass: {
                popup: "swal-custom-popup",
                icon: "swal-icon",
                confirmButton: "swal-custom-confirm",
                cancelButton: "swal-custom-cancel"
            }
        })
        .then((res) => {
            if(res.isConfirmed){
                setPageLoading(true)
                customAxios({
                    method: "POST",
                    url: "/users/rejectFriendRequest",
                    headers:{
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${Cookies.get("authToken")}`
                    },
                    data: {
                        rejectedUserId: user._id
                    }
                })
                .then((res) => {
                    setPageLoading(false)
                    setIncomingRequests(incomingRequests.filter((currentUser) => currentUser !== user))

                    swal.fire({
                        icon: "success",
                        title: "Success",
                        text: `Successfully reject ${user.username}'s friend request`,
                        customClass: {
                            popup: "swal-custom-popup",
                            icon: "swal-icon",
                            confirmButton: "swal-custom-confirm",
                            cancelButton: "swal-custom-cancel"
                        }
                    })
                })
                .catch((err) => {
                    setPageLoading(false)
                    console.error(err.response)
                    swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to reject friend request",
                        customClass: {
                            popup: "swal-custom-popup",
                            icon: "swal-icon",
                            confirmButton: "swal-custom-confirm",
                            cancelButton: "swal-custom-cancel"
                        }
                    })
                })
            }
        })
    }

    const handleFriendRemove = (user) => {

        swal.fire({
            icon: "question",
            title: "Confirmation",
            text: `Are you sure to remove ${user.username} from your friends list?`,
            showCancelButton: true,
            customClass: {
                popup: "swal-custom-popup",
                icon: "swal-icon",
                confirmButton: "swal-custom-confirm",
                cancelButton: "swal-custom-cancel"
            }
        })
        .then((res) => {
            if(res.isConfirmed){
                setPageLoading(true)

                customAxios({
                    method: "POST",
                    url: "/users/removeFriend",
                    headers:{
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${Cookies.get("authToken")}`
                    },
                    data: {
                        targetUserId: user._id
                    }
                })
                .then((res) => {
                    setPageLoading(false)

                    setFriendsList(friendsList.filter((currentUser) => currentUser !== user))

                    swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Successfully removed a friend",
                        customClass: {
                            popup: "swal-custom-popup",
                            icon: "swal-icon",
                            confirmButton: "swal-custom-confirm",
                            cancelButton: "swal-custom-cancel"
                        }
                    })

                })
                .catch((err) => {
                    setPageLoading(false)
                    console.error(err.response)
                    swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to remove a friend",
                        customClass: {
                            popup: "swal-custom-popup",
                            icon: "swal-icon",
                            confirmButton: "swal-custom-confirm",
                            cancelButton: "swal-custom-cancel"
                        }
                    })
                })
            }
        })
    }

    return (
        <div className="friendspage-container">
            <h2>Find more people!</h2>
            <SearchInput type="text" 
            mainClass="findfriends-input" 
            placeholderText="Enter username here"
            searchCallback={handleUserSearch}
            />

            {foundUsers && (foundUsers.length > 0 ?
                <div className="foundusers-container">
                    <p>Result</p>
                    {foundUsers.map((user, index) => (
                        <UserBox key={index} user={user} 
                        showAddButton={(user.username !== authContext.user.username) && (!friendsList.some((item) => item.username === user.username)) && !user.isFriendRequestSent}
                        showLoadingIcon={user.isFriendRequestSent}
                        onAddClick={handleAddFriendRequest}
                        />
                    ))}
                </div>
            :
                <EmptyBanner
                bannerTitle="No result for your search"
                bannerDesc="Please use another keyword to discover someone else"
                customClass="container-width"
                />)
            }

            {incomingRequests.length > 0 &&
                <div className="incoming-requests-container">
                    <h2>Incoming Requests</h2>
                    {incomingRequests.map((user, index) => (
                        <UserBox key={index} user={user} showAddButton={true} showRemoveButton={true}
                        onAddClick = {handleAcceptFriend}
                        onRemoveClick = {handleRejectFriend}
                        />
                    ))}
                </div>
            }


            <div className="friends-list">
                <h2>Your Friends</h2>

                {friendsList.length > 0 ?
                    friendsList.map((user, index) => (
                        <UserBox key={index} user={user} showRemoveButton={true} onRemoveClick={handleFriendRemove}/>
                    ))
                :
                    <EmptyBanner
                    bannerTitle="A little bit empty here..."
                    bannerDesc="Discover some friends by adding their username!"
                    style={{width: "100%"}}
                    />
                }
            </div>
            
            <PageSpinner opacity={0.5} isShow={pageLoading}/>
        </div>
    )
}

export default FriendsPage
