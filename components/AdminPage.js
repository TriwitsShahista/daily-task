import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

function AdminPage() {
    const navigate = useNavigate();
    
    return(
        <>
         <div className="button-container" class="division">
        <input type="submit" value="Log Out" onClick={() => navigate("/admin")} /> 
       </div>
        <div className="button-container" class="division">
        <input type="submit" value="Add User" onClick={() => navigate("/")} /> 
       </div>
        <div className="button-container" class="division">
        <input type="submit" value="User View" onClick={() => navigate("/table")} /> 
       </div>
        <div className="button-container" class="division">
        <input type="submit" value="LeadMng View" onClick={() => navigate("/leadMngTable1")} /> 
       </div>
       </>
    );
}
export default AdminPage;