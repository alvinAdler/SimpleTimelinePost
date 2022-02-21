import { useState, useEffect, useContext } from 'react'
import Cookies from 'js-cookie'
import swal from 'sweetalert2'

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
            setPageLoading(false)
        })
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
                        <UserBox key={index} username={user.username} 
                        showAddButton={(user.username !== authContext.user.username) && (!friendsList.some((item) => item.username === user.username))}
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
                    <UserBox username="Alvin" showAddButton={true} showRemoveButton={true}/>
                    <UserBox username="Alvin" showAddButton={true} showRemoveButton={true}/>
                    <UserBox username="Alvin" showAddButton={true} showRemoveButton={true}/>
                </div>
            }


            <div className="friends-list">
                <h2>Your Friends</h2>

                {friendsList.length > 0 ?
                    friendsList.map((user, index) => (
                        <UserBox key={index} username={user.username} showRemoveButton={true}/>
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
