import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';

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

      const [file, setFile] = useState();
      const [employeeDetails, setEmployeeDetails] = useState({
        incomeSRC: "",
        paymentModeBy: "",
        amountPaid: "",
        paymentRecievedBy: "",
        gstCal: "",
        gstAmount: "",
        paymentMode: "",
        narration: "",
      typeOfPay:"",
        supportDoc: "",
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
        typeOfPay: "",
        supportDoc: "",
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
          setFile(URL.createObjectURL(e.target.files[0]));
    
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
            ? axios.post("http://192.168.1.10/testAPI/api/Chat/postIncomeAcc" ,_requestData, config)
                .then((res) => {
                         console.log(res.data)
                         if (res.status === 200) {
                         alert("Successfully registred");
                         } setFormErrors({});
                         //console.log("/leadMngTable",{dataMng:res.data})
                         })
                .catch((err) =>{ alert("Something went wrong")
                setFormErrors({});
              })
            : alert("Please Fill All Details");
        }
    };


    const [data,setData] = useState([])
    const initializeEvent = () => {
    axios.get("http://192.168.1.10/testAPI/api/Chat/fetchIncomeAcc")
    .then((res) => {
    console.log(res.data);
    setData(res.data)
    })
    };
    useEffect(() => initializeEvent(), []);

    //------------------------------------------OUTGOING------------------------------------------//
    const submitOutdata = () => {
      const _errors = validate();
      setFormErrors(_errors);
  
      let _requestData = {
        ...employeeDetails,
      };
      {
        Object.keys(_errors).length == 0
          ? axios.post("http://192.168.1.10/testAPI/api/Chat/postOutgoAcc" ,_requestData, config)
              .then((res) => {
                       console.log(res.data)
                       if (res.status === 200) {
                       alert("Successfully registred");
                       } setFormErrors({});
                       //console.log("/leadMngTable",{dataMng:res.data})
                       })
              .catch((err) =>{ alert("Something went wrong")
              setFormErrors({});
            })
          : alert("Please Fill All Details");
      }
  };


  // const outgoing = () => {
  // axios.get("http://192.168.1.10/testAPI/api/Chat/fetchOutgoAcc")
  // .then((res) => {
  // console.log(res.data);
  // setData(res.data)
  // })
  // };
  // useEffect(() => outgoing(), []);
    
    
    return(
    <>
   <button type="button" value="Income" class="btn btn-info btn-sm, btn1" data-toggle="modal" data-target="#incomeModal">Income</button>
   <button type="button" value="Outgoing" class="btn btn-info btn-sm, btn1" data-toggle="modal" data-target="#outgoingModal">Outgoing</button>
   <button type="button" value="GST" class="btn btn-info btn-sm, btn1" data-toggle="modal" data-target="#incomeModal">GST</button>
   <button type="button" value="Total" class="btn btn-info btn-sm, btn1" data-toggle="modal" data-target="#incomeModal">Total</button>
   <button type="button" value="P&L" class="btn btn-info btn-sm, btn1" data-toggle="modal" data-target="#incomeModal">P&L</button>
   <button type="button" value="Invoice" class="btn btn-info btn-sm, btn1" data-toggle="modal" data-target="#incomeModal">Invoice</button>
   <button type="button" value="ViewAcc" class="btn btn-info btn-sm, btn1" data-toggle="modal" data-target="#viewModal">View Account</button>
   <div class="modal fade" id="incomeModal" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Income</h4>
        </div>
        <div class="modal-body">
        <div className='input-container1'>

        <label>Income Source</label>
        <input type="text" name="incomeSRC" value={employeeDetails.incomeSRC} placeholder='Income source' onChange={handleChangeInput} error="!employeeDetails.incomeSRC"/>
        
        <label>Payment-mode by*</label>
        <input type="text" name="paymentModeBy" value={employeeDetails.paymentModeBy} placeholder='Payment-mode by' onChange={handleChangeInput} error="!employeeDetails.paymentModeBy" required/>
       
        <label>Amount paid*</label>
        <input type="text" name="amountPaid" value={employeeDetails.amountPaid} placeholder='Payment-mode by' onChange={handleChangeInput} error="!employeeDetails.amountPaid" required/>
        
        <label>Payment-recieved*</label>
        <input type="text" name="paymentRecievedBy" value={employeeDetails.paymentRecievedBy} placeholder='Payment-mode by' onChange={handleChangeInput} error="!employeeDetails.paymentRecievedBy" required/>
        
        <label>Type Of GST*</label>
        <select name="gstCal" value={employeeDetails.gstCal} onChange={handleChangeInput} error="!employeeDetails.gstCal" required>
        <option value="" size={10}>Select</option><br />
        <option value="9">CGST</option>
        <option value="8">SGST</option>
        <option value="">Other</option>
        </select>

        <label>GST Total Amount</label>
        <input name="gstAmount" value={(employeeDetails.gstAmount)=((employeeDetails.gstCal)*(employeeDetails.amountPaid))/(100)} placeholder='Total amount' class="acc-gst-tot" readOnly/>

        <label>Payment-mode*</label>
        <select name="paymentMode" value={employeeDetails.paymentMode} placeholder='Payment-mode by' onChange={handleChangeInput} error="!employeeDetails.paymentMode" required>
        <option value="" size={10}>Select</option><br />
        <option value="Cash">Cash</option>
        <option value="Cheque">Cheque</option>
        <option value="NEFT">NEFT</option>
        <option value="UPI">UPI</option>
        <option value="Other">Other</option>
        </select>

        <label>Narration-No.</label>
        <input type="text" name="narration" value={employeeDetails.narration} onChange={handleChangeInput} error="!employeeDetails.narration" placeholder='Cheque/UTR number'/>
        
        <label>Support-Documents</label>
        <input type="file" name="supportDoc"  value={employeeDetails.supportDoc}onChange={handleChangeInput} error="!employeeDetails.supportDoc" placeholder='Support-Doc' class="accfile"/> 
        
        </div>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-info btn-sm" data-dismiss="modal" onClick={submitdata}>Submit</button>
        <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>


  <div class="modal fade" id="outgoingModal" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Outgoing</h4>
        </div>
        <div class="modal-body">
        <div className='input-container1'>

        <label>Income Source</label>
        <input type="text" name="incomeSRC" value={employeeDetails.incomeSRC} placeholder='Income source' onChange={handleChangeInput} error="!employeeDetails.incomeSRC"/>
        
        <label>Payment-mode by*</label>
        <input type="text" name="paymentModeBy" value={employeeDetails.paymentModeBy} placeholder='Payment-mode by' onChange={handleChangeInput} error="!employeeDetails.paymentModeBy" required/>
       
        <label>Amount paid*</label>
        <input type="text" name="amountPaid" value={employeeDetails.amountPaid} placeholder='Payment-mode by' onChange={handleChangeInput} error="!employeeDetails.amountPaid" required/>
        
        <label>Payment-recieved*</label>
        <input type="text" name="paymentRecievedBy" value={employeeDetails.paymentRecievedBy} placeholder='Payment-mode by' onChange={handleChangeInput} error="!employeeDetails.paymentRecievedBy" required/>
        
        <label>Type Of GST*</label>
        <select name="gstCal" value={employeeDetails.gstCal} onChange={handleChangeInput} error="!employeeDetails.gstCal" required>
        <option value="" size={10}>Select</option><br />
        <option value="9">CGST</option>
        <option value="8">SGST</option>
        <option value="">Other</option>
        </select>

        <label>GST Total Amount</label>
        <input name="gstAmount" value={(employeeDetails.gstAmount)=((employeeDetails.gstCal)*(employeeDetails.amountPaid))/(100)}  placeholder='Total amount' class="acc-gst-tot" readOnly/>

        <label>Payment-mode*</label>
        <select name="paymentMode" value={employeeDetails.paymentMode} placeholder='Payment-mode by' onChange={handleChangeInput} error="!employeeDetails.paymentMode" required>
        <option value="" size={10}>Select</option><br />
        <option value="Cash">Cash</option>
        <option value="Cheque">Cheque</option>
        <option value="NEFT">NEFT</option>
        <option value="UPI">UPI</option>
        <option value="Other">Other</option>
        </select>

        <label>Narration-No.</label>
        <input type="text" name="narration" value={employeeDetails.narration} class="acc-narr" onChange={handleChangeInput} error="!employeeDetails.narration" placeholder='Cheque/UTR number'/>
        
        <label>Type of paymnet*</label>
        <select name="typeOfPay" value={employeeDetails.typeOfPay} class="acc-typ-pay" placeholder='Payment-mode by' onChange={handleChangeInput} error="!employeeDetails.typeOfPay" required>
        <option value="" size={10}>Select</option><br />
        <option value="Cash">Salary</option>
        <option value="Cheque">Housekeep</option>
        <option value="NEFT">Electricity</option>
        <option value="UPI">Drinking water</option>
        <option value="UPI">Food</option>
        <option value="Other">Other</option>
        </select>

         {/* <label>Support-Documents</label>
        <input type="file" name="supportDoc"  value={employeeDetails.supportDoc} onChange={handleChangeInput} error="!employeeDetails.supportDoc" placeholder='Support-Doc' class="accfile"/>   */}
        
        </div>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-info btn-sm" data-dismiss="modal" onClick={submitOutdata}>Submit</button>
        <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>  


  <div class="modal fade" id="viewModal" role="dialog">
  <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
        <div>
          <h1 class='title'>Lead Management Information For User</h1>
        </div>   
 
  <table class='table table-bordered'>
  <thead>
      <tr>
          <th id='color'>Income Source</th>
          <th id='color'>Payment-mode by</th>
          <th id='color'>Amount paid</th>
          <th id='color'>Payment-recieved</th>
          <th id='color'>Type of GST</th>
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
                      <td id='color'>{data.incomeSRC}</td>
                      <td id='color'>{data.paymentModeBy}</td>
                      <td id='color'>{data.amountPaid}</td>
                      <td id='color'>{data.paymentRecievedBy}</td>
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