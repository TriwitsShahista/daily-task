import React, {useEffect,useState} from 'react';
import axios from "axios";
import {Link, useLocation, useParams,useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function WelcomePage() {
  const { state } = useLocation();
  console.log('statedata',state)
  const logout=()=>{
  axios.post("http://192.168.1.7/testAPI/api/Chat/logOut")
  .then(res => {
    console.log(res.data);
  })
  .catch(err => {
     console.log(err);
   });
  }
  
  let navigate = useNavigate();

  const [eventDetails, setEventDetails] = useState({
    name: "",
  });
  console.log('events',eventDetails)
   const [eventTableDetails, setEventTableDetails] = useState(null);
   const initializeEvent = () => {
    axios
      .get(`http://192.168.1.7/testAPI/api/Chat/getProfile/${state.phoneNo}`)
      .then((response) => {
        setEventTableDetails({name:response.data});
        //console.log(response)
         if (response.data != null) {
           let requestForSet = {
             name: response.data.name,
           };
           setEventDetails(requestForSet);
         }
      })
      .catch((e) => {});
  };
  useEffect(() => initializeEvent(), []);
  console.log('response',eventTableDetails)

   //const notify = () => toast("Wow so easy!");
   const [data,setData] = useState([])
    
    const notify = () => {
      axios.get(`http://192.168.1.7/testAPI/api/Chat/getLeadMng/${state.phoneNo}`)
      .then((res) => {
      //console.log(res.data);
      setData(res.data)
      })
      }
  //     useEffect(() => notify(), []);

  
  const [style, setStyle] = useState('buttoni');
    const changeStyle = () => {
      console.log("you just clicked");
    
      setStyle("cont2");
    };
  
   
    return(
    <>
    <div>
    <div id="prf">
      <div>
    <a onClick={()=>notify()} data-toggle="modal" data-target="#myModal" ><span onClick={changeStyle} className={style}><i className="fa fa-bell" id='bell'></i></span></a>
    </div>
    <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-body">
      {
          data.map(data => (
                  <tr key={data.id}>
                    {data.lmname}:
                     {data.followUp1}<br></br>
                     {data.followUp2}<br></br>
                     {data.followUp3}<br></br>
                     </tr>))
      }
        </div>
      </div>
    </div>
  </div>
    </div>
    <div onClick={()=>navigate("/user")} id="prf">
    <input type="submit" value="LogOut"  onClick={logout} /> 
    </div>
    <div onClick={()=>navigate("/chatPage")} id="prf">
    <input type="submit" value="Chat"/> 
    </div>
    <div onClick={() => navigate("/profile",{state:state})} id="prf">
    <input type="submit" value="View Profile"/>                             
    </div>
    <div onClick={() => navigate("/leadMngTable",{state:state})} id="prf">
    <input type="submit" value="View LeadMng"/>                             
    </div>
    <div onClick={() => navigate("/leadMngCreate",{state:state})} id="prf">
    <input type="submit" value="Lead Management"/>                             
    </div>
    <h1> Welcome {eventDetails.name} <i className="fa fa-smile-o" ></i></h1>
    </div>   
  </>
  );

}
export default WelcomePage;