import React, { useState,useEffect } from 'react'
import {Input, Card,Row,Col,Button,Modal,ModalHeader,ModalBody, ModalFooter,Table } from 'reactstrap';
import PropTypes from 'prop-types'
import * as $ from 'jquery';
import api from '../../constants/api';
import message from '../Message';

function UpdateOtModal({updateOtModal,setUpdateOtModal}) {
    UpdateOtModal.propTypes = {
        updateOtModal: PropTypes.bool,
        setUpdateOtModal: PropTypes.func,
       
      }
      const [payrollManagementsData,setPayrollManagementsData] = useState([]);



       //get all records
    const getAllPayrollManagements = () =>{
      api.get('/payrollmanagement/getpayrollmanagementMain')
        .then((res)=> {
            setPayrollManagementsData(res.data.data)
            
        }) .catch(() => {
          message('Payrollmanagement Data Not Found', 'info');
        });
    }
 

//editlineitem
const editLineItemApi = (obj) => {
  console.log(obj)
  api
    .post('/payrollmanagement/updateOt', {
      payroll_management_id:obj.payroll_management_id,
      employee_name:obj.employee_name,
      ot_hours:obj.ot_hours,
      ot_amount:obj.ot_amount,
     allowance1: obj.allowance1,
     allowance2: obj.allowance2,
     allowance3: obj.allowance3,
     allowance4: obj.allowance4,
     allowance5: obj.allowance5,
     deduction1:obj.deduction1,
     deduction2:obj.deduction2,
     deduction3:obj.deduction3,
     deduction4:obj.deduction4
    })
    .then(() => {
      message('OT Details Edited Successfully', 'sucess');
    })
    .catch(() => {
      message('Cannot Edit OT Details', 'error');
    });
};

// getall values
const getAllValues = () => {
  const result = [];
  $('.display tbody tr').each(()=> {
    const allValues = {};
    $(this)
      .find('input')
      .each(()=> {
        const fieldName = $(this).attr('name');
        allValues[fieldName] = $(this).val();
      });
    result.push(allValues);
  });
  console.log(result);
  result.forEach((obj) => {
      if (obj.payroll_management_id !== '') {
        editLineItemApi(obj);
      } else {
        alert('No payrollManagement Id')
      }
    
  });
}
    useEffect(()=>{
        getAllPayrollManagements();
    },[])
    
  return (
    <>
    <Modal size='xl' isOpen={updateOtModal}>
    <ModalHeader>Update OT  <Button
            className="shadow-none"
            color="dark"
            onClick={() => {
              setUpdateOtModal(false);
            }}
          >
            X
          </Button></ModalHeader>
    <ModalBody >
        <Row>
        <Col md="12">
        <Card className='shadow-none overflow-auto'>
                          <Table className="display w-auto">
                            <thead>
                              <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">OT hr/rt</th>
                                <th scope="col">OT Rate</th>
                                <th scope="col">OT Hrs</th>
                                <th scope="col">Over Time Amount</th>
                                <th scope="col">Transport</th>
                                <th scope="col">Entertainment</th>
                                <th scope="col">Food</th>
                                 <th scope="col">Shift Allowance</th>
                                <th scope="col">Others</th>
                                <th scope="col">Housing </th>
                                <th scope="col">Transport</th>
                                <th scope="col">Others</th>
                                <th scope="col">Food</th>
                                
                              </tr>
                            </thead>
                            <tbody>
                              {payrollManagementsData.map((item) => {
                                return (
                                  <tr key={item.payroll_management_id}>
                                     <td data-label="payroll_management_id">
                                     <Input defaultValue={item.payroll_management_id} className='w-auto' type="text" name="payroll_management_id" disabled />
                                    </td>
                                    <td data-label="employee_name">
                                     <Input defaultValue={item.first_name} className='w-auto' type="text" name="employee_name" disabled />
                                    </td>
                                  
                                    <td data-label="ot_hours">
                                      <Input defaultValue={item.ot_hours}  type="text" name="ot_hours" />
                                    </td>
                                    <td data-label="overtime_pay_rate">
                                      {item.overtime_pay_rate}
                                   
                                    </td>
                                    <td data-label="ot_hours">
                                      <Input
                                        defaultValue={item.ot_hours}
                                        type="text"
                                        name="ot_hours"
                                
                                      />
                                    </td>
                                    <td data-label="ot_amount">
                                     {item.ot_amount}
                                   </td>
                                    <td data-label="allowance1">
                                     
                                        <Input
                                          type="text"
                                          name="allowance1"
                                          defaultValue={item.allowance1}
                                        ></Input>
                                      
                                    </td>
                                    <td data-label="allowance2">
                                      <Input
                                        defaultValue={item.allowance2}
                                        type="text"
                                        name="allowance2"
                                      />
                                    </td>
                                    <td data-label="allowance3">
                                      <Input
                                        defaultValue={item.allowance3}
                                        type="text"
                                        name="allowance3"
                                      />
                                    </td>
                                    <td data-label="allowance4">
                                      <Input
                                        defaultValue={item.allowance4}
                                        type="text"
                                        name="allowance4"
                                      />
                                    </td>
                                    <td data-label="allowance5">
                                      <Input defaultValue={item.allowance5} type="text" name="allowance5" />
                                    </td>
                                    <td data-label="deduction1">
                                      <Input defaultValue={item.deduction1} type="text" name="deduction1" />
                                    </td>
                                    <td data-label="deduction2">
                                      <Input
                                        defaultValue={item.deduction2}
                
                                        type="text"
                                        name="deduction2"
                                      />
                                    </td>
                                    <td data-label="deduction3">
                                      <Input
                                        defaultValue={item.deduction3}
                                        type="text"
                                        name="deduction3"
                                       
                                      />
                                    </td>
                                    <td data-label="deduction4">
                                      <Input
                                        defaultValue={item.deduction4}
                                        type="text"
                                        name="deduction4"
                                      />
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </Card>
        </Col>
        </Row>  
    </ModalBody>
    <ModalFooter>
        <Button color="primary" className='shadow-none' onClick={()=>{getAllValues();setUpdateOtModal(false)}}> Close </Button>
    </ModalFooter>
</Modal> 
</>
  )
}
export default UpdateOtModal