import React, { useEffect, useState } from 'react';
import { Input,Col,Label } from 'reactstrap';
import moment from 'moment';
import CommonTable from "../CommonTable";
import message from '../Message';
import api from '../../constants/api';

const PasspotExpirySummary = () => {
 
  const[remainderLists,setRemainderLists]=useState([]);
  const[data,setData]=useState([]);
  const [period, setPeriod] = useState({
    days: null
  });
  const today=new Date();


const handleInputs = (e) => {
  setPeriod({ ...period, [e.target.name]: e.target.value });
};
  const getAllEmployees=()=>{
    
    api.get('/employeeModule/getCurrentEmployee')
    .then((res) => {
      // setEmployees(res.data.data);
      // const remainders= res.data.data.filter((el)=>{
    
      //   return (new Date(el.date_of_expiry)) >= today && (new Date(el.date_of_expiry))<=lastDate
      //     })
          setData(res.data.data)
setRemainderLists(res.data.data);
    })
    .catch(() => {
      message('Employee Data Not Found', 'info');
     
    });
  }
  useEffect(()=>{
    const lastDate = new Date(new Date().setDate(today.getDate() + parseFloat(period.days)));
    const remainders= data.filter((el)=>{
    
      return (new Date(el.date_of_expiry)) >= today && (new Date(el.date_of_expiry))<=lastDate
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
    <CommonTable title="Passport Expiry Reminders">
    
       { remainderLists.length>0  && <> <thead>
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
                <td>{moment(elem.date_of_expiry).format('DD-MM-YYYY')}</td>
              </tr>
           )
          })}
            
        </tbody></>}
        {
          remainderLists.length <= 0 && <span>No employee has renewal for next {period.days} days.</span> 
        }
    </CommonTable>
    </>
  )
}

export default PasspotExpirySummary