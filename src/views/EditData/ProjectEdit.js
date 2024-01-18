/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, TabContent, TabPane,Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import DuctingCostModal from '../../components/ProjectModal/DuctingCostModal';
import message from '../../components/Message';
import api from '../../constants/api';
import ProjectTask from '../smartconTables/ProjectTask';
// import ProjectTimeSheet from '../smartconTables/ProjectTimesheet';
import ProjectTeam from '../smartconTables/ProjectTeam';
import ProjectMilestones from '../../components/ProjectMilestones';
import ProjectMilestoneEdit from '../../components/ProjectMilestoneEdit';
import ProjectTaskEdit from '../../components/ProjectTaskEdit';
// import ProjectTimeSheetEdit from '../../components/ProjectTImeSheetEdit';
import ProjectTeamEdit from '../../components/ProjectTeamEdit';
import FinanceTab from '../../components/ProjectModal/FinanceTab';
import Tab from '../../components/ProjectTabs/Tab';
//import ComponentCardV2 from '../../components/ComponentCardV2';
//import CalendarApp from '../apps/calendar/CalendarApp';
import ProjectYard from '../smartconTables/ProjectYard';
import ApiButton from '../../components/ApiButton';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';
import EditPoModal from '../../components/ProjectModal/EditPoModal';
import EditPOLineItemsModal from '../../components/ProjectModal/EditPOLineItemsModal';
import AddPurchaseOrderModal from '../../components/ProjectModal/AddPurchaseOrderModal';
// import ActualHour from '../../components/dashboard/ActualHour';
// import AverageIssues from '../../components/dashboard/AverageIssues';
import MaterialsTransferred from '../../components/ProjectModal/MaterialsTransferred';
import MaterialPurchased from '../../components/ProjectModal/MaterialPurchased';
import MaterialsusedTab from '../../components/ProjectModal/MaterialsusedTab';
import TransferModal from '../../components/ProjectModal/TransferModal';
import QuotationMoreDetails from '../../components/ProjectModal/QuotationMoreDetails';
import TaskHistoryModal from '../../components/TaskHistory modal';
import TaskHistoriesModal from '../../components/TaskHistoriesModal';
// import ProjectWorksheet from '../../components/WorkSheetTable/ProjectWorksheet';
import { HasAccess ,usePermify} from '@permify/react-role';
import CostingSummary from '../../components/dashboard/ProjectStats/Costing';
import ProjectWorksheet from '../../components/WorkSheetTable/ProjectWorksheet';

const ProjectEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  //const applyChanges = () => {};
  const backToList = () => {
    navigate('/Project');
  };

  console.log('project_id', id);
  const { isAuthorized, isLoading } = usePermify();

  
  const fetchData = async (type) => {
    // Pass roles and permissions accordingly
    // You can send empty array or null for first param to check permissions only
    if (await isAuthorized(null, `${module}-${type}`)) {
       return true
    }else{
      return false
    }
};
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
  const [yardModals, setYardModals] = useState(false);
  const [incharge, setIncharge] = useState();
  const [supervisor, setSupervisor] = useState();
  // const [timeSheetById, setTimeSheetById] = useState();
  // const [contactDatass, setContactDatass] = useState();
  const [addLineItemModal, setAddLineItemModal] = useState(false);
  const [quotation, setQuotation] = useState({});
  const [lineItem, setLineItem] = useState([]);
  const [quotationsModal, setquotationsModal] = useState(false);
  // const [editTimeSheetModal, setEditTimeSheetEditModal] = useState(false);
  // const [addContactModalss, setAddContactModalss] = useState(false);
  const [teamById, setTeamById] = useState();
  const [contactDataTeam, setContactDataTeam] = useState();
  const [editTeamModal, setEditTeamEditModal] = useState(false);
  const [addContactModalTeam, setAddContactModalTeam] = useState(false);
  //get staff details
  const { loggedInuser } = useContext(AppContext);
  const [selectedPoProducts, setSelectedPoProducts] = useState([]);
  const [transferModal, setTransferModal] = useState(false);
  const [transferItem, setTransferItem] = useState({});
  const [editPo, setEditPo] = useState(false);
  const [editPOLineItemsModal, setEditPOLineItemsModal] = useState(false);
  const [tabPurchaseOrderLineItemTable, setTabPurchaseOrderLineItemTable] = useState();
  const [addPurchaseOrderModal, setAddPurchaseOrderModal] = useState(false);
  const [checkId, setCheckId] = useState([]);
  const [POId, setPOId] = useState('');
  const [testJsonData, setTestJsonData] = useState(null);
  const [viewLineModal, setViewLineModal] = useState(false);
  const [taskhistorymodal, setTaskhistorymodal] = useState(false);
  const [taskhistoriesmodal, setTaskhistoriesmodal] = useState(false);
  const [WorkSheet, setWorkSheet] = useState(null);

 
  const [quoteForm, setQuoteForm] = useState({
    quote_date: '',
    quote_code: '',
  });
  console.log('contactdatas',contactDatas)



  // Start for tab refresh navigation
  const tabs = [
    
    { id: '1', name: 'Costing Summary' },
    // { id: '2', name: 'Quotation' },
    { id: '3', name: 'Milestones' },
    { id: '4', name: 'Team' },
    { id: '5', name: 'Task' },
    { id: '6', name: 'Worksheet' },
    { id: '7', name: 'Yard' },
    // { id: '8', name: 'Material Purchase Order' },
    // { id: '9', name: 'Material Used' },
    // { id: '10',name: 'Material Transferred' },
    // { id: '11',name: 'Finance' },
   
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };

  // End for tab refresh navigation

  const addContactToggles = () => {
    setAddContactModals(!addContactModals);
  };
  const addYardToggles = () => {
    setYardModals(!yardModals);
  };
  const viewLineToggle = () => {
    setViewLineModal(!viewLineModal);
  };
  console.log(viewLineToggle);
  const addContactToggle = () => {
    setAddContactModal(!addContactModal);
  };
  // const addContactToggless = () => {
  //   setAddContactModalss(!addContactModalss);
  // };
  const addContactToggleTeam = () => {
    setAddContactModalTeam(!addContactModalTeam);
  };
  useEffect(() => {
    api
      .post('/purchaseorder/testAPIendpoint', { project_id: id })
      .then((res) => {
        setTestJsonData(res?.data?.data);
        console.log("test",res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

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
  const getQuotations = () => {
    api.post('/project/getTabQuoteById', { project_id: id }).then((res) => {
      setQuotation(res.data.data);
    });
  };

 //Getting data from milestone
 const getworksheetbyId = () => {
  api
    .post('/projecttask/getprojecttaskhistory', { project_id: id })
    .then((res) => {
      setWorkSheet(res.data.data);
    })
    .catch(() => {});
};

    // Get Line Item
  const getLineItem = (quotationId) => {
    api.post('/project/getQuoteLineItemsById', { quote_id: quotationId }).then((res) => {
      setLineItem(res.data.data);
      console.log('lineItem', res.data.data);

      //setViewLineModal(true);
    });
  };
  // const getIncharge = () => {
  //   api
  //     .get('/tender/projectIncharge')
  //     .then((res) => {
  //       setIncharge(res.data.data);
  //     })
  //     .catch(() => {});
  // };
  // Edit Project

  const handleInputs = (e) => {
    setProjectDetail({ ...projectDetail, [e.target.name]: e.target.value });
  };

  const UpdateData = () => {
    projectDetail.modification_date = creationdatetime;
    projectDetail.modified_by = loggedInuser.first_name;
    console.log('projectdetail',projectDetail)
    api
      .post('/project/edit-Project', projectDetail)
      .then(() => {
        message('Record editted successfully', 'success');
        getProjectById();
      })
      .catch(() => {});
  };
  const insertQuote = (code) => {
    const newQuoteId = quoteForm;
    newQuoteId.project_id = id;
    newQuoteId.quote_code = code;
     
        api.post('/project/insertquote', newQuoteId).then(() => {
          message('Quote inserted successfully.', 'success');
          getQuotations();
        });
      };
  const handleQuoteForms = (ele) => {
    setQuoteForm({ ...quoteForm, [ele.target.name]: ele.target.value });
  };
  const getProjectManager = () => {
    api
      .get('/project/getProjectManager')
      .then((res) => {
        setIncharge(res.data.data);
      })
      .catch(() => {});
  };
  const getSupervisor = () => {
    api
      .get('/project/getProjectSupervisor')
      .then((res) => {
        setSupervisor(res.data.data);
      })
      .catch(() => {});
  };
  //QUTO GENERATED CODE
  const generateCode = () => {
    api
      .post('/tender/getCodeValue', { type: 'quote' })
      .then((res) => {
        insertQuote(res.data.data);
      })
      .catch(() => {
        insertQuote('');
      });
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
  // const getTimeSheetById = () => {
  //   api
  //     .post('/projecttimesheet/getTimeSheetProjectById', { project_id: id })
  //     .then((res) => {
  //       setTimeSheetById(res.data.data);
  //     })
  //     .catch(() => {});
  // };
  // Tab PurchaseOrder LineItem Table
  const TabPurchaseOrderLineItemTable = () => {
    api.post('/purchaseorder/testAPIendpoint', { project_id: id }).then((res) => {
      let arrayOfObj = Object.entries(res.data.data).map((e) => ({ id: e[0], data: e[1] }));
      arrayOfObj = arrayOfObj.reverse();
      setTabPurchaseOrderLineItemTable(arrayOfObj);
    });
  };
  useEffect(() => {
    setTimeout(() => {
      TabPurchaseOrderLineItemTable();
    }, 2000);
  }, [addPurchaseOrderModal]);

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
  // handleCheck
  const handleCheck = (e, item) => {
    let updatedList = [...checkId];
    if (e.target.checked) {
      updatedList = [...checkId, { item }];
    } else {
      const indexOfObject = updatedList.findIndex((object) => {
        return object.id === item.po_product_id;
      });

      updatedList.splice(indexOfObject, 1);
    }
    setCheckId(updatedList);
    setSelectedPoProducts(selectedPoProducts);
  };

  //Add to stocks
  const addQtytoStocks = () => {
    const isEmpty = Object.keys(checkId).length === 0;

    if (isEmpty) {
      Swal.fire('Please select atleast one product!');
    } else {
      const selectedProducts = checkId;
      setCheckId([]);
      selectedProducts.forEach((elem) => {
        console.log('elem', elem);
        if (elem.item.status !== 'Closed') {
          elem.item.status = 'Closed';
          elem.item.qty_updated = elem.item.qty_delivered;
          elem.item.qty_in_stock += parseFloat(elem.item.qty_delivered);

          api
            .post('/purchaseorder/editTabPurchaseOrderLineItem', elem.item)
            .then(() => {
              api
                .post('/product/edit-ProductQty', elem.item)
                .then(() => {
                  message('Quantity updated in product successfully.', 'success');
                  api
                    .post('/inventory/editInventoryStock', elem.item)
                    .then(() => {
                      message('Quantity updated in inventory successfully.', 'success');
                    })
                    .catch(() => {
                      message('unable to update quantity in inventory.', 'danger');
                    });
                })
                .catch(() => {
                  message('unable to update quantity in inventory.', 'danger');
                });
            })
            .catch(() => {
              message('unable to add quantity.', 'danger');
            });
        } else {
          message('This product is already added', 'danger');
        }
      });
    }
  };
  const insertDeliveryHistoryOrder = (proId, deliveryOrderId) => {
    api
      .post('/projecttabdeliveryorder/insertDeliveryHistoryOrder', {
        product_id: proId.product_id,
        purchase_order_id: proId.purchase_order_id,
        delivery_order_id: deliveryOrderId,
        status: '1',
        quantity: proId.qty,
        item_title: proId.item_title,
        creation_date: moment(),
        modification_date: moment(),
        remarks: proId.description,
      })
      .then(() => {
        message('Delivery Order Item Inserted', 'success');
      })
      .catch(() => {
        message('Unable to add Delivery Order Item', 'error');
      });
  };

  const insertDelivery = () => {
    const isEmpty = Object.keys(checkId).length === 0;

    if (isEmpty) {
      Swal.fire('Please select atleast one product!');
    } else {
      api
        .post('/projecttabdeliveryorder/insertdelivery_order', {
          project_id: id,
          company_id: projectDetail.company_id,
          purchase_order_id: '',
          date: new Date(),
          created_by: '1',
          creation_date: new Date(),
          modified_by: '1',
          modification_date: new Date(),
        })
        .then((res) => {
          const selectedProducts = checkId;
          setCheckId([]);
          selectedProducts.forEach((element) => {
            insertDeliveryHistoryOrder(element.item, res.data.data.insertId);
          });
        })
        .catch(() => {
          message('Unable to add delivery order.', 'error');
        });
    }
  };
  const getTotalOfPurchase = (pItems) => {
    let total = 0;
    pItems.forEach((a) => {
      total += parseInt(a.amount, 10);
    });
    return total;
  };
  const deleteData = () => {
    Swal.fire({
      title: `Are you sure? `,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api.post('/project/deleteProject', { project_id: id }).then(() => {
          Swal.fire('Deleted!', 'Your employee has been deleted.', 'success');
          backToList();
        });
      }
    });
  };

  useEffect(() => {
    getProjectById();
    getMilestoneById();
    getTaskById();
    //getTimeSheetById();
    getSupervisor();
    getProjectManager();
    getTeamById();
    TabPurchaseOrderLineItemTable();
    getCompany();
    getQuotations();
    getLineItem();
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
          <ToastContainer></ToastContainer>
          {/* <ComponentCardV2> */}
            <ApiButton
              editData={UpdateData}
              navigate={navigate}
              //applyChanges={editMilestone}
              backToList={backToList}
              deleteData={deleteData}
              module="Project"
            ></ApiButton>
          {/* </ComponentCardV2> */}
        </FormGroup>
      </Form>
      <Form>
        <FormGroup>
          <ComponentCard title="Project Details" creationModificationDate={projectDetail}>
            <Row>
            <Col md="3">
                <FormGroup>
                  <Label>Code</Label>
                  <Input
                    type="text"
                    name="project_code"
                    defaultValue={projectDetail && projectDetail.project_code}
                    onChange={handleInputs}
                    disabled
                  />
                </FormGroup>
              </Col>
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
                  <Label>Job No</Label>
                  <Input
                    type="text"
                    name="job_no"
                    defaultValue={projectDetail && projectDetail.job_no}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Work Order no</Label>
                  <Input
                    type="text"
                    name="work_order_no"
                    defaultValue={projectDetail && projectDetail.work_order_no}
                    onChange={handleInputs}
                  />
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
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    name="end_date"
                    defaultValue={projectDetail && projectDetail.end_date}
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
                  <Label>Project Manager</Label>
                  <Input
                    type="select"
                    name="project_manager_id"
                    onChange={handleInputs}
                    value={projectDetail && projectDetail.project_manager_id}
                  >
                    <option value="selected">Please Select</option>
                    {incharge &&
                      incharge.map((ele) => {
                        return (
                          <option value={ele.employee_id} key={ele.employee_id}>
                          {ele.employee_name}
                        </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Project Supervisor</Label>
                  <Input
                    type="select"
                    name="project_supervisor_id"
                    onChange={handleInputs}
                    value={projectDetail && projectDetail.project_supervisor_id}
                  >
                    <option value="selected">Please Select</option>
                    {supervisor &&
                      supervisor.map((ele) => {
                        return (
                          <option value={ele.employee_id} key={ele.employee_id}>
                          {ele.employee_name}
                        </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Description</Label>
                  <Input
                    type="textarea"
                    name="description"
                    defaultValue={projectDetail && projectDetail.description}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
            
              </Row>
              </ComponentCard>
              <ComponentCard title="Project Amount Details">
                <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Pipe Erection Amount($)</Label>
                  <Input
                    type="text"
                    name="pipe_erection_amount"
                    defaultValue={projectDetail && projectDetail.pipe_erection_amount }
                    onChange={handleInputs}
                    
                  >
                    
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Plank Erection Amount($)</Label>
                  <Input
                    type="text"
                    name="plank_erection_amount"
                    defaultValue={projectDetail && projectDetail.plank_erection_amount }
                    onChange={handleInputs}
                    
                  >
                    
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Volume Erection Amount($)</Label>
                  <Input
                    type="text"
                    name="volume_erection_amount"
                    defaultValue={projectDetail && projectDetail.volume_erection_amount }
                    onChange={handleInputs}
                    
                  >
                   
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>TB Erection Amount($)</Label>
                  <Input
                    type="text"
                    name="tb_erection_amount"
                    defaultValue={projectDetail && projectDetail.tb_erection_amount }
                    onChange={handleInputs}
                    
                  >
                  
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Others Erection Amount($)</Label>
                  <Input
                    type="text"
                    name="others_erection_amount"
                    defaultValue={projectDetail && projectDetail.others_erection_amount }
                    onChange={handleInputs}
                    
                  >
                    
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Pipe Dismantel Amount($)</Label>
                  <Input
                    type="text"
                    name="pipe_dismantel_amount"
                    defaultValue={projectDetail && projectDetail.pipe_dismantel_amount }
                    onChange={handleInputs}
                    
                  >
                    
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Plank Dismantel Amount($)</Label>
                  <Input
                    type="text"
                    name="plank_dismantel_amount"
                    defaultValue={projectDetail && projectDetail.plank_dismantel_amount }
                    onChange={handleInputs}
                    
                  >
                   
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Volume Dismantel Amount($)</Label>
                  <Input
                    type="text"
                    name="volume_dismantel_amount"
                    defaultValue={projectDetail && projectDetail.volume_dismantel_amount}
                    onChange={handleInputs}
                    
                  >
                   
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>TB Dismantel Amount($)</Label>
                  <Input
                    type="text"
                    name="tb_dismantel_amount"
                    defaultValue={projectDetail && projectDetail.tb_dismantel_amount }
                    onChange={handleInputs}
                    
                  >
                    
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Others Dismantel Amount($)</Label>
                  <Input
                    type="text"
                    name="others_dismantel_amount"
                    defaultValue={projectDetail && projectDetail.others_dismantel_amount}
                    onChange={handleInputs}
                    
                  >
                    
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
            <CostingSummary/>
          </TabPane>
          
          {/* Tab 2 */}
          <HasAccess
                roles={null}
                permissions={`client-edit`}
                renderAuthFailed={<p></p>}
        >
          <TabPane tabId="2" eventkey="quotationMoreDetails">
            <br/>
          <Row className="mb-4">
              {Object.keys(quotation).length === 0 && (
                <Col md="2">
                  <Button
                    color="primary"
                    className="shadow-none"
                    onClick={(ele) => {
                      if (
                        window.confirm(
                          'Do you Like to Add Quote ?',
                        )
                      ) {
                      handleQuoteForms(ele);
                      generateCode(ele);
                    }}
                  }
                  >
                    Add Quote
                  </Button>
                </Col>
              )}
            </Row>
            <QuotationMoreDetails
              id={id}
              addLineItemModal={addLineItemModal}
              setAddLineItemModal={setAddLineItemModal}
              viewLineModal={viewLineModal}
              viewLineToggle={viewLineToggle}
              lineItem={lineItem}
              getLineItem={getLineItem}
              quotationsModal={quotationsModal}
              setquotationsModal={setquotationsModal}
              quotation={quotation}
              setViewLineModal={setViewLineModal}
            ></QuotationMoreDetails>
          </TabPane>
          <TabPane tabId="2"></TabPane>
          </HasAccess>
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
            projectDetail={projectDetail}
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
              setTaskhistorymodal={setTaskhistorymodal}
              setTaskhistoriesmodal={setTaskhistoriesmodal}
            ></ProjectTask>
            {editTaskEditModal&&<ProjectTaskEdit
              getTaskById={getTaskById}
              id={id}
              contactDatas={contactDatas}
              editTaskEditModal={editTaskEditModal}
              setEditTaskEditModal={setEditTaskEditModal}
            ></ProjectTaskEdit>}
              {taskhistorymodal&&<TaskHistoryModal
              getTaskById={getTaskById}
              projectDetail={projectDetail}
              id={id}
              contactDatas={contactDatas}
              taskhistorymodal={taskhistorymodal}
              setTaskhistorymodal={setTaskhistorymodal}
              getworksheetbyId={getworksheetbyId}
            ></TaskHistoryModal>}
            {taskhistoriesmodal&&<TaskHistoriesModal
              getTaskById={getTaskById}
              id={id}
              contactDatas={contactDatas}
              taskhistoriesmodal={taskhistoriesmodal}
              setTaskhistoriesmodal={setTaskhistoriesmodal}
            ></TaskHistoriesModal>}
          </TabPane>
       
           <TabPane tabId="6">
            <br/>
<ProjectWorksheet
WorkSheet={WorkSheet}
getworksheetbyId={getworksheetbyId}
></ProjectWorksheet>
{/* <ProjectTimeSheet></ProjectTimeSheet> */}
           </TabPane>
           
          <TabPane tabId="7">
            <br />
          <ProjectYard
           projectDetail={projectDetail}
           userSearchData={userSearchData}
           setUserSearchData={setUserSearchData}
           setContactData={setContactData}
           id={id}
           getTaskById={getTaskById}
           taskById={taskById}
           setTaskById={setTaskById}
           addContactToggle={addYardToggles}
           addContactModal={yardModals}
           setEditTaskEditModal={setEditTaskEditModal}
           setTaskhistorymodal={setTaskhistorymodal}
           setTaskhistoriesmodal={setTaskhistoriesmodal}
          />
          </TabPane>
         
          {/* </TabPane> */}
          {/* Tab 5 Materials Purchased */}
          <HasAccess
                roles={null}
                permissions={`client-edit`}
                renderAuthFailed={<p></p>}
        >
          <TabPane tabId="8" eventkey="materialPurchased">
            <AddPurchaseOrderModal
              projectId={id}
              addPurchaseOrderModal={addPurchaseOrderModal}
              setAddPurchaseOrderModal={setAddPurchaseOrderModal}
            />

            {editPo && <EditPoModal editPo={editPo} setEditPo={setEditPo} data={POId} />}
            {editPOLineItemsModal && (
              <EditPOLineItemsModal
                editPOLineItemsModal={editPOLineItemsModal}
                setEditPOLineItemsModal={setEditPOLineItemsModal}
                data={POId}
                projectId={id}
              />
            )}
            <MaterialPurchased
              addPurchaseOrderModal={addPurchaseOrderModal}
              setAddPurchaseOrderModal={setAddPurchaseOrderModal}
              insertDelivery={insertDelivery}
              addQtytoStocks={addQtytoStocks}
              tabPurchaseOrderLineItemTable={tabPurchaseOrderLineItemTable}
              setTabPurchaseOrderLineItemTable={setTabPurchaseOrderLineItemTable}
              testJsonData={testJsonData}
              setEditPo={setEditPo}
              setPOId={setPOId}
              setEditPOLineItemsModal={setEditPOLineItemsModal}
              getTotalOfPurchase={getTotalOfPurchase}
              handleCheck={handleCheck}
              setTransferModal={setTransferModal}
              setTransferItem={setTransferItem}
              projectId={id}
              // getCheckedPoProducts={getCheckedPoProducts}
              setViewLineModal={setViewLineModal}
            />
            {transferModal && (
              <TransferModal
                transferModal={transferModal}
                setTransferModal={setTransferModal}
                transferItem={transferItem}
              />
            )}
          </TabPane>
</HasAccess>
<HasAccess
                roles={null}
                permissions={`client-edit`}
                renderAuthFailed={<p></p>}
        >
          {/* Tab 9*/}
          <TabPane tabId="9" eventkey="materialsusedTab">
            <MaterialsusedTab projectId={id} />
          </TabPane>
</HasAccess>
<HasAccess
                roles={null}
                permissions={`client-edit`}
                renderAuthFailed={<p></p>}
        >
          {/* Tab 10 */}
          <TabPane tabId="10" eventkey="materialsTransferred">
            <MaterialsTransferred projectId={id} />
          </TabPane>
</HasAccess>
<HasAccess
                roles={null}
                permissions={`client-edit`}
                renderAuthFailed={<p></p>}
        >
           {/* Tab 11 */}
           <TabPane tabId="11" eventkey="financeTab">
            <FinanceTab projectId={id} projectDetail={projectDetail}></FinanceTab>
          </TabPane>
          </HasAccess>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default ProjectEdit;
