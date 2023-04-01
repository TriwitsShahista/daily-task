<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class TestPrac_model extends CI_Model {
  protected $table = 'testprac';
  protected $primaryKey = 'id';
  protected $allowedFields = ['name','email','phoneNo','password'];

  public function postTestPrac()
  {
    $this->TestPrac_model->insert();
  }

  public function login_post()
  {
    $this->Welcome_model->login_post();
  }

  public function postLeadMng()
  {
    $this->TestPrac_model->insert();
  }
}
?>