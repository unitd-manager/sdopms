import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';

const ProjectTaskDetails = () => {
  // All state variables
  const [projectdetails, setProjectDetails] = useState([]);
  const [milestoneDetails, setMilestone] = useState([]);
  const [taskdetails, setTaskDetails] = useState({
    task_title: '',
    project_id: '',
    project_milestone_id: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Navigation and Parameters
  const navigate = useNavigate();

  // Milestone data in taskdetails
  const handleInputs = (e) => {
    setTaskDetails({ ...taskdetails, [e.target.name]: e.target.value });
  };

  // Api call for getting project name dropdown
  const getProjectname = () => {
    api
      .get('/projecttask/getProjectTitle')
      .then((res) => {
        setProjectDetails(res.data.data);
      })
      .catch(() => {
        message('Projects not found', 'info');
      });
  };

  // Api call for getting milestone dropdown based on project ID
  const getMilestone = (projectId) => {
    api
      .post('/projecttask/getMilestoneById', { project_id: projectId })
      .then((res) => {
        setMilestone(res.data.data);
      })
      .catch(() => {
        message('Milestones not found', 'info');
      });
  };

  // Insert Milestone
  const insertTaskDetails = () => {
    if (!formSubmitted)
      if (
        taskdetails.project_id !== '' &&
        taskdetails.project_milestone_id !== '' &&
        taskdetails.task_title !== ''
      ) {
        api
          .post('/projecttask/insertTask', taskdetails)
          .then((res) => {
            const insertedDataId = res.data.data.insertId;
            message('Task inserted successfully.', 'success');
            setTimeout(() => {
              navigate(`/TaskEdit/${insertedDataId}`);
            }, 300);
          })
          .catch(() => {
            message('Network connection error.', 'error');
          });
      } else {
        setFormSubmitted(true);
      }
    else {
      message('Please fill all required fields', 'error');
    }
  };

  useEffect(() => {
    getProjectname();
  }, []);

  // Fetch milestones when project ID changes
  useEffect(() => {
    if (taskdetails.project_id) {
      // Use taskdetails.project_id directly to get the selected project ID
      const selectedProjectId = taskdetails.project_id;
      getMilestone(selectedProjectId);
    }
  }, [taskdetails.project_id]);

  return (
    <div>
      <BreadCrumbs />
      <ToastContainer />
      <Row>
        <Col md="6" xs="12">
          {/* Key Details */}
          <ComponentCard title="Details">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="10">
                    <FormGroup>
                      <Label>
                        Title <span className="required">*</span>
                      </Label>
                      <Input type="text" name="task_title" onChange={handleInputs} />
                    </FormGroup>
                  </Col>
                  <Col md="10">
                    <FormGroup>
                      <Label>Project Title</Label>
                      <Input
                        type="select"
                        onChange={handleInputs}
                        value={taskdetails && taskdetails.project_id}
                        name="project_id"
                      >
                        <option defaultValue="selected">Please Select</option>
                        {projectdetails &&
                          projectdetails.map((e) => (
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
                        value={taskdetails && taskdetails.project_milestone_id}
                        name="project_milestone_id"
                      >
                        <option value="selected">Please Select</option>
                        {milestoneDetails &&
                          milestoneDetails.map((e) => {
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
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      color="primary"
                      onClick={insertTaskDetails}
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

export default ProjectTaskDetails;
