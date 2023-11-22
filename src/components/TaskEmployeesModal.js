import React, { useEffect, useState} from 'react';
import {
  Row,
  Button,
  ModalBody,
  Modal,
  ModalHeader,
  ModalFooter,
  
} from 'reactstrap';
import PropTypes from 'prop-types';
import '../views/form-editor/editor.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
//import * as Icon from 'react-feather';
import api from '../constants/api';


const TaskEmployeesModal = ({
  taskEmployeesModal,
  setTaskEmployeesModal,
  taskId,
}) => {
  TaskEmployeesModal.propTypes = {
    taskEmployeesModal: PropTypes.bool,
    setTaskEmployeesModal: PropTypes.func,
    taskId: PropTypes.any,
  };

 
  //All state variable

  const [employees, setEmployees] = useState();
  
  
  const getTaskHistoryEmployees = () => {
    api
      .post('/projectTask/getTaskEmployees',{task_id:taskId})
      .then((res) => {
        console.log(res.data.data);
        setEmployees(res.data.data);
      })
      .catch(() => {});
  };
  
console.log(employees)
 
  


  useEffect(() => {
    getTaskHistoryEmployees();
   
  }, [taskId]);

  

  return (
    <>
      <Modal size="lg" isOpen={taskEmployeesModal}>
        <ModalHeader>
          Employees Details
          <Button
            color="secondary"
            onClick={() => {
                setTaskEmployeesModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          {/* task Details */}
         {employees&&employees.map((el)=>{
            return<li>
                {el.first_name}(team)
            </li>
         })}
          
        </ModalBody>
        <ModalFooter>
          <Row>
            <div className="pt-3 mt-3 d-flex align-items-center gap-2">
            
              <Button
                color="secondary"
                onClick={() => {
                    setTaskEmployeesModal(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </Row>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TaskEmployeesModal;