import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const ForgotPass = () => {
    // const[phoneNo, setphoneNo] = useState('');
    var config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': '*/*',
        },
      };

      const [formErrors, setFormErrors] = useState({});

      const validate = () => {
          const errors = {};
      
          const phoneNumberRegex = /^[0-9]+$/;
      
          if (!employeeLogin.phoneNo) {
            errors.phoneNo = "Phone number is required";
          }
          if (
            employeeLogin.phoneNo &&
            !phoneNumberRegex.test(employeeLogin.phoneNo)
          ) {
            errors.phoneNo = "Only digits allowed";
          }
      
          return errors;
        };

        const validateOnChange = (name, value) => {
          const errors = {};
          const phoneNumberRegex = /^[0-9]+$/;
      
          if (name == "phoneNo" && !value) {
            errors.phoneNo = "Phone number is required";
          }
          if (name == "phoneNo" && value && !phoneNumberRegex.test(value)) {
            errors.phoneNo = "Only digits allowed";
          }
          return errors;
        };

    let navigate = useNavigate();

    const [employeeLogin, setEmployeeLogin] = useState({
      phoneNo: "6895742130",
    });
  
    const resetEmployeeDetails = () => {
      let _resetEmployee = {
        phoneNo: "6895742130",
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

    const forgotPass = () => {
      const _errors = validate();
      setFormErrors(_errors);
  
      let _requestData = {
        ...employeeLogin,
      };
  
     console.log(_requestData)
      {

        Object.keys(_errors).length == 0
          ? axios
              .post(`http://192.168.0.115/testAPI/api/Chat/resetLink`, _requestData,config)
              .then((res) => {
                 console.log('response',res.data)
                 if (res.data != "Failed") {
                   localStorage.setItem(
                    "user_info",
                     JSON.stringify(res.data)
                   );
                   navigate("/resetPass",{state:res.data});
                 }
                 if (res.data == "Failed") {
                  alert("Invalid Phone Number")
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

    return(
        <>
        <div className="app">
        <div className="register-form">
        <div className="title">Forgot Password</div>
        <div className="form">
        <div className="input-container">
          <label>Phone Number </label>
          <input required type="text" value={employeeLogin.phoneNo} name="phoneNo" onChange={handleChangeInput} error="!employeeLogin.phoneNo"/>
          <p style={{ marginTop: "1px", color: "red" }}>
                {formErrors.phoneNo}
              </p>
        </div>
        <div className="button-container">
         <input type="submit" value="Send Reset Form" onClick={forgotPass} /> 
        </div>
        </div>
        </div>
        </div>
        </>
    );
}
export default ForgotPass;