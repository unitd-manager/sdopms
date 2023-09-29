import React, { useState, useEffect,useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, TabContent, TabPane, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import DuctingCostModal from '../../components/ProjectModal/DuctingCostModal';
import message from '../../components/Message';
import api from '../../constants/api';
import ProjectTask from '../smartconTables/ProjectTask';
import ProjectTimeSheet from '../smartconTables/ProjectTimesheet';
import ProjectTeam from '../smartconTables/ProjectTeam';
import ProjectMilestones from '../../components/ProjectMilestones';
import ProjectMilestoneEdit from '../../components/ProjectMilestoneEdit';
import ProjectTaskEdit from '../../components/ProjectTaskEdit';
import ProjectTimeSheetEdit from '../../components/ProjectTImeSheetEdit';
import ProjectTeamEdit from '../../components/ProjectTeamEdit';
import Tab from '../../components/ProjectTabs/Tab';
import ComponentCardV2 from '../../components/ComponentCardV2';
import CalendarApp from '../apps/calendar/CalendarApp';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';
// import ActualHour from '../../components/dashboard/ActualHour';
// import AverageIssues from '../../components/dashboard/AverageIssues';
import StatsPmsProjectId from '../../components/dashboard/ProjectStats/StatsPmsProjectId';
import MilestoneStatsProject from '../../components/dashboard/ProjectStats/MilestoneStatsProject';
import ActualHourStatsProject from '../../components/dashboard/ProjectStats/ActualHourStatsProject';
import PriorityStatsProject from '../../components/dashboard/ProjectStats/PriorityStatsProject';
import AverageStatsProject from '../../components/dashboard/ProjectStats/AverageStatsProject';
import DueStatsProject from '../../components/dashboard/ProjectStats/DueStatsProject';

const ProjectEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  //const applyChanges = () => {};
  const backToList = () => {
    navigate('/Project');
  };

  console.log('project_id', id);

  const [projectDetail, setProjectDetail] = useState();
  const [company, setCompany] = useState();
  const [contact, setContact] = useState();
  const [contactData, setContactDatas] = useState();
  const [editTaskEditModals, setEditTaskEditModals] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [addDuctingCostModal, setAddDuctingCostModal] = useState(false);
  const [addContactModals, setAddContactModals] = useState(false);
  const [milestoneById, setMilestone] = useState();
  const [taskById, setTaskById] = useState([]);
  const [userSearchData, setUserSearchData] = useState([]);
  const [contactDatas, setContactData] = useState();
  const [editTaskEditModal, setEditTaskEditModal] = useState(false);
  const [addContactModal, setAddContactModal] = useState(false);
  const [timeSheetById, setTimeSheetById] = useState();
  const [contactDatass, setContactDatass] = useState();
  const [editTimeSheetModal, setEditTimeSheetEditModal] = useState(false);
  const [addContactModalss, setAddContactModalss] = useState(false);
  const [teamById, setTeamById] = useState();
  const [contactDataTeam, setContactDataTeam] = useState();
  const [editTeamModal, setEditTeamEditModal] = useState(false);
  const [addContactModalTeam, setAddContactModalTeam] = useState(false);
  //get staff details
  const { loggedInuser } = useContext(AppContext);

  // Start for tab refresh navigation
  const tabs = [
    { id: '1', name: 'Analytics' },
    { id: '2', name: 'Costing Summary' },
    { id: '3', name: 'Milestones' },
    { id: '4', name: 'Team' },
    { id: '5', name: 'Task' },
    { id: '6', name: 'Timesheet' },
    { id: '7', name: 'Calender' },
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  }

  // End for tab refresh navigation

  const addContactToggles = () => {
    setAddContactModals(!addContactModals);
  };
  const addContactToggle = () => {
    setAddContactModal(!addContactModal);
  };
  const addContactToggless = () => {
    setAddContactModalss(!addContactModalss);
  };
  const addContactToggleTeam = () => {
    setAddContactModalTeam(!addContactModalTeam);
  };

  // Fetch Costing Summary

  // Get Project By Id

  const getProjectById = () => {
    api
      .post('/project/getProjectsByIDs', { project_id: id })
      .then((res) => {
        setProjectDetail(res.data.data[0]);
      })
      .catch(() => {
        message('Project not found', 'info');
      });
  };
  // Edit Project

  const handleInputs = (e) => {
    setProjectDetail({ ...projectDetail, [e.target.name]: e.target.value });
  };

  const UpdateData = () => {
    projectDetail.modification_date = creationdatetime;
    projectDetail.modified_by = loggedInuser.first_name;
    api
      .post('/project/edit-Project', projectDetail)
      .then(() => {
        message('Record editted successfully', 'success');
        getProjectById();
      })
      .catch(() => {});
  };
  //Getting data from milestone
  const getMilestoneById = () => {
    api
      .post('/milestone/getMilestoneProjectById', { project_id: id })
      .then((res) => {
        setMilestone(res.data.data);
      })
      .catch(() => {});
  };
  //Getting data from milestone
  const getTaskById = () => {
    
    api
      .post('/projecttask/getProjectTaskfilterById', { project_id: id })
      .then((res) => {
        setTaskById(res.data.data);
        setUserSearchData(res.data.data);
      })
      .catch(() => {});
  };
  //Getting data from milestone
  const getTimeSheetById = () => {
    api
      .post('/projecttimesheet/getTimeSheetProjectById', { project_id: id })
      .then((res) => {
        setTimeSheetById(res.data.data);
      })
      .catch(() => {});
  };

  //Getting data from milestone
  const getTeamById = () => {
    api
      .post('/projectteam/getTeamProjectById', { project_id: id })
      .then((res) => {
        setTeamById(res.data.data);
      })
      .catch(() => {});
  };

  //Getting data from Company
  const getCompany = () => {
    api
      .post('/project/getCompany')
      .then((res) => {
        setCompany(res.data.data);
      })
      .catch(() => {});
  }; //Getting data from contact
  const getContact = (companyId) => {
    api
      .post('/project/getcontactById', { company_id: companyId })
      .then((res) => {
        setContact(res.data.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getProjectById();
    getMilestoneById();
    getTaskById();
    getTimeSheetById();
    getTeamById();
    getCompany();
  }, [id]);

  useEffect(() => {
    if (projectDetail && projectDetail.company_id) {
      // Use company.company_id directly to get the selected project ID
      const selectedProjectId = projectDetail.company_id;
      getContact(selectedProjectId); // Fetch contact data based on selected company
    }
  }, [projectDetail && projectDetail.company_id]);

  return (
    <>
      <BreadCrumbs />
      <Form>
    <FormGroup>
      <ComponentCardV2>
        <Row>
          <Col>
            <Button className='shadow-none'
              color="primary"
              onClick={() => {
                UpdateData();
                navigate('/Project');
              }}
            >
              Save
            </Button>
          </Col>
          <Col>
            <Button className='shadow-none'
              color="primary"
              onClick={() => {
                UpdateData();
                //applyChanges();
              }}
            >
              Apply
            </Button>
          </Col>

         
          <Col>
            <Button className='shadow-none'
              color="dark"
              onClick={() => {
                backToList();
              }}
            >
              Back to List
            </Button>
          </Col>
        </Row>
      </ComponentCardV2>
    </FormGroup>
  </Form>
      <Form>
        <FormGroup>
          <ComponentCard title="Project Details" creationModificationDate={projectDetail}>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>
                    Title<span className="required">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="title"
                    value={projectDetail && projectDetail.title}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label>
                    Category <span className="required"> *</span>{' '}
                  </Label>
                  <Input
                    type="select"
                    name="category"
                    value={projectDetail && projectDetail.category}
                    onChange={handleInputs}
                  >
                    <option defaultValue="selected">Please Select</option>
                    <option value="Project">Project</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Tenancy Project">Tenancy Project</option>
                    <option value="Tenancy Work">Tenancy Work</option>
                  </Input>
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label>Status </Label>
                  <Input
                    type="select"
                    name="status"
                    value={projectDetail && projectDetail.status}
                    onChange={handleInputs}
                  >
                    <option defaultValue="selected">Please Select</option>
                    <option value="WIP">WIP</option>
                    <option value="Billable">Billable</option>
                    <option value="Billed">Billed</option>
                    <option value="Complete">Complete</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Latest">Latest</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Company</Label>
                  <Input
                    type="select"
                    name="company_id"
                    value={projectDetail && projectDetail.company_id}
                    onChange={(e) => {
                      handleInputs(e);
                      const selectedProject = e.target.value;
                      getContact(selectedProject);
                    }}
                  >
                    <option defaultValue="selected">Please Select</option>
                    {company &&
                      company.map((e) => (
                        <option key={e.company_id} value={e.company_id}>
                          {e.company_name}
                        </option>
                      ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Contact</Label>
                  <Input
                    type="select"
                    name="contact_id"
                    value={projectDetail && projectDetail.contact_id}
                    onChange={handleInputs}
                  >
                    <option defaultValue="selected">Please Select</option>
                    {contact &&
                      contact.map((ele) => {
                        return (
                          <option key={ele.company_id} value={ele.contact_id}>
                            {ele.first_name}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    name="start_date"
                    defaultValue={projectDetail && projectDetail.start_date}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Estimated Finish Date</Label>
                  <Input
                    type="date"
                    name="estimated_finish_date"
                    defaultValue={projectDetail && projectDetail.estimated_finish_date}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Description</Label>
                  <Input
                    type="text"
                    name="description"
                    defaultValue={projectDetail && projectDetail.description}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Project Manager</Label>
                  <Input
                    type="text"
                    name="project_manager_id"
                    defaultValue={projectDetail && projectDetail.project_manager_id}
                    onChange={handleInputs}
                  >
                    <option defaultValue="selected">Please Select</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>
        <DuctingCostModal
          addDuctingCostModal={addDuctingCostModal}
          setAddDuctingCostModal={setAddDuctingCostModal}
        />

        {/* Tab 1 */}
        <TabContent className="p-4" activeTab={activeTab}>
          <Tab toggle={toggle} tabs={tabs} />
          <TabPane tabId="1">
            <br />
            <Row>
              <Col>
                <StatsPmsProjectId id={id}></StatsPmsProjectId>
              </Col>
              <Col>
                <DueStatsProject id={id}></DueStatsProject>
              </Col>
            </Row>
            <br/>
            <Row>
            <Col sm="4" lg="10" xl="6" xxl="6">
                <MilestoneStatsProject id={id}></MilestoneStatsProject>
              </Col>
              <Col sm="4" lg="10" xl="6" xxl="6">
                <AverageStatsProject id={id}></AverageStatsProject>
              </Col>
            </Row>
            <br/>
            <ActualHourStatsProject id={id}></ActualHourStatsProject>
            <br/>
            <PriorityStatsProject id={id}></PriorityStatsProject>
          </TabPane>
          {/* Tab 2 */}
          <TabPane tabId="2"></TabPane>
          {/* Tab 3 Milestone */}
          <TabPane tabId="3">
            <br />
            <ProjectMilestones
              setContactDatas={setContactDatas}
              id={id}
              addContactToggles={addContactToggles}
              addContactModals={addContactModals}
              setEditTaskEditModals={setEditTaskEditModals}
              milestoneById={milestoneById}
              getMilestoneById={getMilestoneById}
            ></ProjectMilestones>
            <ProjectMilestoneEdit
              getMilestoneById={getMilestoneById}
              contactData={contactData}
              editTaskEditModals={editTaskEditModals}
              setEditTaskEditModals={setEditTaskEditModals}
            ></ProjectMilestoneEdit>
          </TabPane>
          {/* Tab 4 */}
          <TabPane tabId="4">
            <br />
            <ProjectTeam
              setContactDataTeam={setContactDataTeam}
              id={id}
              teamById={teamById}
              addContactToggleTeam={addContactToggleTeam}
              addContactModalTeam={addContactModalTeam}
              setEditTeamEditModal={setEditTeamEditModal}
              getTeamById={getTeamById}
            />
            <ProjectTeamEdit
              getTeamById={getTeamById}
              contactDataTeam={contactDataTeam}
              editTeamModal={editTeamModal}
              setEditTeamEditModal={setEditTeamEditModal}
            />
          </TabPane>
          {/* Tab 5 */}
          <TabPane tabId="5">
            <ProjectTask
              userSearchData={userSearchData}
              setUserSearchData={setUserSearchData}
              setContactData={setContactData}
              id={id}
              getTaskById={getTaskById}
              taskById={taskById}
              setTaskById={setTaskById}
              addContactToggle={addContactToggle}
              addContactModal={addContactModal}
              setEditTaskEditModal={setEditTaskEditModal}
            ></ProjectTask>
            <ProjectTaskEdit
              getTaskById={getTaskById}
              id={id}
              contactDatas={contactDatas}
              editTaskEditModal={editTaskEditModal}
              setEditTaskEditModal={setEditTaskEditModal}
            ></ProjectTaskEdit>
          </TabPane>
          {/* Start Tab Content 6  Delivery Order */}
          <TabPane tabId="6">
            <ProjectTimeSheet
              setContactDatass={setContactDatass}
              id={id}
              timeSheetById={timeSheetById}
              addContactToggless={addContactToggless}
              addContactModalss={addContactModalss}
              setEditTimeSheetEditModal={setEditTimeSheetEditModal}
              getTimeSheetById={getTimeSheetById}
            />
            <ProjectTimeSheetEdit
              contactDatass={contactDatass}
              id={id}
              editTimeSheetModal={editTimeSheetModal}
              setEditTimeSheetEditModal={setEditTimeSheetEditModal}
              getTimeSheetById={getTimeSheetById}
            ></ProjectTimeSheetEdit>
          </TabPane>
          <TabPane tabId="7">
            <br />
            <CalendarApp projectDetail={projectDetail} id={id}></CalendarApp>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default ProjectEdit;
