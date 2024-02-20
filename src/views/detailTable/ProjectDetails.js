import React, { useState, useEffect,useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';
import api from '../../constants/api';
import message from '../../components/Message';
import ProjectCompanyDetails from '../../components/ProjectModal/ProjectCompanyDetails';

const ProjectDetails = () => {
  //All state variables
  const [projectDetails, setProjectDetails] = useState({
    title: '',
    company_id: '',
  });
  const [companys, setCompanys] = useState();
  const [allCountries, setallCountries] = useState();
  const [projectAmounts, setProjectAmounts] = useState({});
  const [modal, setModal] = useState(false);
  const { id } = useParams();
  const toggle = () => {
    setModal(!modal);
  };
  const { loggedInuser } = useContext(AppContext);

  
  const getCompany = () => {
    api.get('/company/getCompany').then((res) => {
      setCompanys(res.data.data);
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

  const handleInputProject = (e) => {
    setCompanyInsertData({ ...companyInsertData, [e.target.name]: e.target.value });
    // Update projectDetails as well
    setProjectDetails({ ...projectDetails, company_id: e.target.value });
  };

  const insertCompanyProject = () => {
    if (
      companyInsertData.company_name !== '' &&
      companyInsertData.address_street !== '' &&
      companyInsertData.address_po_code !== '' &&
      companyInsertData.address_country !== ''
    ) {
      companyInsertData.creation_date = creationdatetime;
      companyInsertData.created_by= loggedInuser.first_name; 
      api
        .post('/company/insertCompany', companyInsertData)
        .then(() => {
          message('Company inserted successfully.', 'success');
          getCompany();
          window.location.reload();
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'error');
    }
  };

   //Api for getting all countries
   const getAllCountriesProject = () => {
    api
      .get('/clients/getCountry')
      .then((res) => {
        setallCountries(res.data.data);
      })
      .catch(() => {
        message('Country Data Not Found', 'info');
      });
  };
  const getTendersById = () => {
    api
      .post('/project/getProjectsByIDs', { project_id: id })
      .then((res) => {
        setProjectDetails(res.data.data);
        // getContact(res.data.data.company_id);
      })
      .catch(() => {});
  };

  //Getting data from setting
const getProjectAmountsValue = () => {
  api
    .get('/setting/getProjectAmountValue')
    .then((res) => {
      console.log('amounts',res.data.data)
      const pipeErectionAmount=res.data.data.filter((el)=>{
        return el.key_text==="project_pipe_erection_amount"
      })[0].value
      const plankErectionAmount=res.data.data.filter((el)=>{
        return el.key_text==="project_plank_erection_amount"
      })[0].value
      const tbErectionAmount=res.data.data.filter((el)=>{
        return el.key_text==="project_tb_erection_amount"
      })[0].value
      const volumeErectionAmount=res.data.data.filter((el)=>{
        return el.key_text==="project_volume_erection_amount"
      })[0].value
      const othersErectionAmount=res.data.data.filter((el)=>{
        return el.key_text==="project_others_erection_amount"
      })[0].value
      const pipeDismantelAmount=res.data.data.filter((el)=>{
        return el.key_text==="project_pipe_dismantel_amount"
      })[0].value
      const plankDismantelAmount=res.data.data.filter((el)=>{
        return el.key_text==="project_plank_dismantel_amount"
      })[0].value
      const tbDismantelAmount=res.data.data.filter((el)=>{
        return el.key_text==="project_tb_dismantel_amount"
      })[0].value
      const volumeDismantelAmount=res.data.data.filter((el)=>{
        return el.key_text==="project_volume_dismantel_amount"
      })[0].value
      const othersDismantelAmount=res.data.data.filter((el)=>{
        return el.key_text==="project_others_dismantel_amount"
      })[0].value
      console.log('pipeerectionamount',pipeErectionAmount);
      
      const projectsAmounts={
        pipe_erection_amount:pipeErectionAmount,
        plank_erection_amount:plankErectionAmount,
        tb_erection_amount:tbErectionAmount,
        volume_erection_amount:volumeErectionAmount,
        others_erection_amount:othersErectionAmount,
        pipe_dismantel_amount:pipeDismantelAmount,
        plank_dismantel_amount:plankDismantelAmount,
        tb_dismantel_amount:tbDismantelAmount,
        volume_dismantel_amount:volumeDismantelAmount,
        others_dismantel_amount:othersDismantelAmount,
      }
      setProjectAmounts(projectsAmounts)
    })
    .catch(() => {});
};
//Navigation and Parameters
  const navigate = useNavigate();
//Setting data in projectDetails
  const handleInputs = (e) => {
    setProjectDetails({ ...projectDetails, [e.target.name]: e.target.value });
  };
//Insert Setting
  const insertProject = (code) => {
    if (projectDetails.title !== ''){
      projectDetails.project_code = code;
      projectDetails.creation_date = creationdatetime;
      projectDetails.created_by = loggedInuser.first_name;
      projectDetails.pipe_erection_amount= projectAmounts.pipe_erection_amount;
      projectDetails.plank_erection_amount=projectAmounts.plank_erection_amount;
      projectDetails.tb_erection_amount=projectAmounts.tb_erection_amount;
      projectDetails.volume_erection_amount=projectAmounts.volume_erection_amount;
      projectDetails.others_erection_amount=projectAmounts.others_erection_amount;
      projectDetails.pipe_dismantel_amount=projectAmounts.pipe_dismantel_amount;
      projectDetails.plank_dismantel_amount=projectAmounts.plank_dismantel_amount;
      projectDetails.tb_dismantel_amount=projectAmounts.tb_dismantel_amount;
      projectDetails.volume_dismantel_amount=projectAmounts.volume_dismantel_amount;
      projectDetails.others_dismantel_amount=projectAmounts.others_dismantel_amount;
console.log('projectdetails',projectDetails)

    api.post('/project/insertProject', projectDetails)
      .then((res) => {
        const insertedDataId = res.data.data.insertId;
        getTendersById();
        console.log(insertedDataId);
        message('Project inserted successfully.', 'success');
        setTimeout(() => {
          navigate(`/ProjectEdit/${insertedDataId}`);
        }, 300);
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
    }else {
        message('Please fill all required fields.', 'error');
      }
  };
  //QUTO GENERATED CODE
  const generateCode = () => {
    api
      .post('/tender/getCodeValue', { type: 'project' })
      .then((res) => {
        insertProject(res.data.data);
      })
      .catch(() => {
        insertProject('');
      });
  };
  useEffect(() => {
    getProjectAmountsValue();
  }, []);

  useEffect(() => {
    getCompany();
    getAllCountriesProject();
  }, [id]);
  return (
    <div>
      <BreadCrumbs />
      <ToastContainer />
      <Row>
        <Col md="6" xs="12">
          {/* Key Details */}
          <ComponentCard title="Key Details">
          <Form>
              <FormGroup>
                <Row>
                  <Col md="10">
                    <Label>
                      {' '}
                      Title <span className="required"> *</span>{' '}
                    </Label>
                    <Input type="text" name="title"  value={projectDetails && projectDetails.title}
                      onChange={handleInputs} />
                    </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="10">
                    <Label>
                      Company Name <span className="required"> *</span>{' '}
                    </Label>
                    <Input
                      type="select"
                      name="company_id"
                      //value={tenderForms && tenderForms.company_id}
                      onChange={handleInputProject}
                    >
                      <option>Please Select</option>
                      {companys &&
                        companys.map((ele) => {
                          return (
                            <option key={ele.company_id} value={ele.company_id}>
                              {ele.company_name}
                            </option>
                          );
                        })}
                    </Input>
                  </Col>
                  <Col md="3" className="addNew">
                    <Label>Add New Name</Label>
                    <Button color="primary" className="shadow-none" onClick={toggle.bind(null)}>
                      Add New
                    </Button>
                  </Col>
                </Row>
               
              </FormGroup>
              <ProjectCompanyDetails
                allCountries={allCountries}
                insertCompanyProject={insertCompanyProject}
                handleInputProject={handleInputProject}
                toggle={toggle}
                modal={modal}
                setModal={setModal}
                ></ProjectCompanyDetails>
              <FormGroup>
                <Row>
          <div className="pt-3 mt-3 d-flex align-items-center gap-2">
            <Button color="primary"
              onClick={() => {
                generateCode();
              }}
              type="button"
              className="btn mr-2 shadow-none"
            >Save & Continue
            </Button>
            <Button
                      type="submit"
                      className="btn btn-dark shadow-none"
                      onClick={(e) => {
                        if (window.confirm('Are you sure you want to cancel? ')) {
                          navigate('/Project');
                        } else {
                          e.preventDefault();
                        }
                      }}
                    >
                      Cancel
                    </Button>
            </div>
                </Row>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default ProjectDetails;
