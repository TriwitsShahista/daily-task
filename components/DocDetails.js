import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

function DocDetails(){
    // const[card1 , setCard1] = useState('');
    // const[file1 , setFile] = useState('');
    const { state } = useLocation();
 
    console.log('profile',state)
    const navigate = useNavigate();
  var config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'accept': '*/*',
    },
  };

  const [file, setFile] = useState();
  const [eventDetails, setEventDetails] = useState({
    id: "",
    name: "",
    email: "",
    phoneNo: "",
    password: "",
    image: "",
    docFile:"",
    docFile1: "",
    docFile2: "",
    docFile3: "",
  });

  const resetEmployeeDetails = () => {
    let _resetEmployee = {
      name: "",
      email: "",
      phoneNo: "",
      password: "",
      image: "",
      docFile: "",
      docFile1: "",
      docFile2: "",
      docFile3: "",
    };
    setEventDetails(_resetEmployee);
  };

  const handleChangeInput = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    const _currentData = { ...eventDetails, [key]: value };
    setEventDetails(_currentData);
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));  
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
             docFile: response.data.docFile,
             docFile1: response.data.docFile1,
             docFile2: response.data.docFile2,
             docFile3: response.data.docFile3,
           };
           setEventDetails(requestForSet);
         }
      })
      .catch((e) => {});
  };
  useEffect(() => initializeEvent(), []);
  console.log('response',eventTableDetails)

  const uploadData =()=>{
    let _requestData = {
      ...eventDetails,
    };

  {
  axios.post("http://192.168.0.115/testAPI/api/Chat/updateTestPrac/", _requestData, config)
  .then((res) => {
  console.log(res)
  if (res.status === 200) {
    alert("Files uploaded successfully");
    navigate("/user")
    }  else Promise.reject();
     })
     .catch((err) =>{ alert("Something went wrong")
   })
  }
}
    return(
        <>
        <div>
        <input required type='text'/>   <input type="file" name="docFile" onChange={handleChangeInput} />
        </div>
        <div>
        <input required type='text'/>   <input type="file" name="docFile1" onChange={handleChangeInput} />
        </div>
        <div>
        <input required type='text'/>   <input type="file" name="docFile2" onChange={handleChangeInput} />
        </div>
        <div>
        <input required type='text'/>   <input type="file" name="docFile3" onChange={handleChangeInput} />
        </div>
        <div>
        <input type="submit" value="Upload" onClick={()=>uploadData()}/> 
        </div>
        </>
    );
}
export default DocDetails;