import React, { useEffect, useState } from 'react'
import { Input,Col,Label } from 'reactstrap';
import moment from 'moment';
import CommonTable from "../CommonTable";
import message from '../Message';
import api from '../../constants/api';

const WorkpermitExpirySummary = () => {
  const[remainderLists,setRemainderLists]=useState([]);
  const[data,setData]=useState([]);
  const [period, setPeriod] = useState({
    days: null
  });
  const today=new Date();


const handleInputs = (e) => {
  setPeriod({ ...period, [e.target.name]: e.target.value });
}
  const getAllEmployees=()=>{
    
    api.get('/employeeModule/getCurrentEmployee')
    .then((res) => {
      // setEmployees(res.data.data);
      
      setData(res.data.data);
          
setRemainderLists(res.data.data);
    })
    .catch(() => {
      message('Employee Data Not Found', 'info');
     
    });
  }
  useEffect(()=>{
    const lastDate = new Date(new Date().setDate(today.getDate() + parseFloat(period.days)));
    const remainders= data.filter((el)=>{
    
      return (new Date(el.work_permit_expiry_date)) >= today && (new Date(el.work_permit_expiry_date))<=lastDate
        })
        setRemainderLists(remainders);
  },[period&& period.days])

  useEffect(()=>{
    getAllEmployees();
  },[])
  return (
    <>
      <Col md="3">
    <Label>Days</Label>
            <Input type="select" name="days" onChange={handleInputs}>
              <option value="">Please Select</option>
              <option value="60">next 60 Days</option>
              <option value="90">next 90 Days</option>
              <option value="120">next 120 Days</option>
              <option value="180">next 180 Days</option>
            </Input>
          </Col>
    <CommonTable title="Workpermit Expiry Reminders">
  { remainderLists.length >0  &&  <>  <thead>
            <tr>
                <td>Name</td>
                <td>Expiry Date</td>
                
           </tr>
        </thead>
        <tbody>
        { remainderLists&& remainderLists.map((elem)=>{
           return( 
             <tr key={elem.employee_id_duplicate}>
                <td>{elem.employee_name}</td>
                <td>{moment(elem.work_permit_expiry_date).format('DD-MM-YYYY')}</td>
              </tr>
           )
          })}
        </tbody></>}
        {
          remainderLists.length <=0 && <span>No employee has renewal for next {period.days} days.</span> 
        }
    </CommonTable>
    </>
  )
}
export default WorkpermitExpirySummary;