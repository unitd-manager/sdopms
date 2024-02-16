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
  Table,
} from 'reactstrap';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';
import message from '../../components/Message';
import api from '../../constants/api';

//import ViewNote from '../../components/Tender/ViewNote';
//import TaskEmployeesModal from '../../components/TaskEmployeesModal';

export default function ProjectYard({
  addContactToggle,
  addContactModal,
  id,
  edityardModal,
  workorderbyId,
  setEditYardModal,
  setProjectYard1,
  projectYard1,
}) {
  ProjectYard.propTypes = {
    addContactToggle: PropTypes.func,
    addContactModal: PropTypes.bool,
    edityardModal: PropTypes.bool,
    id: PropTypes.any,
    //taskById: PropTypes.object,
    workorderbyId: PropTypes.object,
    setEditYardModal: PropTypes.object,
    setProjectYard1: PropTypes.any,
    projectYard1: PropTypes.any,
  };
  console.log('projectyard11', projectYard1);

  const [projectYard, setProjectYard] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [editContactModal, setEditContactModal] = useState(false);
  // const editContactToggle = () => {
  //   setEditContactModal(!editContactModal);
  // };
  const [yard, setYard] = useState([]);
  // Store selected first_name values here

  const handleInputs = (e) => {
    setProjectYard({ ...projectYard, [e.target.name]: e.target.value });
  };

  const getYard = () => {
    api
      .post('/projecttask/getYardsheetByProjectId', { project_id: id })
      .then((res) => {
        setYard(res.data.data);
        console.log('5', res.data.data);
      })
      .catch(() => {});
  };

  const resetForm = () => {
    // Clear the form fields
    setProjectYard({
      work_order_no: '',
      pipe_erection_amount: '',
      plank_erection_amount: '',
      tb_erection_amount: '',
      volume_erection_amount: '',
      others_erection_amount: '',
      pipe_count: '',
      plank_count: '',
      tb_count: '',
      volume_count: '',
      others_count: '',
    });
  };

  // const resetInsertModal = () => {
  //   setProjectYard({
  //     work_order_no: '', // Reset other fields as needed
  //   });
  // };

  const resetEditModal = () => {
    setProjectYard1({
      work_order_no: '', // Reset other fields as needed
    });
  };

  const insertTaskData = () => {
    if (isSubmitting) {
      return; // Prevent multiple submissions
    }
    // Reset isSubmitting on submission failure

    // Validate work_order_no
    if (!projectYard.work_order_no) {
      // Display an error message or handle the validation error as needed
      message('Work Order No is required.', 'error');
      return;
    }
    setIsSubmitting(true);
    projectYard.project_id = id;

    api
      .post('/projecttask/insertYard', projectYard)
      .then(() => {
        message('New Yard sheet has been created successfully.', 'success');
        getYard();
        addContactToggle(false);
        // Reset isSubmitting on submission failure
        setIsSubmitting(false);
        resetForm(); // Reset the form fields
        getYard();
        // Clear the selected names after insertion
      })
      .catch(() => {
        message('Network connection error.', 'error');
        // Reset isSubmitting on submission failure
        setIsSubmitting(false);
      });
  };
  useEffect(() => {
    getYard();
    //getYardsheet();
  }, [id]);

  //const [isSubmitting, setIsSubmitting] = useState(false);

  //const [yard, setYard] = useState([]);
  const handleprojectYardInputs = (e) => {
    setProjectYard1({ ...projectYard1, [e.target.name]: e.target.value });
  };

  const getYardsheet = (yardId) => {
    api
      .post('/projecttask/getYardsheetById', { yard_id: yardId })
      .then((res) => {
        setProjectYard1(res.data.data[0]);
        console.log('test1', res.data.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getYardsheet();
  }, []);
  useEffect(() => {
    setProjectYard(projectYard1);
  }, [projectYard1]);

  const editTaskData = () => {
    if (isSubmitting) {
      return; // Prevent multiple submissions
    }

    api
      .post('/projecttask/editYardsheet', projectYard1)
      .then(() => {
        message('Yard sheet has been Updated successfully.', 'success');

        getYard();
        setEditYardModal(false);
        // Clear the selected names after insertion
      })
      .catch(() => {
        message('Network connection error.', 'error');
      })
      .finally(() => {
        setIsSubmitting(false); // Reset submission status
      });
  };

  //Structure of projectTask list view

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <br />

        {/* <Label></Label>
        <Button color="primary" className="shadow-none" onClick={addContactToggle.bind(null)}>
          Add Yard Detail{' '}
        </Button> */}

        <Label></Label>
        <Button
          color="primary"
          className="shadow-none"
          onClick={() => {
            addContactToggle(true);
            resetEditModal(); // Reset the state for Edit Modal
          }}
        >
          Add Yard Detail
        </Button>
        <br />
        <Modal size="lg" isOpen={addContactModal} toggle={addContactToggle.bind(null)}>
          <ModalHeader
            style={{ backgroundColor: ' #0096FF', color: 'white' }}
            toggle={addContactToggle.bind(null)}
          >
            Yard Details
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                <Card>
                  <CardBody>
                    <Form>
                      <Row>
                        <Row>
                          <Col md="4">
                            <FormGroup>
                              <Label>Work Order No<span className='required'>*</span></Label>
                              <Input
                                type="select"
                                name="work_order_no"
                                onChange={handleInputs}
                                value={projectYard && projectYard.work_order_no}
                              >
                                <option value="">Please Select</option>
                                {workorderbyId &&
                                  workorderbyId.map((ele) => (
                                    <option key={ele.work_order_id} value={ele.work_order_no}>
                                      {ele.work_order_no}
                                    </option>
                                  ))}
                              </Input>
                            </FormGroup>
                          </Col>
                        </Row>

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

              <div></div>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              className="shadow-none"
              color="primary"
              onClick={() => {
                insertTaskData();
              }}
              disabled={isSubmitting} // Disable the button while submitting
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
            <Button color="secondary" className="shadow-none" onClick={addContactToggle.bind(null)}>
              Close
            </Button>
          </ModalFooter>
        </Modal>

        {/* </Form>
            </CardBody>
          </Card>
               
          </ComponentCard> */}
        <Table style={{ marginTop: '20px' }} id="example" className="display border border-secondary rounded">
          <thead>
            <tr>
              <th>#</th>
              <th>WorkOrderNo</th>
              <th>Pipe Amount</th>
              <th>Plank Amount</th>
              <th>Volume Amount</th>
              <th>TB Amount</th>
              <th>others Amount</th>
              <th>Pipe Count</th>
              <th>plank Count</th>
              <th>volume Count</th>
              <th>tb Count</th>
              <th>others Count</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {yard &&
              yard.map((element, index) => {
                return (
                  <tr key={element.project_work_order_id}>
                    <td>{index + 1}</td>
                    <td>{element.work_order_no}</td>
                    <td>{element.pipe_erection_amount}</td>
                    <td>{element.plank_erection_amount}</td>
                    <td>{element.volume_erection_amount}</td>
                    <td>{element.tb_erection_amount}</td>
                    <td>{element.others_erection_amount}</td>
                    <td>{element.pipe_count}</td>
                    <td>{element.plank_count}</td>
                    <td>{element.volume_count}</td>
                    <td>{element.tb_count}</td>
                    <td>{element.others_count}</td>
                    <td>
                      <span
                        className="addline"
                        onClick={() => {
                          // editContactToggle();
                          //setYard(element)
                          setProjectYard1(element.yard_id);
                          setEditYardModal(true);
                          // Optionally, you can call getYardsheet here passing element.yard_id
                          getYardsheet(element.yard_id);
                        }}
                      >
                        <Icon.Edit />
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
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
                        <Label>Work Order No</Label>
                        <Input
                          type="select"
                          name="work_order_no"
                          onChange={handleInputs}
                          value={projectYard && projectYard.work_order_no}
                        >
                          <option value="">Please Select</option>
                          {workorderbyId &&
                            workorderbyId.map((ele) => (
                              <option key={ele.work_order_id} value={ele.work_order_no}>
                                {ele.work_order_no}
                              </option>
                            ))}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
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
      </div>
    </div>
  );
}
