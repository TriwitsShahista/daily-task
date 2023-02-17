import React, {useState} from 'react';
import axios from "axios";
import {useNavigate, useLocation} from 'react-router-dom';

function LeadMngCreate (){
// const { state } = useLocation();
// console.log('leadMngCreate',state)
const { state } = useLocation();
console.log('profile',state)
 
// console.log('followUp',state)
    const [formErrors, setFormErrors] = useState({});

  const validate = () => {
    const errors = {};
    const numricalValue =  /^[0-9]+$/;
    const phoneNumberRegex = /^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/;
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!employeeDetails.email) {
      errors.email = "Email is required";
    }
    if (employeeDetails.email && !emailRegex.test(employeeDetails.email)) {
        errors.email = "Invalid email";
    }
    if (employeeDetails.altEmail && !emailRegex.test(employeeDetails.altEmail)) {
      errors.altEmail = "Invalid email";
    }
    if (!employeeDetails.lmname) {
        errors.lmname = "Name is required";
    }
    if (employeeDetails.budget &&!numricalValue.test(employeeDetails.budget)) {
        errors.budget = "Only numrical values allowed";
    }
    if (!employeeDetails.purpose) {
      errors.purpose = "This field is required";
    }
    if (!employeeDetails.mobileNo) {
      errors.mobileNo = "Mobile number is required";
    }
    if (employeeDetails.mobileNo &&!phoneNumberRegex.test(employeeDetails.mobileNo)) {
      errors.	mobileNo = "Only ten digits allowed start with(6789)";
    }
    if (employeeDetails.altMobileNo &&!phoneNumberRegex.test(employeeDetails.altMobileNo)) {
      errors.altMobileNo = "Only ten digits allowed start with(6789)";
    }
    if (!employeeDetails.date) {
        errors.date = "Date is required";
    }
      if (!employeeDetails.time) {
        errors.time = "Time is required";
    }

    return errors;
  };

  const validateOnChange = (name, value) => {
    const errors = {};
    const numricalValue =  /^[0-9]+$/;
    const phoneNumberRegex = /^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/;
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name == "email" && !value) {
      errors.email = "Email is required";
    }
    if (name == "email" && value && !emailRegex.test(value)) {
      errors.email = "Invalid email";
    }
    if (name == "altEmail" && value && !emailRegex.test(value)) {
        errors.altEmail = "Invalid email";
    }    
    if (name == "lmname" && !value) {
      errors.lmname = "Name is required";
    }
    if (name == "budget" && value && !numricalValue.test(value)) {
        errors.budget = "Only numrical values allowed";
    }
    if (name == "purpose" && !value) {
        errors.purpose = "This field is required";
      }
    if (name == "mobileNo" && !value) {
      errors.mobileNo = "Mobile number is required";
    }
    if (name == "mobileNo" && value && !phoneNumberRegex.test(value)) {
      errors.mobileNo = "Only ten digits allowed start with(6789)";
    }
    if (name == "altMobileNo" && value && !phoneNumberRegex.test(value)) {
      errors.altMobileNo = "Only ten digits allowed start with(6789)";
    }
    if (name == "date" && !value) {
        errors.date = "Date is required";
    }
      if (name == "time" && !value) {
        errors.time = "Time is required";
    }
    return errors;
  };
    const [employeeDetails, setEmployeeDetails] = useState({
        lmname: "",
        mobileNo: "",
        altMobileNo: "",
        email: "",
        altEmail: "",
        purpose: "",
        budget: "",
        date: "",
        time: "",
      });
    
      const resetEmployeeDetails = () => {
        let _resetEmployee = {
            lmname: "",
            mobileNo: "",
            altMobileNo: "",
            email: "",
            altEmail: "",
            purpose: "",
            budget: "",
            date: "",
            time: "",
        };
        setEmployeeDetails(_resetEmployee);
      };

    const navigate = useNavigate();

    const handleChangeInput = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    const _currentData = { ...employeeDetails, [key]: value };
    setEmployeeDetails(_currentData);
    const _errors = validateOnChange(e.target.name, e.target.value);
    // console.log(e.target.files);
    // setFile(URL.createObjectURL(e.target.files[0]));

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

    var config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': '*/*',
        },
    };
      
    const submitdata = () => {
      // event.preventDefault();
      const _errors = validate();
      setFormErrors(_errors);
  
      let _requestData = {
        ...employeeDetails,
      };
      //console.log("requested Data", _requestData);
      {
        Object.keys(_errors).length == 0
          ? axios
             .post(
             "http://192.168.0.115/testAPI/api/Chat/postLeadMng" ,_requestData, config)
              .then((res) => {
                       console.log(res.data)
                       if (res.status === 200) {
                       alert("Successfully registred");
                       } setFormErrors({});
                       console.log("/leadMngTable",{dataMng:res.data})
                       })
              .catch((err) =>{ alert("Something went wrong")
              setFormErrors({});
            })
          : alert("Please Fill All Details");
      }
    };

    return(
        <>
    <div className="app">
      <div className="register-form">
      <div className="form">
        <div className="input-container1">
          <label>Name </label>
          <input required type="text" value={employeeDetails.lmname} name="lmname" onChange={handleChangeInput} error="!employeeDetails.lmname"/>
          <p style={{ marginTop: "1px", color: "red" }}>{formErrors.lmname}</p>
          </div>
          <div className="input-container1">
          <label>Mobile Number </label>
          <input required type="text" value={employeeDetails.mobileNo} name="mobileNo" onChange={handleChangeInput} error="!employeeDetails.mobileNo"/>
          <p style={{ marginTop: "1px", color: "red" }}>{formErrors.mobileNo}</p>
          <label>Alt Mobile Number </label>
          <input required type="text" value={employeeDetails.altMobileNo} name="altMobileNo" onChange={handleChangeInput} error="!employeeDetails.altMobileNo"/>
          <p style={{ marginTop: "1px", color: "red" }}>{formErrors.altMobileNo}</p>
          </div>
          <div className="input-container1">
          <label>Email Id </label>
          <input required type="text" value={employeeDetails.email} name="email" onChange={handleChangeInput} error="!employeeDetails.email"/>
          <p style={{ marginTop: "1px", color: "red" }}>{formErrors.email}</p>
          <label>Alt Email Id </label>
          <input required type="text" value={employeeDetails.altEmail} name="altEmail" onChange={handleChangeInput} error="!employeeDetails.altEmail"/>
          <p style={{ marginTop: "1px", color: "red" }}>{formErrors.altEmail}</p>
          </div>
          <div className="input-container1">
          <label>Purpose </label>
          <textarea  required type="text" value={employeeDetails.purpose} name="purpose" onChange={handleChangeInput} error="!employeeDetails.purpose"/>
          <p style={{ marginTop: "1px", color: "red" }}>{formErrors.purpose}</p>
          <label>Budget </label>
          <input required type="text" value={employeeDetails.budget} name="budget" onChange={handleChangeInput} error="!employeeDetails.budget"/>
          <p style={{ marginTop: "1px", color: "red" }}>{formErrors.budget}</p>
          </div>
          <div className="input-container1">
          <label>Date </label>
          <input  required type="date" value={employeeDetails.date} name="date" onChange={handleChangeInput} error="!employeeDetails.date"/>
          <p style={{ marginTop: "1px", color: "red" }}>{formErrors.date}</p>
          <label>Time </label>
          <input required type="time" value={employeeDetails.time} name="time" onChange={handleChangeInput} error="!employeeDetails.time"/>
          <p style={{ marginTop: "1px", color: "red" }}>{formErrors.time}</p>
          </div>
          <div className="input-container1">
          <label>User phoneNo </label>
          <input required type="text" value={employeeDetails.phoneNo} name="phoneNo" onChange={handleChangeInput} error="!employeeDetails.phoneNo"/>
          <p style={{ marginTop: "1px", color: "red" }}>{formErrors.phoneNo}</p>
          </div>
        <div className="button-container">
         <input type="submit" value="Submit" onClick={submitdata}/> 
        </div>
         {/* <div>
          <a href='' onClick={()=>navigate("/followUp")}>FollowUp</a>
         </div> */}
    </div>
      </div>
      </div>
      </>
    );
}
export default LeadMngCreate;