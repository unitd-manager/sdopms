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
//import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import message from '../../components/Message';
import api from '../../constants/api';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import ViewNote from '../../components/Tender/ViewNote';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

export default function ProjectTask({
  addContactToggle,
  addContactModal,
  setEditTaskEditModal,
  id,
  taskById,
  setContactData,
  getTaskById,
  setUserSearchData,
  userSearchData,
}) {
  ProjectTask.propTypes = {
    addContactToggle: PropTypes.func,
    setEditTaskEditModal: PropTypes.func,
    addContactModal: PropTypes.bool,
    id: PropTypes.any,
    taskById: PropTypes.object,
    setContactData: PropTypes.func,
    getTaskById: PropTypes.func,
    setUserSearchData: PropTypes.func,
    userSearchData: PropTypes.func,
  };

  console.log("check id's", taskById);

  const [insertTask, setInsertTask] = useState({
    task_title: '',
    employee_id: '',
    start_date: '',
    end_date: '',
    completion: '',
    status: '',
    task_type: '',
    description: '',
    project_milestone_id: '',
  });
  const [milestoneDetail, setMilestones] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [attachmentModal, setAttachmentModal] = useState(false);

  const [employee, setEmployee] = useState();
  const [roomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState();
  const [moduleId, setModuleId] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  //const [formSubmitted, setFormSubmitted] = useState(false);

  const [updateFile, setUpdateFile] = useState(true);
  // Gettind data from Job By Id
  const editJobById = () => {
    api
      .get('/jobinformation/getEmployee')
      .then((res) => {
        console.log(res.data.data);
        setEmployee(res.data.data);
      })
      .catch(() => {});
  };

  //Milestone data in milestoneDetails
  const handleInputsTask = (e) => {
    setInsertTask({ ...insertTask, [e.target.name]: e.target.value });
  };
  //get staff details
  const { loggedInuser } = useContext(AppContext);

  const insertTaskData = () => {
    if (isSubmitting) {
      return; // Prevent multiple submissions
    }

    if (
      insertTask.project_milestone_id !== '' &&
      insertTask.task_title !== '' &&
      insertTask.employee_id !== ''
    ) {
      setIsSubmitting(true); // Set submission in progress
      const newContactWithCompanyId = insertTask;
      newContactWithCompanyId.creation_date = creationdatetime;
      newContactWithCompanyId.created_by = loggedInuser.first_name;
      newContactWithCompanyId.project_id = id;
      api
        .post('/projecttask/insertTask', newContactWithCompanyId)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          console.log(insertedDataId);
          message('Task inserted successfully.', 'success');
          getTaskById();
          // setTimeout(() => {
          //   addContactToggle(false);
          // }, 300);
          //setFormSubmitted(true)
          setTimeout(() => {
            addContactToggle(false);
          }, 300);
          window.location.reload();
        })
        .catch(() => {
          message('Network connection error.', 'error');
        })
        .finally(() => {
          setIsSubmitting(false); // Reset submission status
        });
    } else {
      message('error');
    }
  };
  console.log(filteredData);
  const handleSearch = () => {
    const newData = taskById
      .filter((y) => y.first_name === (companyName === '' ? y.first_name : companyName))
      .filter((x) => x.status === (categoryName === '' ? x.status : categoryName));
    setUserSearchData(newData);
    // Store the filtered data in the state variable
    setFilteredData(newData);
  };
  const [page, setPage] = useState(0);

  const employeesPerPage = 20;
  const numberOfEmployeesVistited = page * employeesPerPage;
  const displayEmployees = userSearchData.slice(
    numberOfEmployeesVistited,
    numberOfEmployeesVistited + employeesPerPage,
  );

  console.log('displayEmployees', displayEmployees);
  const totalPages = Math.ceil(userSearchData.length / employeesPerPage);
  const changePage = ({ selected }) => {
    setPage(selected);
  };
  // Step 1: Define state variables for sorting
  const [sortColumn, setSortColumn] = useState(''); // Column to sort by
  const [sortOrder, setSortOrder] = useState('asc'); // Sorting order (asc or desc)

  // Step 2: Create a function to handle sorting
  const handleSort = (column) => {
    // If clicking on the same column, toggle sorting order
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // If clicking on a different column, set it as the new sorting column
      setSortColumn(column);
      setSortOrder('asc'); // Default to ascending order
    }
  };

  // Step 4: Apply sorting to your data
  const sortedData = [...displayEmployees]; // Create a copy of your data

  if (sortColumn === 'Title') {
    sortedData.sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      return order * a.task_title.localeCompare(b.task_title);
    });
  } else if (sortColumn === 'Start Date') {
    sortedData.sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      return order * moment(a.start_date).diff(moment(b.start_date));
    });
  } else if (sortColumn === 'Status') {
    sortedData.sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      // Handle null values by treating them as empty strings for comparison
      const statusA = a.status || '';
      const statusB = b.status || '';
      return order * statusA.localeCompare(statusB);
    });
  }

  // Api call for getting milestone dropdown based on project ID
  const getMilestoneTitle = () => {
    api
      .post('/projecttask/getMilestoneById', { project_id: id })
      .then((res) => {
        setMilestones(res.data.data);
      })
      .catch(() => {
        message('Milestones not found', 'info');
      });
  };

  //attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
    console.log('inside DataForAttachment');
  };
  useEffect(() => {
    editJobById();
    dataForAttachment();
    getMilestoneTitle();
  }, [id]);

  // const handleBackToList = () => {
  //   // Clear the filter criteria
  //   setCompanyName('');
  //   setCategoryName(''); // Reset the status dropdown to "Please Select"

  //   // Restore the full data
  //   setUserSearchData(taskById);

  //   // Clear the filtered data
  //   setFilteredData([]);
  // };
  //Structure of projectTask list view
  const Projecttaskcolumn = [
    {
      name: 'ID',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
    },
    {
      name: 'Title',
      sortable: true,
    },
    {
      name: 'Staff',
    },
    {
      name:'startdate',
      sortable: true,
    },
    {
      name: 'End Date',
    },
    {
      name: 'Actual completed Date',
    },
    {
      name: 'Actual Hours',
    },
    {
      name: 'Est Hours',
    },
    {
      name: 'Completion',
    },
    {
      name: 'Status',
      sortable: true,
    },
    {
      name: 'Task Type',
    },
    {
      name: 'Priority',
    },
    {
      name: 'File',
    },
    {
      name: 'Creation ',
    },
    {
      name: 'Modification ',
    },
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <br />
        <Card>
          <CardBody>
            <Row>
              <Col md="2">
                <FormGroup>
                  <Label>Select Staff</Label>
                  <Input
                    type="select"
                    name="employee_id"
                    onChange={(e) => setCompanyName(e.target.value)} // Update companyName state
                    value={companyName}
                  >
                    <option value="">Please Select</option>
                    {employee &&
                      employee.map((ele) => {
                        return (
                          // ele.e_count === 0 && (
                          <option key={ele.employee_id} value={ele.first_name}>
                            {ele.first_name}
                          </option>
                        );
                        // );
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="2">
                <FormGroup>
                  <Label>Select Category</Label>
                  <Input
                    type="select"
                    name="status"
                    onChange={(e) => setCategoryName(e.target.value)}
                    value={categoryName}
                  >
                    {' '}
                    <option value="">Select Category</option>
                    <option value="Pending">Pending</option>
                    <option value="InProgress">InProgress</option>
                    <option value="Completed">Completed</option>
                    <option value="OnHold">OnHold</option>
                    {/* <option value="tenancy work">Tenancy Work</option>
                <option value="maintenance">Maintenance</option> */}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="1" className="mt-3">
                <Button color="primary" className="shadow-none" onClick={() => handleSearch()}>
                  Go
                </Button>
              </Col>
              <span
                onClick={() => {
                  // Clear the filter criteria for both Select Staff and Select Category
                  setCompanyName('');
                  setCategoryName('');

                  // Restore the full data
                  setUserSearchData(taskById);

                  // Clear the filtered data
                  setFilteredData([]);
                }}
                style={{
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Back to List
              </span>
            </Row>
          </CardBody>
        </Card>
        <Form>
          <Row>
            <Col md="3">
              <FormGroup>
                <Button
                  color="primary"
                  className="shadow-none"
                  onClick={addContactToggle.bind(null)}
                >
                  Add New Task{' '}
                </Button>
                <Modal size="lg" isOpen={addContactModal} toggle={addContactToggle.bind(null)}>
                  <ModalHeader toggle={addContactToggle.bind(null)}>New Task</ModalHeader>
                  <ModalBody>
                    <Row>
                      <Col md="12">
                        <Card>
                          <CardBody>
                            <Form>
                              <Row>
                                <Col md="4">
                                  <FormGroup>
                                    <Label>Milestone</Label>
                                    <Input
                                      type="select"
                                      name="project_milestone_id"
                                      onChange={handleInputsTask}
                                    >
                                      <option>Select Milestone</option>
                                      {milestoneDetail &&
                                        milestoneDetail.map((e) => (
                                          <option key={e.project_id} value={e.project_milestone_id}>
                                            {e.milestone_title}
                                          </option>
                                        ))}
                                    </Input>
                                  </FormGroup>
                                </Col>
                                <Col md="4">
                                  <FormGroup>
                                    <Label>Title</Label>
                                    <Input
                                      type="text"
                                      name="task_title"
                                      onChange={handleInputsTask}
                                      value={insertTask && insertTask.task_title}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md="4">
                                  <FormGroup>
                                    <Label>Staff</Label>
                                    <Input
                                      type="select"
                                      name="employee_id"
                                      onChange={(e) => {
                                        handleInputsTask(e);
                                      }}
                                    >
                                      <option value="" selected>
                                        Please Select
                                      </option>
                                      {employee &&
                                        employee.map((ele) => {
                                          return (
                                            ele.e_count === 0 && (
                                              <option key={ele.employee_id} value={ele.employee_id}>
                                                {ele.first_name}
                                              </option>
                                            )
                                          );
                                        })}
                                    </Input>
                                  </FormGroup>
                                </Col>
                                <Col md="4">
                                  <FormGroup>
                                    <Label>Start date</Label>
                                    <Input
                                      type="date"
                                      onChange={handleInputsTask}
                                      value={
                                        insertTask &&
                                        moment(insertTask.start_date).format('YYYY-MM-DD')
                                      }
                                      name="start_date"
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md="4">
                                  <FormGroup>
                                    <Label>End date</Label>
                                    <Input
                                      type="date"
                                      onChange={handleInputsTask}
                                      value={
                                        insertTask &&
                                        moment(insertTask.end_date).format('YYYY-MM-DD')
                                      }
                                      name="end_date"
                                    />
                                  </FormGroup>
                                </Col>

                                <Col md="4">
                                  <FormGroup>
                                    <Label>Est Hours</Label>
                                    <Input
                                      type="text"
                                      name="estimated_hours"
                                      onChange={handleInputsTask}
                                      value={insertTask && insertTask.estimated_hours}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md="4">
                                  <FormGroup>
                                    <Label>Completion</Label>
                                    <Input
                                      type="text"
                                      name="completion"
                                      onChange={handleInputsTask}
                                      value={insertTask && insertTask.completion}
                                    />
                                  </FormGroup>
                                </Col>
                                {/* {(TaskStatus === 'Completed' ) && ( 
                                <Col md="4">
                                  <FormGroup>
                                    <Label>Status</Label>
                                    <Input
                                      type="select"
                                      name="status"
                                      onChange={handleInputsTask}
                                      value={insertTask && insertTask.status}
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
                                {/* )} */}
                                <Col md="4">
                                  <FormGroup>
                                    <Label>Task Type</Label>
                                    <Input
                                      type="select"
                                      name="task_type"
                                      onChange={handleInputsTask}
                                      value={insertTask && insertTask.task_type}
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
                                <Col md="4">
                                  <FormGroup>
                                    <Label>Priority</Label>
                                    <Input
                                      type="select"
                                      name="priority"
                                      onChange={handleInputsTask}
                                      value={insertTask && insertTask.priority}
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
                                <Col md="4">
                                  <FormGroup>
                                    <Label>Descrition</Label>
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
                      onClick={addContactToggle.bind(null)}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
              </FormGroup>
            </Col>
          </Row>
          <Table
            id="example"
            className="display border border-secondary rounded"
            title="projectTask List"
          >
            <thead>
              <tr>
                {Projecttaskcolumn.map((cell) => {
                  return (
                    <th key={cell.name} onClick={() => cell.sortable && handleSort(cell.name)}>
                      <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start', // Adjust this for desired alignment
            }}
          ></div>
                      {cell.name}
                      {cell.sortable && ( // Render sorting indicator if the column is sortable
                        <span className="sort-indicator">
                          {sortColumn === cell.name ? (
                            sortOrder === 'asc' ? (
                              <Icon.ArrowUp />
                            ) : (
                              <Icon.ArrowDown />
                            )
                          ) : (
                            <Icon.ArrowDown /> // Default sorting indicator
                          )}
                        </span>
                      )}
                    </th>
                  );
                  // return <td key={cell.name}>{cell.name}</td>;
                })}
              </tr>
            </thead>
         
            <tbody>
              {sortedData &&
                sortedData.map((element, index) => {
                  return (
                    <>
                      <tr key={element.project_task_id}>
                        <td rowSpan="2">{index + 1}</td>
                        <td rowSpan="2">
                          <span
                            onClick={() => {
                              setContactData(element);
                              setEditTaskEditModal(true);
                            }}
                          >
                            <Icon.Edit2 />
                          </span>
                        </td>
                        <td style={{ borderRight: 1, borderWidth: 1 }}>{element.task_title}</td>
                        <td>{element.first_name}</td>
                        <td>
                          {element.start_date
                            ? moment(element.start_date).format('DD-MM-YYYY')
                            : ''}
                        </td>
                        <td>
                          {element.end_date ? moment(element.end_date).format('DD-MM-YYYY') : ''}
                        </td>
                        <td>
                          {element.actual_completed_date
                            ? moment(element.actual_completed_date).format('DD-MM-YYYY')
                            : ''}
                        </td>
                        <td>{element.actual_hours}</td>
                        <td>{element.estimated_hours}</td>
                        <td>{element.completion}</td>
                        <td>{element.status}</td>
                        <td>{element.task_type}</td>
                        <td>{element.priority}</td>
                        <td>
                          <span
                            onClick={() => {
                              setRoomName('Task');
                              setFileTypes(['JPG', 'PNG', 'GIF', 'PDF']);
                              dataForAttachment();
                              setAttachmentModal(true);
                              setModuleId(element.project_task_id);
                            }}
                          >
                            <Icon.Plus />
                          </span>
                          <AttachmentModalV2
                            moduleId={moduleId}
                            attachmentModal={attachmentModal}
                            setAttachmentModal={setAttachmentModal}
                            roomName={roomName}
                            fileTypes={fileTypes}
                            altTagData="TaskRelated Data"
                            desc="TaskRelated Data"
                            recordType="RelatedPicture"
                            mediaType={attachmentData.modelType}
                            updateFile={updateFile}
                            setUpdateFile={setUpdateFile}
                          />
                          <ViewFileComponentV2
                            moduleId={element.project_task_id}
                            roomName="Task"
                            recordType="RelatedPicture"
                            updateFile={updateFile}
                            setUpdateFile={setUpdateFile}
                          />
                        </td>
                        <td>
                          {element.created_by} {element.creation_date}
                        </td>
                        <td>
                          {element.modified_by} {element.modification_date}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="14" style={{ borderRight: 1, borderWidth: 1 }}>
                          <ViewNote
                            recordId={id}
                            roomName={element?.title}
                            projectTaskId={element?.project_task_id}
                          />
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </Table>
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageCount={totalPages}
            onPageChange={changePage}
            containerClassName="navigationButtons"
            previousLinkClassName="previousButton"
            nextLinkClassName="nextButton"
            disabledClassName="navigationDisabled"
            activeClassName="navigationActive"
          />
        </Form>
      </div>
    </div>
  );
}
