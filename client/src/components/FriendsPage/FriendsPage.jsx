import "./FriendsPage_master.css"

import SearchInput from "../utilityComponents/SearchInput/SearchInput"
import UserBox from "../utilityComponents/UserBox/UserBox"

const FriendsPage = () => {

    return (
        <div className="friendspage-container">
            <h2>Find more people!</h2>
            <SearchInput type="text" 
            mainClass="findfriends-input" 
            />
            <div className="foundusers-container">
                <p>Result</p>
                <UserBox username="Alvin" showRemoveButton={false}/>
                <UserBox username="Alvin" showRemoveButton={false}/>
                <UserBox username="Alvin" showRemoveButton={false}/>
                <UserBox username="Alvin" showRemoveButton={false}/>
            </div>

            <div className="incoming-requests-container">
            <h2>Incoming Requests</h2>
                <UserBox username="Alvin"/>
            </div>

            <div className="friends-list">
            <h2>Your Friends</h2>
                <UserBox username="Alvin" showAddButton={false}/>
                <UserBox username="Alvin" showAddButton={false}/>
                <UserBox username="Alvin" showAddButton={false}/>
                <UserBox username="Alvin" showAddButton={false}/>
                <UserBox username="Alvin" showAddButton={false}/>
            </div>
        </div>
    )
}

export default FriendsPage
