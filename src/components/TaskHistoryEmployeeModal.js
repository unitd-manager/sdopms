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
 
  


  useEffect(() => {
    getTaskHistoryEmployees();
   
  }, [contactDatas]);

  

  return (
    <>
      <Modal size="lg" isOpen={taskhistoryEmployeemodal}>
        <ModalHeader>
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
          {/* task Details */}
         {employees&&employees.map((el)=>{
            return<li>
                {el.first_name}
            </li>
         })}
          
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
                Cancel
              </Button>
            </div>
          </Row>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TaskHistoryEmployeeModal;