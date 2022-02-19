import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import swal from 'sweetalert2'

import "./FriendsPage_master.css"

import customAxios from "../utilities/customAxios"
import SearchInput from "../utilityComponents/SearchInput/SearchInput"
import UserBox from "../utilityComponents/UserBox/UserBox"
import EmptyBanner from '../utilityComponents/EmptyBanner/EmptyBanner'

const FriendsPage = () => {

    const [foundUsers, setFoundUsers] = useState(null)
    const [incomingRequests, setIncomingRequests] = useState([])
    const [friendsList, setFriendsList] = useState([])

    useEffect(() => {
        customAxios({
            method: "GET",
            url: "/users/getFriends",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${Cookies.get("authToken")}`
            }
        })
        .then((res) => {
            setFriendsList(res.data.friendsList)
        })
        .catch((err) => {
            console.log(err)
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
        })
        .catch((err) => {
            console.log(err)
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
                        <UserBox key={index} username={user.username} showRemoveButton={false}/>
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
                    <UserBox username="Alvin"/>
                </div>
            }


                <div className="friends-list">
                    <h2>Your Friends</h2>

                    {friendsList.length > 0 ?
                        friendsList.map((user, index) => (
                            <UserBox key={index} username={user.username} showAddButton={false}/>
                        ))
                    :
                        <EmptyBanner
                        bannerTitle="A little bit empty here..."
                        bannerDesc="Discover some friends by adding their username!"
                        style={{width: "100%"}}
                        />
                    }
                </div>

        </div>
    )
}

export default FriendsPage
