import React, { useState, useEffect,useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';
import api from '../../constants/api';
import message from '../../components/Message';

const ProjectDetails = () => {
  //All state variables
  const [projectDetails, setProjectDetails] = useState({
    title: '',
  });
//Navigation and Parameters
  const navigate = useNavigate();
//Setting data in projectDetails
  const handleInputs = (e) => {
    setProjectDetails({ ...projectDetails, [e.target.name]: e.target.value });
  };
   //get staff details
   const { loggedInuser } = useContext(AppContext);
//Insert Setting
  const insertProject = (code) => {
    if (projectDetails.title !== ''){
      projectDetails.project_code = code;
      projectDetails.creation_date = creationdatetime;
      projectDetails.created_by = loggedInuser.first_name;
    api.post('/project/insertProject', projectDetails)
      .then((res) => {
        const insertedDataId = res.data.data.insertId;
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
  useEffect(() => {}, []);
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
                  <Col md="12">
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
