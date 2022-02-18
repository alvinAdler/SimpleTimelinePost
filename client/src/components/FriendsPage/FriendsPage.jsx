import { useState } from 'react'

import "./FriendsPage_master.css"

import SearchInput from "../utilityComponents/SearchInput/SearchInput"
import UserBox from "../utilityComponents/UserBox/UserBox"
import EmptyBanner from '../utilityComponents/EmptyBanner/EmptyBanner'

const FriendsPage = () => {

    const [foundUsers, setFoundUsers] = useState(null)
    const [incomingRequests, setIncomingRequests] = useState([])
    const [friendsList, setFriendsList] = useState([])

    return (
        <div className="friendspage-container">
            <h2>Find more people!</h2>
            <SearchInput type="text" 
            mainClass="findfriends-input" 
            placeholderText="Enter username here"
            />

            {foundUsers && (foundUsers.length > 0 ?
                <div className="foundusers-container">
                    <p>Result</p>
                    <UserBox username="Alvin" showRemoveButton={false}/>
                    <UserBox username="Alvin" showRemoveButton={false}/>
                    <UserBox username="Alvin" showRemoveButton={false}/>
                    <UserBox username="Alvin" showRemoveButton={false}/>
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
                        <>
                            <UserBox username="Alvin" showAddButton={false}/>
                            <UserBox username="Alvin" showAddButton={false}/>
                            <UserBox username="Alvin" showAddButton={false}/>
                            <UserBox username="Alvin" showAddButton={false}/>
                            <UserBox username="Alvin" showAddButton={false}/>
                        </>
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
