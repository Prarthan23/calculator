/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
 
    axios.get('http://localhost:3000/api/profile', { withCredentials: true })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 401) {
            setError("You need to be logged in.");
          } else {
            setError("Unauthorized access.");
          }
        } else {
          setError("An error occurred while fetching the profile.");
        }
      });
  }, []);


  const handleUpdateEmail = () => {
    if(!newEmail) {
      alert("Please enter new email ")
    }
    axios.post('http://localhost:3000/api/updateEmail', { newEmail }, { withCredentials: true })
      .then(response => {
        alert(response.data.message);
        setUser({ ...user, email: newEmail });
        clearEmail(); 
      })
      .catch(err => {
        console.error('Error updating email:', err);
        setError("Failed to update email.");
      });
  };

  const handleUpdatePassword = () => {
    if(!newPassword){
      alert("Please enter new password ");    
    }
    axios.post('http://localhost:3000/api/updatePassword', { newPassword }, { withCredentials: true })
      .then(response => {
        alert(response.data.message);
        clearPassword();
      })
      .catch(err => {
        console.error('Error updating password:', err);
        setError("Failed to update password.");
      });
  };


  if (!user) {
    return <div>You Need To Login First</div>;
  }

  const clearEmail = () => {
    setNewEmail('');
  }
  const clearPassword = () => {
    setNewPassword('');
  }

  return (
    <>
      <h1 className='text-4xl font-bold text-start ml-4 mt-2'>User Profile</h1>
      <div className='w-full h-auto flex flex-col items-center gap-4 p-4 lg:flex-row lg:justify-between'>
        <div className='flex flex-col gap-12 items-center border bg-gray-100 border-blue-950 px-6 py-4 shadow-lg shadow-gray-400 rounded-md'>
          <p className='text-2xl flex justify-center items-center gap-2'>
            <FontAwesomeIcon icon={faUser} /> <span>{user.email}</span>
          </p>
        </div>
        <div className='flex flex-col gap-8 items-center'>
          <div className='flex flex-col w-[300px] lg:w-full lg:flex-row gap-2'>
            <input 
              type='email' 
              placeholder='New Email' 
              value={newEmail} 
              onChange={(e) => setNewEmail(e.target.value)} 
              className='border  border-gray-600 px-2 py-2 lg:py-1 rounded-md'
            />
            <button 
              onClick={handleUpdateEmail} 
              className='bg-yellow-400 w-full px-5 py-2 rounded-md font-semibold border border-blue-900 lg:hover:bg-blue-600  lg:hover:text-white'>
              Update E-mail
            </button>
          </div>
          <div className='flex flex-col w-[300px] lg:w-full lg:flex-row gap-2'>
            <input 
              type='password' 
              placeholder='New Password' 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              className='border border-gray-600 px-2 py-2 lg:py-1 rounded-md'
            />
            <button 
              onClick={handleUpdatePassword} 
              className='bg-yellow-400 px-5 w-full py-2 rounded-md font-semibold border border-blue-900 lg:hover:bg-blue-600  lg:hover:text-white'>
              Update Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
