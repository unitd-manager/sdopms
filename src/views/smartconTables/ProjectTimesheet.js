import React, { useEffect, useState, useContext } from 'react';
import {
  Row,
  Form,
  ModalFooter,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  Table,
  Label,
  Input,
  Col,
  FormGroup,
  Button,
  CardBody,
} from 'reactstrap';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';
import moment from 'moment';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

export default function ProjectTimeSheet({
  addContactToggless,
  addContactModalss,
  setEditTimeSheetEditModal,
  id,
  timeSheetById,
  setContactDatass,
  getTimeSheetById,
}) {
  ProjectTimeSheet.propTypes = {
    addContactToggless: PropTypes.func,
    setEditTimeSheetEditModal: PropTypes.func,
    addContactModalss: PropTypes.bool,
    id: PropTypes.any,
    timeSheetById: PropTypes.any,
    setContactDatass: PropTypes.func,
    getTimeSheetById: PropTypes.func,
  };

  const [insertTimeSheet, setInsertTimesheet] = useState({
    task_title: '',
    first_name: '',
    date: '',
    hours: '',
    status: '',
    description: '',
    project_milestone_id: '',
    project_task_id: '',
  });
  //get staff details
  const { loggedInuser } = useContext(AppContext);
  //const [employeeTime, setEmployee] = useState();

  // Gettind data from Job By Id
  const editJobById = () => {
    api
      .get('/jobinformation/getEmployee')
      .then((res) => {
        console.log(res.data.data);
        //setEmployee(res.data.data);
      })
      .catch(() => {});
  };
  //Milestone data in milestoneDetails
  const handleInputsTime = (e) => {
    setInsertTimesheet({ ...insertTimeSheet, [e.target.name]: e.target.value });
  };
  //Insert Milestone
  const inserttimeSheets = () => {
    const newContactWithCompany = insertTimeSheet;
    newContactWithCompany.creation_date = creationdatetime;
    newContactWithCompany.created_by = loggedInuser.first_name;
    newContactWithCompany.project_id = id;
    
    api
      .post('/projecttimesheet/insertTimeSheet', newContactWithCompany)
      .then((res) => {
        const insertedDataId = res.data.data.insertId;
        console.log(insertedDataId);
        message('TimeSheet inserted successfully.', 'success');
        getTimeSheetById();
        setTimeout(() => {
          addContactToggless(false);
        }, 300);
        window.location.reload();
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
  };
  const [milestones, setMilestones] = useState([]);
  const [taskdetail, setTaskDetail] = useState([]);
  const [StaffDetail, setstaffDetail] = useState([]);

  // Api call for getting project name dropdown
  const getMilestoneName = () => {
    api
      .post('/projecttimesheet/getMilestoneTitle', { project_id: id })
      .then((res) => {
        setMilestones(res.data.data);
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
        setTaskDetail(res.data.data);
      })
      .catch(() => {
        message('Task not found', 'info');
      });
  };
  // Api call for getting milestone dropdown based on project ID
  const getStaffName = (projectId) => {
    api
      .post('/projecttimesheet/getStaffByID', { project_task_id: projectId })
      .then((res) => {
        setstaffDetail(res.data.data);
      })
      .catch(() => {
        message('Task not found', 'info');
      });
  };

  useEffect(() => {
    editJobById();
  }, [id]);

  useEffect(() => {
    getMilestoneName();
  }, [id]);

  useEffect(() => {
    if (insertTimeSheet.project_milestone_id) {
      // Use taskdetails.project_milestone_id directly to get the selected project ID
      const selectedTask = insertTimeSheet.project_milestone_id;
      getTaskName(selectedTask);
    }
  }, [insertTimeSheet.project_milestone_id]);
  useEffect(() => {
    if (insertTimeSheet.project_task_id) {
      // Use taskdetails.project_milestone_id directly to get the selected project ID
      const selectedStaff = insertTimeSheet.project_task_id;
      getStaffName(selectedStaff);
    }
  }, [insertTimeSheet.project_task_id]);

  //Structure of timeSheetById list view
  const Projecttimesheetcolumn = [
    {
      name: '#',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
    },
    {
      name: 'Title',
    },
    {
      name: 'Staff',
    },
    {
      name: 'Date',
    },
    {
      name: 'Hours',
    },
    {
      name: 'Status',
    },
    {
      name: 'Description',
    },
    {
      name: 'Creation ',
    },
    {
      name: 'Modification',
    },
  ];
  return (
    <Form>
      <Row>
        <Col md="3">
          <br />
          <FormGroup>
            <Button color="primary" className="shadow-none" onClick={addContactToggless.bind(null)}>
              Add New{' '}
            </Button>
            <Modal size="lg" isOpen={addContactModalss} toggle={addContactToggless.bind(null)}>
              <ModalHeader toggle={addContactToggless.bind(null)}>New Task</ModalHeader>
              <ModalBody>
                <Row>
                  <Col md="12">
                    <Card>
                      <CardBody>
                        <Form>
                          <Row>
                            <Col md="4">
                              <Label>Milestone Title</Label>
                              <FormGroup>
                                <Input
                                  type="select"
                                  onChange={(e) => {
                                    handleInputsTime(e);
                                  }}
                                  value={insertTimeSheet && insertTimeSheet.project_milestone_id}
                                  name="project_milestone_id"
                                >
                                  <option value="selected">Please Select</option>
                                  {milestones &&
                                    milestones.map((e) => {
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
                                  onChange={handleInputsTime}
                                  value={insertTimeSheet && insertTimeSheet.project_task_id}
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
                            <Col md="4">
                              <FormGroup>
                                <Label> Staff Name</Label>
                                <Input
                                  type="select"
                                  onChange={handleInputsTime}
                                  value={insertTimeSheet && insertTimeSheet.employee_id}
                                  name="employee_id"
                                >
                                  <option value="" selected>
                                    Please Select
                                  </option>
                                  {StaffDetail &&
                                    StaffDetail.map((e) => {
                                      return (
                                        <option key={e.employee_id} value={e.employee_id}>
                                          {e.first_name}
                                        </option>
                                      );
                                    })}
                                </Input>
                              </FormGroup>
                            </Col>
                            {/* <Col md="4">
                              <FormGroup>
                                <Label>Staff Name</Label>
                                <Input
                                  type="select"
                                  name="employee_id"
                                  onChange={handleInputsTime}
                                  value={insertTimeSheet && insertTimeSheet.employee_id} // Set the default employee name
                                > */}
                            {/* {insertTimeSheet && insertTimeSheet.employee_id ? ( // Render default employee name if it's set
                                    <option value={insertTimeSheet.employee_id}>
                                      {insertTimeSheet.employee_id}
                                    </option>
                                  ) : (
                                    <option  disabled>
                                      Select Staff Name
                                    </option>
                                  )} */}
                            {/* {StaffDetail &&
                                    StaffDetail.map((e) => (
                                      <option key={e.project_task_id} value={e.employee_id}>
                                        {e.first_name}
                                      </option>
                                    ))}
                                </Input>
                              </FormGroup>
                            </Col> */}
                            <Col md="4">
                              <FormGroup>
                                <Label>Date</Label>
                                <Input
                                  type="date"
                                  onChange={handleInputsTime}
                                  value={
                                    insertTimeSheet &&
                                    moment(insertTimeSheet.date).format('YYYY-MM-DD')
                                  }
                                  name="date"
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label>Hours</Label>
                                <Input
                                  type="number"
                                  onChange={handleInputsTime}
                                  value={insertTimeSheet && insertTimeSheet.hours}
                                  name="hours"
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label>Status</Label>
                                <Input
                                  type="select"
                                  name="status"
                                  onChange={handleInputsTime}
                                  value={insertTimeSheet && insertTimeSheet.status}
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
                                <Label>Description</Label>
                                <Input
                                  type="textarea"
                                  onChange={handleInputsTime}
                                  value={insertTimeSheet && insertTimeSheet.description}
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
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    inserttimeSheets();
                  }}
                >
                  Submit
                </Button>
                <Button
                  color="secondary"
                  className="shadow-none"
                  onClick={addContactToggless.bind(null)}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </FormGroup>
        </Col>
      </Row>
      <Table id="example" className="display border border-secondary rounded">
        <thead>
          <tr>
            {Projecttimesheetcolumn.map((cell) => {
              return <td key={cell.name}>{cell.name}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {timeSheetById &&
            timeSheetById.map((element, index) => {
              return (
                <tr key={element.projecttimesheet_id}>
                  <td>{index + 1}</td>
                  <td>
                    <span
                      onClick={() => {
                        setContactDatass(element);
                        setEditTimeSheetEditModal(true);
                      }}
                    >
                      <Icon.Edit2 />
                    </span>
                  </td>
                  <td>{element.task_title}</td>
                  <td>{element.first_name}</td>
                  <td>{element.date}</td>
                  <td>{element.hours}</td>
                  <td>{element.status}</td>
                  <td>{element.description}</td>
                  <td>
                    {element.created_by} {element.creation_date}
                  </td>
                  <td>
                    {element.modified_by} {element.modification_date}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Form>
  );
}
