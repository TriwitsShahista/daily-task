import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

function ResetPass(){
const { state } = useLocation();
 
console.log('resetPass',state)
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
      errors.password = "2upper, 2lower, 2numrical, 2special character (min8)";
    }
    if (!eventDetails.conpassword) {
      errors.conpassword = "Password is required";
    }
    if (eventDetails.conpassword && !passwordRegex.test(eventDetails.conpassword)) {
      errors.conpassword = "2upper, 2lower, 2numrical, 2special character (min8)";
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
    if (name == "conpassword" && !value) {
      errors.conpassword = "Password is required";
    }
    if (name == "conpassword" && value && !passwordRegex.test(value)) {
      errors.conpassword = "1Upper, 1Lower, 1Numric and 1Special (8min) characters it contain";
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

  const [eventDetails, setEventDetails] = useState({
    password: "",
    conpassword: "",
  });

  const resetEmployeeDetails = () => {
    let _resetEmployee = {
      password: "",
      conpassword: "",
    };
    setEventDetails(_resetEmployee);
  };
  
    const handleChangeInput = (e) => {
     let key = e.target.name;
     let value = e.target.value;
     const _currentData = { ...eventDetails, [key]: value };
     setEventDetails(_currentData);
     const _errors = validateOnChange(e.target.name, e.target.value);

    if (Object.keys(_errors).length != 0) {
      let finalErrors = {
        ...formErrors,
        [key]: _errors[key],
      };
      setFormErrors(finalErrors);
      // console.log("errors", _errors);
      //console.log("finalErrors", finalErrors);
    } else {
      let finalErrors = {
        ...formErrors,
        [key]: _errors[key],
      };
      setFormErrors(finalErrors);
      //console.log("error removed", finalErrors);
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
    navigate("/user")
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
          <label>Current Password </label>
          <input type="text" value={eventDetails.password} name="password" onChange={handleChangeInput} error="!employeeDetails.password" required />
          <p style={{ marginTop: "1px", color: "red" }}>
                {formErrors.password}
              </p>
        </div>
        <div className="input-container">
          <label>Confirm Password </label>
          <input type="password" value={eventDetails.conpassword} name="conpassword" onChange={handleChangeInput} error="!employeeDetails.conpassword" required />
          <p style={{ marginTop: "1px", color: "red" }}>
                {formErrors.conpassword}
              </p>
        </div>
         <div className="button-container"> 
           <input type="submit" value="Update" onClick={()=>updateData()} />   
        </div>
    </div>
      </div>
      </div>  
  </>

);
}
export default ResetPass;