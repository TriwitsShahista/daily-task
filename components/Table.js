import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate, useLocation} from 'react-router-dom';

function Table(){
  const navigate = useNavigate();

  const [data,setData] = useState([])
  const initializeEvent = () => {
  axios.get("http://192.168.0.115/testAPI/api/Chat/fetchTestPrac")
  .then((res) => {
  console.log(res.data);
  setData(res.data)
  })
  };
  useEffect(() => initializeEvent(), []);

  const deleteTest = (id) => {
  axios.delete("http://192.168.0.115/testAPI/api/Chat/deleteTestPrac/" +id)
  .then((res) => {
  if (res.status === 200) {
    alert("Successfully deleted");
    window.location.reload();
  } else Promise.reject();
  })
    .catch((err) => alert("Something went wrong"));
  };
  
  const handleEdit = (item) => {
   // console.log(item)
     navigate("/update", {
       state: {item
       },
     });
  };

return (
  <>
  <div>
  <div class='column is-16'>
        <div>
          <h1 class='title'>Users Information</h1>
        </div>
  <table className="table table-bordered">
  <thead>
      <tr>
          <th id='color'>ID</th>
          <th id='color'>NAME</th>
          <th id='color'>EMAIL ID</th>
          <th id='color'>PHONE NUMBER</th>
          <th id='color'>PASSWORD</th>
          <th id='color'>IMAGE</th> 
          <th id='color'>File1</th>
          <th id='color'>File2</th>
          <th id='color'>File3</th>
          <th id='color'>File4</th>
          <th colSpan="2" id='color'>ACTIONS</th>
      </tr>
  </thead>
  <tbody>
      {
          data.map(data => (
                  <tr key={data.id}>
                      <td id='color'>{data.id}</td>
                      <td id='color'>{data.name}</td>
                      <td id='color'>{data.email}</td>
                      <td id='color'>{data.phoneNo}</td>
                      <td id='color'>{data.password}</td>
                      <td id='color'>{data.image}</td>
                      {/* <td><img  src={`http://192.168.0.115/testAPI/api/Chat/postTestPrac/${data.image}`} width='50px' height='50px' alt={"image"}/></td>  */}
                      <td id='color'>{data.docFile}</td>
                      <td id='color'>{data.docFile1}</td>
                      <td id='color'>{data.docFile2}</td>
                      <td id='color'>{data.docFile3}</td>
                      <td id='color'><input type="submit" value="Edit"  onClick={() => handleEdit(data)}/></td>
                      <td id='color'><input type="submit" value="Delete" onClick={()=>deleteTest(data.id)}/></td>
                  </tr>))
      }
  </tbody>
  </table>
  </div>
  </div>
  </>
);
}
export default Table;