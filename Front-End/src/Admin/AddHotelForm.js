
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Card, Form, Button, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function AddHotelForm() {
  const history=useHistory();
  const [hotelData, setHotelData] = useState({
    aboutHotel: '',
    address: {
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
    },
    contactNo: '',
    hotelAmenities: '',
    hotelName: '',
    hotelType: 'FIVESTAR', // Default value
    roomCapacity: '',
  });

  const headers = {
    Authorization: localStorage.getItem('token'),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const { address } = hotelData;
    if (name.startsWith('address.')) {
      const fieldName = name.split('.')[1];
      setHotelData({
        ...hotelData,
        address: {
          ...address,
          [fieldName]: value,
        },
      });
    } else {
      // Update non-nested fields
      setHotelData({ ...hotelData, [name]: value });
    }
    console.log(hotelData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate contactNo (must be 10 digits)
    if (hotelData.contactNo.length !== 10) {
      alert('Contact number must be 10 digits.');
      return;
    }

    // Validate zipCode (must be 6 digits)
    if (!/^\d{6}$/.test(hotelData.address.zipCode)) {
      alert('Zip code must be 6 digits.');
      return;
    }

    try {
      // Make the Axios POST request
      const response = await axios.post(
        'http://localhost:8080/hotel/add-hotel',
        hotelData,
        { headers }
      );
      // Handle success, e.g., display a success message or redirect
      alert('Hotel added successfully!');
      setHotelData({
        aboutHotel: '',
    address: {
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
    },
    contactNo: '',
    hotelAmenities: '',
    hotelName: '',
    hotelType: 'FIVESTAR', // Default value
    roomCapacity: '',
      });
    } catch (error) {
      console.error('Error adding hotel:', error);
      // Handle error, e.g., display an error message
      alert('Error adding hotel. Please try again.');
    }
  };

  return (
    <Container>
      <Card className="my-4 p-4">
        <Card.Body>
          <h1 className="mb-4">Add New Hotel</h1>
          <Form onSubmit={handleSubmit}>
            {/* Hotel Name */}
            <Form.Group className="mb-3">
              <Card.Text style={{ fontWeight: 'bold', color: 'red' }}>(Fields marked with * are mandatory)</Card.Text>
              <Form.Label>Hotel Name </Form.Label><label style={{color:"red"}}> * (Minimum 3 characters, Numeric not allowed)</label>
              <Form.Control
                type="text"
                name="hotelName"
                value={hotelData.hotelName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Hotel Description */}
            <Form.Group className="mb-3">
              <Form.Label>Hotel Description</Form.Label><label style={{color:"red"}}> * (Minimum 25 characters)</label>
              <Form.Control
                as="textarea"
                name="aboutHotel"
                value={hotelData.aboutHotel}
                onChange={handleChange}
                rows={3}
                required
              />
            </Form.Group>

            {/* City */}
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label><label style={{color:"red"}}> *</label>
              <Form.Control
                type="text"
                name="address.city"
                value={hotelData.address.city}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* State */}
            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label><label style={{color:"red"}}> *</label>
              <Form.Control
                type="text"
                name="address.state"
                value={hotelData.address.state}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Street Address */}
            <Form.Group className="mb-3">
              <Form.Label>Street Address</Form.Label><label style={{color:"red"}}> *</label>
              <Form.Control
                type="text"
                name="address.streetAddress"
                value={hotelData.address.streetAddress}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Zip Code */}
            <Form.Group className="mb-3">
              <Form.Label>Zip Code <label style={{color:"red"}}> * (Must be 6 digit numeric)</label></Form.Label>
              <Form.Control
                type="text"
                name="address.zipCode"
                pattern="[0-9]*"
                value={hotelData.address.zipCode}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Hotel Contact */}
            <Form.Group className="mb-3">
              <Form.Label>Hotel Contact <label style={{color:"red"}}> * (Must be 10 digit numeric)</label></Form.Label>
              <Form.Control
                type="text"
                name="contactNo"
                pattern="[0-9]*"
                value={hotelData.contactNo}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Hotel Amenities */}
            <Form.Group className="mb-3">
              <Form.Label>Hotel Amenities</Form.Label><label style={{color:"red"}}> (Numeric values are not allowed)</label>
              <Form.Control
                type="text"
                name="hotelAmenities"
                value={hotelData.hotelAmenities}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Hotel Type */}
            <Form.Group className="mb-3">
              <Form.Label>Hotel Type</Form.Label><label style={{color:"red"}}> *</label>
              <Form.Select
                name="hotelType"
                value={hotelData.hotelType}
                onChange={handleChange}
                required
              >
                <option value="FIVE_STAR">Five Star</option>
                <option value="FOUR_STAR">Four Star</option>
                <option value="THREE_STAR">Three Star</option>
                <option value="TWO_STAR">Two Star</option>
              </Form.Select>
            </Form.Group>

            {/* Room Capacity */}
            <Form.Group className="mb-3">
              <Form.Label>Room Capacity</Form.Label><label style={{color:"red"}}> * (Minimum 10)</label>
              <Form.Control
                type="text"
                name="roomCapacity"
                value={hotelData.roomCapacity}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" >
              Submit
            </Button>
            <Button variant="primary"   onClick={()=>history.push('/hotel-list-admin')} >
              Back
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddHotelForm;
