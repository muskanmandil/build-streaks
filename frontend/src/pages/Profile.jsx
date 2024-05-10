import React from 'react'
import "./CSS/Profile.css"

const Profile = () => {
  return (
    <div>
        <form action="">
            <div className="input-div">
                <label htmlFor="">Name</label>
                <input type="text" />
            </div>
            <div className="input-div">
                <label htmlFor="">Email</label>
                <input type="text" />
            </div>
            <div className="input-div">
                <label htmlFor="">Password</label>
                <input type="text" />
            </div>
            <button>Logout</button>
        </form>
    </div>
  )
}

export default Profile