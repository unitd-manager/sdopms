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
  projectDetail,
  getworksheetbyId
  //projectId,
}) => {
  TaskHistoryModal.propTypes = {
    taskhistorymodal: PropTypes.bool,
    setTaskhistorymodal: PropTypes.func,
    contactDatas: PropTypes.object,
    projectDetail: PropTypes.object,
    getTaskById: PropTypes.any,
    id: PropTypes.any,
    getworksheetbyId:PropTypes.any,
    //projectId:PropTypes.any,
  };

  const [pipeCode, setPipeCode] = useState();
  const [pipeCount, setPipeCount] = useState();
  const [dismantelCount, setDismantelCount] = useState();

  const getPipeCode = () => {
    api
      .post('/projecttask/getPipeCode', { project_id: id })
      .then((res) => {
        setPipeCode(res.data.data);
      })
      .catch(() => { });
  };

 
 

  const [insertTask, setInsertTask] = useState({
    title: '',
    date: '',
    actual_hours: '',
    head_count:'',
    length:'',
    breadth:'',
    height:'',
    vcount:'',
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
   pipe_code:'',
   total_amount:'',
    description: '',
    task_type: contactDatas.task_type, // Add task type to insertTask state
  });
  

  const getPipeCount = () => {
    
  const countPipe =  insertTask.pipe_code
  console.log('countPipe',countPipe)
    api
      .post('/projecttask/getPipeCount', { pipe_code:countPipe})
      .then((res) => {
        api
        .post('/projecttask/getDismantelCount', { pipe_code:countPipe})
        .then((resp) => {
          setDismantelCount(resp.data.data[0]);
          setPipeCount(res.data.data[0]);
          console.log('resPipe',res.data.data[0])
          setInsertTask({ ...insertTask, pipe:parseFloat(res.data.data[0].pipeCount)-parseFloat(resp.data.data[0].pipeCount||0),plank:parseFloat(res.data.data[0].plankCount)-parseFloat(resp.data.data[0].plankCount||0),tb:parseFloat(res.data.data[0].tbCount)-parseFloat(resp.data.data[0].tbCount||0),volume:parseFloat(res.data.data[0].volumeCount)-parseFloat(resp.data.data[0].volumeCount ||0),length:parseFloat(res.data.data[0].lengthCount)-parseFloat(resp.data.data[0].lengthCount||0),breadth:parseFloat(res.data.data[0].breadthCount)-parseFloat(resp.data.data[0].breadthCount||0),height:parseFloat(res.data.data[0].heightCount)-parseFloat(resp.data.data[0].heightCount||0),vcount:parseFloat(res.data.data[0].vcountCount)-parseFloat(resp.data.data[0].vcountCount ||0) });
       
        })
        .catch(() => { });
 })
      .catch(() => { });
  };
  console.log('pipeCount', pipeCount)

  const getDismantelCount = () => {    
    const countPipe =  insertTask.pipe_code
      api
        .post('/projecttask/getDismantelCount', { pipe_code:countPipe})
        .then((res) => {
          setDismantelCount(res.data.data[0]);
        })
        .catch(() => { });
    };
    console.log('dismantelCount', dismantelCount)
  
  const [employees, setEmployees] = useState();
  const [Team, setTeam] = useState();
  const [selectAll, setSelectAll] = useState(true);
  const [TeamID, setTeamID] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  // const [selectedTeam, setSelectedTeam] = useState(''); // Store the selected team_title here
  const [selectedNames, setSelectedNames] = useState([]); // Store selected first_name values here

  const [taskEmployees, setTaskEmployees] = useState([]);
  
  const[teams,setEmployeesforRecord]=useState([])

  const getTaskEmployees = () => {
    api
      .post('/projectTask/getTaskEmployees',{task_id:contactDatas.project_task_id})
      .then((res) => {
        console.log(res.data.data);
        setTaskEmployees(res.data.data);
      })
      .catch(() => {});
  };
  
  const getStaffName = () => {
    api
      .post('/projectteam/getEmployeeByTaskID', { project_team_id: id,task_id:contactDatas.project_task_id})
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
console.log('pipeCount',pipeCount)
  const employeesInTask=selectedNames.filter(val => val.checked)
  const empCount=selectedNames.filter(val => val.checked).length
  const employeelead=selectedNames?.filter(val => val.checked && val.team_leader)
  console.log('leader',employeelead)
  console.log('projectdetail',projectDetail)
  //get staff details
 // const { loggedInuser } = useContext(AppContext);
  const insertTaskData = () => {
    if (isSubmitting) {
      return; // Prevent multiple submissions
    }
   
    // if (insertTask.date !== '' && insertTask.title !== '') {
     // setIsSubmitting(true); // Set submission in progress
      if(contactDatas.task_type === 'Dismantel'){
        
          insertTask.pipe_value = insertTask.pipe * parseFloat(projectDetail.pipe_dismantel_amount);
          insertTask.tb_value = insertTask.tb * parseFloat(projectDetail.tb_dismantel_amount);
          insertTask.plank_value = insertTask.plank * parseFloat(projectDetail.plank_dismantel_amount);
          insertTask.volume_value =insertTask.volume * parseFloat(projectDetail.volume_dismantel_amount);
          insertTask.others_value = insertTask.others * parseFloat(projectDetail.others_dismantel_amount);
          insertTask.total_amount = parseFloat(insertTask.pipe_value)+parseFloat(insertTask.tb_value)+parseFloat(insertTask.plank_value)+parseFloat(insertTask.volume_value)+parseFloat(insertTask.others_value);    
        
      }
      if(contactDatas.task_type === 'Erection'){
        insertTask.pipe_value = insertTask.pipe * parseFloat(projectDetail.pipe_erection_amount);
        insertTask.tb_value = insertTask.tb * parseFloat(projectDetail.tb_erection_amount);
        insertTask.plank_value = insertTask.plank * parseFloat(projectDetail.plank_erection_amount);
        insertTask.volume_value =insertTask.volume * parseFloat(projectDetail.volume_erection_amount);
        insertTask.others_value = insertTask.others * parseFloat(projectDetail.others_erection_amount);
        insertTask.total_amount = parseFloat(insertTask.pipe_value)+parseFloat(insertTask.tb_value)+parseFloat(insertTask.plank_value)+parseFloat(insertTask.volume_value)+parseFloat(insertTask.others_value);
        }
      insertTask.head_count=empCount; 
      const total=insertTask.total_amount;
  const dates=insertTask.date;
  insertTask.task_id=contactDatas.project_task_id;
  const shares=parseFloat(total)/parseFloat(empCount);
  insertTask.share_per_head=shares;
  insertTask.project_id = id;
  if(employeelead.length ===0){
    message('Please Select Team leader', 'Error');
  }
   else if(((contactDatas.task_type === 'Dismantel') &&((parseFloat(parseFloat(pipeCount.pipeCount || 0)-parseFloat(dismantelCount.pipeCount || 0))<parseFloat(insertTask.pipe))  || parseFloat(insertTask.plank)> (parseFloat(parseFloat(pipeCount.plankCount || 0)-parseFloat(dismantelCount.plankCount||0))) || parseFloat(insertTask.tb)> (parseFloat(parseFloat(pipeCount.tbCount || 0)-parseFloat(dismantelCount.tbCount ||0))) || parseFloat(insertTask.volume)> (parseFloat(parseFloat(pipeCount.volumeCount ||0)-parseFloat(dismantelCount.volumeCount ||0))) ||(parseFloat(parseFloat(pipeCount.lengthCount || 0)-parseFloat(dismantelCount.lengthCount || 0))<parseFloat(insertTask.length))  || parseFloat(insertTask.breadth)> (parseFloat(parseFloat(pipeCount.breadthCount || 0)-parseFloat(dismantelCount.breadthCount||0))) || parseFloat(insertTask.height)> (parseFloat(parseFloat(pipeCount.heightCount || 0)-parseFloat(dismantelCount.heightCount ||0))) || parseFloat(insertTask.vcount)> (parseFloat(parseFloat(pipeCount.vcountCount ||0)-parseFloat(dismantelCount.vcountCount ||0))))) ){
      message('Please check the count', 'Error');
    }else if(!insertTask.pipe_code && insertTask.pipe_code===''){
      message('Please Fill the Log no', 'Error');
    }
  else{
  insertTask.employee_id=employeelead[0].employeeId;
  insertTask.task_type = contactDatas.task_type; 
      api
          .post('/projecttask/insertTaskHistory', insertTask)
          .then((res) => {
            const insertedDataId = res.data.data.insertId;
            console.log('Inserted Data ID:', insertedDataId);
            console.log(insertedDataId);
            employeesInTask.forEach((el)=>{
              el.task_history_id=insertedDataId;
              el.employee_id=el.employeeId;
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
                work.task_history_id=insertedDataId;
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
            message('Worksheet has been created successfully.', 'success');
            setTimeout(()=>{
              window.location.reload();
            },1500)
         
            setTaskhistorymodal(false);
            getTaskById();
            getStaffName();
            getworksheetbyId();
           
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
          });}
      
    // } else {
    //   message('Please fill all required fields', 'warning');
    // }
  };
  
  const fetchEmployeeDetails = (projectTeamId) => {
    api
      .post('/projectteam/getEmployeeByTaskID', { project_team_id: projectTeamId,task_id:contactDatas.project_task_id })
      .then((res) => {
        const arr = selectedNames.slice();
        res.data.data.forEach(val => {
          if (arr.findIndex(value => value.employeeId === val.employee_id) < 0) {
            arr.push({checked: false, employeeId: val.employee_id, project_team_id: val.project_team_id,team_leader:val.team_leader})
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
  console.log('taskemps',taskEmployees)
  //Milestone data in milestoneDetails
  const handleInputsTask = (e) => {
    setInsertTask({ ...insertTask, [e.target.name]: e.target.value });
  };
  // const handleTaskTypeChange = (newTaskType) => {
  //   setInsertTask({ ...insertTask, task_type: newTaskType });
  // };
  useEffect(() => {
    getPipeCode()
  
  }, []);
    
  useEffect(() => {
    const num1 = parseFloat(insertTask&&insertTask.length) || 0;
    const num2 = parseFloat(insertTask&&insertTask.breadth) || 0;
    const num3 = parseFloat(insertTask&&insertTask.height) || 0;
    const num4 = parseFloat(insertTask&&insertTask.vcount) || 0;
    const result=(parseFloat(num1) * parseFloat(num2) * parseFloat(num3) * parseFloat(num4));
    setInsertTask({...insertTask, volume: result})
    console.log('result')
  },[insertTask && insertTask.length,insertTask && insertTask.breadth,insertTask && insertTask.height,insertTask && insertTask.vcount]);

  useEffect(() => {
    if(contactDatas.task_type ==='Dismantel'){
    getDismantelCount();
    getPipeCount()
    }
    
  }, [insertTask && insertTask.pipe_code]);

  useEffect(() => {
    const result = Team?.filter(ad => 
      taskEmployees?.some(fd => parseFloat(fd.project_team_id) === parseFloat(ad.project_team_id)));
 setEmployeesforRecord(result);
 console.log('result',result)
  }, [taskEmployees,Team]);
  console.log('Team',Team)
 console.log('teams',teams)
  useEffect(() => {
    getTaskEmployees();
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
            <ModalHeader  style={{ backgroundColor: ' #0096FF', color: 'white' }} >New Worksheet<Button
            color="secondary"
            onClick={() => {
              setTaskhistorymodal(false);
            }}
          >
            X
          </Button></ModalHeader>
            <ModalBody>
              <Row>
                <Col md="12">
                  <Card>
                    <CardBody>
                      <Form>
                        <Row>
                          <Col md="4">
                            <FormGroup>
                              <Label>Team</Label>
                              <Input
                                type="select"
                                name="project_team_id"
                                onChange={(e) => {
                                  const selectedEmployeeId = e.target.value;
                                  fetchEmployeeDetails(selectedEmployeeId);
                                }}
                              >
                                <option value="">Please Select</option>
                                {teams &&
                                  teams.map((ele) => (
                                    <option key={ele.project_team_id} value={ele.project_team_id}>
                                      {ele.team_title}
                                    </option>
                                  ))}
                              </Input>
                            </FormGroup>
                          </Col>
                          <Row>
                            {selectedNames &&selectedNames.length>0 && <Table className="no-wrap mt-3 align-middle" responsive borderless>
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
                                  <th>Check All</th>
                                </tr>
                              </thead>
                              <tbody>
                                {employees &&
                                  employees.filter(val => val.project_team_id === TeamID).map((element) => {
                                    const index = selectedNames.findIndex(value => value.employeeId === element.employee_id);
                                    const isChecked = index >=0 ? selectedNames[index].checked : false;
                                    const isTeamLeader = element.team_leader === 1; // Assuming team_leader field is a boolean or a flag indicating the team leader
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
                                        {/* {element.first_name || element.employee_name}
              {isTeamLeader && ` (Team Leader)`} */}
                                        <td>{element.employee_name|| element.first_name}
                                        {isTeamLeader && ` (Team Leader)`}</td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </Table>}
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

                          {contactDatas.task_type === 'Dismantel' && ( <Col md="4">
                <FormGroup>
                  <Label>Log No.</Label>
                  <Input
                    type="select"
                    name="pipe_code"
                    onChange={handleInputsTask}
                    value={insertTask && insertTask.pipe_code}
                  >
                    <option value="">Select Code</option>
                    {pipeCode &&
                      pipeCode.map((ele) => {
                        return (
                          <option value={ele.pipe_code} key={ele.pipe_code}>
                            {ele.pipe_code}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
              )}
{contactDatas.task_type === 'Erection' && <Col md="4">
                            <FormGroup>
                              <Label>Log No</Label>
                              <Input
                                type="text"
                                name="pipe_code"
                                onChange={handleInputsTask}
                                value={insertTask && insertTask.pipe_code}
                              />
                            </FormGroup>
                          </Col>}
                         {(contactDatas.task_type === 'Erection' && insertTask && insertTask.pipe_code && insertTask.pipe_code!=='' ) && <><Col md="4">
                            <FormGroup>
                              <Label>Pipe</Label>
                              <Input
                                type="text"
                                name="pipe"
                                // min={0}
                                // max={Number(pipeCount.pipeCount)-Number(dismantelCount.pipeCount)}
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
                              <Label>Length</Label>
                              <Input
                                type="text"
                                name="length"
                                onChange={handleInputsTask}
                                value={insertTask && insertTask.length}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Breadth</Label>
                              <Input
                                type="text"
                                name="breadth"
                                onChange={handleInputsTask}
                                value={insertTask && insertTask.breadth}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>height</Label>
                              <Input
                                type="text"
                                name="height"
                                onChange={handleInputsTask}
                                value={insertTask && insertTask.height}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Volume Count</Label>
                              <Input
                                type="text"
                                name="vcount"
                                onChange={handleInputsTask}
                                value={insertTask && insertTask.vcount}
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
                                disabled
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
                          </>}
                        
                          {(contactDatas.task_type === 'Dismantel' && insertTask && insertTask.pipe_code && insertTask.pipe_code!=='' ) && <><Col md="4">
                            <FormGroup>
                              <Label>Pipe</Label>
                              <Input
                                type="text"
                                name="pipe"
                                // min={0}
                                // max={Number(pipeCount.pipeCount)-Number(dismantelCount.pipeCount)}
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
                                value={insertTask && insertTask.tb }
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
                              <Label>Length</Label>
                              <Input
                                type="text"
                                name="length"
                                onChange={handleInputsTask}
                                value={insertTask && insertTask.length}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Breath</Label>
                              <Input
                                type="text"
                                name="breadth"
                                onChange={handleInputsTask}
                                value={insertTask && insertTask.breadth}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>height</Label>
                              <Input
                                type="text"
                                name="height"
                                onChange={handleInputsTask}
                                value={insertTask && insertTask.height}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Volume Count</Label>
                              <Input
                                type="text"
                                name="vcount"
                                onChange={handleInputsTask}
                                value={insertTask && insertTask.vcount}
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
                                disabled
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
                          </>}
                        
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
                Close
              </Button>
            </ModalFooter>
          </Modal>
    </>
  );
};

export default TaskHistoryModal;