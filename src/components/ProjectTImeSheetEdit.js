import React, { useEffect, useState, useContext } from 'react';
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
  Card,
  CardBody
} from 'reactstrap';
import PropTypes from 'prop-types';
import '../views/form-editor/editor.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import moment from 'moment';
import message from './Message';
import api from '../constants/api';
import creationdatetime from '../constants/creationdatetime';
import AppContext from '../context/AppContext';

const ProjectTimeSheetEdit = ({
  editTimeSheetModal,
  setEditTimeSheetEditModal,
  contactDatass,
  getTimeSheetById,
  id,
}) => {
  ProjectTimeSheetEdit.propTypes = {
    editTimeSheetModal: PropTypes.bool,
    setEditTimeSheetEditModal: PropTypes.func,
    contactDatass: PropTypes.object,
    getTimeSheetById: PropTypes.func,
    id: PropTypes.any,
  };

  //All state variable
  const [timeSheetProject, setTimeSheetProject] = useState();
  const [employeeTime, setEmployeeTime] = useState();
  const [milestoneTimesheet, setMilestoneTimeSheet] = useState([]);
  const [taskTimeSheet, setTaskTimeSheet] = useState([]);

  //get staff details
  const { loggedInuser } = useContext(AppContext);
  // Gettind data from Job By Id
  // const getStaffName = () => {
  //   api
  //     .get('/jobinformation/getEmployee')
  //     .then((res) => {
  //       console.log(res.data.data);
  //       setEmployeeTime(res.data.data);
  //     })
  //     .catch(() => {});
  // };
  // Api call for getting milestone dropdown based on project ID
  const getStaffName = (projectId) => {
    api
      .post('/projecttimesheet/getStaffByID', { project_task_id: projectId })
      .then((res) => {
        setEmployeeTime(res.data.data);
      })
      .catch(() => {
        message('Task not found', 'info');
      });
  };
  //milestone data in milestone
  const handleInputs = (e) => {
    setTimeSheetProject({ ...timeSheetProject, [e.target.name]: e.target.value });
  };

  const editTimeSheetProject = () => {
    timeSheetProject.modification_date = creationdatetime;
    timeSheetProject.modified_by = loggedInuser.first_name;
    api
      .post('/projecttimesheet/editTimeSheet', timeSheetProject)
      .then(() => {
        message('Record editted successfully', 'success');
        getTimeSheetById();
        setTimeout(() => {
          setEditTimeSheetEditModal(false);
        }, 300);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  // Api call for getting milestone name dropdown
  const getMilestoneTime = () => {
    api
      .post('/projecttimesheet/getMilestoneTitle', { project_id: id })
      .then((res) => {
        setMilestoneTimeSheet(res.data.data);
      })
      .catch(() => {
        message('Milestone not found', 'info');
      });
  };

  // Api call for getting task dropdown based on project ID
  const getTaskTime = (projectId) => {
    api
      .post('/projecttimesheet/getTaskByID', { project_milestone_id: projectId })
      .then((res) => {
        setTaskTimeSheet(res.data.data);
      })
      .catch(() => {
        message('Task not found', 'info');
      });
  };

  useEffect(() => {
    getStaffName();
    setTimeSheetProject(contactDatass);
  }, [contactDatass]);

  useEffect(() => {
    getMilestoneTime();
  }, [id]);
  useEffect(() => {
    if (timeSheetProject && timeSheetProject.project_milestone_id) {
      // Use taskdetails.project_milestone_id directly to get the selected project ID
      const selectedTask = timeSheetProject.project_milestone_id;
      getTaskTime(selectedTask);
    }
  }, [timeSheetProject && timeSheetProject.project_milestone_id]);

  useEffect(() => {
    if (timeSheetProject && timeSheetProject.project_task_id) {
      // Use taskdetails.project_milestone_id directly to get the selected project ID
      const selectedStaff = timeSheetProject.project_task_id;
      getStaffName(selectedStaff);
    }
  }, [timeSheetProject && timeSheetProject.project_task_id]);
  return (
    <Form>
      <Modal size="lg" isOpen={editTimeSheetModal}>
        <ModalHeader>
          Employee Details
          <Button
            color="secondary"
            onClick={() => {
              setEditTimeSheetEditModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          {/* milestone Details */}
          <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <Label>Title</Label>
                          <Input
                            type="text"
                            onChange={handleInputs}
                            value={timeSheetProject && timeSheetProject.task_title}
                            name="task_title"
                          />
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <Label>Milestone Title</Label>
                        <FormGroup>
                          <Input
                            type="select"
                            onChange={(e) => {
                              handleInputs(e);
                            }}
                            value={timeSheetProject && timeSheetProject.project_milestone_id}
                            name="project_milestone_id"
                          >
                            <option value="selected">Please Select</option>
                            {milestoneTimesheet &&
                              milestoneTimesheet.map((e) => {
                                return (
                                  <option
                                    key={e.project_milestone_id}
                                    value={e.project_milestone_id}
                                  >
                                    {' '}
                                    {e.milestone_title}{' '}
                                  </option>
                                );
                              })}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Task</Label>
                          <Input
                            type="select"
                            onChange={handleInputs}
                            value={timeSheetProject && timeSheetProject.project_task_id}
                            name="project_task_id"
                          >
                            <option value="" selected>
                              Please Select
                            </option>
                            {taskTimeSheet &&
                              taskTimeSheet.map((e) => {
                                return (
                                  <option key={e.project_task_id} value={e.project_task_id}>
                                    {e.task_title}
                                  </option>
                                );
                              })}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label> Staff Name</Label>
                          <Input
                            type="select"
                            onChange={handleInputs}
                            value={timeSheetProject && timeSheetProject.employee_id}
                            name="employee_id"
                          >
                            <option value="" selected>
                              Please Select
                            </option>
                            {employeeTime &&
                              employeeTime.map((e) => {
                                return (
                                  <option key={e.employee_id} value={e.employee_id}>
                                    {e.first_name}
                                  </option>
                                );
                              })}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Status</Label>
                          <Input
                            type="select"
                            name="status"
                            onChange={handleInputs}
                            value={timeSheetProject && timeSheetProject.status}
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
                          <Label>Date</Label>
                          <Input
                            type="date"
                            onChange={handleInputs}
                            value={
                              timeSheetProject && moment(timeSheetProject.date).format('YYYY-MM-DD')
                            }
                            name="date"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Hours</Label>
                          <Input
                            type="numbers"
                            onChange={handleInputs}
                            value={timeSheetProject && timeSheetProject.hours}
                            name="hours"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Description</Label>
                          <Input
                            type="textarea"
                            onChange={handleInputs}
                            value={timeSheetProject && timeSheetProject.description}
                            name="description"
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
          <Row>
            <div className="pt-3 mt-3 d-flex align-items-center gap-2">
              <Button
                color="primary"
                onClick={() => {
                  editTimeSheetProject();
                }}
              >
                Submit
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  setEditTimeSheetEditModal(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </Row>
        </ModalFooter>
      </Modal>
    </Form>
  );
};

export default ProjectTimeSheetEdit;
