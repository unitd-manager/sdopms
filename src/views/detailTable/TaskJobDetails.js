import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';

const TaskJobDetails = () => {
  //All state variables
  const [employeeTeam, setEmployeeTeam] = useState();
  const [teamdetails, setTeamDetails] = useState({
employee_id:'',first_name:'',project_task_id:'',project_milestone_id:'',project_id:''});
const [milestonesTeam, setMilestonesTeam] = useState([]);
const [taskdetailTeam, setTaskDetailTeam] = useState([]);
const [projectTeam, setProjectTeam] = useState([]);
const [formSubmitted, setFormSubmitted] = useState(false);


//Navigation and Parameters
const { id } = useParams();
const navigate = useNavigate();
   // Gettind data from Job By Id
   const editJob = () => {
    api
      .get('/jobinformation/getEmployee')
      .then((res) => {
        console.log(res.data.data);
        setEmployeeTeam(res.data.data);
      })
      .catch(() => {});
  };
//Milestone data in teamdetails
  const handleInputsTeamDetails = (e) => {
    setTeamDetails({ ...teamdetails, [e.target.name]: e.target.value });
  };
 

//Insert Milestone

  const insertTeamDetails = () => {
    if (!formSubmitted)
    if (teamdetails.project_id !== '' &&
    teamdetails.employee_id !== '' &&
    teamdetails.project_task_id !=='') 
    api.post('/projectteam/insertTeam', teamdetails)
      .then((res) => {
        const insertedDataId = res.data.data.insertId;
        message('Team inserted successfully.', 'success');
        setTimeout(() => {
          navigate(`/TaskJobEdit/${insertedDataId}`);
        }, 300);
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
  // Set formSubmitted to true to prevent further submissions
 else  {   setFormSubmitted(true);
      }  else {
        message('Please fill all required fields', 'warning');
        
      }
     
  };
   //Api call for getting project name dropdown
   const getProjectTeam = () => {
    api
      .get('/projecttask/getProjectTitle')
      .then((res) => {
        setProjectTeam(res.data.data);
      })
      .catch(() => {
        message('Company not found', 'info');
      });
  };
  // Api call for getting milestone dropdown based on project ID
const getMilestoneName = () => {
  api
    .post('/projecttimesheet/getMilestoneTitle', { project_id: teamdetails.project_id })
    .then((res) => {
      // Assuming the response data is an array of milestones with keys: milestone_id and milestone_title
      const milestones = res.data.data;
      setMilestonesTeam(milestones);
    })
    .catch(() => {
      message('Milestone not found', 'info');
    });
};


  // Api call for getting milestone dropdown based on project ID
  const getTaskName = (projectId) => {
    api
      .post('/projecttimesheet/getTaskByID', { project_milestone_id: projectId })
      .then((res) => {
        setTaskDetailTeam(res.data.data);
      })
      .catch(() => {
        message('Task not found', 'info');
      });
  };
  useEffect(() => {
    editJob();
    getProjectTeam();
  }, [id]); 

  useEffect(() => { 
    if (teamdetails.project_id) {
      // Use taskdetails.project_id directly to get the selected project ID
      const selectedProject = teamdetails.project_id;
      getMilestoneName(selectedProject);
    }
  }, [teamdetails.project_id]);

  useEffect(() => {
    if (teamdetails.project_milestone_id) {
      // Use taskdetails.project_milestone_id directly to get the selected project ID
      const selectedTask = teamdetails.project_milestone_id;
      getTaskName(selectedTask);
    }
  }, [teamdetails.project_milestone_id]);

   return (
    <div>
      <BreadCrumbs />
      <ToastContainer />
      <Row>
        <Col md="6" xs="12">
          {/* Key Details */}
          <ComponentCard title=" Details">
          <Form>
              <FormGroup>
                <Row>
                <Col md="12">
                    <FormGroup>
                      <Label>Project Title</Label>
                      <Input type="select" name="project_id"   onChange={(e) => {
                        handleInputsTeamDetails(e)
                  const selectedProject = e.target.value;
                  getMilestoneName(selectedProject);
                }}>
                        <option>Select Project</option>
                        {projectTeam &&
                          projectTeam.map((e) => (
                            <option key={e.project_id} value={e.project_id}>
                              {e.title}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                <Col md="4">
                    <FormGroup>
                      <Label>Milestone Title</Label>
                      <Input type="select" name="project_milestone_id"   onChange={(e) => {
                        handleInputsTeamDetails(e)
                      
                  const selectedTask = e.target.value;
                  getTaskName(selectedTask);
                }}>
                        <option>Select Project</option>
                        {milestonesTeam &&
                          milestonesTeam.map((e) => (
                            <option key={e.project_id} value={e.project_milestone_id}>
                              {e.milestone_title}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Task</Label>
                      <Input type="select" name="project_task_id" onChange={handleInputsTeamDetails}>
                        <option>Select Task</option>
                        {taskdetailTeam &&
                          taskdetailTeam.map((e) => (
                            <option
                              key={e.project_milestone_id}
                              value={e.project_task_id}
                            >
                              {e.task_title}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <Label>
                      {' '}
                      Title <span className="required"> *</span>{' '}
                    </Label>
                    <Input
                    type="select"
                    name="employee_id"
                    onChange={(e) => {
                      handleInputsTeamDetails(e);
                    }}>
                    <option defaultValue="" selected >Please Select</option>
                    {employeeTeam &&
                      employeeTeam.map((ele) => {
                        return (
                           (<option key={ele.employee_id} value={ele.employee_id}>
                            {ele.first_name}
                          </option>)
                        );
                      })}
                  </Input>      
                    </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
          <div className="pt-3 mt-3 d-flex align-items-center gap-2">
            <Button color="primary"
              onClick={() => {
                insertTeamDetails();
              }}
              type="button"
              className="btn mr-2 shadow-none"
            >Save & Continue
            </Button>
            <Button
              onClick={() => {
                navigate('/TaskJob');
              }}
              type="button"
              className="btn btn-dark shadow-none" 
            >Go to List
            </Button>
            </div>
                </Row>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default TaskJobDetails;
