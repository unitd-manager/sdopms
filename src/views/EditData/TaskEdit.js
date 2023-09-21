import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Card,
  CardBody,
} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import * as Icon from 'react-feather';
import { useNavigate, useParams, Link } from 'react-router-dom';
import moment from 'moment';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'bootstrap/dist/css/bootstrap.min.css';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
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

const TaskEdit = () => {
  //All state variable
  const [projectTask, setProjectTask] = useState();
  const [employeeProject, setEmployeeProject] = useState();
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [timeSheet, setTimesheet] = useState(null);
  const [addTimesheetModal, setAddTimesheetModal] = useState(false);
  const [projectdetails, setProjectDetails] = useState();
  const [MileStonedetails, setMilestoneDetails] = useState();
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [roomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState();
  const [description, setDescription] = useState('');
  const [employeeTeam, setEmployeeTeam] = useState();

  //navigation and parameters
  const { id } = useParams();
  const navigate = useNavigate();

  //const applyChanges = () => {};
  const backToList = () => {
    navigate('/TaskList');
  };

  // data in Description Modal
  const handleDataEditor = (e, type) => {
    setProjectTask({
      ...projectTask,
      [type]: draftToHtml(convertToRaw(e.getCurrentContent())),
    });
  };

  //Description Modal
  const convertHtmlToDraft = (existingQuoteformal) => {
    const contentBlock = htmlToDraft(existingQuoteformal && existingQuoteformal);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setDescription(editorState);
    }
  };
  //Api call for getting project name dropdown
  const getProjectname = () => {
    api
      .get('/projecttask/getProjectTitle')
      .then((res) => {
        setProjectDetails(res.data.data);
        console.log(res.data.data[0]);
      })
      .catch(() => {
        message('Company not found', 'info');
      });
  };

  //Api call for getting Milestone dropdown
  const getMilestonename = () => {
    api
      .get('/projecttask/getMilestoneTitle')
      .then((res) => {
        setMilestoneDetails(res.data.data);
        console.log(res.data.data[0]);
      })
      .catch(() => {
        message('Milestone not found', 'info');
      });
  };
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  //timesheet data in timesheet
  const handleInputs = (e) => {
    setProjectTask({ ...projectTask, [e.target.name]: e.target.value });
  };

  //getting data from task by Id
  const getTaskById = () => {
    api.post('/projecttask/getProjectTaskId', { project_task_id: id }).then((res) => {
      const taskData = res.data.data[0];
      setProjectTask(taskData);
      if (taskData.description) {
        convertHtmlToDraft(taskData.description);
      }
    });
  };
  //  Gettind data from Job By Id
  const JobTask = () => {
    api
      .get('/jobinformation/getEmployee')
      .then((res) => {
        console.log(res.data.data);
        setEmployeeProject(res.data.data);
      })
      .catch(() => {});
  };

  //  Gettind data from Job By Id
  const editJob = () => {
    api
      .get('/jobinformation/getEmployee')
      .then((res) => {
        console.log(res.data.data);
        setEmployeeTeam(res.data.data);
      })
      .catch(() => {});
  };

  //Update task
  const editTask = () => {
    api
      .post('/projecttask/editTask', projectTask)
      .then(() => {
        message('Record editted successfully', 'success');
        getTaskById();
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  const [timesheeteditdata, setTimesheetEditData] = useState();

  const getTimesheet = () => {
    api
      .post('/projecttimesheet/getTaskTimeSheetById', { project_task_id: id })
      .then((res) => {
        setTimesheet(res.data.data);
      })
      .catch(() => {
        message('Loan Data Not Found', 'info');
      });
  };

  const handleTaskInputs = (e) => {
    setTimesheetEditData({ ...timesheeteditdata, [e.target.name]: e.target.value });
  };

  //Logic for edit data in db

  const editTimesheetData = () => {
    api
      .post('/Projecttimesheet/editTimeSheet', timesheeteditdata)
      .then(() => {
        getTimesheet();
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  //attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
    console.log('inside DataForAttachment');
  };
  //structure of projectTask list view
  const columns = [
    {
      name: '#',
      selector: 'project_timesheet_id',
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
      name: 'Date',
      selector: 'date',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Name',
      selector: 'first_name',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Hours',
      selector: 'hours',
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
      name: 'Description',
      selector: 'description',
      sortable: true,
      grow: 0,
      wrap: true,
    },
  ];

  useEffect(() => {
    getTaskById();
    getTimesheet();
    getMilestonename();
    getProjectname();
    JobTask();
    editJob();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <Form>
        <FormGroup>
          <ToastContainer></ToastContainer>
          <ComponentCardV2>
            <ApiButton
              editData={editTask}
              navigate={navigate}
              applyChanges={editTask}
              backToList={backToList}
              module="ProjectTask"
            ></ApiButton>
          </ComponentCardV2>
        </FormGroup>
      </Form>
      {/* projectTask Details */}
      <Form>
        <FormGroup>
          <ComponentCard title="TaskDetails">
            {' '}
            <ToastContainer></ToastContainer>
            <div>
              <Form>
                <Row>
                 
                  <Col md="3">
                    <FormGroup>
                      <Label>Project Name</Label>
                      <Input
                        type="select"
                        onChange={handleInputs}
                        value={projectTask && projectTask.project_id}
                        name="project_id"
                        disabled
                      >
                        <option defaultValue="selected">Please Select</option>
                        {projectdetails &&
                          projectdetails.map((e) => {
                            return (
                              <option key={e.project_id} value={e.project_id}>
                                {e.title}
                              </option>
                            );
                          })}
                        
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label>MileStone Title</Label>
                      <Input
                        type="select"
                        name="project_milestone_id"
                        onChange={handleInputs}
                        value={projectTask && projectTask.project_milestone_id}
                        disabled
                      >
                        <option>Select Project</option>
                        {MileStonedetails &&
                          MileStonedetails.map((e) => {
                            return (
                              <option key={e.project_milestone_id} value={e.project_milestone_id}>
                                {e.milestone_title}
                              </option>
                            );
                          })}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label>Title</Label>
                      <Input
                        type="text"
                        onChange={handleInputs}
                        value={projectTask && projectTask.task_title}
                        name="task_title"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        onChange={handleInputs}
                        value={moment(projectTask && projectTask.start_date).format('YYYY-MM-DD')}
                        name="start_date"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label>End Date</Label>
                      <Input
                        type="date"
                        onChange={handleInputs}
                        value={moment(projectTask && projectTask.end_date).format('YYYY-MM-DD')}
                        name="end_date"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label>Actual Comp Date</Label>
                      <Input
                        type="date"
                        onChange={handleInputs}
                        value={moment(projectTask && projectTask.actual_completed_date).format(
                          'YYYY-MM-DD',
                        )}
                        name="actual_completed_date"
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label>Name</Label>
                      <Input
                        type="select"
                        name="employee_id"
                        onChange={handleInputs}
                        value={projectTask && projectTask.employee_id}
                      >
                        <option value="" defaultValue="selected"></option>
                        {employeeProject &&
                          employeeProject.map((ele) => {
                            return (
                              <option key={ele.employee_id} value={ele.employee_id}>
                                {ele.first_name}
                              </option>
                            );
                          })}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label>Status</Label>
                      <Input
                        type="select"
                        onChange={handleInputs}
                        value={projectTask && projectTask.status}
                        name="status"
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
                  <Col md="3">
                    <FormGroup>
                      <Label>Task Type</Label>
                      <Input
                        type="select"
                        onChange={handleInputs}
                        value={projectTask && projectTask.task_type}
                        name="task_type"
                      >
                        {' '}
                        <option value="" selected="selected">
                          Please Select
                        </option>
                        <option value="Development">Development</option>
                        <option value="ChangeRequest">ChangeRequest</option>
                        <option value="Issues">Issues</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label>Priority</Label>
                      <Input
                        type="select"
                        onChange={handleInputs}
                        value={projectTask && projectTask.priority}
                        name="priority"
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
                  <Col md="3">
                    <FormGroup>
                      <Label>Completion</Label>
                      <Input
                        type="text"
                        onChange={handleInputs}
                        value={projectTask && projectTask.completion}
                        name="completion"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label>Actual Hours</Label>
                      <br />
                      <span>{projectTask && projectTask.actual_hours}</span>
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label>Estimated Hours</Label>
                      <Input
                        type="number"
                        onChange={handleInputs}
                        value={projectTask && projectTask.estimated_hours}
                        name="hours"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </div>
          </ComponentCard>
          <ComponentCard title="Description">
            <Editor
              editorState={description}
              wrapperClassName="demo-wrapper mb-0"
              editorClassName="demo-editor border mb-4 edi-height"
              onEditorStateChange={(e) => {
                handleDataEditor(e, 'description');
                setDescription(e);
              }}
            />
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
                  TimeSheet
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
                    <Modal size="lg" isOpen={addTimesheetModal}>
                      <ModalHeader>
                        Edit Task
                        <Button
                          color="secondary"
                          onClick={() => {
                            setAddTimesheetModal(false);
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
                                          value={timesheeteditdata && timesheeteditdata.task_title}
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col md="4">
                                      <FormGroup>
                                        <Label>Date</Label>
                                        <Input
                                          type="date"
                                          name="date"
                                          value={
                                            timesheeteditdata
                                              ? moment(timesheeteditdata.date).format('YYYY-MM-DD')
                                              : ''
                                          }
                                          onChange={handleTaskInputs}
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col md="4">
                                      <FormGroup>
                                        <Label>Name</Label>
                                        <Input
                                          type="select"
                                          name="employee_id"
                                          onChange={handleTaskInputs}
                                          value={timesheeteditdata && timesheeteditdata.employee_id}
                                        >
                                          <option value="" defaultValue="selected"></option>
                                          {employeeTeam &&
                                            employeeTeam.map((ele) => {
                                              return (
                                                <option
                                                  key={ele.employee_id}
                                                  value={ele.employee_id}
                                                >
                                                  {ele.first_name}
                                                </option>
                                              );
                                            })}
                                        </Input>
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col md="4">
                                      <FormGroup>
                                        <Label>Status</Label>
                                        <Input
                                          type="select"
                                          name="status"
                                          onChange={handleTaskInputs}
                                          value={timesheeteditdata && timesheeteditdata.status}
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
                                          type="text"
                                          name="description"
                                          onChange={handleTaskInputs}
                                          value={timesheeteditdata && timesheeteditdata.description}
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
                            editTask();
                            editTimesheetData();
                            setAddTimesheetModal(false);
                          }}
                        >
                          Save & Continue
                        </Button>
                        <Button
                          className="shadow-none"
                          color="secondary"
                          onClick={() => {
                            setAddTimesheetModal(false);
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
                        {timeSheet &&
                          timeSheet.map((element, index) => {
                            return (
                              <tr key={element.project_timesheet_id}>
                                <td>{index + 1}</td>

                                <td>
                                  <Link to="">
                                    <span
                                      onClick={() => {
                                        setAddTimesheetModal(true);
                                        setTimesheetEditData(element);
                                      }}
                                    >
                                      <Icon.Edit2 />
                                    </span>
                                  </Link>
                                </td>
                                <td>{element.task_title}</td>
                                <td>{element.date ? element.date : ''}</td>
                                <td>{element.first_name}</td>
                                <td>{element.hours}</td>
                                <td>{element.status}</td>
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
                              setRoomName('Timesheet');
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
                        altTagData="MilsestoneRelated Data"
                        recordType="RelatedPicture"
                        desc="TimesheetRelated Data"
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

export default TaskEdit;
