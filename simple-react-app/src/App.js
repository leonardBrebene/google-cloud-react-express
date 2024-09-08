import './App.css';
import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"

function App() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    spreadsheetId:'',
    sheetName:'',
    dateFrom:'',
    dateTo:''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://service-name-react-express-project-228055915371.europe-central2.run.app/web-scraping-parameters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form submitted successfully!');

      } else {
        console.error('Error submitting form');
      }
    } catch (error) {
      console.error('An error occurred while submitting the form', error);
    }
  }



  return (

    <div className="Black-template">
   
      <Container className="d-flex justify-content-center m-4 fw-bold "><img src="./PickaxeNew.png"/></Container>


      <Form onSubmit={handleSubmit} className="fs-4">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label size="sm">Credential email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Credential Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicSpredsheetId">
          <Form.Label>Spreadsheet Id</Form.Label>
          <Form.Control type="text" placeholder="Enter Spreadsheet Id" name="spreadsheetId" onChange={handleChange} /> 
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicSheetName">
          <Form.Label>Sheet Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Sheet Name" name="sheetName" onChange={handleChange} /> 
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFromDate">
          <Form.Label>From Date:</Form.Label>
          <Form.Control type="text" placeholder="Enter start date" name="dateFrom" onChange={handleChange} /> 
          <Form.Label className=" fs-6" >Use Format: dd/MM/yyyy</Form.Label>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formToDate">
          <Form.Label>To Date:</Form.Label>
          <Form.Control type="text" placeholder="Enter end date" name="dateTo" onChange={handleChange} /> 
          <Form.Label className=" fs-6" >Use Format: dd/MM/yyyy</Form.Label>
        </Form.Group>

        <Container className="d-flex justify-content-center">
          <Button variant="primary" type="submit" className="SubmitButton  p-3 mb-5 fs-4 fw-bold" >
            Start Mining
          </Button>
        </Container>


      </Form>

    </div>

  );
}

export default App;
