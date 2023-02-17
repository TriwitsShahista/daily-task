import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const User = () => {
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
    
        if (!employeeLogin.password) {
          errors.password = "Password is required";
        }
        
        if (employeeLogin.password && !passwordRegex.test(employeeLogin.password)) {
          errors.password = "1upper, 1lower, 1numrical, 1special character (min8)";
        }
    
        if (!employeeLogin.phoneNo) {
          errors.phoneNo = "Phone number is required";
        }
        if (
          employeeLogin.phoneNo &&
          !phoneNumberRegex.test(employeeLogin.phoneNo)
        ) {
          errors.phoneNo = "Only ten digits allowed start with(6789)";
        }
    
        return errors;
      };
  
    const validateOnChange = (name, value) => {
    const errors = {};
    const passwordRegex = /^(?=(.*[a-z]){0,})(?=(.*[A-Z]){0,})(?=(.*[0-9]){0,})(?=(.*[!@#$%^&*()\-__+.]){0,}).{7,}$/;
    const phoneNumberRegex = /^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/;

    if (name == "password" && !value) {
      errors.password = "Password is required";
    }
    if (name == "password" && value && !passwordRegex.test(value)) {
      errors.password = "1Upper, 1Lower, 1Numric and 1Special (8min) characters it contain";
    }
    if (name == "phoneNo" && !value) {
      errors.phoneNo = "Phone number is required";
    }
    
    if (name == "phoneNo" && value && !phoneNumberRegex.test(value)) {
      errors.phoneNo = "Only ten digits allowed start with(6789)";
    }
    return errors;
  };
  
    let navigate = useNavigate();
     
    const [employeeLogin, setEmployeeLogin] = useState({
      phoneNo: "6895742130",
      password: "123456",
    });
  
    const resetEmployeeDetails = () => {
      let _resetEmployee = {
        phoneNo: "6895742130",
        password: "123456",
      };
      setEmployeeLogin(_resetEmployee);
    };
  
    const handleChangeInput = (e) => {
      let key = e.target.name;
      let value = e.target.value;
      const _currentData = { ...employeeLogin, [key]: value };
      setEmployeeLogin(_currentData);
  
      const _errors = validateOnChange(e.target.name, e.target.value);
  
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
  
    const login = () => {
      const _errors = validate();
      setFormErrors(_errors);
  
      let _requestData = {
        ...employeeLogin,
      };
  
     console.log(_requestData)
      {

        Object.keys(_errors).length == 0
          ? axios
              .post(`http://192.168.1.7/testAPI/api/Chat/verifyLogin`, _requestData,config)
              .then((res) => {
                 //console.log('response',res.data)
                 if (res.data != "Failed") {
                   localStorage.setItem(
                    "user_info",
                     JSON.stringify(res.data)
                   );
                   navigate("/welcomePage",{state:res.data});
                 }
                 if (res.data == "Failed") {
                  alert("Invalid Credantials")
                 }
  
                 resetEmployeeDetails();
                 setFormErrors({});
              })
              .catch((e) => {
                 if (e.res.data.message == "Incorrect Password") {
                {
                   alert("Account Not Found");
                 }
                 setFormErrors({});
                }
              })
          : alert("Please Fill All Details");
      }
    };

  return (
    <>
    <div className="app">
      <div className="register-form">
      <div className="title">Sign In</div>
      <div className="form">
        <div className="input-container">
          <label>Phone Number </label>
          <input required type="text" value={employeeLogin.phoneNo} name="phoneNo" onChange={handleChangeInput} error="!employeeLogin.phoneNo"/>
          <p style={{ marginTop: "1px", color: "red" }}>
                {formErrors.phoneNo}
              </p>
        </div>
        <div className="input-container">
          <label>Password </label>
          <input required type="password" value={employeeLogin.password} name="password" onChange={handleChangeInput} error="!employeeLogin.password"/>
          <p style={{ marginTop: "1px", color: "red" }}>
                {formErrors.password}
              </p>
        </div>
        <div className="button-container" >
         <input type="submit" value="Login" onClick={login} /> 
        </div>
        <div>
        <a  href="" onClick={()=>navigate("/")} >Register User</a> Or <a href='' onClick={()=>navigate("/forgotPass")}>Forgot Password?</a>
        </div>
    </div>
      </div>
      </div>
      </>
  );
}
export default User;
