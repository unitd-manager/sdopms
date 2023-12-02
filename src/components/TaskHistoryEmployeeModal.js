import React, { useEffect, useState} from 'react';
import {
  Row,
  Button,
  ModalBody,
  Modal,
  ModalHeader,
  ModalFooter,
  Table
} from 'reactstrap';
import PropTypes from 'prop-types';
import '../views/form-editor/editor.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
//import * as Icon from 'react-feather';
import api from '../constants/api';


const TaskHistoryEmployeeModal = ({
  taskhistoryEmployeemodal,
  setTaskhistoryEmployeeModal,
  contactDatas,
  taskHistoryId,
}) => {
  TaskHistoryEmployeeModal.propTypes = {
    taskhistoryEmployeemodal: PropTypes.bool,
    setTaskhistoryEmployeeModal: PropTypes.func,
    contactDatas: PropTypes.object,
    taskHistoryId: PropTypes.any,
  };

 
  //All state variable

  const [employees, setEmployees] = useState();
  
  
  const getTaskHistoryEmployees = () => {
    api
      .post('/projectTask/getTaskHistoryEmployees',{task_history_id:taskHistoryId})
      .then((res) => {
        console.log(res.data.data);
        setEmployees(res.data.data);
      })
      .catch(() => {});
  };
  
console.log(employees)
 

    
const column = [
  
  {
    name: 'Employee Name',
    sortable: true,
  },
  {
    name: 'Team',
    sortable: true,
  }]


  useEffect(() => {
    getTaskHistoryEmployees();
   
  }, [contactDatas]);

  

  return (
    <>
      <Modal size="lg" isOpen={taskhistoryEmployeemodal}>
        <ModalHeader style={{ backgroundColor: ' #0096FF', color: 'white' }}>
          Name of the Employees 
          <Button
            color="secondary"
            onClick={() => {
                setTaskhistoryEmployeeModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>


        <Table
            id="example"
            className="display border border-secondary rounded"
            title="projectTask List"
          >
            <thead>
              <tr>
                {column.map((cell) => {
                  return (
                    <th key={cell.name} >
                      {cell.name}
                      
                    </th>
                  );
                  // return <td key={cell.name}>{cell.name}</td>;
                })}
              </tr>
            </thead>
            <tbody>
            {employees&&employees.map((el)=>{
            return<tr >
                <td>{el.employee_name || el.first_name}</td>
                <td>{el.team_title}</td> 
            </tr>
         })}
            </tbody>
          </Table>
          {/* task Details */}
        
          
        </ModalBody>

        <ModalFooter>
          <Row>
            <div className="pt-3 mt-3 d-flex align-items-center gap-2">
            
              <Button
                color="secondary"
                onClick={() => {
                    setTaskhistoryEmployeeModal(false);
                }}
              >
                Close
              </Button>
            </div>
          </Row>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TaskHistoryEmployeeModal;