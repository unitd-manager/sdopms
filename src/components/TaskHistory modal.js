import React, { useEffect, useState } from 'react';
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
  Form,Card,CardBody,Table
} from 'reactstrap';
import PropTypes from 'prop-types';
import '../views/form-editor/editor.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import moment from 'moment';
import message from './Message';
import api from '../constants/api';

//import creationdatetime from '../constants/creationdatetime';
//import AppContext from '../context/AppContext';

const TaskHistoryModal = ({
  taskhistorymodal,
  setTaskhistorymodal,
  contactDatas,
  getTaskById,
  id,
}) => {
  TaskHistoryModal.propTypes = {
    taskhistorymodal: PropTypes.bool,
    setTaskhistorymodal: PropTypes.func,
    contactDatas: PropTypes.object,
    getTaskById: PropTypes.any,
    id: PropTypes.any,
  };

  const [insertTask, setInsertTask] = useState({
    title: '',
    date: '',
    actual_hours: '',
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
   total_amount:'',
    description: '',
    
  });
  

  const [employees, setEmployees] = useState();
  const [Team, setTeam] = useState();
  const [selectAll, setSelectAll] = useState(true);
  const [TeamID, setTeamID] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  // const [selectedTeam, setSelectedTeam] = useState(''); // Store the selected team_title here
  const [selectedNames, setSelectedNames] = useState([]); // Store selected first_name values here


  const getStaffName = () => {
    api
      .post('/projectteam/getEmployeeByID', { project_team_id: id })
      .then((res) => {
        setEmployees(res.data.data);
      })
      .catch(() => {});
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
console.log('contactDatas',contactDatas)
  const employeesInTask=selectedNames.filter(val => val.checked)
  const empCount=selectedNames.filter(val => val.checked).length
  
  //get staff details
 // const { loggedInuser } = useContext(AppContext);
  const insertTaskData = () => {
    if (isSubmitting) {
      return; // Prevent multiple submissions
    }
    if (insertTask.date !== '' && insertTask.title !== '') {
      setIsSubmitting(true); // Set submission in progress
    
      insertTask.pipe_value = insertTask.pipe * parseFloat(0.60);
      insertTask.tb_value = insertTask.tb * parseFloat(0.60);
      insertTask.plank_value = insertTask.plank * parseFloat(0.50);
      insertTask.volume_value =insertTask.volume * parseFloat(0.60);
      insertTask.others_value = insertTask.others * parseFloat(0.25);
      insertTask.total_amount = parseFloat(insertTask.pipe_value)+parseFloat(insertTask.tb_value)+parseFloat(insertTask.plank_value)+parseFloat(insertTask.volume_value)+parseFloat(insertTask.others_value);
      insertTask.head_count=empCount; 
      const total=insertTask.total_amount;
  const dates=insertTask.date;
  insertTask.task_id=contactDatas.project_task_id;
  const shares=parseFloat(total)/parseFloat(empCount)
      api
          .post('/projecttask/insertTaskHistory', insertTask)
          .then((res) => {
            const insertedDataId = res.data.data.insertId;
            console.log('Inserted Data ID:', insertedDataId);
            console.log(insertedDataId);
            employeesInTask.forEach((el)=>{
              el.task_history_id=insertedDataId;
              
              console.log('el',el)

              api
              .post('/projecttask/insertTaskHistoryStaff', el)
              .then((result) => {
                const insertedempId = result.data.data.insertId;
                const work={};
                work.employee_id=el.employeeId;
                work.task_history_employee_id=insertedempId;
                work.head_count=empCount;
                work.date=dates;
                work.team_id=el.project_team_id;
                work.total_amount=total;
                work.share_per_head=shares;
if(contactDatas.task_type === 'Dismantel'){
  work.pipe_dismantel=insertTask.pipe
  work.tb_dismantel=insertTask.tb
  work.plank_dismantel=insertTask.plank
  work.volume_dismantel=insertTask.volume
  work.others_dismantel=insertTask.others
  work.total_dismantel_amount=parseFloat(insertTask.pipe_value)+parseFloat(insertTask.tb_value)+parseFloat(insertTask.plank_value)+parseFloat(insertTask.volume_value)+parseFloat(insertTask.others_value);
}
if(contactDatas.task_type === 'Erection'){
  work.pipe_erection=insertTask.pipe
  work.tb_erection=insertTask.tb
  work.plank_erection=insertTask.plank
  work.volume_erection=insertTask.volume
  work.others_erection=insertTask.others
  work.total_erection_amount=parseFloat(insertTask.pipe_value)+parseFloat(insertTask.tb_value)+parseFloat(insertTask.plank_value)+parseFloat(insertTask.volume_value)+parseFloat(insertTask.others_value);
}
work.total_amount=parseFloat(work.total_erection_amount)+parseFloat(work.total_dismantel_amount);              
console.log('work',work)
                api
              .post('/projecttask/insertWorksheetforStaff', work)
              .then(() => {
               
              }).catch(()=>{

              })
              }).catch(()=>{

              })
          })
            message('Task inserted successfully.', 'success');
            getTaskById();
            getStaffName();
           
            // Clear the form fields by resetting the state
            setInsertTask({
              task_title: '',
              employee_id: '',
              start_date: '',
              end_date: '',
              completion: '',
              status: '',
              task_type: '',
              description: '',
              project_milestone_id: '',
              project_team_id: '',
            });
            setSelectedNames([]); // Clear the selected names after insertion
          })
          .catch(() => {
            message('Network connection error.', 'error');
          })
          .finally(() => {
            setIsSubmitting(false); // Reset submission status
          });
      
    } else {
      message('Please fill all required fields', 'warning');
    }
  };
  
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
  const editJobById = () => {
    api
      .get('/projectteam/getProjectTeam')
      .then((res) => {
        console.log(res.data.data);
        setTeam(res.data.data);
      })
      .catch(() => {});
  };
  console.log('selected names',selectedNames)
  //attachments
  
  //Milestone data in milestoneDetails
  const handleInputsTask = (e) => {
    setInsertTask({ ...insertTask, [e.target.name]: e.target.value });
  };

  useEffect(() => {

    getStaffName();
    editJobById();
 
  }, [id]);

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
    if (insertTask.project_team_id) {
      const selectedTeams = insertTask.project_team_id;
      fetchEmployeeDetails(selectedTeams);
    }
  }, [insertTask.project_team_id]);
  return (
    <>
        <Modal size="lg" isOpen={taskhistorymodal} >
            <ModalHeader >New Task Log</ModalHeader>
            <ModalBody>
              <Row>
                <Col md="12">
                  <Card>
                    <CardBody>
                      <Form>
                        <Row>
                         
                          <Col md="4">
                            <FormGroup>
                              <Label>
                                Title <span className="required">*</span>
                              </Label>
                              <Input
                                type="text"
                                name="title"
                                onChange={handleInputsTask}
                                value={insertTask && insertTask.title}
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
                                    const isChecked = index >=0 ? selectedNames[index].checked : false;
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
                              <Label>Head Counts</Label>
                              <Input
                                type="text"
                                name="had_count"
                                onChange={handleInputsTask}
                                value={insertTask && insertTask.head_count || empCount}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Date</Label>
                              <Input
                                type="date"
                                onChange={handleInputsTask}
                                value={
                                  insertTask && moment(insertTask.date).format('YYYY-MM-DD')
                                }
                                name="date"
                              />
                            </FormGroup>
                          </Col>
                         
                          <Col md="4">
                            <FormGroup>
                              <Label>Actual Hours</Label>
                              <Input
                                type="text"
                                name="actual_hours"
                                onChange={handleInputsTask}
                                value={insertTask && insertTask.actual_hours}
                              />
                            </FormGroup>
                          </Col>

                          <Col md="4">
                            <FormGroup>
                              <Label>Pipe</Label>
                              <Input
                                type="text"
                                name="pipe"
                                onChange={handleInputsTask}
                                value={insertTask && insertTask.pipe}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>TB</Label>
                              <Input
                                type="text"
                                name="tb"
                                onChange={handleInputsTask}
                                value={insertTask && insertTask.tb}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Plank</Label>
                              <Input
                                type="text"
                                name="plank"
                                onChange={handleInputsTask}
                                value={insertTask && insertTask.plank}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Volume</Label>
                              <Input
                                type="text"
                                name="volume"
                                onChange={handleInputsTask}
                                value={insertTask && insertTask.volume}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Others</Label>
                              <Input
                                type="text"
                                name="others"
                                onChange={handleInputsTask}
                                value={insertTask && insertTask.others}
                              />
                            </FormGroup>
                          </Col>

                         
                          <Col md="4">
                            <FormGroup>
                              <Label>Description</Label>
                              <Input
                                type="textarea"
                                name="description"
                                onChange={handleInputsTask}
                                value={insertTask && insertTask.description}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
               
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  insertTaskData();
                }}
              >
                Submit
              </Button>
              <Button
                color="secondary"
                className="shadow-none"
                onClick={()=>setTaskhistorymodal(false)}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
    </>
  );
};

export default TaskHistoryModal;