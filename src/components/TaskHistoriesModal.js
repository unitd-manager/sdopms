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
import * as Icon from 'react-feather';
import api from '../constants/api';
import AttachmentModalV2 from './Tender/AttachmentModalV2';
import ViewFileComponentV2 from './ProjectModal/ViewFileComponentV2';
import ViewNote from './Tender/ViewNote';

const TaskHistoriesModal = ({
  taskhistoriesmodal,
  setTaskhistoriesmodal,
  contactDatas,
  id,
}) => {
  TaskHistoriesModal.propTypes = {
    taskhistoriesmodal: PropTypes.bool,
    setTaskhistoriesmodal: PropTypes.func,
    contactDatas: PropTypes.object,
    id: PropTypes.any,
  };

  const column = [
    {
      name: 'ID',
    },
  
    {
      name: 'Title',
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
      name: 'Total Amount',
      sortable: true,
    },
    {
      name: 'File',
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
    
    
    {
      name: 'Priority',
    },
    
    // {
    //   name: 'Creation ',
    // },
    // {
    //   name: 'Modification ',
    // },
  ];
  //All state variable

  const [employees, setEmployees] = useState();
  const [updateFile, setUpdateFile] = useState(true);
  const [fileTypes, setFileTypes] = useState();
  const [moduleId, setModuleId] = useState('');
  const [roomName, setRoomName] = useState('');
      //get staff details
      
     
      const [taskhistories, setTaskhistories] = useState([]);

  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [attachmentModal, setAttachmentModal] = useState(false);

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
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
    console.log('inside DataForAttachment');
  };

  

  useEffect(() => {
    getTaskEmployees();
    editJobByIds();
    
  }, [contactDatas]);

  

  return (
    <>
      <Modal size="lg" isOpen={taskhistoriesmodal}>
        <ModalHeader>
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
                        <td rowSpan="2">{index + 1}</td>
                     
                        <td style={{ borderRight: 1, borderWidth: 1 }}>{element.title}</td>
                        <td>{element.head_count}</td>
                        <td>{element.pipe}</td>
                        <td>{element.tb}</td>
                        <td>{element.plank}</td>
                        <td>{element.volume}</td>
                        <td>{element.total_amount}</td>
                        
                        <td>
                          <span
                            onClick={() => {
                              setRoomName('Task');
                              setFileTypes(['JPG', 'PNG', 'GIF', 'PDF']);
                              dataForAttachment();
                              setAttachmentModal(true);
                              setModuleId(element.project_task_id);
                            }}
                          >
                            <Icon.Plus />
                          </span>
                          <AttachmentModalV2
                            moduleId={moduleId}
                            attachmentModal={attachmentModal}
                            setAttachmentModal={setAttachmentModal}
                            roomName={roomName}
                            fileTypes={fileTypes}
                            altTagData="TaskRelated Data"
                            desc="TaskRelated Data"
                            recordType="RelatedPicture"
                            mediaType={attachmentData.modelType}
                            updateFile={updateFile}
                            setUpdateFile={setUpdateFile}
                          />
                          <ViewFileComponentV2
                            moduleId={element.project_task_id}
                            roomName="Task"
                            recordType="RelatedPicture"
                            updateFile={updateFile}
                            setUpdateFile={setUpdateFile}
                          />
                        </td>
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
                        <td>{element.priority}</td>
                        
                        {/* <td>
                          {element.created_by} {element.creation_date}
                        </td>
                        <td>
                          {element.modified_by} {element.modification_date}
                        </td> */}
                      </tr>
                      <tr>
                        <td colSpan="14" style={{ borderRight: 1, borderWidth: 1 }}>
                          <ViewNote
                            recordId={id}
                            roomName={element?.title}
                            projectTaskId={element?.project_task_id}
                          />
                        </td>
                      </tr>
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
                Cancel
              </Button>
            </div>
          </Row>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TaskHistoriesModal;