import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  ModalBody,
  Modal,
  ModalHeader,
  ModalFooter,
  Form,
} from 'reactstrap';
import PropTypes from 'prop-types';
import '../views/form-editor/editor.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useParams } from 'react-router-dom';
import message from './Message';
import api from '../constants/api';




const ProjectYardEdit = ({ edityardModal, setEditYardModal ,setProjectYard1,projectYard }) => {
  ProjectYardEdit.propTypes = {
    edityardModal: PropTypes.bool,
    setEditYardModal: PropTypes.func,
    //getTaskById: PropTypes.any,
    //id: PropTypes.any,
    setProjectYard1:PropTypes.any,
    projectYard:PropTypes.object,
    
  };
console.log("projectyard",projectYard);
const {yardId} =useParams();
  //All state variable

  const [isSubmitting, setIsSubmitting] = useState(false);
 
  //const [yard, setYard] = useState([]);
  const handleprojectYardInputs = (e) => {
    setProjectYard1({ ...projectYard, [e.target.name]: e.target.value });
  };


  const getYardsheet= () => {
    api
      .post('/projecttask/getYardsheetById', { yard_id: yardId })
      .then((res) => {
        setProjectYard1(res.data.data);
        console.log("test1",res.data.data)
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (yardId) {
      getYardsheet();
    }
  }, [yardId, setProjectYard1]);
 
  const editTaskData = () => {
    if (isSubmitting) {
      return; // Prevent multiple submissions
    }

    api
      .post('/projecttask/editYardsheet', projectYard)
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
    
    getYardsheet();
  }, []);

 
 

  return (
    <>
      <Modal size="lg" isOpen={edityardModal}>
        <ModalHeader style={{ backgroundColor: ' #0096FF', color: 'white' }}>
          Task Details
          <Button
            color="secondary"
            onClick={() => {
              setEditYardModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          {/* task Details */}
          <Form>
            <FormGroup>
              <Form>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <Label>Pipe Amount($)</Label>
                      <Input
                        type="text"
                        name="pipe_erection_amount"
                        defaultValue={projectYard && projectYard.pipe_erection_amount}
                        onChange={handleprojectYardInputs}
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
                        onChange={handleprojectYardInputs}
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
                        onChange={handleprojectYardInputs}
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
                        onChange={handleprojectYardInputs}
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
                        onChange={handleprojectYardInputs}
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
                        onChange={handleprojectYardInputs}
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
                        onChange={handleprojectYardInputs}
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
                        onChange={handleprojectYardInputs}
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
                        onChange={handleprojectYardInputs}
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
                        onChange={handleprojectYardInputs}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Row>
            <div className="pt-3 mt-3 d-flex align-items-center gap-2">
              <Button
                color="primary"
                onClick={() => {
                    editTaskData();
                }}
              >
                Submit
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  setEditYardModal(false);
                }}
              >
                close
              </Button>
            </div>
          </Row>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ProjectYardEdit;
