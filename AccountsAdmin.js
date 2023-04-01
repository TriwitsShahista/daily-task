import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const AccountsAdmin = () => {
    const [formErrors, setFormErrors] = useState({});

      const validate = () => {
      const errors = {};
      const numricalValue =  /^[0-9]+$/;
      if (employeeDetails.incomeSRC &&!numricalValue.test(employeeDetails.incomeSRC)) {
        errors.incomeSRC = "Only numrical values allowed";
      }
      if (!employeeDetails.paymentModeBy) {
        errors.paymentModeBy = "This field is required";
      }
      if (!employeeDetails.amountPaid) {
        errors.amountPaid = "This field is required";
      }
      if (employeeDetails.amountPaid &&!numricalValue.test(employeeDetails.amountPaid)) {
        errors.amountPaid = "Only numrical values allowed";
      }
      if (!employeeDetails.paymentRecievedBy) {
        errors.paymentRecievedBy = "This field is required";
      }
      if (!employeeDetails.gstCal) {
        errors.gstCal = "This field is required";
      }
      if (!employeeDetails.paymentMode) {
        errors.paymentMode = "This field is required";
      }
      return errors;
    };

    const validateOnChange = (name, value) => {
        const errors = {};
        const numricalValue =  /^[0-9]+$/;
        if (name == "incomeSRC" && value && !numricalValue.test(value)) {
            errors.incomeSRC = "Only numrical values allowed";
        }
        if (name == "paymentModeBy" && !value) {
            errors.paymentModeBy = "This field is required";
        }
        if (name == "amountPaid" && !value) {
          errors.amountPaid = "This field is required";
        }
        if (name == "amountPaid" && value && !numricalValue.test(value)) {
          errors.amountPaid = "Only numrical values allowed";
        }
        if (name == "paymentRecievedBy" && !value) {
            errors.paymentRecievedBy = "This field is required";
        }
        if (name == "gstCal" && !value) {
          errors.gstCal = "This field is required";
        }
          if (name == "paymentMode" && !value) {
            errors.paymentMode = "This field is required";
        }
        return errors;
    };
    const [date,setDate] = useState([])
    const [toDate,settoData] = useState([])
     // const [file, setFile] = useState();
      const [employeeDetails, setEmployeeDetails] = useState({
        incomeSRC: "",
        paymentModeBy: "",
        amountPaid: "",
        paymentRecievedBy: "",
        gstCal: "",
        gstAmount: "",
        paymentMode: "",
        narration: "",
        typeOfPay:"", // for outgoing
        supportDoc: "",
        supportDocOut: "", //for outhoing
        date: "",
        toDate: "",
        id_income: "",
    });
    
      const resetEmployeeDetails = () => {
        let _resetEmployee = {
        incomeSRC: "",
        paymentModeBy: "",
        amountPaid: "",
        paymentRecievedBy: "",
        gstCal: "",
        gstAmount: "",
        paymentMode: "",
        narration: "",
        typeOfPay: "", //for outgoing
        supportDoc: "",
        supportDocOut: "", //for outgoing
        date: "",
        toDate: "",
       // id_income: "",
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
          //console.log(e.target.files);
          //setFile(URL.createObjectURL(e.target.files[0]));
    
        if (Object.keys(_errors).length != 0) {
          let finalErrors = {
            ...formErrors,
            [key]: _errors[key],
          };
          setFormErrors(finalErrors);
        } else {
          let finalErrors = {
            ...formErrors,
            [key]: _errors[key],
          };
          setFormErrors(finalErrors);
        }
    };

    var config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': '*/*',
        },
    };
    
    const submitdata = () => {
      const _errors = validate();
      setFormErrors(_errors);
  
      let _requestData = {
        ...employeeDetails,
      };
      {
        Object.keys(_errors).length == 0
          ? axios.post("http://192.168.1.7/testAPI/api/Chat/postIncomeAcc" ,_requestData, config)
              .then((res) => {
                       console.log(res.data)
                       if (res.status === 200) {
                       alert("Successfully registred");
                       } setFormErrors({});
                       })
              .catch((err) =>{ alert("Something went wrong")
              resetEmployeeDetails();
              setFormErrors({});
            })
          : alert("Please Fill All Details");
      }
  };

    const [data,setData] = useState([])
    const initializeEvent = () => {
    axios.get("http://192.168.1.7/testAPI/api/Chat/fetchIncomeAcc")
    .then((res) => {
    console.log({state:res.data});
    setData(res.data)
    })
    };
   
  
    //------------------------------------------OUTGOING------------------------------------------//
    const submitOutdata = () => {
      const _errors = validate();
      setFormErrors(_errors);
  
      let _requestData = {
        ...employeeDetails,
      };
      {
        Object.keys(_errors).length == 0
          ? axios.post("http://192.168.1.7/testAPI/api/Chat/postOutgoAcc" ,_requestData, config)
              .then((res) => {
                       console.log(res.data)
                       if (res.status === 200) {
                       alert("Successfully registred");
                       } setFormErrors({});
                       })
              .catch((err) =>{ alert("Something went wrong")
              resetEmployeeDetails();
              setFormErrors({});
            })
          : alert("Please Fill All Details");
      }
  };

  const outgoing = () => {
  axios.get("http://192.168.1.7/testAPI/api/Chat/fetchOutgoAcc")
  .then((res) => {
  console.log(res.data);
  setData(res.data)
  })
  };
 
  const fetchAcc = () => {
  axios.get("http://192.168.1.7/testAPI/api/Chat/fetchAcc")
  .then((res) => {
  console.log(data);
  setData(res.data)
  })
  };

  const dummy = () => {
  axios.get("http://192.168.1.7/testAPI/api/Chat/twoTable")
  .then((res) => {
  console.log(res.data);
  setData(res.data)
  })
  };
//--------------------------------------------FETCH INCOME BY DATE RANGE---------------------------------------------------//
  const incomeDateRng = () => {
   
    let _requestData = {
      ...employeeDetails,
    };

   console.log(_requestData)
    {
       axios
            .post(`http://192.168.1.7/testAPI/api/Chat/fetchIncomeDateRng`, _requestData,config)
            .then((res) => {
               console.log('response',res.data)
               setData(res.data)
               if (res.data != "Failed") {
                 localStorage.setItem(
                  "user_info",
                   JSON.stringify(res.data)
                 );
                
               }
               if (res.data == "Failed") {
                alert("Invalid Credantials")
               }
               resetEmployeeDetails();
            })
            .catch((e) => {
               if (e.res.data.message == "Incorrect Password") {
              {
                 alert("Account Not Found");
               }
              }
            })
    }
  };


  //--------------------------------------------FETCH OUTGOING BY DATE RANGE---------------------------------------------------//
  const outgoingDateRng = () => {
   
    let _requestData = {
      ...employeeDetails,
    };

   console.log(_requestData)
    {
       axios
            .post(`http://192.168.1.7/testAPI/api/Chat/fetchOutgoingDateRng`, _requestData,config)
            .then((res) => {
               console.log('response',res.data)
               setData(res.data)
               if (res.data != "Failed") {
                 localStorage.setItem(
                  "user_info",
                   JSON.stringify(res.data)
                 );
               }
               if (res.data == "Failed") {
                alert("Invalid Credantials")
               }
               resetEmployeeDetails();
            })
            .catch((e) => {
               if (e.res.data.message == "Incorrect Password") {
              {
                 alert("Account Not Found");
               }
              }
            })
    }
  };

  const handleEdit = (item) => {
     console.log(item)
      navigate("/invoice", {
        state: {item
        },
      });
   };


   const handleEditOut = (item) => {
    console.log(item)
     navigate("/outgoing", {
       state: {item
       },
     });
  };


  let total = 0 ; //for calculating total row's amount set total = 0;

  
  ReactHTMLTableToExcel.format = (s, c) => {
    if (c && c['table']) {
    const html = c.table;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const rows = doc.querySelectorAll('tr');
    
    for (const row of rows) row.removeChild(row.firstChild);
    
    c.table = doc.querySelector('table').outerHTML;
    }
    
    return s.replace(/{(\w+)}/g, (m, p) => c[p]);
    };

    // ReactHTMLTableToPdf.format = (s, c) => {
    //   if (c && c['table']) {
    //   const html = c.table;
    //   const parser = new DOMParser();
    //   const doc = parser.parseFromString(html, 'text/html');
    //   const rows = doc.querySelectorAll('tr');
      
    //   for (const row of rows) row.removeChild(row.firstChild);
      
    //   c.table = doc.querySelector('table').outerHTML;
    //   }
      
    //   return s.replace(/{(\w+)}/g, (m, p) => c[p]);
    //   };
    
 
  return(
  <>
   <button type="button" value="Income" class="btn btn-info btn-sm, btn1" data-toggle="modal" data-target="#incomeModal">Income</button>
   <button type="button" value="Outgoing" class="btn btn-info btn-sm, btn1" data-toggle="modal" data-target="#outgoingModal">Outgoing</button>
   <button type="button" value="GST" class="btn btn-info btn-sm, btn1" data-toggle="modal" data-target="#gstModal">GST</button>
   <button type="button" value="Total" class="btn btn-info btn-sm, btn1" data-toggle="modal" data-target="">Total</button>
   <button type="button" value="P&L" class="btn btn-info btn-sm, btn1" data-toggle="modal" data-target="#plModal" onClick={fetchAcc}>P&L</button>
   <button type="button" value="Invoice" class="btn btn-info btn-sm, btn1" data-toggle="modal" data-target="#invoiceModal">Invoice</button>
   <button type="button" value="ViewAcc" class="btn btn-info btn-sm, btn1" data-toggle="modal" data-target="#viewModal">View Account</button>
   


{/* --------------------------------------------INVOICE BUTTON--------------------------------------------  */}
   <div class="modal fade" id="invoiceModal" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
        <button type="button" value="ViewAccIncome" class="btn btn-info btn-sm, btn4" data-toggle="modal" data-target="#demoModal" onClick={initializeEvent}>Income Invoice</button>
        <button type="button" value="ViewAccOutgoing" class="btn btn-info btn-sm, btn4" data-toggle="modal" data-target="#demoModal" onClick={outgoing}>Outgoing Invoice</button>
        </div>
        </div>
        </div>
        </div>


{/* --------------------------------------------VIEW TABLES BUTTON--------------------------------------------  */}
   <div class="modal fade" id="viewModal" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
        <button type="button" value="ViewAccIncome" class="btn btn-info btn-sm, btn4" data-toggle="modal" data-target="#viewIncome" onClick={initializeEvent}>View Income</button>
        <button type="button" value="ViewAccOutgoing" class="btn btn-info btn-sm, btn4" data-toggle="modal" data-target="#viewOutgoing" onClick={outgoing}>View Outgoing</button>
        <button type="button" value="ViewAccDummy" class="btn btn-info btn-sm, btn4" data-toggle="modal" data-target="#dummyOutgoing" onClick={dummy}>View Dummy</button>
        </div>
        </div>
        </div>
        </div>
   
{/*--------------------------------------------demo------------------------------------------ */}
    <div class="modal fade" id="demoModal" role="dialog">
    <div class="modal-dialog modal-mi">
      <div class="modal-content">
        <div class="modal-header1">
        <div class="modal-body">
          <div>handle ChangeInput</div>
          <div>handle ChangeInput</div>
          <div>handleChangeInputhi</div>
          <div>handleChangeInput</div>
          <div>handleChangeInput</div>
          </div>
        </div>
        </div>
      </div>
      </div>
        
  {/* ----------------------------------------------INCOME FORM-------------------------------------------- */}
   <div class="modal fade" id="incomeModal" role="dialog">
    <div class="modal-dialog modal-mi">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Income</h4>
        </div>
        <div class="modal-body">
        <div>

        <label>Income Source</label>
        <input id='is' type="text" name="incomeSRCIN" value={employeeDetails.incomeSRCIN} placeholder='Income source' onChange={handleChangeInput} error="!employeeDetails.incomeSRCIN"/>
        
        <label>Payment-mode by*</label>
        <input id='is' type="text" name="paymentModeByIN" value={employeeDetails.paymentModeByIN} placeholder='Payment-mode by' onChange={handleChangeInput} error="!employeeDetails.paymentModeByIN" required/>
       
        <label>Amount paid*</label>
        <input id='amtpayIN' type="text" name="amountPaidIN" value={employeeDetails.amountPaidIN} placeholder='Amount-paid' onChange={handleChangeInput} error="!employeeDetails.amountPaidIN" required/>

        <div id='payrcv'>
        <label>Payment-recieved*</label>
        <input id='prIN' type="text" name="paymentRecievedByIN" value={employeeDetails.paymentRecievedByIN} placeholder='Payment-recieved by' onChange={handleChangeInput} error="!employeeDetails.paymentRecievedByIN" required/>
        </div>

        <label>Type Of GST*</label>
        <select id='typeGst' name="gstCalIN" value={employeeDetails.gstCalIN} onChange={handleChangeInput} error="!employeeDetails.gstCalIN" required>
        <option value="" size={10}>Select</option><br/>
        <option value="9">CGST</option>
        <option value="8">SGST</option>
        <option value="">Other</option>
        </select>
             
        <div id='gstAmt'>
        <label>GST Total Amount</label>
        <input id='gta' name="gstAmount" value={(employeeDetails.gstAmountIN)=((employeeDetails.gstCalIN)*(employeeDetails.amountPaidIN))/(100)}  placeholder='Total amount' readOnly/>
        </div>

        <label>Payment-mode*</label>
        <select id='pm' name="paymentModeIN" value={employeeDetails.paymentModeIN} placeholder='Payment-mode' onChange={handleChangeInput} error="!employeeDetails.paymentModeIN" required>
        <option value="" size={10}>Select</option><br/>
        <option value="Cash">Cash</option>
        <option value="Cheque">Cheque</option>
        <option value="NEFT">NEFT</option>
        <option value="UPI">UPI</option>
        <option value="Other">Other</option>
        </select>

        <div id='narr'>
        <label>Narration-No.</label>
        <input id='nn' type="text" name="narrationIN" value={employeeDetails.narrationIN} onChange={handleChangeInput} error="!employeeDetails.narrationIN" placeholder='Cheque/UTR number'/>
        </div>

        <div>
        <label>Support-Documents</label>
        <input id='sd' type="file" name="supportDocIN" value={employeeDetails.supportDocIN} onChange={handleChangeInput} error="!employeeDetails.supportDocIN" placeholder='Support-Doc'/> 
        </div>  

        </div>
        </div>
        <div class="modal-footer" id='ft'>
        <button id='modcl' type="button" class="btn btn-info btn-sm" data-dismiss="modal" onClick={submitdata}>Submit</button>
        <button id='modcal1' type="button" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>


{/* ------------------------------------------------OUTGOING FORM-------------------------------------------- */}

  <div class="modal fade" id="outgoingModal" role="dialog">
    <div class="modal-dialog modal-mi">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Outgoing</h4>
        </div>
        <div class="modal-body">
        <div>

        <label>Income Source</label>
        <input id='is' type="text" name="incomeSRC" value={employeeDetails.incomeSRC} placeholder='Income source' onChange={handleChangeInput} error="!employeeDetails.incomeSRC"/>
        
        <label>Payment-mode by*</label>
        <input id='is' type="text" name="paymentModeBy" value={employeeDetails.paymentModeBy} placeholder='Payment-mode by' onChange={handleChangeInput} error="!employeeDetails.paymentModeBy" required/>
       
        <label>Amount paid*</label>
        <input id='amtpay' type="text" name="amountPaid" value={employeeDetails.amountPaid} placeholder='Amount paid' onChange={handleChangeInput} error="!employeeDetails.amountPaid" required/>
        
        <div id='payrcv'>
        <label>Payment-recieved*</label>
        <input id='pr' type="text" name="paymentRecievedBy" value={employeeDetails.paymentRecievedBy} placeholder='Payment-recieved by' onChange={handleChangeInput} error="!employeeDetails.paymentRecievedBy" required/>
        </div>

        <label>Type Of GST*</label>
        <select id='typeGst' name="gstCal" value={employeeDetails.gstCal} onChange={handleChangeInput} error="!employeeDetails.gstCal" required>
        <option value="" size={10}>Select</option><br />
        <option value="9">CGST</option>
        <option value="8">SGST</option>
        <option value="">Other</option>
        </select>

        <div id='gstAmt'>
        <label>GST Total Amount</label>
        <input id='gta' name="gstAmount" value={(employeeDetails.gstAmount)=((employeeDetails.gstCal)*(employeeDetails.amountPaid))/(100)}  placeholder='Total amount' readOnly/>
        </div>

        <label>Payment-mode*</label>
        <select id='pm' name="paymentMode" value={employeeDetails.paymentMode} placeholder='Payment-mode' onChange={handleChangeInput} error="!employeeDetails.paymentMode" required>
        <option value="" size={10}>Select</option><br />
        <option value="Cash">Cash</option>
        <option value="Cheque">Cheque</option>
        <option value="NEFT">NEFT</option>
        <option value="UPI">UPI</option>
        <option value="Other">Other</option>
        </select>

        <div id='narr'>
        <label>Narration-No.</label>
        <input id='nn' type="text" name="narration" value={employeeDetails.narration} onChange={handleChangeInput} error="!employeeDetails.narration" placeholder='Cheque/UTR number'/>
        </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        <label>Type of paymnet*</label>
        <select id='top' name="typeOfPay" value={employeeDetails.typeOfPay} placeholder='Payment-mode by' onChange={handleChangeInput} error="!employeeDetails.typeOfPay" required>
        <option value="" size={10}>Select</option><br />
        <option value="Cash">Salary</option>
        <option value="Cheque">Housekeep</option>
        <option value="NEFT">Electricity</option>
        <option value="UPI">Drinking water</option>
        <option value="UPI">Food</option>
        <option value="Other">Other</option>
        </select>

        <div>
        <label>Support-Documents</label>
        <input id='sd' type="file" name="supportDocOut" value={employeeDetails.supportDocOut}onChange={handleChangeInput} error="!employeeDetails.supportDocOut" placeholder='Support-Doc'/> 
        </div>

        </div>
        </div>
        <div class="modal-footer" id='ft'>
        <button id='modcl' type="button" class="btn btn-info btn-sm" data-dismiss="modal" onClick={submitOutdata}>Submit</button>
        <button id='modcal1' type="button" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>  


{/* -----------------------------------------------P&L FORM----------------------------------------- */}
  <div class="modal fade" id="plModal" role="dialog">
    <div class="modal-dialog modal-mi">
      <div class="modal-content">
        <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">P&L</h4>
        </div>
        <div class="modal-body">
          <label id='dtrng'>From</label>
          <input id='dtrngF' type='date' name='date' value={employeeDetails.date} onChange={handleChangeInput}/>
          <label id='dtrng'>To</label>
          <input id='pl' type='date' name='toDate' value={employeeDetails.toDate} onChange={handleChangeInput}/>
          <button id='pl' type="button" class="btn btn-info btn-sm, btn1" data-toggle="modal" onClick={incomeDateRng}>Income</button>
          <button id='pl' type="button" class="btn btn-info btn-sm, btn1" data-toggle="modal" onClick={outgoingDateRng}>Outgoing</button>
          <table class='table table-bordered'>
  <thead>
      <tr>                                                                                                                                                                                                                   
          <th id='color'>Sl.No</th>
          <th id='color'>Id</th>
          <th id='color'>Invoice</th>
          <th id='color'>Amount paid by</th>
          <th id='color'>Amount recieved by</th>
          <th id='color'>Amount paid</th>
      </tr>
  </thead>
  <tbody>
       {
          data.map((data, index) => (
                  <tr key={index}>
                      <td id='color'>{index+1}</td>
                      <td id='color'>{data.id}</td>
                      <td id='color'>{data.incomeSRC}</td>
                      <td id='color'>{data.paymentModeBy}</td>
                      <td id='color'>{data.paymentRecievedBy}</td>
                      <td id='color'>{data.amountPaid}<p id='zz'>{total = parseInt(data.amountPaid) + parseInt(total)}</p></td> 
            </tr>))           
        }  
  </tbody>
  </table>
  </div>
  <div class="modal-footer" id='foot'>
  <p><strong id='ff'>Total:</strong>{total}</p>
  </div>
  <button id='cl' type="button" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>
  </div>
  </div>
  </div>

{/*--------------------------------------------GST-----------------------------------------------------------*/}
<div class="modal fade" id="gstModal" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">GST</h4>
          </div>
        <div class="modal-body">
          <label id='dtrng'>From:</label>
          <input id='dtrngF' type='date' name='date' value={employeeDetails.date} onChange={handleChangeInput}/>
          <label id='dtrng'>To:</label>
          <input type='date' name='toDate' value={employeeDetails.toDate} onChange={handleChangeInput}/>
          <button id='dtrngE' type="button" class="btn btn-info btn-sm, btn2" data-toggle="modal" onClick={incomeDateRng}>Search by date range</button>
          {/* <button id='dtrngE' type="button" class="btn btn-info btn-sm, btn2" data-toggle="modal" onClick={incomeDateRng}>Excel <i class="fa fa-download"></i></button> */}
          <ReactHTMLTableToExcel
          id="test-table-xls-button" className="download-table-xls-button, btn btn-info btn-sm, btn2 fa fa-download"
          table="exceltable" filename="Employees" sheet="tablexls" buttonText="Excel"/>
          <button id='dtrngE' type="button" class="btn btn-info btn-sm, btn2" data-toggle="modal" onClick={incomeDateRng}>PDF <i class="fa fa-download"></i></button>
          <input id='dtrngSe' type='text' placeholder='Search'/><button class="btn btn-info btn-sm, btn3"><i class="fa fa-search"></i></button>
          {/* <ReactHTMLTableToPdf
          id="test-table-xls-button" className="download-table-xls-button, btn btn-info btn-sm, btn2 fa fa-download"
          table="exceltable" filename="Employees" sheet="tablexls" buttonText="PDF"/> */}
          <table class='table table-bordered' id='exceltable'>
  <thead>
      <tr>                                                                                                                                                                                                                   
          <th id='color'>Sl.No</th>
          <th id='color'>Date</th>
          <th id='color'>Name of the client</th>
          <th id='color'>Amount</th>
          <th id='color'>GST</th>
          <th id='color'>Income</th>
          <th id='color'>Outgoing</th>
          <th id='color'>Total</th>
      </tr>
  </thead>
  <tbody>
       {
          data.map((data, index) => (
                  <tr key={index}>
                      <td id='color'>{index+1}</td>
                      <td id='color'>{data.id}</td>
                      <td id='color'>{data.incomeSRC}</td>
                      <td id='color'>{data.paymentModeBy}</td>
                      <td id='color'>{data.paymentRecievedBy}</td>
                      <td id='color'>{data.amountPaid}<p id='zz'>{total = parseInt(data.amountPaid) + parseInt(total)}</p></td> 
            </tr>))           
        }  
  </tbody>
  </table>
 </div>
 <div class="modal-footer">
  <button id='gstcl' type="button" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>
  </div>
  </div>
  </div>
  </div>

{/* -----------------------------------------------OUTGOING TABLE--------------------------------------------------------- */}
        <div class="modal fade" id="viewOutgoing" role="dialog">
        <div class="modal-dialog modal-lg">
        <div class="modal-content">
        <div class="modal-header">
        <div>
          <h1 class='title'> View Outgoing Information</h1>
        </div>   
 
  <table class='table table-bordered'>
  <thead>
      <tr>
          <th id='color'>Income Source</th>
          <th id='color'>Date</th>
          <th id='color'>Time</th>
          <th id='color'>Payment-mode by</th>
          <th id='color'>Payment-recieved</th>
          <th id='color'>Amount paid</th>
          <th id='color'>GST</th>
          <th id='color'>GST total amont</th>
          <th id='color'>Payment-mode</th>
          <th id='color'>Narration-No</th>
          <th id='color'>Type of payment</th>
          <th id='color'>Support-Documents</th>
          
      </tr>
  </thead>
  <tbody>
       {
          data.map(data => (
                  <tr key={data.id}>
                    <td id='color'> <button type="button" value="ViewAccOutgoing" class="btn btn-info btn-sm, btn1" data-toggle="modal" data-target="#invoiceOutgoingModal" onClick={() => handleEditOut(data)}>View</button></td>
                      <td id='color'>{data.incomeSRC}</td>
                      <td id='color'>{data.date}</td>
                      <td id='color'>{data.time}</td>
                      <td id='color'>{data.paymentModeBy}</td>
                      <td id='color'>{data.paymentRecievedBy}</td>
                      <td id='color'>{data.amountPaid}</td>
                      <td id='color'>{data.gstCal}</td>
                      <td id='color'>{data.gstAmount}</td>
                      <td id='color'>{data.paymentMode}</td>
                      <td id='color'>{data.narration}</td>
                      <td id='color'>{data.typeOfPay}</td>
                      <td id='color'>{data.supportDoc}</td>
                  </tr>))
        } 
  </tbody>
  </table>
  <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>
  </div>
  </div>
  </div>
  </div>


{/*-------------------------------------dummy-------------------------------------------- */}
<div class="modal fade" id="dummyOutgoing" role="dialog">
        <div class="modal-dialog modal-lg">
        <div class="modal-content">
        <div class="modal-header">
        <div>
          <h1 class='title'> View Outgoing Information</h1>
        </div>   
 
  <table class='table table-bordered'>
  <thead>
      <tr>
          <th id='color'>Name</th>
          <th id='color'>Phone No</th>
          {/* <th id='color'>Time</th>
          <th id='color'>Payment-mode by</th>
          <th id='color'>Payment-recieved</th>
          <th id='color'>Amount paid</th>
          <th id='color'>GST</th>
          <th id='color'>GST total amont</th>
          <th id='color'>Payment-mode</th>
          <th id='color'>Narration-No</th>
          <th id='color'>Type of payment</th>
          <th id='color'>Support-Documents</th> */}
      </tr>
  </thead>
  <tbody>
       {
          data.map(data => (
                  <tr key={data.id}>
                    {/* <td id='color'> <button type="button" value="ViewAccOutgoing" class="btn btn-info btn-sm, btn1" data-toggle="modal" data-target="#invoiceOutgoingModal" onClick={() => handleEditOut(data)}>View</button></td>
                      <td id='color'>{data.incomeSRC}</td>
                      <td id='color'>{data.date}</td>
                      <td id='color'>{data.time}</td>
                      <td id='color'>{data.paymentModeBy}</td>
                      <td id='color'>{data.paymentRecievedBy}</td>
                      <td id='color'>{data.amountPaid}</td>
                      <td id='color'>{data.gstCal}</td>
                      <td id='color'>{data.gstAmount}</td>
                      <td id='color'>{data.paymentMode}</td>
                      <td id='color'>{data.narration}</td> */}
                      <td id='color'>{data.name}</td>
                      <td id='color'>{data.phone}</td>
                  </tr>))
        } 
  </tbody>
  </table>
  <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>
  </div>
  </div>
  </div>
  </div>

{/* ------------------------------------------------INCOME TABLE----------------------------------------------------------- */}

  <div class="modal fade" id="viewIncome" role="dialog">
  <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
        <div>
          <h1 class='title'>View Income Information </h1>
        </div>   
 
  <table class='table table-bordered'>
  <thead>
      <tr>
          <th id='color'>Action</th>
          <th id='color'>Income Source</th>
          <th id='color'>Date</th>
          <th id='color'>Time</th>
          <th id='color'>Payment-mode by</th>
          <th id='color'>Payment-recieved</th>
          <th id='color'>Amount paid</th>
          <th id='color'>GST</th>
          <th id='color'>GST total amont</th>
          <th id='color'>Payment-mode</th>
          <th id='color'>Narration-No</th>
          <th id='color'>Support-Documents</th>
      </tr>
  </thead>
  <tbody>
       {
          data.map(data => (
                  <tr key={data.id}>
                    <td id='color'> <button type="button" value="ViewAccOutgoing" class="btn btn-info btn-sm, btn1" data-toggle="modal" data-target="#invoiceIncomeModal" onClick={() => handleEdit(data)}>View</button></td>
                      <td id='color'>{data.incomeSRC}</td>
                      <td id='color'>{data.date}</td>
                      <td id='color'>{data.time}</td>
                      <td id='color'>{data.paymentModeBy}</td>
                      <td id='color'>{data.paymentRecievedBy}</td>
                      <td id='color'>{data.amountPaid}</td>
                      <td id='color'>{data.gstCal}</td>
                      <td id='color'>{data.gstAmount}</td>
                      <td id='color'>{data.paymentMode}</td>
                      <td id='color'>{data.narration}</td>
                      <td id='color'>{data.supportDoc}</td>
                  </tr>))
        } 
  </tbody>
  </table>
  <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>

  </div>
  </div>
  </div>
  </div>         
  </>
)
}
export default AccountsAdmin;
