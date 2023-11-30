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
import moment from 'moment';
import api from '../constants/api';
// import ViewNote from './Tender/ViewNote';
import TaskHistoryEmployeeModal from './TaskHistoryEmployeeModal';

const TaskHistoriesModal = ({
  taskhistoriesmodal,
  setTaskhistoriesmodal,
  contactDatas,
  //id,
}) => {
  TaskHistoriesModal.propTypes = {
    taskhistoriesmodal: PropTypes.bool,
    setTaskhistoriesmodal: PropTypes.func,
    contactDatas: PropTypes.object,
    //id: PropTypes.any,
  };

  const column = [
    {
      name: 'ID',
    },
  
    // {
    //   name: 'Team',
    //   sortable: true,
    // },
    {
      name: 'Date',
      sortable: true,
    },
    {
      name: 'Head count',
    },
    {
      name: 'Pipe',
    },
    {
      name: 'T/B',
      sortable: true,
    },
    {
      name: 'Plank',
    },
    {
      name: 'Volume',
    },
    {
      name: 'Total Amount($)',
      sortable: true,
    },
    {
      name: 'Share Per Head',
    },
    {
      name: 'View',
    },
    // {
    //   name: 'Staff',
    // },
    // {
    //   name: 'startdate',
    //   sortable: true,
    // },
    // {
    //   name: 'End Date',
    // },
    // {
    //   name: 'Actual completed Date',
    // },
    // {
    //   name: 'Actual Hours',
    // },
    // {
    //   name: 'Est Hours',
    // },
   
    // {
    //   name: 'Completion',
    // },
    
    
    // {
    //   name: 'Priority',
    // },
    
    // {
    //   name: 'Creation ',
    // },
    // {
    //   name: 'Modification ',
    // },
  ];
  //All state variable

  const [employees, setEmployees] = useState();
  // const [updateFile, setUpdateFile] = useState(true);
  // const [fileTypes, setFileTypes] = useState();
  // const [moduleId, setModuleId] = useState('');
  // const [roomName, setRoomName] = useState('');
      //get staff details
    const [taskhistoryIdForEmployee,setTaskhistoryIdForEmployee]=useState(null);
    const [taskhistoryEmployeeModal,setTaskhistoryEmployeeModal]=useState(false);
      const [taskhistories, setTaskhistories] = useState([]);

  // const [attachmentData, setDataForAttachment] = useState({
  //   modelType: '',
  // });
  // const [attachmentModal, setAttachmentModal] = useState(false);

  // Gettind data from Job By Id
  const editJobByIds = () => {
    api
      .get('/jobinformation/getEmployee')
      .then((res) => {
        setEmployees(res.data.data);
      })
      .catch(() => {});
  };
  const getTaskEmployees = () => {
    api
      .post('/projectTask/getTaskHistoriesByTaskId',{task_id:contactDatas.project_task_id})
      .then((res) => {
        console.log(res.data.data);
        setTaskhistories(res.data.data);
      })
      .catch(() => {});
  };
  
console.log(employees)
 
  
  //attachments
  // const dataForAttachment = () => {
  //   setDataForAttachment({
  //     modelType: 'attachment',
  //   });
  //   console.log('inside DataForAttachment');
  // };

  

  useEffect(() => {
    getTaskEmployees();
    editJobByIds();
    
  }, [contactDatas]);

  

  return (
    <>
      <Modal size="xl" isOpen={taskhistoriesmodal}>
        <ModalHeader style={{ backgroundColor: ' #0096FF', color: 'white' }}>
          Task Details
          <Button
            color="secondary"
            onClick={() => {
                setTaskhistoriesmodal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          {/* task Details */}
         
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
              {taskhistories &&
                taskhistories.map((element, index) => {
                  return (
                    <>
                      <tr key={element.task_history_id}>
                        <td >{index + 1}</td>
                     
                        {/* <td >{element.team_title}</td> */}
                        <td>{element.date ? moment(element.date).format('DD-MM-YYYY') : ''}</td>
                        <td>{element.head_count}</td>
                        <td>{element.pipe}</td>
                        <td>{element.tb}</td>
                        <td>{element.plank}</td>
                        <td>{element.volume}</td>
                        <td>{element.total_amount}</td>
                        <td>{element.share_per_head}</td>
                        <td>
                        <u
                className="shadow-none"
                color="primary" onClick={()=>{setTaskhistoryIdForEmployee(element.task_history_id);setTaskhistoryEmployeeModal(true)}}>
                            View 
                          </u>
                        </td>
                        
                        </tr>
                        {/* <td>
                          {element.start_date
                            ? moment(element.start_date).format('DD-MM-YYYY')
                            : ''}
                        </td>
                        <td>
                          {element.end_date ? moment(element.end_date).format('DD-MM-YYYY') : ''}
                        </td>
                        <td>
                          {element.actual_completed_date
                            ? moment(element.actual_completed_date).format('DD-MM-YYYY')
                            : ''}
                        </td>
                        <td>{element.actual_hours}</td>
                        <td>{element.estimated_hours}</td>
                        
                        <td>{element.completion}</td>
                        
                       */}
                       
                        
                        {/* <td>
                          {element.created_by} {element.creation_date}
                        </td>
                        <td>
                          {element.modified_by} {element.modification_date}
                        </td> */}
                    
                      {/* <tr>
                        <td colSpan="14" style={{ borderRight: 1, borderWidth: 1 }}>
                          <ViewNote
                            recordId={id}
                            roomName={element?.title}
                            projectTaskId={element?.project_task_id}
                          />
                        </td>
                      </tr> */}
                    </>
                  );
                })}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Row>
            <div className="pt-3 mt-3 d-flex align-items-center gap-2">
            
              <Button
                color="secondary"
                onClick={() => {
                    setTaskhistoriesmodal(false);
                }}
              >
                Close
              </Button>
            </div>
          </Row>
        </ModalFooter>
      </Modal>
      {taskhistoryEmployeeModal&&<TaskHistoryEmployeeModal
      taskHistoryId={taskhistoryIdForEmployee}
      taskhistoryEmployeemodal={taskhistoryEmployeeModal}
      setTaskhistoryEmployeeModal={setTaskhistoryEmployeeModal}
      >
        </TaskHistoryEmployeeModal>}
    </>
  );
};

export default TaskHistoriesModal;