<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Demo_model extends CI_Model {
  protected $table = 'demo';
  protected $primaryKey = 'id';
  protected $allowedFields = ['firstname','lastname','schoolName','schoolAddress','houseAddress','city','state','email','phoneNo','password'];

  public function postDemo()
  {
    $this->Demo_model->insert();
  }
}
?>