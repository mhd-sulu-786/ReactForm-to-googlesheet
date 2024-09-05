import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import './App.css'
import axios from 'axios';
import swal from 'sweetalert';

const App = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setmessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !number || !email || !msg) {
      setError('Please fill out all fields.');
      return;
    } else {
      setError('');
    }
  
    const formData = {
       name,
       number,
       email,
       msg,
    };
  
    const jsonData = JSON.stringify(formData);

    try {
      console.log(formData);
  
      const response = await axios.post('YOUR LINK HERE', jsonData);
  
      if (response.status === 200 && response.data.status === 'success') {
        swal('Success', 'Form submitted successfully!', 'success');
        setName('');
        setNumber('');
        setEmail('');
        setmessage('');
      } else {
        throw new Error(response.data.message || 'Unknown error occurred');
      }
    } catch (error) {
      // Handle the error message properly for SweetAlert
      const errorMessage = error.response?.data?.message || error.message || 'Network Error';
      swal('Error', errorMessage, 'error');
      setError(`Failed to submit form: ${errorMessage}`);
    }
  };
  
  
  return (
    <Container id='Contact' fluid className='m-0 p-2 col-md-10 col-sm-12 '>
        
        <div className="flexs flex-column text-center contact-form-container ">
          <h2 className='text-dark text-center'>Contact Us</h2>
          <form onSubmit={handleSubmit} className="form flexs p-2 flex-column bg-primary" style={{ border: '2px solid black', borderLeft: 'none', borderRadius: '10px', borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}>
            <div className='flexs-all-col gap-3 p-2'>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-100 mt-5'
                placeholder='Enter Your Full Name'
                style={{ border: '1px solid black', borderRadius: '10px', height: '50px' }}
              />
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className='w-100 my-3'
                placeholder='Enter Your Phone Number'
                style={{ border: '1px solid black', borderRadius: '10px', height: '50px' }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-100 my-3'
                placeholder='Enter Your Email ID'
                style={{ border: '1px solid black', borderRadius: '10px', height: '50px' }}
              />
              <input
                type="text"
                value={msg}
                onChange={(e) => setmessage(e.target.value)}
                className='w-100'
                placeholder='Write some message'
                style={{ border: '1px solid black', borderRadius: '10px', height: '50px' }}
              />
              {error && <p className='text-danger my-0'>{error}</p>}
              <button type="submit" className='bg-dark text-white cardhover my-2' style={{ height: '50px', width: '120px' }}>Send Now</button>
            </div>
          </form>
        </div>
      </Container>
  );
};

export default App;
