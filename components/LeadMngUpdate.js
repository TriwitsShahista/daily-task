import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

function LeadMngUpdate(){
const { state} = useLocation(); 
//console.log('submitdata',state.data);
console.log(state.dataitem)
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
    lmname: "",
    mobileNo: "",
    altMobileNo: "",
    email: "",
    altEmail: "",
    purpose: "",
    budget: "",
    date: "",
    time: "",
    phoneNo: "",
    followUp1: "",
    followUp2: "",
    followUp3: "",
  });

  //console.log('events',eventDetails)
   const [eventTableDetails, setEventTableDetails] = useState(null);
   const initializeEvent = () => {
    axios
      .get(`http://192.168.0.115/testAPI/api/Chat/getLeadMngId/${state.dataitem.id}`)
      .then((response) => {
        setEventTableDetails(response.data);
        console.log(response)
         if (response.data != null) {
           let requestForSet = {
             id: response.data.id,
             lmname: response.data.lmname,
             mobileNo: response.data.mobileNo,
             altMobileNo: response.data.altMobileNo,
             email: response.data.email,
             altEmail: response.data.altEmail,
             purpose: response.data.purpose,
             budget: response.data.budget,
             date: response.data.date,
             time: response.data.time,
             phoneNo: response.data.phoneNo,
             followUp1: response.data.followUp1,
             followUp2: response.data.followUp2,
             followUp3: response.data.followUp3,
           };
           setEventDetails(requestForSet);
         }
      })
      .catch((e) => {});
  };
  
  useEffect(() => initializeEvent(), []);
 // console.log('response',eventTableDetails)

  const updateData =()=>{
        let formdata = {
           'id':eventDetails.id,
           'lmname':eventDetails.lmname,
           'mobileNo':eventDetails.mobileNo,
           'altMobileNo':eventDetails.altMobileNo,
           'email':eventDetails.email,
           'altEmail':eventDetails.altEmail,
           'purpose':eventDetails.purpose,
           'budget':eventDetails.budget,
           'date':eventDetails.date,
           'time':eventDetails.time,
           'phoneNo':eventDetails.phoneNo,
           'followUp1':eventDetails.followUp1,
           'followUp2':eventDetails.followUp2,
           'followUp3':eventDetails.followUp3,
        }
  //console.log('submitdata',formdata);
  axios.post("http://192.168.0.115/testAPI/api/Chat/updateLeadMng/", formdata, config)
  .then((res) => {
  console.log(res)
  if (res.status === 200) {
    alert("Successfully updated");
   // navigate("/leadMngTable")
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
         <div className="input-container1">
          <label>Name </label>
           <input required readOnly type="text" value={eventDetails.lmname} name="lmname" onChange={handleChangeInput}/>
           </div>
           <div className="input-container1">
           <label>Mobile Number </label>
           <input required readOnly type="text" value={eventDetails.mobileNo} name="mobileNo" onChange={handleChangeInput}/>
           <label>Alt Mobile Number </label>
           <input required type="text" value={eventDetails.altMobileNo} name="altMobileNo" onChange={handleChangeInput}/>
           </div>
           <div className="input-container1">
           <label>Email Id </label>
           <input required readOnly type="text" value={eventDetails.email} name="email" onChange={handleChangeInput}/>
           <label>Alt Email Id </label>
           <input required type="text" value={eventDetails.altEmail} name="altEmail" onChange={handleChangeInput}/>
          </div>
           <div className="input-container1">
           <label>Purpose </label>
           <textarea  required readOnly type="text" value={eventDetails.purpose} name="purpose" onChange={handleChangeInput}/>
           <label>Budget </label>
           <input required readOnly type="text" value={eventDetails.budget} name="budget" onChange={handleChangeInput}/>
           </div>
           <div className="input-container1">
           <label>Date </label>
           <input  required readOnly type="date" value={eventDetails.date} name="date" onChange={handleChangeInput}/>
           <label>Time </label>
           <input required readOnly type="time" value={eventDetails.time} name="time" onChange={handleChangeInput}/>
           </div>
           <div className="input-container1">
           <label>User phoneNo </label>
           <input required readOnly type="text" value={eventDetails.phoneNo} name="phoneNo" onChange={handleChangeInput}/>
           </div>
         <div className="button-container">
          <input type="submit" value="Submit" onClick={()=>updateData()} /> 
         </div>
     </div>
       </div>
       </div>  
  </>
);
}
export default LeadMngUpdate;