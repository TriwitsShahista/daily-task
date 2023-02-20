import {BrowserRouter,Routes,Route} from "react-router-dom";
//import {BrowserRouter as BrowserRouter, Router, Routes, Route, Switch, Link} from "react-router-dom";
import './App.css';
import Table from "./components/Table";
import Create from "./components/Create";
import Update from "./components/Update";
import Admin from "./components/Admin";
import User from "./components/User";
import WelcomePage from "./components/WelcomePage";
import Profile from "./components/Profile";
import ForgotPass from "./components/ForgotPass";
import ResetPass from "./components/ResetPass";
import DocDetails from "./components/DocDetails";
import LeadMngCreate from "./components/LeadMngCreate";
import LeadMngTable from "./components/LeadMngTable";
import LeadMngTable1 from "./components/LeadMngTable1";
import AdminPage from "./components/AdminPage";
import LeadMngUpdate from "./components/LeadMngUpdate";
import ChatPage from "./components/ChatPage";
import AccountsAdmin from "./components/AccountsAdmin";
 function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Create/>}/>
      <Route exact path="/table" element={<Table/>}/>
      <Route exact path={"/update"} element={<Update/>}/> 
      <Route exact path={"/admin"} element={<Admin/>}/>
      <Route exact path={"/user"} element={<User/>}/>
      <Route exact path={"/welcomePage"} element={<WelcomePage/>}/>
      <Route exact path={"/profile"} element={<Profile/>}/>
      <Route exact path={"/forgotPass"} element={<ForgotPass/>}/>
      <Route exact path={"/resetPass"} element={<ResetPass/>}/>
      <Route exact path={"/docDetails"} element={<DocDetails/>}/>
      <Route exact path={"/leadMngCreate"} element={<LeadMngCreate/>}/>
      <Route exact path={"/leadMngTable"} element={<LeadMngTable/>}/>
      <Route exact path={"/leadMngTable1"} element={<LeadMngTable1/>}/>
      <Route exact path={"/adminPage"} element={<AdminPage/>}/>
      <Route exact path={"/leadMngUpdate"} element={<LeadMngUpdate/>}/>
      <Route exact path={"/chatPage"} element={<ChatPage/>}/>
      <Route exact path={"/accountsAdmin"} element={<AccountsAdmin/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}
export default App;




// import React, {useState} from 'react';
// import axios from "axios";
// import {useNavigate} from 'react-router-dom';

// const AccountsAdmin = () => {

//     const [formErrors, setFormErrors] = useState({});

//       const validate = () => {
//       const errors = {};
//       const numricalValue =  /^[0-9]+$/;
//       if (employeeDetails.incomeSRC &&!numricalValue.test(employeeDetails.incomeSRC)) {
//         errors.incomeSRC = "Only numrical values allowed";
//       }
//       if (!employeeDetails.paymentModeBy) {
//         errors.paymentModeBy = "This field is required";
//       }
//       if (!employeeDetails.amountPaid) {
//         errors.amountPaid = "This field is required";
//       }
//       if (employeeDetails.amountPaid &&!numricalValue.test(employeeDetails.amountPaid)) {
//         errors.amountPaid = "Only numrical values allowed";
//       }
//       if (!employeeDetails.paymentRecievedBy) {
//         errors.paymentRecievedBy = "This field is required";
//       }
//       if (!employeeDetails.paymentMode) {
//         errors.paymentMode = "This field is required";
//       }
//       return errors;
//     };

//     const validateOnChange = (name, value) => {
//         const errors = {};
//         const numricalValue =  /^[0-9]+$/;
//         if (name == "incomeSRC" && value && !numricalValue.test(value)) {
//             errors.incomeSRC = "Only numrical values allowed";
//         }
//         if (name == "paymentModeBy" && !value) {
//             errors.paymentModeBy = "This field is required";
//         }
//         if (name == "amountPaid" && !value) {
//           errors.amountPaid = "This field is required";
//         }
//         if (name == "amountPaid" && value && !numricalValue.test(value)) {
//           errors.amountPaid = "Only numrical values allowed";
//         }
//         if (name == "paymentRecievedBy" && !value) {
//             errors.paymentRecievedBy = "This field is required";
//         }
//           if (name == "paymentMode" && !value) {
//             errors.paymentMode = "This field is required";
//         }
//         return errors;
//     };

//       const [file, setFile] = useState();
//       const [employeeDetails, setEmployeeDetails] = useState({
//         incomeSRC: "",
//         paymentModeBy: "",
//         amountPaid: "",
//         paymentRecievedBy: "",
//         paymentMode: "",
//         narration: "",
//         supportDoc: "",
//     });
    
//       const resetEmployeeDetails = () => {
//         let _resetEmployee = {
//         incomeSRC: "",
//         paymentModeBy: "",
//         amountPaid: "",
//         paymentRecievedBy: "",
//         paymentMode: "",
//         narration: "",
//         supportDoc: "",
//         };
//         setEmployeeDetails(_resetEmployee);
//     };

//     const navigate = useNavigate();

//     const handleChangeInput = (e) => {
//         let key = e.target.name;
//         let value = e.target.value;
//         const _currentData = { ...employeeDetails, [key]: value };
//         setEmployeeDetails(_currentData);
//         const _errors = validateOnChange(e.target.name, e.target.value);
//          console.log(e.target.files);
//          setFile(URL.createObjectURL(e.target.files[0]));
    
//         if (Object.keys(_errors).length != 0) {
//           let finalErrors = {
//             ...formErrors,
//             [key]: _errors[key],
//           };
//           setFormErrors(finalErrors);
//         } else {
//           let finalErrors = {
//             ...formErrors,
//             [key]: _errors[key],
//           };
//           setFormErrors(finalErrors);
//         }
//     };

//     var config = {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'accept': '*/*',
//         },
//     };
    
//     const submitdata = () => {
//         const _errors = validate();
//         setFormErrors(_errors);
    
//         let _requestData = {
//           ...employeeDetails,
//         };
//         {
//           Object.keys(_errors).length == 0
//             ? axios.post("http://192.168.1.10/testAPI/api/Chat/postAcc" ,_requestData, config)
//                 .then((res) => {
//                          console.log(res.data)
//                          if (res.status === 200) {
//                          alert("Successfully registred");
//                          } setFormErrors({});
//                          //console.log("/leadMngTable",{dataMng:res.data})
//                          })
//                 .catch((err) =>{ alert("Something went wrong")
//                 setFormErrors({});
//               })
//             : alert("Please Fill All Details");
//         }
//     };
//     return(
//     <>
//    <button type="button" value="Income" class="btn btn-info btn-sm, btn1" data-toggle="modal" data-target="#incomeModal">Income</button>
//    <button type="button" value="Outgoing" class="btn btn-info btn-sm, btn1" data-toggle="modal" data-target="#incomeModal">Outgoing</button>
//    <button type="button" value="GST" class="btn btn-info btn-sm, btn1" data-toggle="modal" data-target="#incomeModal">GST</button>
//    <button type="button" value="Total" class="btn btn-info btn-sm, btn1" data-toggle="modal" data-target="#incomeModal">Total</button>
//    <button type="button" value="P&L" class="btn btn-info btn-sm, btn1" data-toggle="modal" data-target="#incomeModal">P&L</button>
//    <button type="button" value="Invoice" class="btn btn-info btn-sm, btn1" data-toggle="modal" data-target="#incomeModal">Invoice</button>
//    <button type="button" value="ViewAcc" class="btn btn-info btn-sm, btn1" data-toggle="modal" data-target="#incomeModal">View Account</button>
//    <div class="modal fade" id="incomeModal" role="dialog">
//     <div class="modal-dialog modal-sm">
//       <div class="modal-content">
//         <div class="modal-header">
//           <button type="button" class="close" data-dismiss="modal">&times;</button>
//           <h4 class="modal-title">Income</h4>
//         </div>
//         <div class="modal-body">
//         <div className='input-container1'>
//           <label>Income Source</label>
//           <input type="text" name="incomeSRC" value={employeeDetails.incomeSRC} placeholder='Income source' onChange={handleChangeInput} error="!employeeDetails.incomeSRC"/>
//           <p style={{ marginTop: "1px", color: "red" }}>{formErrors.incomeSRC}</p>
//           <label>Payment-mode by*</label>
//           <input type="text" name="paymentModeBy" value={employeeDetails.paymentModeBy} placeholder='Payment-mode by' onChange={handleChangeInput} error="!employeeDetails.paymentModeBy" required/>
//           <p style={{ marginTop: "1px", color: "red" }}>{formErrors.paymentModeBy}</p>
//           <label>Amount paid*</label>
//           <input type="text" name="amountPaid" value={employeeDetails.amountPaid} placeholder='Amount paid' onChange={handleChangeInput} error="!employeeDetails.amountPaid" required/>
//           <p style={{ marginTop: "1px", color: "red" }}>{formErrors.amountPaid}</p>
//           <label>Payment-recieved*</label>
//           <input type="text" name="paymentRecievedBy" value={employeeDetails.paymentRecievedBy} placeholder='Payment-recieved' error="!employeeDetails.paymentRecievedBy" onChange={handleChangeInput} required/>
//           <p style={{ marginTop: "1px", color: "red" }}>{formErrors.paymentRecievedBy}</p>
//           <label>Payment-mode*</label>
//           <select name="paymentMode" value={employeeDetails.paymentMode} onChange={handleChangeInput} error="!employeeDetails.paymentMode" required>
//           <option value="" size={10}>Select</option><br />
//           <option value="Cash">Cash</option>
//           <option value="Cheque">Cheque</option>
//           <option value="NEFT">NEFT</option>
//           <option value="UPI">UPI</option>
//           <option value="Other">Other</option>
//           </select>
//           <label>Narration-No.</label>
//           <input type="text" name="narration" value={employeeDetails.narration} onChange={handleChangeInput} error="!employeeDetails.narration" placeholder='Cheque/UTR number'/>
//           <label>Support-Documents</label>
//           <input type="file" name="supportDoc"  value={employeeDetails.supportDoc}onChange={handleChangeInput} error="!employeeDetails.supportDoc" placeholder='Support-Doc' class="accfile"/>
//           </div>
//         </div>
//         <div class="modal-footer">
//         <button type="button" class="btn btn-info btn-sm" data-dismiss="modal" onClick={submitdata}>Submit</button>
//           <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>
//         </div>
//       </div>
//     </div>
//   </div>
//     </>
//     )
// }
// export default AccountsAdmin;