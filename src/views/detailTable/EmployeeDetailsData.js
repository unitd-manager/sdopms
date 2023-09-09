import React, { useEffect, useState } from 'react';
import { Row, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import TabPassTypeTab from '../../components/EmployeeTable/TabPassTypeTab';
import EducationalQualificationTab from '../../components/EmployeeTable/EducationalQualificationTab';
import ContactInformationTab from '../../components/EmployeeTable/ContactInformationTab';
import EmergencyContactTab from '../../components/EmployeeTable/EmergencyContactTab';
import EmployeePart from '../../components/EmployeeTable/EmployeePart';
import AttachmentPortalsTab from '../../components/EmployeeTable/AttachmentPortalsTab';
import LinkedPortalsTab from '../../components/EmployeeTable/LinkedPortalsTab';
import LoginDetailsTab from '../../components/EmployeeTable/LoginDetailsTab';
import EmployeeButtons from '../../components/EmployeeTable/EmployeeButtons';
import api from '../../constants/api';
import message from '../../components/Message';

const EmployeeDetailsData = () => {
  //state variables
  const [activeTab, setActiveTab] = useState('1');
  const [employeeDetails, setEmployeeDetails] = useState();
  // employee_id: "",
  //   emp_code: "",
  //   first_name: "",
  //   salutation: "",
  //   gender: "",
  //   status: "",
  //   date_of_birth: "",
  //   passport: "",
  //   date_of_expiry: null,
  //   marital_status: null,
  //   nationality: null,
  //   race: null,
  //   religion: null,
  //   project_designation: "",
  //   project_manager: null,
  //   admin_staff: null,
  //   team: null,
  //   country_name: "",
  //   login_email: null,
  //   login_pass_word: null,
  //   staff_user_group_id: null,
  //   staff_published: null,
  //   notes:''
  const [contactInformationDetails, setContactInformationDetails] = useState({
    employee_id: '',
    address_area: '',
    address_street: '',
    address_po_code: '',
    address_country1: '',
    mobile: '',
    phone: '',
    email: '',
    foreign_addrs_area: '',
    foreign_addrs_street: '',
    foreign_addrs_country: '',
    foreign_addrs_postal_code: '',
    foreign_mobile: '',
    foreign_email: '',
    phone_direct: '',
  });

  const [emergencyContactDetails, setEmergencyContactDetails] = useState({
    employee_id: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    emergency_contact_phone2: '',
    emergency_contact_address: '',
  });
  const [educationalQualificationDetails, setEducationalQualificationDetails] = useState({
    employee_id: '',
    degree1: '',
    educational_qualitifcation1: '',
    year_of_completion1: '',
    degree2: '',
    educational_qualitifcation2: '',
    year_of_completion2: '',
    degree3: '',
    educational_qualitifcation3: '',
    year_of_completion3: '',
  });
  const [tabPassTypeDetails, setTabPassTypeDetails] = useState({
    citizen: '',
    nric_no: '',
    employee_id: '',
    fin_no: '',
    fin_no_expiry_date: '',
    work_permit_no: '',
    work_permit_expiry_date: '',
    spr_year: '',
  });
  const [allCountries, setallCountries] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [pictureData, setDataForPicture] = useState({
    modelType: '',
  });

  //params and routing
  const { id } = useParams();
  const navigate = useNavigate();
  // Route Change
  const applyChanges = () => {};
  const saveChanges = () => {
    navigate('/Employee');
  };
  const backToList = () => {
    navigate('/Employee');
  };
  //handle inputs and set data
  const handleInputChange = (e) => {
    setEmployeeDetails({ ...employeeDetails, [e.target.name]: e.target.value });
  };
  const handlePassTypeInputs = (e) => {
    setTabPassTypeDetails({ ...tabPassTypeDetails, [e.target.name]: e.target.value });
  };
  const handleCiInputs = (e) => {
    setContactInformationDetails({ ...contactInformationDetails, [e.target.name]: e.target.value });
  };

  const handleEcInputs = (e) => {
    setEmergencyContactDetails({ ...emergencyContactDetails, [e.target.name]: e.target.value });
  };
  const handleEduInputs = (e) => {
    setEducationalQualificationDetails({
      ...educationalQualificationDetails,
      [e.target.name]: e.target.value,
    });
  };
  //tab toggle
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  //get apis
  // Get Employee data By Employee id
  const getEmployeeById = () => {
    api
      .post('/employeeModule/getEmployeeById', { employee_id: id })
      .then((res) => {
        setEmployeeDetails(res.data.data[0]);
      })
      .catch(() => {
        message('Employee Data Not Found', 'info');
      });
  };
  //get Contact Information data
  const getContactInformationById = () => {
    api
      .post('/employeeModule/TabContactInformationById', { employee_id: id })
      .then((res) => {
        setContactInformationDetails(res.data.data[0]);
      })
      .catch(() => {
        message('contact info Data Not Found', 'info');
      });
  };
  //get EmergencyContact data
  const getEmergencyContactById = () => {
    api
      .post('/employeeModule/TabEmergencyContactById', { employee_id: id })
      .then((res) => {
        setEmergencyContactDetails(res.data.data[0]);
      })
      .catch(() => {
        message('Emergency contact info Data Not Found', 'info');
      });
  };

  //get EducationalQualification data
  const getEducationalQualificationById = () => {
    api
      .post('/employeeModule/TabEducationalQualificationById', { employee_id: id })
      .then((res) => {
        setEducationalQualificationDetails(res.data.data[0]);
      })
      .catch(() => {
        message('Educational Qualification Data Not Found', 'info');
      });
  };
  //get tabPassType data
  const getTabPassTypeById = () => {
    api
      .post('/employeeModule/getTabPassTypeByID', { employee_id: id })
      .then((res) => {
        setTabPassTypeDetails(res.data.data[0]);
      })
      .catch(() => {
        message('TabPass Type Data Not Found', 'info');
      });
  };
  //Api for getting all countries
  const getAllCountries = () => {
    api
      .get('/geocountry/getCountry')
      .then((res) => {
        setallCountries(res.data.data);
      })
      .catch(() => {
        message('Country Data Not Found', 'info');
      });
  };
  //Api for getting all countries
  const getAllCompanies = () => {
    api
      .get('/company/getCompany')
      .then((res) => {
        setCompanies(res.data.data);
      })
      .catch(() => {
        message('Country Data Not Found', 'info');
      });
  };
  //Api for getting Qualification
  const getQualifications = () => {
    api
      .get('/employeeModule/getQualification')
      .then((res) => {
        setQualifications(res.data.data);
      })
      .catch(() => {
        message('qualification Data Not Found', 'info');
      });
  };

  // Api calls for Editing
  //edit employeedata
  const editEmployeeData = () => {
    if (
      employeeDetails.first_name !== '' &&
      employeeDetails.date_of_birth !== '' &&
      employeeDetails.nationality !== '' &&
      employeeDetails.gender !== ''
    ) {
      api
        .post('/employeeModule/edit-Employee', employeeDetails)
        .then(() => {
          message('Record editted successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill the required fields', 'warning');
    }
  };

  //update tab data
  const editCIData = () => {
    api
      .post('/employeeModule/edit-ContactInformation', contactInformationDetails)
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  //update tab data
  const editECData = () => {
    api
      .post('/employeeModule/edit-EmergencyContact', emergencyContactDetails)
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  //update tab data
  const editEQData = () => {
    api
      .post('/employeeModule/edit-EducationalQualification', educationalQualificationDetails)
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  //update tabpasstype data
  const editTabPassTypeData = () => {
    if (tabPassTypeDetails.citizen === 'Citizen' || tabPassTypeDetails.citizen === 'PR') {
      if (tabPassTypeDetails.nric_no !== '') {
        api
          .post('/employeeModule/edit-TabPassType', tabPassTypeDetails)
          .then(() => {
            message('Record editted successfully', 'success');
          })
          .catch(() => {
            message('Unable to edit record.', 'error');
          });
      } else {
        message('Please fill the nricno fields', 'warning');
      }
    } else if (
      tabPassTypeDetails.citizen === 'SP' ||
      tabPassTypeDetails.citizen === 'DP' ||
      tabPassTypeDetails.citizen === 'EP' ||
      tabPassTypeDetails.citizen === 'WP'
    ) {
      if (tabPassTypeDetails.fin_no !== '') {
        api
          .post('/employeeModule/edit-TabPassType', tabPassTypeDetails)
          .then(() => {
            message('Record editted successfully', 'success');
          })
          .catch(() => {
            message('Unable to edit record.', 'error');
          });
      } else {
        message('Please fill the fin no field', 'warning');
      }
    } else {
      message('Please fill the PassType', 'warning');
    }
  };
  //update all data
  const updateData = async () => {
    await editEmployeeData();
    await editTabPassTypeData();
    await editEQData();
    await editECData();
    await editCIData();
  };

  //Api call for Deleting Employee Data
  const deleteEmployeeData = () => {
    api
      .post('/employeeModule/deleteEmployee', { employee_id: id })
      .then(() => {
        message('Record deleted successfully', 'success');
      })
      .catch(() => {
        message('Unable to delete record.', 'error');
      });
  };
  //Attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };
  //Pictures
  const dataForPicture = () => {
    setDataForPicture({
      modelType: 'picture',
    });
  };

  useEffect(() => {
    getEmployeeById();
    getTabPassTypeById();
    getContactInformationById();
    getEducationalQualificationById();
    getEmergencyContactById();
    getAllCountries();
    getQualifications();
    getAllCompanies();
  }, [id]);

  return (
    <>
      <ToastContainer></ToastContainer>
      <BreadCrumbs />
      <EmployeeButtons
        applyChanges={applyChanges}
        saveChanges={saveChanges}
        backToList={backToList}
        deleteEmployeeData={deleteEmployeeData}
        editEmployeeData={updateData}
      />
      <Row>
        <EmployeePart
          employeeDetails={employeeDetails}
          handleInputChange={handleInputChange}
          allCountries={allCountries}
          companies={companies}
        />
      </Row>
      <ComponentCard title="More Details">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => {
                toggle('1');
              }}
            >
              Login Details
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => {
                toggle('2');
              }}
            >
              Pass Type
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '3' ? 'active' : ''}
              onClick={() => {
                toggle('3');
              }}
            >
              Educational Qualification
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '4' ? 'active' : ''}
              onClick={() => {
                toggle('4');
              }}
            >
              Contact Information
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '5' ? 'active' : ''}
              onClick={() => {
                toggle('5');
              }}
            >
              Emergency Contact
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '6' ? 'active' : ''}
              onClick={() => {
                toggle('6');
              }}
            >
              Attachment Portals
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '7' ? 'active' : ''}
              onClick={() => {
                toggle('7');
              }}
            >
              Linked Portals
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            <LoginDetailsTab
              employeeDetails={employeeDetails}
              handleInputChange={handleInputChange}
            />
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <TabPassTypeTab
                tabPassTypeDetails={tabPassTypeDetails}
                handlePassTypeInputs={handlePassTypeInputs}
              />
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <EducationalQualificationTab
                educationalQualificationDetails={educationalQualificationDetails}
                qualifications={qualifications}
                handleEduInputs={handleEduInputs}
              />
            </Row>
          </TabPane>
          <TabPane tabId="4">
            <Row>
              <ContactInformationTab
                contactInformationDetails={contactInformationDetails}
                handleCiInputs={handleCiInputs}
              />
            </Row>
          </TabPane>
          <TabPane tabId="5">
            <Row>
              <EmergencyContactTab
                emergencyContactDetails={emergencyContactDetails}
                handleEcInputs={handleEcInputs}
              />
            </Row>
          </TabPane>
          <TabPane tabId="6">
            {/* Picture and Attachments Form */}
            <Row>
              <AttachmentPortalsTab
                dataForPicture={dataForPicture}
                dataForAttachment={dataForAttachment}
                id={id}
                attachmentModal={attachmentModal}
                setAttachmentModal={setAttachmentModal}
                pictureData={pictureData}
                attachmentData={attachmentData}
              />
            </Row>
          </TabPane>
          <TabPane tabId="7">
            <Row>
              <LinkedPortalsTab
                id={id}
                employeeDetails={employeeDetails}
                handleInputChange={handleInputChange}
              />
            </Row>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default EmployeeDetailsData;
