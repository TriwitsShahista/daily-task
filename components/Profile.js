import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

function Profile(){
const { state } = useLocation();
 
console.log('profile',state)
  const navigate = useNavigate();
  var config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'accept': '*/*',
    },
  };

  const [formErrors, setFormErrors] = useState({});

  const validate = () => {
  const errors = {};
  const passwordRegex = /^(?=(.*[a-z]){0,})(?=(.*[A-Z]){0,})(?=(.*[0-9]){0,})(?=(.*[!@#$%^&*()\-__+.]){0,}).{7,}$/;
  const phoneNumberRegex = /^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/;
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!eventDetails.email) {
      errors.email = "Email is required";
    }
    if (eventDetails.email && !emailRegex.test(eventDetails.email)) {
      errors.email = "Invalid email";
    }
    if (!eventDetails.password) {
      errors.password = "Password is required";
    }
    if (eventDetails.password && !passwordRegex.test(eventDetails.password)) {
      errors.password = "1Upper, 1Lower, 1Numric and 1Special (8min) characters it contain";
    }

    if (!eventDetails.name) {
      errors.name = "Name is required";
    }

    if (!eventDetails.phoneNo) {
      errors.phoneNo = "Phone number is required";
    }
    if (
      eventDetails.phoneNo &&
      !phoneNumberRegex.test(eventDetails.phoneNo)
    ) {
      errors.phoneNo = "Only ten digits allowed start with(6789)";
    }

    return errors;
  };

  const validateOnChange = (name, value) => {
    const errors = {};
    const passwordRegex = /^(?=(.*[a-z]){0,})(?=(.*[A-Z]){0,})(?=(.*[0-9]){0,})(?=(.*[!@#$%^&*()\-__+.]){0,}).{7,}$/;
    const phoneNumberRegex = /^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/;
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name == "email" && !value) {
      errors.email = "Email is required";
    }
    if (name == "email" && value && !emailRegex.test(value)) {
      errors.email = "Invalid email";
    }
    if (name == "password" && !value) {
      errors.password = "Password is required";
    }
    if (name == "password" && value && !passwordRegex.test(value)) {
      errors.password = "1Upper, 1Lower, 1Numric and 1Special (8min) characters it contain";
    }
    if (name == "name" && !value) {
      errors.name = "Name is required";
    }
    if (name == "phoneNo" && !value) {
      errors.phoneNo = "Phone number is required";
    }
    if (name == "phoneNo" && value && !phoneNumberRegex.test(value)) {
      errors.phoneNo = "Only ten digits allowed start with(6789)";
    }
    return errors;
  };

  const [file, setFile] = useState();
  const [eventDetails, setEventDetails] = useState({
    id: "",
    name: "",
    email: "",
    phoneNo: "",
    password: "",
    image: "",
  });

  const resetEmployeeDetails = () => {
    let _resetEmployee = {
      name: "",
      email: "",
      phoneNo: "",
      password: "",
      image: "",
    };
    setEventDetails(_resetEmployee);
  };
  
     const handleChangeInput = (e) => {
     let key = e.target.name;
     let value = e.target.value;
     const _currentData = { ...eventDetails, [key]: value };
     setEventDetails(_currentData);
     const _errors = validateOnChange(e.target.name, e.target.value);
     console.log(e.target.files);
     setFile(URL.createObjectURL(e.target.files[0]));

    if (Object.keys(_errors).length != 0) {
      let finalErrors = {
        ...formErrors,
        [key]: _errors[key],
      };
      setFormErrors(finalErrors);
    } else {
      let finalErrors = {
        ...formErrors,
        [key]: _errors[key],
      };
      setFormErrors(finalErrors);
    }
    
   };
  
  console.log('events',eventDetails)
   const [eventTableDetails, setEventTableDetails] = useState(null);
   const initializeEvent = () => {
    axios
      .get(`http://192.168.0.115/testAPI/api/Chat/getProfile/${state.phoneNo}`)
      .then((response) => {
        setEventTableDetails(response.data);
        //console.log(response)
         if (response.data != null) {
           let requestForSet = {
             id: response.data.id,
             name: response.data.name,
             email: response.data.email,
             phoneNo: response.data.phoneNo,
             password: response.data.password,
             image: response.data.image,
           };
           setEventDetails(requestForSet);
         }
      })
      .catch((e) => {});
  };
  useEffect(() => initializeEvent(), []);
  console.log('response',eventTableDetails)

  const updateData =()=>{

    const _errors = validate();
    setFormErrors(_errors);

    let _requestData = {
      ...eventDetails,
    };

  {
    Object.keys(_errors).length == 0
      ?
  axios.post("http://192.168.0.115/testAPI/api/Chat/updateTestPrac/", _requestData, config)
  .then((res) => {
  console.log(res)
  if (res.status === 200) {
   // navigate("/welcomePage",{state:state})
    alert("Successfully updated");
    }  else Promise.reject();
    setFormErrors({});
     })
     .catch((err) =>{ alert("Something went wrong")
     setFormErrors({});
   })
   : alert("Please Fill All Details");
    }
}

return(
<>
    <div className="app">
      <div className="register-form">
      <div className="form">
      <div className="input-container">
          <label>Image </label>
          <input type="file" name="image"  onChange={handleChangeInput} id="image"/>
          <img src={file} id="file"/>
          <p style={{ marginTop: "1px", color: "red" }}>
                {formErrors.image}
              </p>
        </div>
        <div className="input-container">
          <label>Full Name </label>
          <input type="text"  value={eventDetails.name} name="name" onChange={handleChangeInput} error="!employeeDetails.name" required />
          <p style={{ marginTop: "1px", color: "red" }}>
                {formErrors.name}
              </p>
        </div>
        <div className="input-container">
          <label>Email ID </label>
          <input type="text" value={eventDetails.email} name="email" onChange={handleChangeInput} error="!employeeDetails.email" required />
          <p style={{ marginTop: "1px", color: "red" }}>
                {formErrors.email}
              </p>
        </div>
        <div className="input-container">
          <label>Phone Number </label>
          <input readOnly type="text" value={eventDetails.phoneNo} name="phoneNo" onChange={handleChangeInput} error="!employeeDetails.phoneNo" required />
          <p style={{ marginTop: "1px", color: "red" }}>
                {formErrors.phoneNo}
              </p>
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" value={eventDetails.password} name="password" onChange={handleChangeInput} error="!employeeDetails.password" required />
          <p style={{ marginTop: "1px", color: "red" }}>
                {formErrors.password}
              </p>
        </div>
         <div className="button-container"> 
           <input type="submit" value="Update" onClick={()=>updateData()} />   
        </div>
        <div className="button-container"> 
        <input type="submit" value="Next" onClick={()=>navigate("/docDetails",{state:state})}/> 
        </div>
    </div>
      </div>
      </div>  
  </>

);
}
export default Profile;