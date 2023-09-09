import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import * as Icon from 'react-feather';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
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

const LeadEdit = () => {
  //All state variable
  const [lead, setLeadEdit] = useState();
  const [projectdetails, setProjectDetails] = useState();
  const [companydetails, setCompanyDetails] = useState();
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [roomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState();
  //const [description, setDescription] = useState('');


  //navigation and parameters
  const { id } = useParams();
  const navigate = useNavigate();

  const applyChanges = () => {};
  const backToList = () => {
    navigate('/Lead');
  };
  //milestone data in milestone
  const handleInputs = (e) => {
    setLeadEdit({ ...lead, [e.target.name]: e.target.value });
  };

  const getLeadById = () => {
    api.post('/lead/getLeadById', { lead_id: id }).then((res) => {
      const leadData = res.data.data[0];
      setLeadEdit(leadData);
      
    });
  };  

  //Api call for getting project name dropdown
  const getProjectname = () => {
    api
      .get('/lead/getEmployeeName')
      .then((res) => {
        setProjectDetails(res.data.data);
        console.log(res.data.data[0]);
      })
      .catch(() => {
        message('Company not found', 'info');
      });
  };

  const getCompanyname = () => {
    api
      .get('/lead/getCompanyName')
      .then((res) => {
        setCompanyDetails(res.data.data);
        console.log(res.data.data[0]);
      })
      .catch(() => {
        message('Company not found', 'info');
      });
  };

  //Update milestone
  const editLead = () => {
    api
      .post('/lead/editLead', lead)
      .then(() => {
        message('Record editted successfully', 'success');
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

  useEffect(() => {
    getLeadById();
    getProjectname();
    getCompanyname();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <Form>
        <FormGroup>
          <ToastContainer></ToastContainer>
          <ComponentCardV2>
          <ApiButton
        editData={editLead}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
        module="Lead"
      ></ApiButton>
            {/* <Row>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editLead();
                    navigate('/Lead');
                  }}
                >
                  Save
                </Button>
              </Col>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editLead();
                    applyChanges();
                  }}
                >
                  Apply
                </Button>
              </Col>
              <Col>
                <Button
                  type="submit"
                  className="btn btn-dark shadow-none"
                  onClick={(e) => {
                    if (window.confirm('Are you sure you want to cancel? ')) {
                      navigate('/MilestoneList');
                    } else {
                      e.preventDefault();
                    }
                  }}
                >
                  Cancel
                </Button>
              </Col>
              <Col>
                <DeleteButton
                  id={id}
                  columnname="lead_id"
                  tablename="lead"
                ></DeleteButton>
              </Col>
              <Col>
                <Button
                  className="shadow-none"
                  color="dark"
                  onClick={() => {
                    backToList();
                  }}
                >
                  Back to List
                </Button>
              </Col>
            </Row> */}
          </ComponentCardV2>
        </FormGroup>
      </Form>
      {/* milestone Details */}
      <Form>
        <FormGroup>
          <ComponentCard title="Lead Details">
            {' '}
            <ToastContainer></ToastContainer>
            <div>
              <BreadCrumbs />

              <ComponentCard title="lead">
                <Form>
                  <Row>
                    <Col md="3">
                      <FormGroup>
                        <Label>Title</Label>
                        <Input
                          type="text"
                          onChange={handleInputs}
                          value={lead && lead.lead_title}
                          name="lead_title"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                <FormGroup>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={
                      lead &&
                      moment(lead.due_date).format('YYYY-MM-DD')
                    }
                    name="due_date"
                  />
                </FormGroup>
              </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Employee Name</Label>
                        <Input
                          type="select"
                          onChange={handleInputs}
                          value={lead && lead.employee_id}
                          name="employee_id"
                        >
                          <option defaultValue="selected">Please Select</option>
                          {projectdetails &&
                            projectdetails.map((e) => {
                              return (
                                <option key={e.employee_id} value={e.employee_id}>
                                  {e.employee_name}
                                </option>
                              );
                            })}
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <Label>Company Name</Label>
                        <Input
                          type="select"
                          onChange={handleInputs}
                          value={lead && lead.company_id}
                          name="company_id"
                        >
                          <option defaultValue="selected">Please Select</option>
                          {companydetails &&
                            companydetails.map((e) => {
                              return (
                                <option key={e.company_id} value={e.company_id}>
                                  {e.company_name}
                                </option>
                              );
                            })}
                        </Input>
                      </FormGroup>
                    </Col>

                   
                  </Row>
                </Form>
              </ComponentCard>

              <Form>
                <FormGroup>
                  <ComponentCard title="Attachments">
                    <Row>
                      <Col xs="12" md="3" className="mb-3">
                        <Button
                          className="shadow-none"
                          color="primary"
                          onClick={() => {
                            setRoomName('Lead');
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
                      altTagData="LeadRelated Data"
                      recordType="RelatedPicture"
                      desc="LeadRelated Data"
                      modelType={attachmentData.modelType}
                      attachmentModal={attachmentModal}
                      setAttachmentModal={setAttachmentModal}
                    />
                    <ViewFileComponentV2
                      moduleId={id}
                      roomName="Lead"
                      recordType="RelatedPicture"
                    />
                  </ComponentCard>
                </FormGroup>
              </Form>
            </div>
          </ComponentCard>
        </FormGroup>
      </Form>
    </>
  );
};

export default LeadEdit;
