import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import axios from "axios";

const Payment = () => {
  const history = useHistory();
  const location = useLocation();
  const userId = parseInt(localStorage.getItem('userId'));
  const { BookingFormData } = location.state;
  BookingFormData.guestId = userId;

  const headers = {
    Authorization: localStorage.getItem('token').trim()
  };
  const [formData, setFormData] = useState({
    guestId: parseInt(localStorage.getItem('userId')),
    roomId: BookingFormData.roomId,
    paymentMode: '',
    paymentAmount: BookingFormData.roomPrice
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // Make the payment Axios request
      console.log('Form data payment :', formData);
      const paymentResponse = await axios.post('http://localhost:8080/payment/add-payment', formData, { headers });
      console.log('Payment successful:', paymentResponse.data);
      // Proceed to the booking step
      handleBooking();
    } catch (paymentError) {
      console.error('Payment error:', paymentError);
      // Handle payment error
    }
  };

  const handleBooking = async () => {
    try {
      // Make the booking Axios request
      console.log("booking form data ", BookingFormData);
      const bookingResponse = await axios.post('http://localhost:8080/booking/add-booking', BookingFormData, { headers });
      console.log('Booking created:', bookingResponse.data);
      alert("Booking SuccessFull..")
      history.push("/mybookings")
      // Perform any actions after successful booking creation
    } catch (bookingError) {
      console.error('Booking error:', bookingError);
      // Handle booking error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Guest ID:
        <p>{localStorage.getItem("userId")}</p>

      </label>
      <br />
      <br />
      <label>
        Payment Mode:
        <select
          name="paymentMode"
          value={formData.paymentMode}
          onChange={handleChange}
        >
          <option >SELECT option</option>
          <option value="CREDIT_CARD">Credit Card</option>
          <option value="DEBIT_CARD">Debit Card</option>
          <option value="UPI">UPI</option>
          <option value="NET_BANKING">Net Banking</option>
        </select>
      </label>
      <br />
      <label>
        Payment Amount:
        <p>{BookingFormData.roomPrice}</p>
      </label>
      <br />
      <button type="submit" >Submit</button>
    </form>


  );



};
export default Payment;