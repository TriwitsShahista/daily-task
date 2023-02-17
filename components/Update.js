import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
function Update(){
const { state } = useLocation();
 
console.log('data status',state.item)
  const navigate = useNavigate();

  var config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'accept': '*/*',
    },
  };
  
    const handleChangeInput = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    const _currentData = { ...eventDetails, [key]: value };
    setEventDetails(_currentData);
    
  };

   const [eventDetails, setEventDetails] = useState({
    id: "",
    name: "",
    email: "",
    phoneNo: "",
    password: "",
    image: "",
  });

  console.log('events',eventDetails)
   const [eventTableDetails, setEventTableDetails] = useState(null);
   const initializeEvent = () => {
    axios
      .get(`http://192.168.0.115/testAPI/api/Chat/getTestPrac/${state.item.id}`)
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
        let formdata = {
           'id':eventDetails.id,
           'name':eventDetails.name,
           'email':eventDetails.email,
           'phoneNo':eventDetails.phoneNo,
           'password':eventDetails.password,
           'image':eventDetails.image
        }
  console.log('submitdata',formdata);
  axios.post("http://192.168.0.115/testAPI/api/Chat/updateTestPrac/", formdata, config)
  .then((res) => {
  console.log(res)
  if (res.status === 200) {
    alert("Successfully updated");
    } else Promise.reject();
     })
  .catch((err) => alert("Something went wrong"));
    console.log(formdata)
    }

return(
<>
    <div className="app">
      <div className="register-form">
      <div className="form">
        <div className="input-container">
          <label>Full Name </label>
          <input type="text"  value={eventDetails.name} name="name" onChange={handleChangeInput} required />
        </div>
        <div className="input-container">
          <label>Email ID </label>
          <input type="text" value={eventDetails.email} name="email" onChange={handleChangeInput} required />
        </div>
        <div className="input-container">
          <label>Phone Number </label>
          <input readOnly type="text" value={eventDetails.phoneNo} name="phoneNo" onChange={handleChangeInput} required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" value={eventDetails.password} name="password" onChange={handleChangeInput} required />
        </div>
         <div className="button-container" onClick={()=>navigate("/table")}> 
           <input type="submit" value="Update" onClick={()=>updateData()} />   
        </div>
    </div>
      </div>
      </div>  
  </>

);
}
export default Update;