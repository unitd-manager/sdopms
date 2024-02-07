import React, { useEffect, useState } from 'react';
import {
  Row,
  Form,
  ModalFooter,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  Label,
  Input,
  Col,
  FormGroup,
  Button,
  CardBody,
} from 'reactstrap';
import PropTypes from 'prop-types';
import message from '../../components/Message';
import api from '../../constants/api';
import ComponentCard from '../../components/ComponentCard';
//import ViewNote from '../../components/Tender/ViewNote';
//import TaskEmployeesModal from '../../components/TaskEmployeesModal';

export default function ProjectYard({
  addContactToggle,
  addContactModal,
  id,
  taskById
    
}) {
  ProjectYard.propTypes = {
    addContactToggle: PropTypes.func,
    addContactModal: PropTypes.bool,
    id: PropTypes.any,
    taskById: PropTypes.object
  };

  console.log("check id's", taskById);


  const [projectYard, setProjectYard] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  const [yard, setYard] = useState({});
   // Store selected first_name values here
   
  
  const handleInputs = (e) => {
    setProjectYard({ ...projectYard, [e.target.name]: e.target.value });
  };

  const handleYardInputs = (e) => {
    setYard({ ...yard, [e.target.name]: e.target.value });
  };




  const getYard = () => {
    api
      .post('/projecttask/getYardsheetByProjectId', { project_id: id })
      .then((res) => {
        setYard(res.data.data[0]);
      })
      .catch(() => {});
  };
  
  

  const insertTaskData = () => {
    if (isSubmitting) {
      return; // Prevent multiple submissions
    }
   
      projectYard.project_id = id;
      
        api
          .post('/projecttask/insertYard', projectYard)
          .then(() => {
            
            message('New Yard sheet has been created successfully.', 'success');
          
            addContactToggle(false);
            getYard()
            // Clear the selected names after insertion
          })
          .catch(() => {
            message('Network connection error.', 'error');
          })
          .finally(() => {
            setIsSubmitting(false); // Reset submission status
          });
      
    
  
  };
  
 
  const editTaskData = () => {
    if (isSubmitting) {
      return; // Prevent multiple submissions
    }
   
      
        api
          .post('/projecttask/editYardsheet', yard)
          .then(() => {
            
            message('Yard sheet has been Updated successfully.', 'success');
          
            
           
            // Clear the selected names after insertion
          })
          .catch(() => {
            message('Network connection error.', 'error');
          })
          .finally(() => {
            setIsSubmitting(false); // Reset submission status
          });
      
    
  
  };
  
 
 

 


  

  useEffect(() => {

    getYard();
   
  }, [id]);


  //Structure of projectTask list view
 
  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <br />
        <Label></Label>
              { !yard && <Button
                  color="primary"
                  className="shadow-none"
                  onClick={addContactToggle.bind(null)}
                >
                  Add Yard Detail{' '}
                </Button>}

          
          <Modal size="lg" isOpen={addContactModal} toggle={addContactToggle.bind(null)}>
          <ModalHeader style={{ backgroundColor: ' #0096FF', color: 'white' }} toggle={addContactToggle.bind(null)}>Yard Details</ModalHeader>
            <ModalBody>
              <Row>
                <Col md="12">
                  <Card>
                    <CardBody>
                      <Form>
                        <Row>
                        <Col md="4">
                            <FormGroup>
                              <Label>Pipe Amount($)</Label>
                              <Input
                           type="text"
                           name="pipe_erection_amount"
                           defaultValue={projectYard && projectYard.pipe_erection_amount}
                           onChange={handleInputs}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Plank Amount($)</Label>
                              <Input
                           type="text"
                           name="plank_erection_amount"
                           defaultValue={projectYard && projectYard.plank_erection_amount}
                           onChange={handleInputs}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>TB Amount($)</Label>
                              <Input
                           type="text"
                           name="tb_erection_amount"
                           defaultValue={projectYard && projectYard.tb_erection_amount}
                           onChange={handleInputs}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Volume Amount($)</Label>
                              <Input
                           type="text"
                           name="volume_erection_amount"
                           defaultValue={projectYard && projectYard.volume_erection_amount}
                           onChange={handleInputs}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Others Amount($)</Label>
                              <Input
                           type="text"
                           name="others_erection_amount"
                           defaultValue={projectYard && projectYard.others_erection_amount}
                           onChange={handleInputs}
                              />
                            </FormGroup>
                          </Col>
                          
                        <Col md="4">
                            <FormGroup>
                              <Label>Pipe Count</Label>
                              <Input
                           type="text"
                           name="pipe_count"
                           defaultValue={projectYard && projectYard.pipe_count}
                           onChange={handleInputs}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Plank Count</Label>
                              <Input
                           type="text"
                           name="plank_count"
                           defaultValue={projectYard && projectYard.plank_count}
                           onChange={handleInputs}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>TB Count</Label>
                              <Input
                           type="text"
                           name="tb_count"
                           defaultValue={projectYard && projectYard.tb_count}
                           onChange={handleInputs}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Volume Count</Label>
                              <Input
                           type="text"
                           name="volume_count"
                           defaultValue={projectYard && projectYard.volume_count}
                           onChange={handleInputs}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Others Count</Label>
                              <Input
                           type="text"
                           name="others_count"
                           defaultValue={projectYard && projectYard.others_count}
                           onChange={handleInputs}
                              />
                            </FormGroup>
                          </Col>
                         
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
             
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
                Close
              </Button>
            </ModalFooter>
          </Modal>

         
         {yard&& 
          <ComponentCard title="Yard Details">
          <Card>
            <CardBody>
            <Form>
                        <Row>
                        <Col md="4">
                            <FormGroup>
                              <Label>Pipe Amount($)</Label>
                              <Input
                           type="text"
                           name="pipe_erection_amount"
                           defaultValue={yard && yard.pipe_erection_amount}
                           onChange={handleYardInputs}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Plank Amount($)</Label>
                              <Input
                           type="text"
                           name="plank_erection_amount"
                           defaultValue={yard && yard.plank_erection_amount}
                           onChange={handleYardInputs}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>TB Amount($)</Label>
                              <Input
                           type="text"
                           name="tb_erection_amount"
                           defaultValue={yard && yard.tb_erection_amount}
                           onChange={handleYardInputs}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Volume Amount($)</Label>
                              <Input
                           type="text"
                           name="volume_erection_amount"
                           defaultValue={yard && yard.volume_erection_amount}
                           onChange={handleYardInputs}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Others Amount($)</Label>
                              <Input
                           type="text"
                           name="others_erection_amount"
                           defaultValue={yard && yard.others_erection_amount}
                           onChange={handleYardInputs}
                              />
                            </FormGroup>
                          </Col>
                         
                        
                        <Col md="4">
                            <FormGroup>
                              <Label>Pipe Count</Label>
                              <Input
                           type="text"
                           name="pipe_count"
                           defaultValue={yard && yard.pipe_count}
                           onChange={handleYardInputs}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Plank Count</Label>
                              <Input
                           type="text"
                           name="plank_count"
                           defaultValue={yard && yard.plank_count}
                           onChange={handleYardInputs}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>TB Count</Label>
                              <Input
                           type="text"
                           name="tb_count"
                           defaultValue={yard && yard.tb_count}
                           onChange={handleYardInputs}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Volume Count</Label>
                              <Input
                           type="text"
                           name="volume_count"
                           defaultValue={yard && yard.volume_count}
                           onChange={handleYardInputs}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Others Count</Label>
                              <Input
                           type="text"
                           name="others_count"
                           defaultValue={yard && yard.others_count}
                           onChange={handleYardInputs}
                              />
                            </FormGroup>
                          </Col>
                         
                        </Row>
                        <Row>
                        <Col md="2">
                          <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  editTaskData();
                }}
              >
                Submit
              </Button>
              </Col>
              <Col md="2">
            
                          </Col>
                        </Row>
                      </Form>
            </CardBody>
          </Card>
               
          </ComponentCard>}
      </div>
      
    </div>
  );
}
