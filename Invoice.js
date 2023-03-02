import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

function Invoice(){
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
    incomeSRC: "",
    paymentModeBy: "",
    amountPaid: "",
    paymentRecievedBy: "",
    gstCal: "",
    gstAmount: "",
  });

  console.log('events',eventDetails)
   const [eventTableDetails, setEventTableDetails] = useState(null);
   const initializeEvent = () => {
    axios
      .get(`http://192.168.1.9/testAPI/api/Chat/getInvoice/${state.item.id}`)
      .then((response) => {
        setEventTableDetails(response.data);
        //console.log(response)
         if (response.data != null) {
           let requestForSet = {
             id: response.data.id,
             incomeSRC: response.data.incomeSRC,
             paymentModeBy: response.data.paymentModeBy,
             amountPaid: response.data.amountPaid,
             paymentRecievedBy: response.data.paymentRecievedBy,
             gstCal: response.data.gstCal,
             gstAmount: response.data.gstAmount,
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
           'incomeSRC':eventDetails.incomeSRC,
           'paymentModeBy':eventDetails.paymentModeBy,
           'amountPaid':eventDetails.amountPaid,
           'paymentRecievedBy':eventDetails.paymentRecievedBy,
           'gstCal':eventDetails.gstCal,
           'gstAmount':eventDetails.gstAmount
        }
  console.log('submitdata',formdata);
  axios.post("http://192.168.1.9/testAPI/api/Chat/updateTestPrac/", formdata, config)
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

<div class="modal fade" id="invoiceIncomeModal" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div>
         <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyAAgjWYTRcQ0TDv2cVGEJ-a7mVghh1u6SqA&usqp=CAU' alt='triwits' height='100px' width='100px' id='invoiceIMG' />
         </div>
        <div id='invoice'>
         INVOICE
         </div>

        <div class="modal-body">
        <a  onClick={() => navigate("/accountsAdmin")} id='invoiceBtn'>Unpaid</a>
            <div id='invoiceBtn'>Invoice No: {state.item.incomeSRC}</div>
            <div id='invoiceTdTr'>Payment given by: {state.item.paymentModeBy} </div>
            <div id='invoiceTdTr'>Payment recieved by: {state.item.paymentRecievedBy} </div>
            <div id='invoiceTdTr'>Amount paid: {state.item.amountPaid} </div>
            <div id='invoiceTdTr'>Tax: {state.item.gstCal}% </div>
            <div id='invoiceTdTr'>Total: {state.item.gstAmount} </div>
        </div>
      </div>
    </div>
  </div>
  
  </>

);
}
export default Invoice;