import React, { useEffect, useState,useContext } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  ModalBody,
  Modal,
  ModalHeader,
  ModalFooter,
  Form
} from 'reactstrap';
import PropTypes from 'prop-types';
import '../views/form-editor/editor.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import moment from 'moment';
import message from './Message';
import api from '../constants/api';
import creationdatetime from '../constants/creationdatetime';
import AppContext from '../context/AppContext';

const ProjectTaskEdit = ({
  editTaskEditModal,
  setEditTaskEditModal,
  contactDatas,
  getTaskById,
  id,
}) => {
  ProjectTaskEdit.propTypes = {
    editTaskEditModal: PropTypes.bool,
    setEditTaskEditModal: PropTypes.func,
    contactDatas: PropTypes.object,
    getTaskById: PropTypes.any,
    id: PropTypes.any,
  };

  //All state variable
  const [taskProject, setTaskProject] = useState();
  //const [employees, setEmployees] = useState();
  const [Team, setTeam] = useState();
  const [employee, setEmployee] = useState();
  //const [taskEmployee, setTaskEmployee] = useState([]);
  const [milestonesTaskEdit, setMilestonesTaskEdit] = useState([]);
      //get staff details
      const { loggedInuser } = useContext(AppContext);
      //const [taskEmployees, setTaskEmployees] = useState([]);
  // Gettind data from Job By Id
  // Gettind data from Job By Id
 // const [employees, setEmployees] = useState();
  
  //const [selectAll, setSelectAll] = useState(true);
  //const [TeamID, setTeamID] = useState();
  
  // const [selectedTeam, setSelectedTeam] = useState(''); // Store the selected team_title here
 ///////////// const [selectedNames, setSelectedNames] = useState([]); 

  // Gettind data from Job By Id
  const editJobById = () => {
    api
      .get('/projectteam/getProjectTeam')
      .then((res) => {
        console.log(res.data.data);
        setTeam(res.data.data);
      })
      .catch(() => {});
  };
  const getStaffName = () => {
    api
      .post('/projectteam/getEmployeeByID', { project_team_id: id })
      .then((res) => {
        setEmployee(res.data.data);
      })
      .catch(() => {});
  };
console.log(Team);
console.log(employee);
  // const gettaskStaffName = () => {
  //   api
  //     .post('/projectteam/getEmployeeByTaskID', { task_id: contactDatas.task_id })
  //     .then((res) => {
  //       setTaskEmployee(res.data.data);
  //     })
  //     .catch(() => {});
  // };

  // const checkAll = (e) => {
  //   const {checked} = e.target;
  //   const arr = selectedNames.slice();
  //   arr.forEach(val => {
  //     if (val.project_team_id === TeamID) {
  //       val.checked = checked;
  //     }
  //   });
  //   setSelectedNames(arr);
  //   const checkboxes = document.getElementsByName('employee_id_checkbox');
  //   for(let x = 0; x<checkboxes.length; x++){
  //     checkboxes[x].checked = checked;
  //   }
  //   setSelectAll(checked);
  // }
  // const handleCheckboxChange = (event, employeeId,teamId) => {
  //   const { checked } = event.target;
  //   const arr = selectedNames.slice();
  //   const index = arr.findIndex(value => {return value.employeeId === employeeId });
  //   if (checked) {
  //     // If the checkbox is checked, add the employeeId to the selectedNames array
  //     arr[index].checked = true;
  //     arr[index].project_team_id = teamId;
  //     setSelectedNames(arr);
  //   }else {
  //     // If the checkbox is unchecked, remove the employeeId from the selectedNames array
  //     arr[index].checked = false;
  //     arr[index].project_team_id = teamId;
  //     setSelectedNames(arr);
  //   }
  //   // if (event.target.checked === true ? 1 : 0) {
  //   //   setSelectedNames([...selectedNames, employeeId]);
  //   // } else {
  //   //   setSelectedNames(selectedNames.includes(employeeId));
  //   // }
  //   console.log('Employee ID:', employeeId);
  // };
  // console.log('Employee:', employee);
  // // const getTaskEmployees = () => {
  // //   api
  // //     .post('/projectTask/getTaskEmployees',{task_id:contactDatas.project_task_id})
  // //     .then((res) => {
  // //       console.log(res.data.data);
  // //       setTaskEmployees(res.data.data);
  // //     })
  // //     .catch(() => {});
  // // };
  // // Api call for getting project name dropdown
  const getMilestoneTask = () => {
    api
      .post('/projecttimesheet/getMilestoneTitle', { project_id: id })
      .then((res) => {
        setMilestonesTaskEdit(res.data.data);
      })
      .catch(() => {
        message('Milestone not found', 'info');
      });
  };
  // const fetchEmployeeDetails = (projectTeamId) => {
  //   api
  //     .post('/projectteam/getEmployeeByID', { project_team_id: projectTeamId })
  //     .then((res) => {
  //       const arr = selectedNames.slice();
  //       res.data.data.forEach(val => {
  //         if (arr.findIndex(value => value.employeeId === val.employee_id) < 0) {
  //           arr.push({checked: false, employeeId: val.employee_id, project_team_id: val.project_team_id})
  //         }
  //       });
        
  //       setSelectedNames(arr);
  //       setEmployees(res.data.data);
  //       setTeamID(projectTeamId);
  //       console.log('employees',res.data.data)
  //     })
  //     .catch(() => {});
  // };
  const handleInputs = (e) => {
    if (e.target.type === 'checkbox') {
      // If the event target is a checkbox, update task_input based on its checked state
      setTaskProject({
        ...taskProject,
        [e.target.name]: e.target.checked ? 1 : 0,
      });
    } else {
      // For other input fields, update normally
      setTaskProject({
        ...taskProject,
        [e.target.name]: e.target.value,
      });
    }
  };

  const editTaskProject = () => {
    taskProject.modification_date = creationdatetime;
    taskProject.modified_by= loggedInuser.first_name; 
    if (taskProject.task_title !== '') {
      api
        .post('/projecttask/editTask', taskProject)
        .then(() => {
          message('Task Detail has been editted successfully', 'success');
          getTaskById();
          setEditTaskEditModal(false);
          // setTimeout(() => {
          //   setEditTaskEditModal(false);
          // }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('error');
    }
  };
  

  // const [addNoteData, setAddNoteData] = useState({
  //   comments: '',
  //   record_id: id,
  //   creation_date: moment().format('DD-MM-YYYY'),
  // });

  // const handleData = (e) => {  
  //   setAddNoteData((prevData) => ({
  //     ...prevData,
  //     [e.target.name]: e.target.value,
  //     project_task_id: taskProject?.project_task_id,
  //     room_name:taskProject?.title,
  //     subject:taskProject?.task_title
  //   }));
  //   };


    // const SubmitNote = () => {
    //   if (addNoteData.comments !== '') {
    //     api.post('/note/addNote', addNoteData).then(() => {
    //       message('Add Note Successfully', 'success');
    //       // setTimeout(() => {
    //       //   window.location.reload();
    //       // }, 400);
    //     });
    //   }
    //   return null;
    // };
        
    
    const edittaskcompletiondate = () => {
      taskProject.modification_date = creationdatetime;
      taskProject.modified_by = loggedInuser.first_name;
      
      if (taskProject && taskProject.status === 'Completed') {
        api
          .post('/projecttask/editActualcompletedDate', { project_task_id: taskProject.project_task_id })
          .then(() => {
            // If the task is marked as Completed, update the milestone's actual_completed_date
            if (taskProject.project_milestone_id) {
              api
                .post('/projecttask/UpdateActualcompletedDate', {
                  project_milestone_id: taskProject.project_milestone_id,
                  actual_completed_date: moment().format('YYYY-MM-DD'),
                })
                .then(() => {
                  message('Task and milestone completed successfully', 'success');
                })
                .catch(() => {
                  message('Unable to update milestone actual_completed_date.', 'error');
                });
            } else {
              message('Task has been completed successfully', 'success');
            }
          })
          .catch(() => {
            message('Unable to edit task record.', 'error');
          });
      }
    };
    
    // useEffect(() => {
    //   setSelectAll(true);
    //   selectedNames.filter(val => val.project_team_id === TeamID).forEach(val => {
    //     let check = true;
    //     if (!val.checked) {
    //       setSelectAll(false);
    //       check = false;
    //     }
    //     return check;
    //   });
    // }, [selectedNames, TeamID]);
  


  useEffect(() => {
    //getTaskEmployees();
    //gettaskStaffName();
    editJobById();
    setTaskProject(contactDatas);
  }, [contactDatas]);

  useEffect(() => {
    getMilestoneTask();
    getStaffName();
  }, [id]);

  return (
    <>
      <Modal size="lg" isOpen={editTaskEditModal}>
        <ModalHeader style={{ backgroundColor: ' #0096FF', color: 'white' }}>
          Task Details
          <Button
            color="secondary"
            onClick={() => {
              setEditTaskEditModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          {/* task Details */}
          <Form>
            <FormGroup>
                  <Form>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <Label>Milestone Title</Label>
                          <Input
                            type="select"
                            name="project_milestone_id"
                            value={taskProject && taskProject.project_milestone_id}
                            onChange={handleInputs}
                          >
                            <option>Select Project</option>
                            {milestonesTaskEdit &&
                              milestonesTaskEdit.map((e) => (
                                <option key={e.project_id} value={e.project_milestone_id}>
                                  {e.milestone_title}
                                </option>
                              ))}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Title</Label>
                          <Input
                            type="text"
                            onChange={handleInputs}
                            value={taskProject && taskProject.task_title}
                            name="task_title"
                          />
                        </FormGroup>
                      </Col>
                      {/* <Col md="4">
                            <FormGroup>
                              <Label>Team </Label>
                              <Input
                                type="select"
                                name="project_team_id"
                                onChange={(e) => {
                                  const selectedEmployeeId = e.target.value;
                                  fetchEmployeeDetails(selectedEmployeeId);
                                }}
                              >
                                <option value="">Please Select</option>
                                {Team &&
                                  Team.map((ele) => (
                                    <option key={ele.project_team_id} value={ele.project_team_id}>
                                      {ele.team_title}
                                    </option>
                                  ))}
                              </Input>
                            </FormGroup>
                          </Col>
                          <Row>
                            <Table className="no-wrap mt-3 align-middle" responsive borderless>
                              <thead>
                                <tr>
                                  <th>
                                    <input
                                      type="checkbox"
                                      name="checkAll"
                                      id="checkAll"
                                      onChange={(e) =>
                                        checkAll(e)
                                      }
                                      checked={selectAll}
                                    />
                                  </th>
                                  <th>Employee Name</th>
                                </tr>
                              </thead>
                              <tbody>
                                {employees &&
                                  employees.filter(val => parseFloat(val.project_team_id) === parseFloat(TeamID)).map((element) => {
                                    const index = selectedNames.findIndex(value => value.employeeId === element.employee_id);
                                    const indexes =taskEmployee.forEach((el)=>{ selectedNames.findIndex(value => value.employeeId === el.employee_id);})
                                    const isChecked =indexes>0?selectedNames[index].checked: index >=0 ? selectedNames[index].checked : false;
                                    return (
                                      <tr key={element.project_team_id}>
                                        <td>
                                          <input
                                            type="checkbox"
                                            name="employee_id_checkbox"
                                            onChange={(e) =>
                                              handleCheckboxChange(e, element.employee_id,element.project_team_id)
                                            }
                                            // checked= {selectedNames.includes(element.employee_id) === 'true' }// Always checked by default
                                            defaultChecked={isChecked}
                                          />
                                        </td>
                                        <td>{element.first_name}</td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </Table>
                          </Row> */}
                      <Col md="4">
                        <FormGroup>
                          <Label>Head Count</Label>
                          <Input
                            type="text"
                            onChange={handleInputs}
                            value={taskProject && taskProject.head_count}
                            name="head_count"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Start date</Label>
                          <Input
                            type="date"
                            onChange={handleInputs}
                            value={moment(taskProject && taskProject.start_date).format(
                              'YYYY-MM-DD',
                            )}
                            name="start_date"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>End date</Label>
                          <Input
                            type="date"
                            onChange={handleInputs}
                            value={moment(taskProject && taskProject.end_date).format('YYYY-MM-DD')}
                            name="end_date"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Estimated Hours</Label>
                          <br />
                          <Input
                            type="text"
                            value={taskProject && taskProject.estimated_hours}
                            name="actual_hours"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      {/* <Col md="4">
                        <FormGroup>
                          <Label>Est Hours</Label>
                          <Input
                            type="numbers"
                            name="estimated_hours"
                            onChange={handleInputs}
                            value={taskProject && taskProject.estimated_hours}
                          />
                        </FormGroup>
                      </Col> */}
                      <Col md="4">
                        <FormGroup>
                          <Label>Completion</Label>
                          <Input
                            type="text"
                            name="completion"
                            onChange={handleInputs}
                            value={taskProject && taskProject.completion}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Status</Label>
                          <Input
                            type="select"
                            name="status"
                            onChange={handleInputs}
                            value={taskProject && taskProject.status}
                          >
                            {' '}
                            <option value="" selected="selected">
                              Please Select
                            </option>
                            <option value="Pending">Pending</option>
                            <option value="InProgress">InProgress</option>
                            <option value="Completed">Completed</option>
                            <option value="OnHold">OnHold</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Task type</Label>
                          <Input
                            type="select"
                            name="task_type"
                            onChange={handleInputs}
                            value={taskProject && taskProject.task_type}
                          >
                            {' '}
                            <option value="" selected="selected">
                              Please Select
                            </option>
                            <option value="Erection">Erection</option>
                            <option value="Dismantel">Dismantel</option>
                           
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Pipe Code</Label>
                          <Input
                            type="text"
                            name="pipe_code"
                            onChange={handleInputs}
                            value={taskProject && taskProject.pipe_code}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Plank Code</Label>
                          <Input
                            type="text"
                            name="plank_code"
                            onChange={handleInputs}
                            value={taskProject && taskProject.plank_code}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Volume Code</Label>
                          <Input
                            type="text"
                            name="volume_code"
                            onChange={handleInputs}
                            value={taskProject && taskProject.volume_code}
                          />
                        </FormGroup>
                      </Col>
                      
                      <Col md="4">
                        <FormGroup>
                          <Label>TB Code</Label>
                          <Input
                            type="text"
                            name="tb_code"
                            onChange={handleInputs}
                            value={taskProject && taskProject.tb_code}
                          />
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <Label>Description</Label>
                          <Input
                            type="textarea"
                            name="description"
                            onChange={handleInputs}
                            value={taskProject && taskProject.description}
                          />
                        </FormGroup>
                      </Col>
                      {/* <Col md="4">
                        <FormGroup>
                          <Label>Priority</Label>
                          <Input
                            type="select"
                            name="priority"
                            onChange={handleInputs}
                            value={taskProject && taskProject.priority}
                          >
                            {' '}
                            <option value="" selected="selected">
                              Please Select
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <Label>Description</Label>
                          <Input
                            type="textarea"
                            name="description"
                            onChange={handleInputs}
                            value={taskProject && taskProject.description}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                    <FormGroup>
                      <Label>Employees in this Task</Label>
                      <ul>
                      {taskEmployees && taskEmployees.map((el)=>{
                        return <li >
                          {el.first_name}
                        </li>
                      })}
                      </ul>
                    </FormGroup>
                  </Col>
                      <Col md="12">
                        <FormGroup>
                          <Label>Add Note</Label>
                          <textarea id="note" name="comments" rows="4" cols="77" onChange={handleData} />
                        </FormGroup>
                      </Col> */}
                    </Row>
                  </Form>
            </FormGroup>
            {/* <FormGroup>
            <Label>Apply To All</Label>
              <Input
              type="checkbox"
             name="task_input"
               onChange={handleInputs}
               checked={taskProject && taskProject.task_input === 1} // Set the checked state based on the value in taskProject
  />
</FormGroup> */}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Row>
            <div className="pt-3 mt-3 d-flex align-items-center gap-2">
              <Button
                color="primary"
                onClick={() => {
                  editTaskProject();
                  //editmilestonecompletiondate();
                  edittaskcompletiondate();
                  //SubmitNote();
                  //handleSubmit();
                }}
              >
                Submit
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  setEditTaskEditModal(false);
                }}
              >
                close
              </Button>
            </div>
          </Row>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ProjectTaskEdit;