import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';


function DeleteHotel() {
  const location = useLocation();
  const history = useHistory();
  const { hotelData } = location.state;
  const hotelId = hotelData.hotelId;
  const headers = {
    Authorization: localStorage.getItem('token'),
  };
  useEffect(() => {
    // Create an asynchronous function to delete the hotel
    const deleteHotel = async () => {
      try {
        // // Send the DELETE request
        // await axios.delete(`http://localhost:8080/hotel/delete-hotel/${hotelId}`,{ headers });
        // // If successful, you can handle the response here, e.g., show a success message
        // alert('Hotel deleted successfully!');
        // // After deletion, navigate back to the previous page or a specific route
        // history.push('/');

        const confirmDelete = window.confirm(`Are you sure you want to delete ${hotelData.hotelName}?`);
      if (confirmDelete) {
        // User confirmed, send the DELETE request
        await axios.delete(`http://localhost:8080/hotel/delete-hotel/${hotelId}`, { headers });
        // If successful, you can handle the response here, e.g., show a success message
        alert('Hotel deleted successfully!');
        // After deletion, navigate back to the previous page or a specific route
        history.push('/');
      }
      } catch (error) {
        //alert('Error deleting hotel:', error);
        //history.push('/');
        console.log(error);
      }
    };
    deleteHotel();
  }, [hotelId, history]);
  
  return (
    <div className="container">
    </div>
  );
}

export default DeleteHotel;
