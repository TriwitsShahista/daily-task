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
//import { ChatEngine } from 'react-chat-engine'
 function App() {
  
  return (
    <>
    {/* <ChatEngine
    userName='Alexa'
    projectID='cc7662f3-b128-4109-9a19-f299d36a6527'
    userSecret='da9a2172-388c-45bb-8e37-83366b22ffa1'
    /> */}
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
    </Routes>
    </BrowserRouter>
    </>
  );
}
export default App;
