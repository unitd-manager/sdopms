import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Card,
  CardBody,
} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import * as Icon from 'react-feather';
import { useNavigate, useParams, Link } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import message from '../../components/Message';
import api from '../../constants/api';
//import DeleteButton from '../../components/DeleteButton';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import ApiButton from '../../components/ApiButton';

const TaskJobEdit = () => {
  //All state variable
  const [projectTeam, setProjectTeam] = useState();
  const [projecttaskdetails, setProjectTaskDetails] = useState([]);
  const [activeTab, setActiveTab] = useState('1');
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [roomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState();
  const [employeeTeam, setEmployeeTeam] = useState();
  const [milestonesTeam, setMilestonesTeam] = useState([]);
  const [taskdetailTeam, setTaskDetailTeam] = useState([]);
  const [project, setProject] = useState([]);

  //navigation and parameters
  const { id } = useParams();
  const navigate = useNavigate();

  //const applyChanges = () => {};
  const backToList = () => {
    navigate('/TaskJob');
  };
  // const addtaskToggle = () => {
  //   setAddTaskModal(!addTaskModal);
  // };

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  //  Gettind data from Job By Id
  // const editJob = () => {
  //   api
  //     .get('/jobinformation/getEmployee')
  //     .then((res) => {
  //       console.log(res.data.data);
  //       setEmployeeTeam(res.data.data);
  //     })
  //     .catch(() => {});
  // };
  const editJob = (projectId) => {
    api
      .post('/projecttimesheet/getStaffByID', { project_task_id: projectId })
      .then((res) => {
        setEmployeeTeam(res.data.data);
      })
      .catch(() => {
        message('Task not found', 'info');
      });
  };
  //TaskJob data in TaskJob
  const handleInputsProjectteam = (e) => {
    setProjectTeam({ ...projectTeam, [e.target.name]: e.target.value });
  };

  //getting data from TaskJob by Id
  const getTeamById = () => {
    api.post('/projectteam/getTeamById', { project_team_id: id }).then((res) => {
      setProjectTeam(res.data.data[0]);
    });
  };

  //Update TaskJob
  const editTaskJob = () => {
    api
      .post('/projectteam/editTeam', projectTeam)
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  const [taskeditData, setTaskEditData] = useState();
  //getting  data By  Id
  const getProjectTaskById = () => {
    api
      .post('/projectteam/getTeamTaskById', { project_team_id: id })
      .then((res) => {
        setTaskEditData(res.data.data[0]);
      })
      .catch(() => {
        message('Team Data Not Found', 'info');
      });
  };
  const getTaskById = () => {
    api
      .post('/projectteam/getTeamTaskById', { project_team_id: id })
      .then((res) => {
        setProjectTaskDetails(res.data.data);
      })
      .catch(() => {
        message('Team Data Not Found', 'info');
      });
  };
  //attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
    console.log('inside DataForAttachment');
  };

  //Api call for getting project name dropdown
  const getProjectTeam = () => {
    api
      .get('/projecttask/getProjectTitle')
      .then((res) => {
        setProject(res.data.data);
      })
      .catch(() => {
        message('Company not found', 'info');
      });
  };
  // Api call for getting milestone dropdown based on project ID
  const getMilestoneName = () => {
    api
      .post('/projecttimesheet/getMilestoneTitle', { project_id: projectTeam.project_id })
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

  const handleTaskInputs = (e) => {
    setTaskEditData({ ...taskeditData, [e.target.name]: e.target.value });
  };

  //Logic for edit data in db

  const editTaskData = () => {
    api
      .post('/projecttask/editTask', taskeditData)
      .then(() => {
        message('Record editted successfully', 'success');
        window.location.reload();
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  const columns = [
    {
      name: '#',
      selector: 'project_task_id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: 'Title',
      selector: 'task_title',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Start date',
      selector: 'start_date',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'End Date',
      selector: 'end_date',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Completion',
      selector: 'completion',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Task Type',
      selector: 'task_type',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Priority',
      selector: 'priority',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Actual Hours',
      selector: '',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Est Hours',
      selector: 'estimated_hours',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Name',
      selector: 'first_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Description',
      selector: 'description',
      sortable: true,
      grow: 0,
      wrap: true,
    },
  ];

  useEffect(() => {
    getTeamById();
    editJob();
    getProjectTaskById();
    getTaskById();
    getProjectTeam();
  }, [id]);
  useEffect(() => {
    if (projectTeam && projectTeam.project_id) {
      const selectedProject = projectTeam.project_id;
      getMilestoneName(selectedProject);
    }
  }, [projectTeam && projectTeam.project_id]);

  useEffect(() => {
    if (projectTeam && projectTeam.project_milestone_id) {
      const selectedTask = projectTeam.project_milestone_id;
      getTaskName(selectedTask);
    }
  }, [projectTeam && projectTeam.project_milestone_id]);
  useEffect(() => {
    if (projectTeam && projectTeam.project_task_id) {
      const selectedTask = projectTeam.project_task_id;
      editJob(selectedTask);
    }
  }, [projectTeam && projectTeam.project_task_id]);

  return (
    <>
      <Form>
        <FormGroup>
          <BreadCrumbs />
          <ToastContainer></ToastContainer>
          <ComponentCardV2>
            <ApiButton
              editData={editTaskJob}
              navigate={navigate}
              applyChanges={editTaskJob}
              backToList={backToList}
              module="Team"
            ></ApiButton>
          </ComponentCardV2>
        </FormGroup>
      </Form>
      {/* projectTeam Details */}
      <Form>
        <FormGroup>
          <ComponentCard title="Project Team Details">
            {' '}
            <ToastContainer></ToastContainer>
            <div>
              <Form>
                <Row>
                  <Col md="4">
                    <Label>Milestone Title</Label>
                    <FormGroup>
                      <Input
                        type="select"
                        onChange={handleInputsProjectteam}
                        value={projectTeam && projectTeam.project_milestone_id}
                        name="project_milestone_id"
                      >
                        <option value="selected">Please Select</option>
                        {milestonesTeam &&
                          milestonesTeam.map((e) => {
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
                  <Col md="4">
                    <FormGroup>
                      <Label>Task</Label>
                      <Input
                        type="select"
                        onChange={handleInputsProjectteam}
                        value={projectTeam && projectTeam.project_task_id}
                        name="project_task_id"
                      >
                        <option value="" selected>
                          Please Select
                        </option>
                        {taskdetailTeam &&
                          taskdetailTeam.map((e) => {
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
                      <Label>Project Title</Label>
                      <Input
                        type="select"
                        onChange={handleInputsProjectteam}
                        value={projectTeam && projectTeam.project_id}
                        name="project_id"
                      >
                        <option defaultValue="selected">Please Select</option>
                        {project &&
                          project.map((e) => (
                            <option key={e.project_id} value={e.project_id}>
                              {e.title}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Team</Label>
                      <Input
                        type="select"
                        name="employee_id"
                        onChange={handleInputsProjectteam}
                        value={projectTeam && projectTeam.employee_id}
                      >
                        <option value="" selected>
                          Please Select
                        </option>
                        {employeeTeam &&
                          employeeTeam.map((ele) => {
                            return (
                              <option key={ele.employee_id} value={ele.employee_id}>
                                {ele.first_name}
                              </option>
                            );
                          })}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Designation</Label>
                      <br />
                      <span>{projectTeam && projectTeam.designation}</span>
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label>Department</Label>
                      <br />
                      <span>{projectTeam && projectTeam.department}</span>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </div>
          </ComponentCard>
          <ComponentCard title="More Details">
            <ToastContainer></ToastContainer>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={activeTab === '1' ? 'active' : ''}
                  onClick={() => {
                    toggle('1');
                  }}
                >
                  Task
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === '2' ? 'active' : ''}
                  onClick={() => {
                    toggle('2');
                  }}
                >
                  Attachment
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent className="p-4" activeTab={activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col md="6">
                    <Modal size="lg" isOpen={addTaskModal}>
                      <ModalHeader>
                        Edit Task
                        <Button
                          color="secondary"
                          onClick={() => {
                            setAddTaskModal(false);
                          }}
                        >
                          X
                        </Button>
                      </ModalHeader>
                      <ModalBody>
                        <Row>
                          <Col md="12">
                            <Card>
                              <CardBody>
                                <Form>
                                  <Row>
                                    <Col>
                                      <FormGroup>
                                        <Label>Title</Label>
                                        <Input
                                          type="text"
                                          name="task_title"
                                          onChange={handleTaskInputs}
                                          value={taskeditData && taskeditData.task_title}
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col md="4">
                                      <FormGroup>
                                        <Label>Start Date</Label>
                                        <Input
                                          type="date"
                                          name="start_date"
                                          value={
                                            taskeditData
                                              ? moment(taskeditData.start_date).format('YYYY-MM-DD')
                                              : ''
                                          }
                                          onChange={handleTaskInputs}
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col md="4">
                                      <FormGroup>
                                        <Label>End Date</Label>
                                        <Input
                                          type="date"
                                          name="end_date"
                                          value={
                                            taskeditData
                                              ? moment(taskeditData.end_date).format('YYYY-MM-DD')
                                              : ''
                                          }
                                          onChange={handleTaskInputs}
                                        />
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col md="4">
                                      <FormGroup>
                                        <Label>Completion</Label>
                                        <Input
                                          type="text"
                                          name="completion"
                                          onChange={handleTaskInputs}
                                          value={taskeditData && taskeditData.completion}
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col md="4">
                                      <FormGroup>
                                        <Label>Status</Label>
                                        <Input
                                          type="text"
                                          name="status"
                                          onChange={handleTaskInputs}
                                          value={taskeditData && taskeditData.status}
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col md="4">
                                      <FormGroup>
                                        <Label>Actual Hours</Label>
                                        <br />
                                        <span>{taskeditData && taskeditData.actual_hours}</span>
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col md="4">
                                      <FormGroup>
                                        <Label>Name</Label>
                                        <Input
                                          type="text"
                                          name="first_name"
                                          onChange={handleTaskInputs}
                                          value={taskeditData && taskeditData.first_name}
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
                            editTaskData();
                            setAddTaskModal(false);
                          }}
                        >
                          Save & Continue
                        </Button>
                        <Button
                          className="shadow-none"
                          color="secondary"
                          onClick={() => {
                            setAddTaskModal(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </Col>
                </Row>
                <Row>
                  <div className="container">
                    <Table id="example" className="display border border-secondary rounded">
                      <thead>
                        <tr>
                          {columns.map((cell) => {
                            return <td key={cell.name}>{cell.name}</td>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {projecttaskdetails &&
                          projecttaskdetails.map((element, index) => {
                            return (
                              <tr key={element.employee_id}>
                                <td>{index + 1}</td>
                                <td>
                                  <Link to="">
                                    <span
                                      onClick={() => {
                                        setAddTaskModal(true);
                                        setTaskEditData(element);
                                      }}
                                    >
                                      <Icon.Edit2 />
                                    </span>
                                  </Link>
                                </td>
                                <td>{element.task_title}</td>
                                <td>
                                  {element.start_date
                                    ? moment(element.start_date).format('DD-MM-YYYY')
                                    : ''}
                                </td>
                                <td>
                                  {element.end_date
                                    ? moment(element.end_date).format('DD-MM-YYYY')
                                    : ''}
                                </td>
                                <td>{element.completion}</td>
                                <td>{element.status}</td>
                                <td>{element.task_type}</td>
                                <td>{element.priority}</td>
                                <td>{element.actual_hours}</td>
                                <td>{element.estimated_hours}</td>
                                <td>{element.first_name}</td>
                                <td>{element.description}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                  </div>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Form>
                  <FormGroup>
                    <ComponentCard title="Attachments">
                      <Row>
                        <Col xs="12" md="3" className="mb-3">
                          <Button
                            className="shadow-none"
                            color="primary"
                            onClick={() => {
                              setRoomName('TaskJob');
                              setFileTypes(['JPG', 'PNG', 'GIF', 'PDF']);
                              dataForAttachment();
                              setAttachmentModal(true);
                            }}
                          >
                            <Icon.File className="rounded-circle" width="20" />
                          </Button>
                        </Col>
                      </Row>
                      <AttachmentModalV2
                        moduleId={id}
                        roomName={roomName}
                        fileTypes={fileTypes}
                        altTagData="TaskJobRelated Data"
                        recordType="RelatedPicture"
                        desc="TaskJobRelated Data"
                        modelType={attachmentData.modelType}
                        attachmentModal={attachmentModal}
                        setAttachmentModal={setAttachmentModal}
                      />
                      <ViewFileComponentV2
                        moduleId={id}
                        roomName="TimesheetList"
                        recordType="RelatedPicture"
                      />
                    </ComponentCard>
                  </FormGroup>
                </Form>
              </TabPane>
            </TabContent>
          </ComponentCard>
        </FormGroup>
      </Form>
    </>
  );
};

export default TaskJobEdit;
