import React, { useEffect, useState } from 'react';
import { TabContent, TabPane } from 'reactstrap';
// import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
//import TenderButtons from '../../components/TenderTable/TenderButtons';
import PdfQuote from '../../components/PDF/PdfQuote';
import creationdatetime from '../../constants/creationdatetime';
import TenderQuotation from '../../components/TenderTable/TenderQuotation';
import TenderMoreDetails from '../../components/TenderTable/TenderMoreDetails';
import TenderAttachment from '../../components/TenderTable/TenderAttachment';
import Tab from '../../components/project/Tab';
import ApiButton from '../../components/ApiButton';

const OpportunityEdit = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [quote, setQuote] = useState({});
  const [lineItem, setLineItem] = useState([]);
  const [tenderDetails, setTenderDetails] = useState();

  // Start for tab refresh navigation #Renuka 1-06-23
  const tabs = [
    { id: '1', name: 'Quotations' },
    { id: '2', name: 'Attachment' },
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };
  // End for tab refresh navigation #Renuka 1-06-23

  const [quotationsModal, setquotationsModal] = useState(false);
  const [viewLineModal, setViewLineModal] = useState(false);
  const [addContactModal, setAddContactModal] = useState(false);
  const [addCompanyModal, setAddCompanyModal] = useState(false);
  const [editQuoteModal, setEditQuoteModal] = useState(false);
  //const [editLineModal, setEditLineModal] = useState(false);
  const [contact, setContact] = useState();
  const [company, setCompany] = useState();
  const [incharge, setIncharge] = useState();
  const [selectedCompany, setSelectedCompany] = useState();
  const [addLineItemModal, setAddLineItemModal] = useState(false);
  const [project, setProject] = useState([]);
  const [allCountries, setallCountries] = useState();
  //const [editLineModelItem, setEditLineModelItem] = useState(null);
  const [quoteForm, setQuoteForm] = useState({
    quote_date: '',
    quote_code: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();
  // const applyChanges = () => {};
  const backToList = () => {
    navigate('/Enquiry');
  };

  const viewLineToggle = () => {
    setViewLineModal(!viewLineModal);
  };
  const addContactToggle = () => {
    setAddContactModal(!addContactModal);
  };
  const addCompanyToggle = () => {
    setAddCompanyModal(!addCompanyModal);
  };

  // Get Company Data
  const getCompany = () => {
    api.get('/company/getCompany').then((res) => {
      setCompany(res.data.data);
    });
  };

  // Get Quote By Id
  const getQuote = () => {
    api.post('/tender/getQuoteById', { opportunity_id: id }).then((res) => {
      setQuote(res.data.data[0]);
    });
  };

  //Logic for adding company in db

  const [companyInsertData, setCompanyInsertData] = useState({
    company_name: '',
    address_street: '',
    address_town: '',
    address_country: '',
    address_po_code: '',
    phone: '',
    fax: '',
    website: '',
    supplier_type: '',
    industry: '',
    company_size: '',
    source: '',
  });

  const companyhandleInputs = (e) => {
    setCompanyInsertData({ ...companyInsertData, [e.target.name]: e.target.value });
  };

  // Insert Company
  const insertCompany = () => {
    if (
      companyInsertData.company_name !== '' &&
      companyInsertData.phone !== '' &&
      companyInsertData.address_country !== ''
    ) {
      api
        .post('/company/insertCompany', companyInsertData)
        .then(() => {
          message('Company inserted successfully.', 'success');
          toggle();
          getCompany();
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'error');
    }
  };

  const getContact = (companyId) => {
    setSelectedCompany(companyId);
    api.post('/company/getContactByCompanyId', { company_id: companyId }).then((res) => {
      setContact(res.data.data);
    });
  };

  // Get Incharge
  const getIncharge = () => {
    api.get('/tender/projectIncharge').then((res) => {
      setIncharge(res.data.data);
    });
  };

  // Get Tenders By Id

  const editTenderById = () => {
    api.post('/tender/getTendersById', { opportunity_id: id }).then((res) => {
      setTenderDetails(res.data.data);
      //getContact(res.data.data.company_id);
    });
  };

  const handleInputs = (e) => {
    setTenderDetails({ ...tenderDetails, [e.target.name]: e.target.value });
  };

  //Logic for edit data in db

  const editTenderData = () => {
    tenderDetails.modification_date = creationdatetime;
    api
      .post('/tender/edit-Tenders', tenderDetails)
      .then(() => {
        message('Record editted successfully', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 300);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  // Add new Contact

  const [newContactData, setNewContactData] = useState({
    salutation: '',
    first_name: '',
    email: '',
    position: '',
    department: '',
    phone_direct: '',
    fax: '',
    mobile: '',
  });

  const handleAddNewContact = (e) => {
    setNewContactData({ ...newContactData, [e.target.name]: e.target.value });
  };

  const AddNewContact = () => {
    const newDataWithCompanyId = newContactData;
    newDataWithCompanyId.company_id = selectedCompany;
    if (
      newDataWithCompanyId.salutation !== '' &&
      newDataWithCompanyId.first_name !== ''

    ) {
      api
        .post('/tender/insertContact', newDataWithCompanyId)
        .then(() => {
          getContact(newDataWithCompanyId.company_id);
          message('Contact Inserted Successfully', 'success');
          //window.location.reload();
        })
        .catch(() => {
          message('Unable to add Contact! try again later', 'error');
        });
    } else {
      message('All fields are required.', 'info');
    }
  };

  //Api for getting all countries
  const getAllCountries = () => {
    api.get('/clients/getCountry').then((res) => {
      setallCountries(res.data.data);
    });
  };

  // Get Line Item
  const getLineItem = (quotationId) => {
    api.post('/tender/getQuoteLineItemsById', { quote_id: quotationId }).then((res) => {
      setLineItem(res.data.data);
      //setViewLineModal(true);
    });
  };

  const handleQuoteForms = (ele) => {
    setQuoteForm({ ...quoteForm, [ele.target.name]: ele.target.value });
  };
  //Add Quote
  const insertQuote = (code) => {
    const newQuoteId = quoteForm;
    newQuoteId.opportunity_id = id;
    newQuoteId.quote_code = code;

    api.post('/tender/insertquote', newQuoteId).then(() => {
      message('Quote inserted successfully.', 'success');
      window.location.reload();
    });
  };
  //QUOTE GENERATED CODE
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

  const getProject = () => {
    api.get('project/getOppProject').then((res) => {
      setProject(res.data.data);
    });
  };
  //Add new Project
  const insertProject = (code) => {
    const newDataWithCompanyId = tenderDetails;
    newDataWithCompanyId.quote_id = quote.quote_id;
    newDataWithCompanyId.project_code = code;
    api.post('/project/insertProject', newDataWithCompanyId).then(() => {
      message('Project Converted Successfully', 'success');
      window.location.reload();
    });
  };
  //Project GENERATED CODE
  const generateCodes = () => {
    api
      .post('/tender/getCodeValue', { type: 'opportunityproject' })
      .then((res) => {
        insertProject(res.data.data);
      })
      .catch(() => {
        insertProject('');
      });
  };

  useEffect(() => {
    editTenderById();
    getQuote();
    getIncharge();
    getCompany();
    getProject();
    getAllCountries();
  }, [id]);

  return (
    <>
      <BreadCrumbs heading={tenderDetails && tenderDetails.title} />
      {/* <TenderButtons
        editTenderData={editTenderData}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
      ></TenderButtons> */}
      <ApiButton
        editData={editTenderData}
        navigate={navigate}
        applyChanges={editTenderData}
        backToList={backToList}
        module="Tender"
      ></ApiButton>
      <TenderMoreDetails
        companyInsertData={companyInsertData}
        newContactData={newContactData}
        handleInputs={handleInputs}
        handleAddNewContact={handleAddNewContact}
        setAddContactModal={setAddContactModal}
        addContactModal={addContactModal}
        tenderDetails={tenderDetails}
        allCountries={allCountries}
        company={company}
        contact={contact}
        incharge={incharge}
        addCompanyModal={addCompanyModal}
        addCompanyToggle={addCompanyToggle}
        companyhandleInputs={companyhandleInputs}
        insertCompany={insertCompany}
        AddNewContact={AddNewContact}
        addContactToggle={addContactToggle}
        setAddCompanyModal={setAddCompanyModal}
        getContact={getContact}
      ></TenderMoreDetails>

      <ComponentCard>
        <Tab toggle={toggle} tabs={tabs} />
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            {/* Tender Quotation */}

            <TenderQuotation
              tenderId={id}
              quote={quote}
              project={project}
              quotationsModal={quotationsModal}
              setquotationsModal={setquotationsModal}
              viewLineToggle={viewLineToggle}
              getLineItem={getLineItem}
              PdfQuote={PdfQuote}
              editQuoteModal={editQuoteModal}
              setAddLineItemModal={setAddLineItemModal}
              setEditQuoteModal={setEditQuoteModal}
              addLineItemModal={addLineItemModal}
              lineItem={lineItem}
              viewLineModal={viewLineModal}
              setViewLineModal={setViewLineModal}
              id={id}
              insertProject={insertProject}
              generateCode={generateCode}
              generateCodes={generateCodes}
              handleQuoteForms={handleQuoteForms}
            ></TenderQuotation>
          </TabPane>

          <TabPane tabId="2">
            <TenderAttachment></TenderAttachment>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default OpportunityEdit;
