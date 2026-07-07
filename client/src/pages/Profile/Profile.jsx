import "./Profile.css";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useState } from "react";

import {
  FiMail,
  FiPhone,
  FiUser,
  FiBriefcase,
  FiLock,
  FiSave,
} from "react-icons/fi";


function Profile() {

  const { user } = useUser();
  const { openUserProfile } = useClerk();


  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("Customer Support");


  const handleSave = async () => {

    try {

      await user.update({
        firstName: user.firstName,
        lastName: user.lastName,
      });


      alert("Profile saved successfully");

    } catch (error) {

      console.log(error);
      alert("Profile update failed");

    }

  };


  return (

    <div className="profile-page">


      <div className="profile-header">
        <h1>My Profile</h1>
        <p>Manage your account information</p>
      </div>



      <div className="profile-card">


        <div className="profile-top">


          {user?.imageUrl ? (

            <img
              src={user.imageUrl}
              alt="Profile"
              className="profile-avatar"
            />

          ) : (

            <div className="profile-avatar fallback-avatar">
              <FiUser />
            </div>

          )}



          <div>

            <h2>
              {user?.fullName || "User"}
            </h2>


            <p>
              {user?.primaryEmailAddress?.emailAddress}
            </p>


            <span className="role-badge">
              Support Admin
            </span>


          </div>


        </div>





        <div className="profile-form">


          <div className="input-group">

            <label>
              <FiUser />
              Full Name
            </label>


            <input
              type="text"
              value={user?.fullName || ""}
              readOnly
            />

          </div>





          <div className="input-group">

            <label>
              <FiMail />
              Email
            </label>


            <input
              type="email"
              value={
                user?.primaryEmailAddress?.emailAddress || ""
              }
              readOnly
            />

          </div>





          <div className="input-group">

            <label>
              <FiPhone />
              Phone
            </label>


            <input
              type="text"
              placeholder="Add phone number"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
            />

          </div>





          <div className="input-group">

            <label>
              <FiBriefcase />
              Department
            </label>


            <input
              type="text"
              value={department}
              onChange={(e)=>setDepartment(e.target.value)}
            />

          </div>





          <button
            className="save-btn"
            onClick={handleSave}
          >

            <FiSave />
            Save Changes

          </button>





          <button
            className="password-btn"
            onClick={()=>openUserProfile()}
          >

            <FiLock />
            Change Password

          </button>



        </div>


      </div>


    </div>

  );
}


export default Profile;