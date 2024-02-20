import React, { useEffect, useState } from 'react';
import {
  Row,
  Form,
  ModalFooter,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  Table,
  Label,
  Input,
  Col,
  FormGroup,
  Button,
  CardBody,
} from 'reactstrap';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';
import Swal from 'sweetalert2';
import api from '../constants/api'; // Import your API library or use a fetch/axios/etc.
import message from './Message';


export default function ProjectTeam({
  addToggleWorkOrder,
  addModalWorkOrder,
  id,
  workorderbyId,
  project,
  getWorkOrderById
}) {
  ProjectTeam.propTypes = {
    addToggleWorkOrder: PropTypes.func,
    addModalWorkOrder: PropTypes.bool,
    id: PropTypes.any,
    workorderbyId: PropTypes.any,
    project:PropTypes.any,
    getWorkOrderById:PropTypes.any,
  };

  //   const [employeeTeam, setEmployeeTeam] = useState([]);

  //   // Function to fetch team titles
  //   const getTeamTitles = () => {
  //     api
  //       .get('/projectteam/getProjectTeam')
  //       .then((res) => {
  //         setEmployeeTeam(res.data.data); 
  //       })
  //       .catch(() => {
  //         message('Team titles not found', 'info');
  //       });
  //   };
  //Milestone data in milestoneDetails

  const [insertworkOrder, setInsertWorkOrder] = useState({
    work_order_id:'',
    work_order_no: '',

  });
  const handleInputs = (e) => {
    setInsertWorkOrder({ ...insertworkOrder, [e.target.name]: e.target.value });
  };
  /// Insert or update team member
  const insertTeamMember = () => {
     // Validate work_order_no
     if (!insertworkOrder.work_order_no) {
      // Display an error message or handle the validation error as needed
      message('Work Order No is required.', 'error');
      return;
    }

    insertworkOrder.project_id = id;
    api
      .post(`/projecttask/insertWorkOrder`, insertworkOrder)
      .then(() => {
        
        getWorkOrderById();
        addToggleWorkOrder();
        window.location.reload();
        
        message('Work order updated successfully.', 'success');
        // Assuming this function retrieves updated team data
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
  };
  useEffect(() => {
    //getTeamTitles();

  }, [id]);
  const deleteRecord = (deleteID) => {
    Swal.fire({
      title: `Are you sure? `,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api.post('/projecttask/deleteworkorder', { work_order_id: deleteID }).then(() => {
          Swal.fire('Deleted!', 'Your Line Items has been deleted.', 'success');
          window.location.reload();
        });
      }
    });
  };

  const QuoteProject = project.find((element) => {
    return element.project_id === workorderbyId.project_id;
  });
  console.log('QuoteProject:', QuoteProject);
console.log('project:', project);
  return (
    <Form>
      <br/>
      <Row>
     
        <Col md="3">
          <FormGroup>
          {(QuoteProject === undefined &&  project.status === 'Complete') || 
          (QuoteProject === undefined &&  project && project.status !== 'Complete') && (
           
            <Button
              color="primary"
              className="shadow-none"
              onClick={addToggleWorkOrder.bind(null)}
            >
              Add Work Order
            </Button>
            )}
            
            <Modal
              size="lg"
              isOpen={addModalWorkOrder}
              toggle={addToggleWorkOrder.bind(null)}
            >
              <ModalHeader style={{ backgroundColor: ' #0096FF', color: 'white' }} toggle={addToggleWorkOrder.bind(null)}>
                Create Work Order
              </ModalHeader>
              <ModalBody>
                <Row>
                  <Col md="12">
                    <Card>
                      <CardBody>
                        <Form>
                          <Row>
                            <Col md="3">
                              <FormGroup>
                                <Label>Work Order No <span className='required'>*</span></Label>
                                <Input
                                  type="text"
                                  onChange={handleInputs}
                                  value={insertworkOrder && insertworkOrder.work_order_no}
                                  name="work_order_no"
                                >

                                </Input>
                              </FormGroup>
                            </Col>
                          </Row>
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    insertTeamMember();
                  }}
                >
                  Submit
                </Button>
                <Button
                  color="secondary"
                  className="shadow-none"
                  onClick={addToggleWorkOrder.bind(null)}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </FormGroup>
        </Col>
      </Row>
      <Table id="example" className="display border border-secondary rounded">
        <thead>
          <tr>
            <th>#</th>
            <th>Work Order No</th>
            <th>Delete</th>

          </tr>
        </thead>
        <tbody>
          {workorderbyId &&
            workorderbyId.map((element, index) => {
              return (
                <tr key={element.project_work_order_id}>
                  <td>{index + 1}</td>
                  <td>{element.work_order_no}</td>
                  <td>
                  <span className='addline'
                    onClick={() => {
                      deleteRecord(element.work_order_id);
                      //setContactDataTeam(element);
                      // setEditTeamEditModal(true);
                    }}
                  >
                    <Icon.Trash2 />
                  </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

    </Form>

  );
}
