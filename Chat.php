<?php

//namespace apis\libraries;
use Restserver\Libraries\REST_Controller;

defined('BASEPATH') OR exit('No direct script access allowed');

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
  exit;
}
   
require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';
     
class Chat extends REST_Controller {
    
    public function __construct() {
       parent::__construct();
       $this->load->database();
       $this->load->model('TestPrac_model');
       $this->load->model('Demo_model');
    }
      
//--------------------------Insert-----------------------------//
    public function postTestPrac_post(){
    if($this->input->post('name')){
        $data=array(
             'name'=>$this->input->post('name'), 
             'email'=>$this->input->post('email'),
             'phoneNo'=>$this->input->post('phoneNo'),
             'password'=>$this->input->post('password'),
              'image'=>$this->input->post('image')
          );
      
       $r = $this->db->insert('testprac',$data);
       $this->response($r);
    }
  }

//-----------------------Login-----------------------------//
      public function verifyRegister_post()
    {
        $username=$this->input->post('phoneNo');

        $login_user_details=$this->db->where('phoneNo',$username)->get('testprac');

        if($login_user_details->num_rows()>0)
        {
            $login_user_detailssssss=$login_user_details->row();

            $r=$login_user_detailssssss;
        }
        else
        {
            $r='Failed';
        }

    $this->response($r);
    }

//------------------------------Login------------------------------//
      public function verifyLogin_post()
    {
        $username=$this->input->post('phoneNo');
        $password=$this->input->post('password');

        $login_user_details=$this->db->where('phoneNo',$username)->where('password',$password)->get('testprac');

        if($login_user_details->num_rows()>0)
        {
            $login_user_detailssssss=$login_user_details->row();

            $r=$login_user_detailssssss;
        }
        else
        {
            $r='Failed';
        }

    $this->response($r);
    }

//---------------------Log Out-----------------------------//
    public function logOut_post()
    {
        $this->session->sess_destroy();
       // redirect('login');
    }

//----------------------Fetch----------------------------------//

    public function fetchTestPrac_get(){
        $data = $this->db->get("testprac")->result();
        $this->response($data, REST_Controller::HTTP_OK);
    }

//----------------------Fetch By ID---------------------------//
     public function getTestPrac_get($id = 0)
   { 
        if(!empty($id)){
            $data = $this->db->get_where("testprac", ['id' => $id])->row_array();
            }
        else{
            $data = $this->db->get("")->result();
            }

        $this->response($data, REST_Controller::HTTP_OK);
    }

//--------------------update-----------------------//

    public function updateTestPrac_post(){
    if($this->input->post('name')){
        $data=array(
             'name'=>$this->input->post('name'), 
             'email'=>$this->input->post('email'),
             'phoneNo'=>$this->input->post('phoneNo'),
             'password'=>$this->input->post('password'),
             'image'=>$this->input->post('image'),
             'docFile'=>$this->input->post('docFile'),
             'docFile1'=>$this->input->post('docFile1'),
             'docFile2'=>$this->input->post('docFile2'),
             'docFile3'=>$this->input->post('docFile3')
          );
            $this->db->where('id',$this->input->post('id'));
            $r = $this->db->update('testprac',$data);
       if($r){
        $status='Success';
       }else{
        $status='Failed';
       }
       $this->response($status);
    }
  }


   public function getProfile_get($phoneNo = 0)
   { 
        if(!empty($phoneNo)){
            $data = $this->db->get_where("testprac", ['phoneNo' => $phoneNo])->row_array();
            }
        else{
            $data = $this->db->get("")->result();
            }

        $this->response($data, REST_Controller::HTTP_OK);
    }

       public function resetLink_post()
    {
        $username=$this->input->post('phoneNo');
        //$password=$this->input->post('password');

        $login_user_details=$this->db->where('phoneNo',$username)->get('testprac');

        if($login_user_details->num_rows()>0)
        {
            $login_user_detailssssss=$login_user_details->row();

            $r=$login_user_detailssssss;
        }
        else
        {
            $r='Failed';
        }

    $this->response($r);
    }

//-----------------------Delete----------------------------//
     public function deleteTestPrac_delete($id) {

       $result = $this->db->where('id',$id)->delete('testprac');
        if ($result) {
            $data='Successfully';
        } else {
            $data='Failed';
        }
        $this->response($data, REST_Controller::HTTP_OK);
    }

//-------------------------------------LEAD MANAGEMENT----------------------------------------//

//------------------------Insert lead-----------------------------------//
     public function postLeadMng_post(){
    if($this->input->post('lmname')){
        $data=array(
             'lmname'=>$this->input->post('lmname'), 
             'mobileNo'=>$this->input->post('mobileNo'),
             'altMobileNo'=>$this->input->post('altMobileNo'),
             'email'=>$this->input->post('email'),
             'altEmail'=>$this->input->post('altEmail'),
             'purpose'=>$this->input->post('purpose'),
             'budget'=>$this->input->post('budget'),
             'date'=>$this->input->post('date'),
             'time'=>$this->input->post('time'),
             'phoneNo'=>$this->input->post('phoneNo')
          );
      
       $r = $this->db->insert('leadmanagement',$data);
       $this->response($r);
    }
    if($this->input->post('lmname')){
        $data=array(
             'lmname'=>$this->input->post('lmname'), 
             'mobileNo'=>$this->input->post('mobileNo'),
             'altMobileNo'=>$this->input->post('altMobileNo'),
             'email'=>$this->input->post('email'),
             'altEmail'=>$this->input->post('altEmail'),
             'purpose'=>$this->input->post('purpose'),
             'budget'=>$this->input->post('budget'),
             'date'=>$this->input->post('date'),
             'time'=>$this->input->post('time'),
             'phoneNo'=>$this->input->post('phoneNo')
          );
      
       $r = $this->db->insert('adminleadmng',$data);
       $this->response($r);
    }
  }


//-----------------------verify user lead----------------------------//
    //  public function verifyUser_post()
    // {
    //     $username=$this->input->post('phoneNo');
    //     //$password=$this->input->post('password');

    //     $login_user_details=$this->db->where('phoneNo',$username)->get('leadmanagement');

    //     if($login_user_details->result()>0)
    //     {
    //         $login_user_detailssssss=$login_user_details->result();

    //         $r=$login_user_detailssssss;
    //     }
    //     else
    //     {
    //         $r='Failed';
    //     }

    // $this->response($r);
    // }

//---------------------------fetch all lead(for admin)--------------------------------//

   public function fetchLeadMng_get(){
    $data = $this->db->get("adminleadmng")->result();
    $this->response($data, REST_Controller::HTTP_OK);
    }

//-----------------------get by phoneNo lead(for user)----------------------------------//
    public function getLeadMng_get($phoneNo = 0)
   { 
        if(!empty($phoneNo)){
            $data = $this->db->get_where("leadmanagement", ['phoneNo' => $phoneNo])->result();
            }
        else{
            $data = $this->db->get("")->result();
            }

        $this->response($data, REST_Controller::HTTP_OK);
    }

//--------------------------get by id lead(for edit operation)---------------------------//

     public function getLeadMngId_get($id = 0)
   { 
        if(!empty($id)){
            $data = $this->db->get_where("leadmanagement", ['id' => $id])->row_array();
            }
        else{
            $data = $this->db->get("")->result();
            }

        $this->response($data, REST_Controller::HTTP_OK);
    }

//--------------------------update lead(for alt email,phoneNo)----------------------------//
    
   public function updateLeadMng_post(){
    if($this->input->post('lmname')){
        $data=array(
            'lmname'=>$this->input->post('lmname'), 
             'mobileNo'=>$this->input->post('mobileNo'),
             'altMobileNo'=>$this->input->post('altMobileNo'),
             'email'=>$this->input->post('email'),
             'altEmail'=>$this->input->post('altEmail'),
             'purpose'=>$this->input->post('purpose'),
             'budget'=>$this->input->post('budget'),
             'date'=>$this->input->post('date'),
             'time  '=>$this->input->post('time'),
             'followUp1'=>$this->input->post('followUp1'),
             'followUp2'=>$this->input->post('followUp2'),
             'followUp3'=>$this->input->post('followUp3'),
             'followUPdate'=>date('Y-m-d '),
             //'followUPtime'=>('H:i:s')
          );
            $this->db->where('id',$this->input->post('id'));
            $r = $this->db->update('leadmanagement',$data);
       if($r){
        $status='Success';
       }else{
        $status='Failed';
       }
       $this->response($status);
    }
    if($this->input->post('lmname')){
        $data=array(
            'lmname'=>$this->input->post('lmname'), 
             'mobileNo'=>$this->input->post('mobileNo'),
             'altMobileNo'=>$this->input->post('altMobileNo'),
             'email'=>$this->input->post('email'),
             'altEmail'=>$this->input->post('altEmail'),
             'purpose'=>$this->input->post('purpose'),
             'budget'=>$this->input->post('budget'),
             'date'=>$this->input->post('date'),
             'time  '=>$this->input->post('time'),
             'followUp1'=>$this->input->post('followUp1'),
             'followUp2'=>$this->input->post('followUp2'),
             'followUp3'=>$this->input->post('followUp3'),
             'followUPdate'=>date('Y-m-d '),
             //'followUPtime'=>('H:i:s')
          );
            $this->db->where('id',$this->input->post('id'));
            $r = $this->db->update('adminleadmng',$data);
       if($r){
        $status='Success';
       }else{
        $status='Failed';
       }
       $this->response($status);
    }
  }

//----------------------delete lead by user----------------------------------//

  public function deleteLeadMng_delete($id) {

       $result = $this->db->where('id',$id)->delete('leadmanagement');
        if ($result) {
            $data='Successfully';
        } else {
            $data='Failed';
        }
         $this->response($data, REST_Controller::HTTP_OK);
    }
//----------------------delete lead by admin----------------------------------//

 public function deleteLeadMngAdmin_delete($id) {

       $result = $this->db->where('id',$id)->delete('adminleadmng');
        if ($result) {
            $data='Successfully';
        } else {
            $data='Failed';
        }
        $this->response($data, REST_Controller::HTTP_OK);
    }



//-----------------------------Accounts----------------------------------------//

  public function postIncomeAcc_post(){
     date_default_timezone_set('Asia/Kolkata');
              $now = date('Y-m-d');
              $time = date('h:i:s A', time ());
    if($this->input->post('incomeSRC')){
        $data=array(
             'incomeSRC'=>$this->input->post('incomeSRC'), 
             'paymentModeBy'=>$this->input->post('paymentModeBy'),
             'amountPaid'=>$this->input->post('amountPaid'),
             'paymentRecievedBy'=>$this->input->post('paymentRecievedBy'),
             'gstCal'=>$this->input->post('gstCal'),
             'gstAmount'=>$this->input->post('gstAmount'),
             'paymentMode'=>$this->input->post('paymentMode'),
             'narration'=>$this->input->post('narration'),
             'supportDoc'=>$this->input->post('supportDoc'),
             'date'=>$now,
             'toDate'=>$now,
             'time'=>$time
          );
      
       $r = $this->db->insert('incomeaccadm',$data);
       $this->response($r);
    }
  }


  public function postOutgoAcc_post(){
     date_default_timezone_set('Asia/Kolkata');
              $now = date('Y-m-d');
              $time = date('h:i:s A', time ());
    if($this->input->post('incomeSRC')){
        $data=array(
             'incomeSRC'=>$this->input->post('incomeSRC'), 
             'paymentModeBy'=>$this->input->post('paymentModeBy'),
             'amountPaid'=>$this->input->post('amountPaid'),
             'paymentRecievedBy'=>$this->input->post('paymentRecievedBy'),
             'gstCal'=>$this->input->post('gstCal'),
             'gstAmount'=>$this->input->post('gstAmount'),
             'paymentMode'=>$this->input->post('paymentMode'),
             'narration'=>$this->input->post('narration'),
             'supportDocOut'=>$this->input->post('supportDocOut'),
             'date'=>$now,
             'toDate'=>$now,
             'time'=>$time,
             'typeOfPay'=>$this->input->post('typeOfPay')
             //'id_income'=>$this->input->post('id_income')
          );
      
       $r = $this->db->insert('outgoingaccadm',$data);
       $this->response($r);
    }
  }

//-------------------------------Fetch Acc----------------------------//

    public function fetchIncomeAcc_get(){
        $data = $this->db->get("incomeaccadm")->result();
        $this->response($data, REST_Controller::HTTP_OK);
    }

     public function fetchOutgoAcc_get(){
        $data = $this->db->get("outgoingaccadm")->result();
        $this->response($data, REST_Controller::HTTP_OK);
    }

    //  public function fetchAcc_get(){
        
    //     $data = $this->db->select('outgoingaccadm.*,incomeaccadm.*')->from('outgoingaccadm')-join('incomeaccadm','incomeaccadm.id = outgoingaccadm.incomeSRC')->where('outgoingaccadm.incomeSRC',$id)->where('incomeaccadm.id',$id)->get()->result();
    //     $this->response($data, REST_Controller::HTTP_OK);
    // }

//  public function fetchAcc_get(){
//     // $query = $this->db->select("in*, ot.*")
//     //            ->from("incomeaccadm as in")
//     //            ->join("outgoingaccadm as ot", "ot.id = in.id")
//     //            ->where("in.id", $studentid)
//     //            ->get();
//     // return $query->result();        
//     $data = $this->db->get("outgoingaccadm, incomeaccadm")->result();
//         $this->response($data, REST_Controller::HTTP_OK);
// }

public function fetchAcc_get()
{
$username = $this->session->userdata('incomeSRC');
$result= $this->db->join('incomeaccadm','incomeaccadm.incomeaccadm_id=outgoingaccadm.incomeaccadm_id')->where('incomeSRC',$username)->where('incomeSRC',1)->where('incomeSRC',0)->get("outgoingaccadm")->result();
return $result;
// print_r($result);exit();

}
//---------------------------------Fetch by date range------------------------//
   
    public function fetchIncomeDateRng_post()
    {
        $password=$this->input->post('date');
        $userid=$this->input->post('toDate');

        $login_user_details=$this->db->where('date >=', $password)->where('toDate <=', $userid)->get('incomeaccadm');

        if($login_user_details->result()>0)
        {
        $login_user_detailssssss=$login_user_details->result();

        $r=$login_user_detailssssss;
        }
        else
        {
        $r='Failed';
        }

        $this->response($r);
    }

    public function fetchOutgoingDateRng_post()
    {
        $password=$this->input->post('date');
        $userid=$this->input->post('toDate');

        $login_user_details=$this->db->where('date >=', $password)->where('toDate <=', $userid)->get('outgoingaccadm');

        if($login_user_details->result()>0)
        {
        $login_user_detailssssss=$login_user_details->result();

        $r=$login_user_detailssssss;
        }
        else
        {
        $r='Failed';
        }

        $this->response($r);
    }


//-------------------------------INVOICE-----------------------------//
      public function getInvoice_get($id = 0)
   { 
        if(!empty($id)){
            $data = $this->db->get_where("incomeaccadm", ['id' => $id])->row_array();
            }
        else{
            $data = $this->db->get("")->result();
            }

        $this->response($data, REST_Controller::HTTP_OK);
    }

       public function getOutgoing_get($id = 0)
   { 
        if(!empty($id)){
            $data = $this->db->get_where("outgoingaccadm", ['id' => $id])->row_array();
            }
        else{
            $data = $this->db->get("")->result();
            }

        $this->response($data, REST_Controller::HTTP_OK);
    }



//---------------------------EMPLOYEE MANAGEMENT-----------------------------//

    public function postEmp_post(){
    if($this->input->post('name')){
        $data=array(
             'name'=>$this->input->post('name'), 
             'email'=>$this->input->post('email'),
             'phoneNo'=>$this->input->post('phoneNo'),
             'post'=>$this->input->post('post')
          );
      
       $r = $this->db->insert('employeemng',$data);
       $this->response($r);
    }
  }

    public function fetchEmp_get(){
        $data = $this->db->get("employeemng")->result();
        $this->response($data, REST_Controller::HTTP_OK);
    }

    public function updateEmp_post(){
    if($this->input->post('name')){
        $data=array(
             'name'=>$this->input->post('name'), 
             'email'=>$this->input->post('email'),
             'phoneNo'=>$this->input->post('phoneNo'),
             'post'=>$this->input->post('post'),
             'image'=>$this->input->post('image'),
             'expLetter'=>$this->input->post('expLetter'),
             'offerLetter'=>$this->input->post('offerLetter'),
             'bankDetails'=>$this->input->post('bankDetails')

          );
            $this->db->where('id',$this->input->post('id'));
            $r = $this->db->update('employeemng',$data);
       if($r){
        $status='Success';
       }else{
        $status='Failed';
       }
       $this->response($status);
    }
  }

   public function deleteEmp_delete($id) {

       $result = $this->db->where('id',$id)->delete('employeemng');
        if ($result) {
            $data='Successfully';
        } else {
            $data='Failed';
        }
         $this->response($data, REST_Controller::HTTP_OK);
    }
//-------------------------------TEST---------------------------------//

public function postDemo_post(){
    if($this->input->post('firstname')){
        $data=array(
             'firstname'=>$this->input->post('firstname'), 
             'lastname'=>$this->input->post('lastname'),
             'schoolName'=>$this->input->post('schoolName'),
             'schoolAddress'=>$this->input->post('schoolAddress'),
             'houseAddress'=>$this->input->post('houseAddress'),
             'city'=>$this->input->post('city'),
             // 'state'=>$this->input->post('state'),
             'email'=>$this->input->post('email'),
             'phoneNo'=>$this->input->post('phoneNo'),
             'password'=>$this->input->post('password')
          );
      
       $r = $this->db->insert('demo',$data);
       $this->response($r);
    }
  }

   public function fetchDemo_get(){
        $data = $this->db->get("demo")->result();
        $this->response($data, REST_Controller::HTTP_OK);
    }

       public function getDemo_get($id = 0)
   { 
        if(!empty($id)){
            $data = $this->db->get_where("demo", ['id' => $id])->row_array();
            }
        else{
            $data = $this->db->get("demo")->result();
            }

        $this->response($data, REST_Controller::HTTP_OK);
    }

    public function updateDemo_post(){
    if($this->input->post('firstname')){
        $data=array(
             'firstname'=>$this->input->post('firstname'), 
             'lastname'=>$this->input->post('lastname'), 
             'schoolName'=>$this->input->post('schoolName'), 
             'schoolAddress'=>$this->input->post('schoolAddress'), 
             'houseAddress'=>$this->input->post('houseAddress'), 
             'city'=>$this->input->post('city'), 
             'state'=>$this->input->post('city'), 
             'email'=>$this->input->post('state'),
             'phoneNo'=>$this->input->post('phoneNo'),
             'password'=>$this->input->post('password')
          );
            $this->db->where('id',$this->input->post('id'));
            $r = $this->db->update('demo',$data);
       if($r){
        $status='Success';
       }else{
        $status='Failed';
       }
       $this->response($status);
    }
  }

  public function deleteDemo_delete($id) {

       $result = $this->db->where('id',$id)->delete('demo');
        if ($result) {
            $data='Successfully';
        } else {
            $data='Failed';
        }
        $this->response($data, REST_Controller::HTTP_OK);
    }



}
?>