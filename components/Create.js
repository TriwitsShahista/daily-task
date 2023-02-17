import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';

    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept': '*/*',
      },
    };

const Create = () => {
  //Start of Validation Code

  const [formErrors, setFormErrors] = useState({});

  const validate = () => {
  const errors = {};

    const passwordRegex = /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{7,}$/;
    const phoneNumberRegex = /^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/;
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!employeeDetails.email) {
      errors.email = "Email is required";
    }
    if (employeeDetails.email && !emailRegex.test(employeeDetails.email)) {
      errors.email = "Invalid email";
    }
    if (!employeeDetails.password) {
      errors.password = "Password is required";
    }
    if (employeeDetails.password && !passwordRegex.test(employeeDetails.password)) {
      errors.password = "1Upper, 1Lower, 1Numric and 1Special (8min) characters it contain";
    }
    if (!employeeDetails.name) {
      errors.name = "Name is required";
    }

    if (!employeeDetails.phoneNo) {
      errors.phoneNo = "Phone number is required";
    }
    if (
      employeeDetails.phoneNo &&
      !phoneNumberRegex.test(employeeDetails.phoneNo)
    ) {
      errors.phoneNo = "Only ten digits allowed start with(6789)";
    }

    return errors;
  };

  const validateOnChange = (name, value) => {
    const errors = {};
    const passwordRegex = /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{7,}$/;
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
    if (employeeDetails.password && !passwordRegex.test(employeeDetails.password)) {
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

  //End of Validation Code

  //let Base_URL = env.API_URL;
  //const [file, setFile] = useState();
  const [employeeDetails, setEmployeeDetails] = useState({
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
    setEmployeeDetails(_resetEmployee);
  };

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
  
  const navigate = useNavigate();
  const submitdata = () => {
    // event.preventDefault();
    const _errors = validate();
    setFormErrors(_errors);

    let _requestData = {
      ...employeeDetails,
    };
    //console.log("requested Data", _requestData);
  //   {
  //     Object.keys(_errors).length == 0
  //       ? axios
  //          .post(
  //          "http://192.168.0.115/testAPI/api/Chat/postTestPrac" ,_requestData, config)
  //           .then((res) => {
  //                    console.log(res)
  //                    if (res.status === 200) {
  //                     navigate("/user")
  //                    alert("Successfully registred");
  //                    } setFormErrors({});
  //                    })
  //           .catch((err) =>{ alert("Something went wrong")
  //           setFormErrors({});
  //         })
  //       : alert("Please Fill All Details");
  //   }
  // };
  {

    Object.keys(_errors).length == 0
      ? axios
          .post(`http://192.168.0.115/testAPI/api/Chat/verifyRegister`, _requestData,config)
          .then((res) => {
             //console.log('response',res.data)
             if (res.data != "Failed") {
               localStorage.setItem(
                "user_info",
                 JSON.stringify(res.data)
               );
               alert("Phone number already exist")
             }
             if (res.data == "Failed") {
              axios
           .post(
            "http://192.168.0.115/testAPI/api/Chat/postTestPrac" ,_requestData, config)
             .then((res) => {
                      console.log(res)
                      if (res.status === 200) {
                       navigate("/user")
                      alert("Successfully registred");
                      } setFormErrors({});
                      })
             .catch((err) =>{ alert("Something went wrong")
             setFormErrors({});
           })
             }
             resetEmployeeDetails();
             setFormErrors({});
          })
      : alert("Please Fill All Details");
  }
};

  return (
    <>
    <div className="app">
      <div className="register-form">
      <div className="form">
      <div className="button-container">
         <input type="submit" value="AdminLogin" onClick={()=>navigate("/admin")} /> 
        </div>
        <div className="input-container">
          <label>Full Name </label>
          <input required type="text" value={employeeDetails.name} name="name" onChange={handleChangeInput} error="!employeeDetails.name"/>
          <p style={{ marginTop: "1px", color: "red" }}>
                {formErrors.name}
              </p>
        </div>
        <div className="input-container">
          <label>Email ID </label>
          <input required type="text" value={employeeDetails.email} name="email" onChange={handleChangeInput} error="!employeeDetails.email"/>
          <p style={{ marginTop: "1px", color: "red" }}>
                {formErrors.email}
              </p>
        </div>
        <div className="input-container">
          <label>Phone Number </label>
          <input required type="text" value={employeeDetails.phoneNo} name="phoneNo" onChange={handleChangeInput} error="!employeeDetails.phoneNo"/>
          <p style={{ marginTop: "1px", color: "red" }}>
                {formErrors.phoneNo}
              </p>
        </div>
        <div className="input-container">
          <label>Password </label>
          <input required type="text" value={employeeDetails.password} name="password" onChange={handleChangeInput} error="!employeeDetails.password"/>
          <p style={{ marginTop: "1px", color: "red" }}>
                {formErrors.password}
              </p>
        </div>
        {/* <div className="input-container">
          <label>Image </label>
          <input type="file" name="image"  onChange={handleChangeInput} id="image"/>
          <img src={file} id="file"/>
          <p style={{ marginTop: "1px", color: "red" }}>
                {formErrors.image}
              </p>
        </div> */}
        <div className="button-container">
         <input type="submit" value="Submit" onClick={submitdata} /> 
        </div>
        <div>
         <a  href="" onClick={()=>navigate("/user")} >SignIn User</a>
         </div>
    </div>
      </div>
      </div>
      </>
  );
}
export default Create;
