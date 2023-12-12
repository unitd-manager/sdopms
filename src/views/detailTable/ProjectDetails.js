import React, { useState, useEffect,useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
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

  
  const [projectAmounts, setProjectAmounts] = useState({});

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
   //get staff details
   const { loggedInuser } = useContext(AppContext);
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
  useEffect(() => {
    getProjectAmountsValue();
  }, []);
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
