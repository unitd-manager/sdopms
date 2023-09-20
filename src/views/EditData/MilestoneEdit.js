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
import * as Icon from 'react-feather';
import { useNavigate, useParams, Link } from 'react-router-dom';
import moment from 'moment';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import message from '../../components/Message';
import api from '../../constants/api';
//import DeleteButton from '../../components/DeleteButton';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import ApiButton from '../../components/ApiButton';

const MilestoneEdit = () => {
  //All state variable
  const [milestone, setMilestoneEdit] = useState();
  const [projectdetails, setProjectDetails] = useState();

  const [description, setDescription] = useState('');
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [employeeTeam, setEmployeeTeam] = useState();
  const [activeTab, setActiveTab] = useState('1');
  const [actualCompletedDate, setActualCompletedDate] = useState('');
  const [update, setUpdate] = useState(false);
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  //  AttachmentModal
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });

  //attachment for upload file
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };
  //navigation and parameters
  const { id } = useParams();
  const navigate = useNavigate();

  //const applyChanges = () => {};
  const backToList = () => {
    navigate('/MilestoneList');
  };
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  //milestone data in milestone
  const updateActualCompletedDate = () => {
    if (milestone && milestone.task_status === 'Completed') {
      setActualCompletedDate(new Date().toISOString().substr(0, 10));
    } else {
      setActualCompletedDate('');
    }
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;

    if (milestone && milestone.task_status === 'Completed') {
      setActualCompletedDate(new Date().toISOString().substr(0, 10));
    }

    setMilestoneEdit({ ...milestone, [name]: value });
  };

  // data in Description Modal
  const handleDataEditor = (e, type) => {
    setMilestoneEdit({
      ...milestone,
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
  const getMilestoneById = () => {
    api.post('/milestone/getMilestonById', { project_milestone_id: id }).then((res) => {
      const milestoneData = res.data.data[0];
      setMilestoneEdit(milestoneData);
      if (milestoneData.description) {
        convertHtmlToDraft(milestoneData.description);
      }
    });
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

  //Update milestone
  const editMilestone = () => {
    api
      .post('/milestone/editMilestone', milestone)
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  const [projecttaskdetails, setProjectTaskDetails] = useState([]);
  const [taskeditData, setTaskEditData] = useState();
  //getting  data By  Id
  const getProjectTaskById = () => {
    api
      .post('/milestone/getMilestoneById', { project_milestone_id: id })
      .then((res) => {
        setTaskEditData(res.data.data[0]);
      })
      .catch(() => {
        message('Team Data Not Found', 'info');
      });
  };
  const getTaskById = () => {
    api
      .post('/milestone/getMilestoneById', { project_milestone_id: id })
      .then((res) => {
        setProjectTaskDetails(res.data.data);
      })
      .catch(() => {
        message('Team Data Not Found', 'info');
      });
  };
  //attachments
 
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
    getMilestoneById();
    getProjectname();
    editJob();
    getProjectTaskById();
    getTaskById();
  }, [id]);

  useEffect(() => {
    updateActualCompletedDate();
  }, [milestone && milestone.task_status]);

  return (
    <>
      <BreadCrumbs />
      <Form>
        <FormGroup>
          <ToastContainer></ToastContainer>
          <ComponentCardV2>
            <ApiButton
              editData={editMilestone}
              navigate={navigate}
              applyChanges={editMilestone}
              backToList={backToList}
              //deleteData={DeleteSection}
              module="Milestone"
            ></ApiButton>
          </ComponentCardV2>
        </FormGroup>
      </Form>
      {/* milestone Details */}
      <Form>
        <FormGroup>
          <ComponentCard title="Milestone Details">
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
                        value={milestone && milestone.project_id}
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
                      <Label>Title</Label>
                      <Input
                        type="text"
                        onChange={handleInputs}
                        value={milestone && milestone.milestone_title}
                        name="milestone_title"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label>From Date</Label>
                      <Input
                        type="date"
                        onChange={handleInputs}
                        value={moment(milestone && milestone.from_date).format('YYYY-MM-DD')}
                        name="from_date"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label>To Date</Label>
                      <Input
                        type="date"
                        onChange={handleInputs}
                        value={milestone && moment(milestone.to_date).format('YYYY-MM-DD')}
                        name="to_date"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label>Actual Comp Date</Label>
                      <Input
                        type="date"
                        onChange={handleInputs}
                        value={actualCompletedDate}
                        name="actual_completed_date"
                        disabled
                        // disabled={milestone && milestone.task_status !== 'completed'} // Disable the input when status is not "completed"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label>Status</Label>
                      <Input
                        type="select"
                        onChange={handleInputs}
                        value={milestone && milestone.status}
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
                </Row>
              </Form>
            </div>
          </ComponentCard>

          {/* Description form */}
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
                                          type="select"
                                          name="first_name"
                                          onChange={handleTaskInputs}
                                          value={taskeditData && taskeditData.first_name}
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
                              <tr key={element.project_milestone_id}>
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
                      <div>
                        {' '}
                        <Row>
                          <Col xs="12" md="3" className="mb-3">
                            <Button
                              className="shadow-none"
                              color="primary"
                              onClick={() => {
                                setRoomName('GoodsDelivery');
                                setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'PDF']);
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
                          attachmentModal={attachmentModal}
                          setAttachmentModal={setAttachmentModal}
                          roomName={RoomName}
                          fileTypes={fileTypes}
                          altTagData="GoodsRelated Data"
                          desc="GoodsRelated Data"
                          recordType="RelatedPicture"
                          mediaType={attachmentData.modelType}
                          update={update}
                          setUpdate={setUpdate}
                        />
                        <ViewFileComponentV2
                          moduleId={id}
                          roomName="GoodsDelivery"
                          recordType="RelatedPicture"
                          update={update}
                          setUpdate={setUpdate}
                        />
                      </div>
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

export default MilestoneEdit;
