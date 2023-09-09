import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';

const JobInformationDetails = () => {
  //All state variables
  const [employee, setEmployee] = useState();
  const [jobForms, setJobForms] = useState({
    employee_id: '',
    first_name: '',
    fin_no: '',
    status:'current'
  });
  //Navigation and Parameters
  const { id } = useParams();
  const navigate = useNavigate();
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
  //jobinformation data in jobinformationDetails
  const handleInputs = (e) => {
    setJobForms({ ...jobForms, [e.target.name]: e.target.value });
  };
  //inserting data of job information
  const insertJobInformation = () => {
   
    api
      .post('/jobinformation/insertjob_information', jobForms)
      .then((res) => {
        const insertedDataId = res.data.data.insertId;
        console.log(insertedDataId);
        message('Job Information inserted successfully.', 'success');
        setTimeout(() => {
          navigate(`/JobInformationEdit/${insertedDataId}`);
        }, 300);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
     
  };
  useEffect(() => {
    editJobById();
  }, [id]);
  return (
    <div>
      <BreadCrumbs />
      <Row>
        <ToastContainer></ToastContainer>
        <Col md="6">
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
                <Row>
                  <Label>Employee Name </Label>
                  <Input
                    type="select"
                    name="employee_id"
                    onChange={(e) => {
                      handleInputs(e);
                    }}>
                    <option value="" selected >Please Select</option>
                    {employee &&
                      employee.map((ele) => {
                        return (
                          ele.e_count === 0 && (<option key={ele.employee_id} value={ele.employee_id}>
                            {ele.first_name}
                          </option>)
                        );
                      })}
                  </Input>
                </Row>
                
                <FormGroup>
                  <Row>
                    <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                      <Button color="primary"
                        type="button"
                        className="btn mr-2 shadow-none"
                        onClick={() => {
                          insertJobInformation();
                        }}>
                        Save & Continue
                      </Button>
                      <Button
                      onClick={() => {
                        navigate('/JobInformation');
                      }}
                      type="button"
                      className="btn btn-dark shadow-none">
                        Cancel
                      </Button>
                    </div>
                  </Row>
                </FormGroup>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};
export default JobInformationDetails;
