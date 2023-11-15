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
  Form,
  Table
} from 'reactstrap';
import PropTypes from 'prop-types';
import '../views/form-editor/editor.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import moment from 'moment';
import message from './Message';
import api from '../constants/api';
import creationdatetime from '../constants/creationdatetime';
import AppContext from '../context/AppContext';

const TaskHistoryModal = ({
  taskhistorymodal,
  setTaskhistorymodal,
  contactDatas,
  getTaskById,
  id
}) => {
  TaskHistoryModal.propTypes = {
    taskhistorymodal: PropTypes.bool,
    setTaskhistorymodal: PropTypes.func,
    contactDatas: PropTypes.object,
    getTaskById: PropTypes.any,
    id:PropTypes.any
  };

  //All state variable
  
  const [employees, setEmployees] = useState();
  
  
  const [taskProject, setTaskProject] = useState({
    title: '',
    task_id:contactDatas.project_task_id,
    date: '',
    head_count:'',
    pipe:'',
    tb:'',
    plank:'',
    volume:'',
    others:'',
    pipe_value:'',
    tb_value:'',
    plank_value:'',
    volume_value:'',
    others_value:'',
   actual_hours:'',
   total_amount:'',
    description: '',

  });

      //get staff details
      const { loggedInuser } = useContext(AppContext);
      const [Team, setTeam] = useState();
  const [selectAll, setSelectAll] = useState(true);
  const [TeamID, setTeamID] = useState();
  const [selectedNames, setSelectedNames] = useState([]); // Store selected first_name values here

  // Gettind data from Job By Id
  const editJobByIds = () => {
    api
      .get('/jobinformation/getEmployee')
      .then((res) => {
        setEmployees(res.data.data);
      })
      .catch(() => {});
  };
  const employeesInTask=selectedNames.filter(val => val.checked)
  
console.log(employees)
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

  const checkAll = (e) => {
    const {checked} = e.target;
    const arr = selectedNames.slice();
    arr.forEach(val => {
      if (val.project_team_id === TeamID) {
        val.checked = checked;
      }
    });
    setSelectedNames(arr);
    const checkboxes = document.getElementsByName('employee_id_checkbox');
    for(let x = 0; x<checkboxes.length; x++){
      checkboxes[x].checked = checked;
    }
    setSelectAll(checked);
  }
  const handleCheckboxChange = (event, employeeId) => {
    const { checked } = event.target;
    const arr = selectedNames.slice();
    const index = arr.findIndex(value => {return value.employeeId === employeeId});
    if (checked) {
      // If the checkbox is checked, add the employeeId to the selectedNames array
      arr[index].checked = true;
      setSelectedNames(arr);
    }else {
      // If the checkbox is unchecked, remove the employeeId from the selectedNames array
      arr[index].checked = false;
      setSelectedNames(arr);
    }
    // if (event.target.checked === true ? 1 : 0) {
    //   setSelectedNames([...selectedNames, employeeId]);
    // } else {
    //   setSelectedNames(selectedNames.includes(employeeId));
    // }
    console.log('Employee ID:', employeeId);
  };
  console.log('Set team', setTeam);
  // const employeesInTask=selectedNames.filter(val => val.checked)
  // const empCount=selectedNames.filter(val => val.checked).length

  const fetchEmployeeDetails = (projectTeamId) => {
    api
      .post('/projectteam/getEmployeeByID', { project_team_id: projectTeamId })
      .then((res) => {
        const arr = selectedNames.slice();
        res.data.data.forEach(val => {
          if (arr.findIndex(value => value.employeeId === val.employee_id) < 0) {
            arr.push({checked: false, employeeId: val.employee_id, project_team_id: val.project_team_id})
          }
        });
        
        setSelectedNames(arr);
        setEmployees(res.data.data);
        setTeamID(projectTeamId);
      })
      .catch(() => {});
  };

  console.log('selected names',selectedNames)
  const editTaskProject = () => {
    taskProject.modification_date = creationdatetime;
    taskProject.modified_by= loggedInuser.first_name; 
    taskProject.pipe_value=taskProject.pipe *parseFloat(.60)
    taskProject.tb_value=taskProject.tb *parseFloat(.60)
    taskProject.plank_value=taskProject.plank *parseFloat(.60)
    taskProject.volume_value=taskProject.volume *parseFloat(.60)
    taskProject.others_value=taskProject.others *parseFloat(.60)
    taskProject.total_amount=parseFloat(taskProject.pipe_value)+parseFloat(taskProject.tb_value)+parseFloat(taskProject.plank_value)+parseFloat(taskProject.volume_value)+parseFloat(taskProject.others_value)
    if (taskProject.date !== '') {
      api
        .post('/projecttask/insertTaskHistory', taskProject)
        .then((res) => {
          
          const insertedDataId = res.data.data.insertId;
          message('Record editted successfully', 'success');
          getTaskById();
          employeesInTask.forEach((el)=>{
            el.project_task_id=insertedDataId;
            el.project_id=id
            console.log('el',el)

            api
            .post('/projecttask/insertTaskHistories', el)
            .then(() => {}).catch(()=>{

            })
        })
          // setTimeout(() => {
          //   setTaskhistorymodal(false);
          // }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please enter the Date');
    }
  };
  
    
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
              message('Task completed successfully', 'success');
            }
          })
          .catch(() => {
            message('Unable to edit task record.', 'error');
          });
      }
    };
    
    useEffect(() => {
      setSelectAll(true);
      selectedNames.filter(val => val.project_team_id === TeamID).forEach(val => {
        let check = true;
        if (!val.checked) {
          setSelectAll(false);
          check = false;
        }
        return check;
      });
    }, [selectedNames, TeamID]);

  useEffect(() => {
   
    editJobByIds();
    
  }, [contactDatas]);

  

  return (
    <>
      <Modal size="lg" isOpen={taskhistorymodal}>
        <ModalHeader>
          Task Details
          <Button
            color="secondary"
            onClick={() => {
              setTaskhistorymodal(false);
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
                          <Label>Title</Label>
                          <Input
                            type="text"
                            onChange={handleInputs}
                            value={taskProject && taskProject.title}
                            name="title"
                          />
                        </FormGroup>
                      </Col>
                     
                      <Col md="4">
                        <FormGroup>
                          <Label>Head Count</Label>
                          <Input
                            type="text"
                            onChange={handleInputs}
                            value={taskProject && taskProject.head_count}
                            name="head_count"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                            <FormGroup>
                              <Label>Team Title</Label>
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
                                  employees.filter(val => val.project_team_id === TeamID).map((element) => {
                                    const index = selectedNames.findIndex(value => value.employeeId === element.employee_id);
                                    const isChecked = selectedNames[index].checked;
                                    return (
                                      <tr key={element.project_team_id}>
                                        <td>
                                          <input
                                            type="checkbox"
                                            name="employee_id_checkbox"
                                            onChange={(e) =>
                                              handleCheckboxChange(e, element.employee_id)
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
                          </Row>
                      <Col md="4">
                        <FormGroup>
                          <Label>Date</Label>
                          <Input
                            type="date"
                            onChange={handleInputs}
                            value={moment(taskProject && taskProject.date).format(
                              'YYYY-MM-DD',
                            )}
                            name="date"
                          />
                        </FormGroup>
                      </Col>
                      
                      <Col md="4">
                        <FormGroup>
                          <Label>Pipe</Label>
                          <Input
                            type="text"
                            onChange={handleInputs}
                            value={taskProject && taskProject.pipe}
                            name="pipe"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>T/B</Label>
                          <Input
                            type="text"
                            onChange={handleInputs}
                            value={taskProject && taskProject.tb}
                            name="tb"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Plank</Label>
                          <Input
                            type="text"
                            onChange={handleInputs}
                            value={taskProject && taskProject.plank}
                            name="plank"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Volume</Label>
                          <Input
                            type="text"
                            onChange={handleInputs}
                            value={taskProject && taskProject.volume}
                            name="volume"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Others</Label>
                          <Input
                            type="text"
                            onChange={handleInputs}
                            value={taskProject && taskProject.others}
                            name="others"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Actual Hours</Label>
                          <br />
                          <Input
                            type="text"
                            onChange={handleInputs}
                            value={taskProject && taskProject.actual_hours}
                            name="actual_hours"
                           
                          />
                        </FormGroup>
                      </Col>
                    

                    </Row>
                  </Form>
            </FormGroup>
           
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
                 
                }}
              >
                Submit
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  setTaskhistorymodal(false);
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

export default TaskHistoryModal;