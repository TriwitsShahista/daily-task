import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate, useLocation} from 'react-router-dom';

function LeadMngTable1(){

  const { state } = useLocation();
  console.log('leadMngTable',state)
 
  const navigate = useNavigate();

  const [id , setid] = useState('');
  const [followUp1 , setfollowUp1] = useState('');
  const [followUp2 , setfollowUp2] = useState('');
  const [followUp3, setfollowUp3] = useState('');

    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept': '*/*',
      },
    };
 
   const [data,setData] = useState([])
   const initializeEvent = () => {
    
    axios
      .get(`http://192.168.0.115/testAPI/api/Chat/fetchLeadMng`)
      .then((res) => {
           console.log(res.data);
           setData(res.data)
           })
      .catch((e) => {});
  };
  useEffect(() => initializeEvent(), []);

  const[editdata,setEditdata]=useState(
    {
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
      followUp1: "",
      followUp2: "",
      followUp3: "",
    }
  );

  const handleChangeInput = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    const _currentData = { ...editdata, [key]: value };
    setEditdata(_currentData);
   
  };

  const editTest=(id)=>{
    console.log('getdata',id)
    setEditdata(id);
    setfollowUp1(id.followUp1)
    setfollowUp2(id.followUp2)
    setfollowUp3(id.followUp3)
      
  }

console.log('eeditsdata',editdata)

const updateData =()=>{
    let _requestData = {
      ...editdata,
  };

  {
    axios.post("http://192.168.0.115/testAPI/api/Chat/updateLeadMng/", _requestData, config)
    .then((res) => {
    console.log(res)
    if (res.status === 200) {
      alert("Successfully updated");
      }  else Promise.reject();
       })
       .catch((err) =>{ alert("Something went wrong")
     })
    }
  }

  const handleEdit = (dataitem) => {
    console.log('item',dataitem)
    navigate("/leadMngUpdate", {
      state:{dataitem,
      }
   }); 
 };
  
 const deleteTest = (id) => {
  axios.delete("http://192.168.0.115/testAPI/api/Chat/deleteLeadMngAdmin/" +id)
  .then((res) => {
  if (res.status === 200) {
    alert("Successfully deleted");
    window.location.reload();
  } else Promise.reject();
  })
    .catch((err) => alert("Something went wrong"));
  };

return (
  <>
  <div>
  <div class='column is-16'>
        <div>
          <h1 class='title'>Lead Management Information For Admin</h1>
        </div>
  <table className="table table-bordered">
  <thead>
      <tr>
          <th id='color'>Id</th>
          <th id='color'>Name</th>
          <th id='color'>Mobile Number</th>
          <th id='color'>Alt Mobile Number</th>
          <th id='color'>Email Id</th>
          <th id='color'>Alt Email Id</th>
          <th id='color' class='wdt'>Purpose</th>
          <th id='color'>Budget</th>
          <th id='color'>Data</th>
          <th id='color'>Time</th>
          <th id='color'>FollowUp1</th>
          <th id='color'>FollowUp2</th>
          <th id='color'>FollowUp3</th>
          <th colSpan="2" id='color'>Action</th>
      </tr>
  </thead>
  <tbody>
      {
          data.map(data => (
                  <tr key={data.id}>
                      <td id='color'>{data.id}</td>
                      <td id='color'>{data.lmname}</td>
                      <td id='color'>{data.mobileNo}</td>
                      <td id='color'>{data.altMobileNo}</td>
                      <td id='color'>{data.email}<a href='https://accounts.google.com/ServiceLogin/signinchooser?service=mail&passive=1209600&osid=1&continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F%3Ftab%3Drm%26ogbl&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F%3Ftab%3Drm%26ogbl&emr=1&ifkv=AWnogHfXFbM2BpUchztIDbFr4EkoImcBQBBaBIh16qScMc8NvFRT9QDzSNzjA66QBkjpRkaZxjtYPw&flowName=GlifWebSignIn&flowEntry=ServiceLogin' type="button" class="fa fa-envelope"/></td>
                      <td id='color'>{data.altEmail}<a href='https://accounts.google.com/ServiceLogin/signinchooser?service=mail&passive=1209600&osid=1&continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F%3Ftab%3Drm%26ogbl&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F%3Ftab%3Drm%26ogbl&emr=1&ifkv=AWnogHfXFbM2BpUchztIDbFr4EkoImcBQBBaBIh16qScMc8NvFRT9QDzSNzjA66QBkjpRkaZxjtYPw&flowName=GlifWebSignIn&flowEntry=ServiceLogin' type="button" class="fa fa-envelope"/></td>
                      <td id='color' class='wdt'>{data.purpose}</td>
                      <td id='color'>{data.budget}</td>
                      <td id='color'>{data.date}</td>
                      <td id='color'>{data.time}</td>
                      <td id='color'>{data.followUp1} <br></br>{data.followUPdate}</td>
                      <td id='color'>{data.followUp2} <br></br>{data.followUPdate}</td>
                      <td id='color'>{data.followUp3} <br></br>{data.followUPdate}</td>
                      <td id='color'><button type="button" value="Update" class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal" onClick={()=>editTest(data)}>FollowUp</button></td>
                      <td id='color'><button type="button" class="btn btn-info btn-sm" data-dismiss="modal" onClick={()=>deleteTest(data.id)}>Delete</button></td>
                  </tr>))
      }
  </tbody>
  </table>
  </div>
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">FollowUp</h4>
          <button type="button" class="btn btn-info btn-sm" data-dismiss="modal" onClick={()=>handleEdit(editdata)}>Edit</button>
        </div>
        <div class="modal-body">
        <div className="input-container">
          <label>FollowUp1 </label>
          <input type="text" value={editdata.followUp1} name="followUp1" onChange={(e)=>{handleChangeInput(e)}} required />
        </div>
        <div className="input-container">
          <label>FollowUp2 </label>
          <input type="text" value={editdata.followUp2} name="followUp2" onChange={(e)=>{handleChangeInput(e)}} required />
        </div>
        <div className="input-container">
          <label>FollowUp3 </label>
          <input type="text" value={editdata.followUp3} name="followUp3" onChange={(e)=>{handleChangeInput(e)}} required />
        </div>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-info btn-sm" data-dismiss="modal" onClick={()=>updateData()}>Update</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  </div>
  </>
);
}
export default LeadMngTable1;