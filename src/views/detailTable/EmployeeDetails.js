import React,{useEffect, useState} from 'react';
import {Row,Col,FormGroup,Label,Input,Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import api from '../../constants/api'
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';


const EmployeeDetails = () => {

 //state variables 
 const [empcode, setEmpcode] = useState();
const [employeeData,setEmployeeData]=useState({
  first_name:"",
  citizen:"",
  nric_no:"",
  fin_no:"",
  work_permit_no:"",
  status:"",
  emp_code:"",
  date_of_birth:moment(),
  date_of_expiry:moment(),
  fin_no_expiry_date:moment(),
  work_permit_expiry_date:moment(),
  year_of_completion1:moment(),
  year_of_completion2:moment(),
  year_of_completion3:moment()
});
const [passtype,setPasstype]=useState('');
//routing
const navigate=useNavigate();

  const handleInputs=(e)=>{
    setEmployeeData({...employeeData, [e.target.name]:e.target.value})
  }
  const handlePasstype=(e)=>{
    setPasstype(e.target.value)
  }
//getting maximum of Employeecode
const getMaxEmpcode = () => {
  api.get('/employeeModule/getMaxEmpCode')
    .then((res) => {
      setEmpcode(res.data.data[0].empc)
      
    })
}
   //Insert Employee Data
   const insertEmployee = () => {
    employeeData.emp_code= parseFloat(empcode)+ 1;
    employeeData.date_of_birth=moment()
  employeeData.date_of_expiry=moment()
  employeeData.fin_no_expiry_date=moment()
  employeeData.work_permit_expiry_date=moment()
  employeeData.year_of_completion1=moment()
  employeeData.year_of_completion2=moment()
  employeeData.year_of_completion3=moment()
    console.log('employeeData',employeeData)
    if(employeeData.first_name!=="" && employeeData.status!=="" && employeeData.citizen!==""){
      if(employeeData.nric_no!=="" || employeeData.fin_no!==""){
    api.post('/employeemodule/insertEmployee', employeeData)
    .then((res) => {
      const insertedDataId= res.data.data.insertId
      console.log(insertedDataId)
      message('Employee inserted successfully.','success')
      setTimeout(()=> {
        navigate(`/EmployeeDetailsData/${insertedDataId}`)
      },300);     
    })
    .catch(() => {
      message('Unable to create employee.', 'error')
    })
  }else {
    message('Please fill all required fields.', 'warning');
  }}else{
    message('Please fill all required fields.', 'warning');
  }
}
useEffect(()=>{getMaxEmpcode();},[])
  return (
    <div>
      <ToastContainer></ToastContainer>
      <BreadCrumbs />
      <Row>
        <Col md="6">
          <ComponentCard title="Key Details">
            
            <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>Full Name  <span style={{color: 'red'}}>*</span></Label>
                    <Input name="first_name" value={employeeData && employeeData.first_name} onChange={handleInputs} type="text"/>
                </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>Pass Type  <span style={{color: 'red'}}>*</span></Label>
                    <Input name="citizen" value={employeeData && employeeData.citizen} onChange={(e)=>{handleInputs(e);handlePasstype(e)}} type="select">
                        <option value="" selected="selected">Please Select</option>
                        <option value="Citizen">Citizen</option>
                        <option value="PR">PR</option>
                        <option value="EP">EP</option>
                        <option value="SP">SP</option>
                        <option value="WP">WP</option>
                        <option value="DP">DP</option>
                    </Input>
                </Col>
                </Row>
              </FormGroup>
              {(passtype === "Citizen" || passtype === 'PR') && (<FormGroup>
                <Row>
                  <Col md="12">
                    <Label>NRIC No  <span style={{color: 'red'}}>*</span></Label>
                    <Input name="nric_no" value={employeeData && employeeData.nric_no} onChange={handleInputs} type="number"/>
                  </Col>
                </Row>
              </FormGroup>) }
               
              {(passtype === "EP" || passtype === 'SP' || passtype === 'DP' || passtype === 'WP') &&  (<FormGroup>
                <Row>
                  <Col md="12">
                    <Label>Fin No  <span style={{color: 'red'}}>*</span></Label>
                    <Input name="fin_no" value={employeeData && employeeData.fin_no} onChange={handleInputs} type="number"/>
                  </Col>
                </Row>
              </FormGroup>)}
             
              {/* <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>Passport Expiry *</Label>
                    <Input name="first_name" value={employeeData && employeeData.first_name} onChange={handleInputs} type="text"/>
                </Col>
                </Row>
              </FormGroup> */}
             
              {passtype === "WP" && 
              <>
              
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>Work Permit No</Label>
                    <Input name="work_permit_no" value={employeeData && employeeData.work_permit_no} onChange={handleInputs} type="number"/>
                  </Col>
                </Row>
              </FormGroup>
              </>
              }
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>Status  <span style={{color: 'red'}}>*</span></Label>
                    <Input name="status" value={employeeData && employeeData.status} onChange={handleInputs} type="select">
                        <option selected="selected" value="Current">Current</option>
                        <option value="Archive">Archive</option>
                        <option value="Cancel">Cancel</option>
                    </Input>
                </Col>
                </Row>
                <Row>
                    <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                        <Button type="submit" color="primary" className="btn mr-2 shadow-none" onClick={insertEmployee}>
                        Save & Continue
                        </Button>
                        <Button type="submit" className="btn btn-dark shadow-none" onClick={()=>{navigate('/Employee')}}>
                        Cancel
                        </Button>
                     </div>
                </Row>
              </FormGroup>
            
          </ComponentCard>
        </Col>
        
      </Row>
      
    </div>
  );
};

export default EmployeeDetails;
