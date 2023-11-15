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
  setTaskhistorymodal,
  setTaskhistoriesmodal,
  
}) {
  ProjectTask.propTypes = {
    addContactToggle: PropTypes.func,
    setEditTaskEditModal: PropTypes.func,
    setTaskhistoriesmodal: PropTypes.func,
    setTaskhistorymodal: PropTypes.func,
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
    head_count:'',
    status: '',
    task_type: '',
    description: '',
    project_milestone_id: '',
    project_team_id: '',
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
  const [employees, setEmployees] = useState();
  const [Team, setTeam] = useState();
  const [selectAll, setSelectAll] = useState(true);
  const [TeamID, setTeamID] = useState();
  const [roomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState();
  const [moduleId, setModuleId] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [updateFile, setUpdateFile] = useState(true);
  // const [selectedTeam, setSelectedTeam] = useState(''); // Store the selected team_title here
  const [selectedNames, setSelectedNames] = useState([]); // Store selected first_name values here


  // const [selectedTeam, setSelectedTeam] = useState(null);
  // const [selectedEmployees, setSelectedEmployees] = useState({});

  // const handleTeamChange = (teamId) => {
  //   setSelectedTeam(teamId);
  //   setSelectedEmployees({});
  // };

  // const handleEmployeeChange = (employeeId) => {
  //   setSelectedEmployees((prevSelectedEmployees) => ({
  //     ...prevSelectedEmployees,
  //     [employeeId]: !prevSelectedEmployees[employeeId],
  //   }));
  // };

  

  // Gettind data from Job By Id
  const editJobById = () => {
    api
      .get('/projectteam/getProjectTeam')
      .then((res) => {
        console.log(res.data.data);
        setTeam(res.data.data);
      })
      .catch(() => {});
  };
  const getStaffName = () => {
    api
      .post('/projectteam/getEmployeeByID', { project_team_id: id })
      .then((res) => {
        setEmployee(res.data.data);
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

  const employeesInTask=selectedNames.filter(val => val.checked)
  const empCount=selectedNames.filter(val => val.checked).length
  //get staff details
  const { loggedInuser } = useContext(AppContext);
  const insertTaskData = () => {
    if (isSubmitting) {
      return; // Prevent multiple submissions
    }
    if (insertTask.project_milestone_id !== '' && insertTask.task_title !== '') {
      setIsSubmitting(true); // Set submission in progress
      const newContactWithCompanyId = insertTask;
      newContactWithCompanyId.creation_date = creationdatetime;
      newContactWithCompanyId.created_by = loggedInuser.first_name;
      newContactWithCompanyId.project_id = id;
      newContactWithCompanyId.project_team_id = employees;
      newContactWithCompanyId.head_count = empCount;
        api
          .post('/projecttask/insertTask', newContactWithCompanyId)
          .then((res) => {
            const insertedDataId = res.data.data.insertId;
            console.log('Inserted Data ID:', insertedDataId);
            console.log(insertedDataId);
            employeesInTask.forEach((el)=>{
              el.project_task_id=insertedDataId;
              el.project_id=id
              console.log('el',el)

              api
              .post('/projecttask/insertTaskStaff', el)
              .then(() => {}).catch(()=>{

              })
          })
            message('Task inserted successfully.', 'success');
            getTaskById();
            getStaffName();
            addContactToggle(false);
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
          });
      
    } else {
      message('Please fill all required fields', 'warning');
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
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };
  const sortedData = [...userSearchData];
  if (sortColumn === 'Title') {
    sortedData.sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      return order * a.task_title.localeCompare(b.task_title);
    });
  } else if (sortColumn === 'startdate') {
    sortedData.sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      return order * moment(a.start_date).diff(moment(b.start_date));
    });
  } else if (sortColumn === 'Status') {
    sortedData.sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      const statusA = a.status || '';
      const statusB = b.status || '';
      return order * statusA.localeCompare(statusB);
    });
  }
  // Pagination
  const [page, setPage] = useState(0);
  const employeesPerPage = 10;
  const numberOfEmployeesVistited = page * employeesPerPage;
  const displayEmployees = sortedData.slice(
    numberOfEmployeesVistited,
    numberOfEmployeesVistited + employeesPerPage,
  );
  console.log('displayEmployees', displayEmployees);
  const totalPages = Math.ceil(userSearchData.length / employeesPerPage);
  const changePage = ({ selected }) => {
    setPage(selected);
  };
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchData = () => {
    const newData = taskById.filter((task) => {
      // Check if task.title exists and perform a case-insensitive search
      const titleMatches =
        task.task_title && task.task_title.toLowerCase().includes(searchQuery.toLowerCase());

      // Check if task.first_name exists and perform a case-insensitive search
      const firstNameMatches =
        task.first_name && task.first_name.toLowerCase().includes(searchQuery.toLowerCase());

      // Include the task in newData if either title or first_name matches
      return titleMatches || firstNameMatches;
    });

    setUserSearchData(newData);
    setFilteredData(newData);
  };

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
  const fetchEmployeeDetails = (projectTeamId) => {
    api
      .post('/projectteam/getEmployeeByID', { project_team_id: projectTeamId })
      .then((res) => {
        const arr = selectedNames.slice();
        res.data.data.forEach(val => {
          if (arr.findIndex(value => value.employeeId === val.employee_id) < 0) {
            arr.push({checked: false, employeeId: val.employee_id, project_team_id: val.project_team_id})
          }
        });
        
        setSelectedNames(arr);
        setEmployees(res.data.data);
        setTeamID(projectTeamId);
      })
      .catch(() => {});
  };

  console.log('selected names',selectedNames)
  //attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
    console.log('inside DataForAttachment');
  };

  //Milestone data in milestoneDetails
  const handleInputsTask = (e) => {
    setInsertTask({ ...insertTask, [e.target.name]: e.target.value });
  };

  useEffect(() => {

    getStaffName();
    editJobById();
    dataForAttachment();
    getMilestoneTitle();
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
    handleSearchData();
  }, [searchQuery]);

  useEffect(() => {
    if (insertTask.project_team_id) {
      const selectedTeams = insertTask.project_team_id;
      fetchEmployeeDetails(selectedTeams);
    }
  }, [insertTask.project_team_id]);
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
      name: 'Logs',
      selector: 'logs',
      cell: () => <Icon.Lock />,
    },
    {
      name: 'Histories',
      selector: 'logs',
      cell: () => <Icon.Lock />,
    },
    {
      name: 'Title',
      sortable: true,
    },
    {
      name: 'Task Type',
    },
    {
      name: 'Head Count',
    },
    {
      name: 'Status',
      sortable: true,
    },
    {
      name: 'File',
    },
    // {
    //   name: 'Staff',
    // },
    // {
    //   name: 'startdate',
    //   sortable: true,
    // },
    // {
    //   name: 'End Date',
    // },
    // {
    //   name: 'Actual completed Date',
    // },
    // {
    //   name: 'Actual Hours',
    // },
    // {
    //   name: 'Est Hours',
    // },
   
    // {
    //   name: 'Completion',
    // },
    
    
    {
      name: 'Priority',
    },
    
    // {
    //   name: 'Creation ',
    // },
    // {
    //   name: 'Modification ',
    // },
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
                  <Label>Select Staff </Label>
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
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
              </FormGroup>
            </Col>
          </Row>
          
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
                              <Label>
                                Milestone <span className="required">*</span>
                              </Label>
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
                              <Label>
                                Title <span className="required">*</span>
                              </Label>
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
                              <Label>Team Title</Label>
                              <Input
                                type="select"
                                name="project_team_id"
                                onChange={(e) => {
                                  const selectedEmployeeId = e.target.value;
                                  fetchEmployeeDetails(selectedEmployeeId);
                                }}
                              >
                                <option value="">Please Select</option>
                                {Team &&
                                  Team.map((ele) => (
                                    <option key={ele.project_team_id} value={ele.project_team_id}>
                                      {ele.team_title}
                                    </option>
                                  ))}
                              </Input>
                            </FormGroup>
                          </Col>
                          <Row>
                            <Table className="no-wrap mt-3 align-middle" responsive borderless>
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
                                  <th>Employee Name</th>
                                </tr>
                              </thead>
                              <tbody>
                                {employees &&
                                  employees.filter(val => val.project_team_id === TeamID).map((element) => {
                                    const index = selectedNames.findIndex(value => value.employeeId === element.employee_id);
                                    const isChecked = selectedNames[index].checked;
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
                                        <td>{element.first_name}</td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </Table>
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
                              <Label>Start date</Label>
                              <Input
                                type="date"
                                onChange={handleInputsTask}
                                value={
                                  insertTask && moment(insertTask.start_date).format('YYYY-MM-DD')
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
                                  insertTask && moment(insertTask.end_date).format('YYYY-MM-DD')
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
                                <option value="erection">Erection</option>
                                <option value="Dismantel">Dismantel</option>
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
                <p>Selected Employees</p>
                {selectedNames.filter(val => val.checked).map(val => (<p>{val.employeeId}</p>))}
                <div>
                 
                      
                </div>
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
              {displayEmployees &&
                displayEmployees.map((element, index) => {
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
                          color='primary'>
                            <Icon.Eye />
                          </span>
                        </td>
                        <td rowSpan="2">
                          <span
                            onClick={() => {
                              setContactData(element);
                              setTaskhistorymodal(true);
                            }}
                          >
                            <Icon.BookOpen />
                          </span>
                        </td>
                        <td rowSpan="2">
                          <span
                            onClick={() => {
                              setContactData(element);
                              setTaskhistoriesmodal(true);
                            }}
                          color='primary'>
                            <Icon.Book />
                          </span>
                        </td>
                        <td style={{ borderRight: 1, borderWidth: 1 }}>{element.task_title}</td>
                        
                        <td>{element.task_type}</td>
                        <td>{element.head_count}</td>
                        <td>{element.status}</td>
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
                        {/* <td>
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
                        
                       */}
                        <td>{element.priority}</td>
                        
                        {/* <td>
                          {element.created_by} {element.creation_date}
                        </td>
                        <td>
                          {element.modified_by} {element.modification_date}
                        </td> */}
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
