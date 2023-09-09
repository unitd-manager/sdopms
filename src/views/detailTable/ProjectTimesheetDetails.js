import React, { useContext,useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import creationdatetime from '../../constants/creationdatetime';
import api from '../../constants/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import message from '../../components/Message';
import AppContext from '../../context/AppContext';

const ProjectTimesheetDetails = () => {
  //All state variables
  const [projectTimesheet, setProjectTimesheet] = useState({
    task_title: '',
    project_milestone_id: '',
    project_task_id: '',
    project_id: '',
  });
  //Navigation and Parameters
  const { id } = useParams();
  const navigate = useNavigate();
  //Timesheet data in projectTimesheet
  const handleInputs = (e) => {
    setProjectTimesheet({ ...projectTimesheet, [e.target.name]: e.target.value });
  };
  const [milestones, setMilestones] = useState([]);
  const [taskdetail, setTaskDetail] = useState([]);
  const [projectTime, setProjectTime] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);


  //get staff details
   const { loggedInuser } = useContext(AppContext);

  //Insert Timesheet
  const insertTimesheet = () => {
    if (!formSubmitted)
      if (
        taskdetail.project_id !== '' &&
        taskdetail.project_milestone_id !== '' &&
        taskdetail.project_task_id !== ''
      ) {
        taskdetail.creation_date = creationdatetime;
        taskdetail.created_by= loggedInuser.first_name;
        api
          .post('/projecttimesheet/insertTimeSheet', projectTimesheet)
          .then((res) => {
            const insertedDataId = res.data.data.insertId;
            console.log(insertedDataId);
            message('timesheet inserted successfully.', 'success');
            setTimeout(() => {
              navigate(`/ProjectTimesheetEdit/${insertedDataId}`);
            }, 300);
          })
          .catch(() => {
            message('Network connection error.', 'error');
          });
      } else {
        setFormSubmitted(true);
      }
    else {
      message('Please fill all required fields', 'warning');
    }
  };

  //Api call for getting project name dropdown
  const getProjectTime = () => {
    api
      .get('/projecttask/getProjectTitle')
      .then((res) => {
        setProjectTime(res.data.data);
      })
      .catch(() => {
        message('Company not found', 'info');
      });
  };
  // Api call for getting milestone dropdown based on project ID
  const getMilestoneTime = () => {
    api
      .post('/projecttimesheet/getMilestoneTitle', { project_id: projectTimesheet.project_id })
      .then((res) => {
        // Assuming the response data is an array of milestones with keys: milestone_id and milestone_title
        setMilestones(res.data.data);
      })
      .catch(() => {
        message('Milestone not found', 'info');
      });
  };

  // Api call for getting milestone dropdown based on project ID
  const getTaskTime = (projectIds) => {
    api
      .post('/projecttimesheet/getTaskByID', { project_milestone_id: projectIds })
      .then((res) => {
        setTaskDetail(res.data.data);
      })
      .catch(() => {
        message('Task not found', 'info');
      });
  };
  useEffect(() => {
    getProjectTime();
  }, [id]);

  useEffect(() => {
    if (projectTimesheet.project_id) {
      // Use taskdetails.project_id directly to get the selected project ID
      const selectedTimesheet = projectTimesheet.project_id;
      getMilestoneTime(selectedTimesheet);
    }
  }, [projectTimesheet.project_id]);

  useEffect(() => {
    if (projectTimesheet.project_milestone_id) {
      // Use taskdetails.project_milestone_id directly to get the selected project ID
      const selectedTask = projectTimesheet.project_milestone_id;
      getTaskTime(selectedTask);
    }
  }, [projectTimesheet.project_milestone_id]);

  return (
    <div>
      <BreadCrumbs />
      <ToastContainer />
      <Row>
        <Col md="6" xs="10">
          {/* Key Details */}
          <ComponentCard title="Timesheet Details">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="10">
                    <FormGroup>
                      <Label>Project Title</Label>
                      <Input
                        type="select"
                        onChange={handleInputs}
                        value={projectTimesheet && projectTimesheet.project_id}
                        name="project_id"
                      >
                        <option defaultValue="selected">Please Select</option>
                        {projectTime &&
                          projectTime.map((e) => (
                            <option key={e.project_id} value={e.project_id}>
                              {e.title}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="10">
                    <Label>Milestone Title</Label>
                    <FormGroup>
                      <Input
                        type="select"
                        onChange={handleInputs}
                        value={projectTimesheet && projectTimesheet.project_milestone_id}
                        name="project_milestone_id"
                      >
                        <option value="selected">Please Select</option>
                        {milestones &&
                          milestones.map((e) => {
                            return (
                              <option key={e.project_milestone_id} value={e.project_milestone_id}>
                                {' '}
                                {e.milestone_title}{' '}
                              </option>
                            );
                          })}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="10">
                    <FormGroup>
                      <Label>Task</Label>
                      <Input
                        type="select"
                        onChange={handleInputs}
                        value={projectTimesheet && projectTimesheet.project_task_id}
                        name="project_task_id"
                      >
                        <option value="" selected>
                          Please Select
                        </option>
                        {taskdetail &&
                          taskdetail.map((e) => {
                            return (
                              <option key={e.project_task_id} value={e.project_task_id}>
                                {e.task_title}
                              </option>
                            );
                          })}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      color="primary"
                      onClick={() => {
                        insertTimesheet();
                      }}
                      type="button"
                      className="btn mr-2 shadow-none"
                    >
                      Save & Continue
                    </Button>
                    <Button
                      className="shadow-none"
                      color="dark"
                      onClick={() => {
                        if (
                          window.confirm(
                            'Are you sure you want to cancel  \n  \n You will lose any changes made',
                          )
                        ) {
                          navigate(-1);
                        }
                      }}
                    >
                      Cancel
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

export default ProjectTimesheetDetails;
