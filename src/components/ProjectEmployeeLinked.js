import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Button } from 'reactstrap';
import { useParams, } from 'react-router-dom';
import random from 'random'
import * as $ from "jquery";
import Select from 'react-select';
import PropTypes from 'prop-types';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ComponentCard from './ComponentCard';
import message from './Message';
import api from '../constants/api';


const ProjectEmployeeLinked = ({
  projectId,
  
}) => {
  ProjectEmployeeLinked.propTypes = {
   
    projectId: PropTypes.any,
  };

  //All state variables
  const [employeeLinked, setEmployeeLinked] = useState();
  const [prevEmployee, setPreviousEmployee] = useState()
  

    // Navigation and Parameter Constants
    const { id } = useParams();
    
    // Addline item in Link employee
    const [addLineItem, setAddLineItem] = useState([{
    "id": random.int(1, 99),
    "employee_name": "",
    "employee_id": "",
   },])
//Onchange item in training staff employee name selectfield
   const onchangeItem = (str, itemId) => {
    const element = addLineItem.find(el => el.id === itemId)
    element.employee_name = str.label
    element.employee_id = str.value.toString()
    setAddLineItem(addLineItem)
  }
  // Add new line item in link Employee
  const AddNewLineItem = () => {
      setAddLineItem([...addLineItem, {
      "id": random.int(1, 99),
      "employee_name": "",
      "employee_id": "",
    },])}
  //getting Training Staff data by training id
  const getLinkedEmployee = () => {
    
    // eslint-disable-next-line
    api.post('/projectteam/getTeamEmployeeById', { project_team_id: parseInt(id) })
      .then((res) => {
        
        const resData = res.data.data
        const empArray = []
        resData.forEach(element => {
          empArray.push({
            "id": random.int(1, 99),
            "employee_name":element.employee_name,
            "employee_id": element.employee_id,
            "team_employee_id": element.team_employee_id
          })
        });
        
        setPreviousEmployee([...empArray])
      })
      .catch(() => {
        message("Training Data Not Found", 'info')
      })
  }
  //Get employee name and id for linked employee select field
  const getEmployee = () => {
    api.get('/projectteam/getEmployeeName', employeeLinked)
      .then((res) => {
        const items = res.data.data
        const finaldat = []
        items.forEach(item => {
          finaldat.push({ value: item.employee_id, label:item.employee_name })
        })
        setEmployeeLinked(finaldat)
      })
  }
  //edit data in link employee 
  const insertTrainingStaff = ( staffObj) => {
    api.post('/projectteam/insertTeamEmployee', {
    
      employee_id: staffObj.employee_id
      ,project_team_id:projectId
    })
      .then(() => {
        message('Project Employee Added!', 'success')
        window.location.reload()
      })
      .catch(() => {
        message('Unable to insert record.', 'error')
      })
  }

  //Insert Training
  const insertTrainingData = () => {
    const result = [];
    const oldArray = addLineItem
    $(".newemp tbody tr").each(function input() {
      const allValues = {};
      $(this).find("input").each(function output() {
        const fieldName = $(this).attr("name");
        allValues[fieldName] = $(this).val();
      });
      result.push(allValues);
    })
    result.forEach(obj => {
         if (obj.id) {
        /* eslint-disable */
        // const objId = parseInt(obj.id)
        const foundObj = oldArray.find(el => el.id === parseInt(obj.id))
        if (foundObj) {
          obj.employee_id = foundObj.employee_id
        }
        insertTrainingStaff(obj)
      }
    })
     }
  

  useEffect(() => {
    getEmployee();
    getLinkedEmployee();
   
  }, [projectId])

//Delete Training staff data by training staff id
  const deleteTrainingStaffData = (staffId) => {
    api.post('/projectteam/deleteTeamEmployee', { team_employee_id: staffId })
      .then(() => {
        message('Record deleted successfully', 'success')
        setTimeout(() => {
          window.location.reload()
        }, 300);
      })
      .catch(() => {
        message('Unable to delete record.', 'error')
      })
  }
  return (
    <>
      

      <ComponentCard> 

      <Row>
          <Col md="2">
            <Button color="primary" className='shadow-none'
              type='button'
              onClick={  () => { AddNewLineItem() }}>Add Employee</Button>
          </Col>
        <Col md ="2">
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  insertTrainingData();
               
                }}
              >
                Save
              </Button>
            </Col>
        </Row>
        <br />
        <Row>
          <table className='lineitem newemp border border-secondary rounded' >
            <thead>
              <tr>
                <th scope="col">Employee Name</th>
              </tr>
            </thead>
            <tbody>
              {addLineItem.map((item) => {
                return (
                  <tr key={item.id}>
                    <td data-label="Employee Name">
                      <Select
                        key={item.id}
                        defaultValue={{ value: item.employee_id, label: item.employee_name }}
                        onChange={(e) => {
                          onchangeItem(e, item.id)
                        }}
                        options={employeeLinked}/>
                      <Input value={item.employee_id.toString()} type="hidden" name="employee_id"></Input>
                    </td>
                    <td>
                      <Input type='hidden' name="id" defaultValue={item.id}></Input>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Row>
        

        {/* Training Staff */}
        <Row>
          <table className='lineitem  border border-secondary rounded' >
            <thead>
              <tr>
                <th scope="col">Employee Name</th>
              </tr>
            </thead>
            <tbody>
              {prevEmployee && prevEmployee.map((item) => {
                return (
                  <tr key={item.id}>
                    <td data-label="Employee Name">
                      <Select
                        key={item.id}
                        defaultValue={{ value: item.employee_id, label: item.employee_name }}
                        isDisabled={true}
                        options={employeeLinked}/>
                      <Input value={item.employee_id.toString()} type="hidden" name="employee_id"></Input>
                    </td>
                    <td>
                      <Input type='hidden' name="id" defaultValue={item.id}></Input>
                    </td>
                    {/* delete button from training staff*/}
                    <td><Button color="danger" className='shadow-none'
                    onClick={() => {{deleteTrainingStaffData(item.team_employee_id);}  }}>Delete</Button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Row>
        <br/>
        
        
      </ComponentCard>

    </>
  )
}
export default ProjectEmployeeLinked;
