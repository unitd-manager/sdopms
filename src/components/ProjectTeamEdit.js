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
import message from './Message';
import api from '../constants/api';

const ProjectTeamEdit = ({
  editTeamModal,
  setEditTeamEditModal,
  contactDataTeam,
  getTeamById,
  id,
}) => {
  ProjectTeamEdit.propTypes = {
    editTeamModal: PropTypes.bool,
    setEditTeamEditModal: PropTypes.func,
    contactDataTeam: PropTypes.object,
    getTeamById: PropTypes.func,
    id: PropTypes.any,
  };

  //All state variable
  const [teamPojects, setTeamProjects] = useState();
  const [employeeTeam, setEmployeeTeam] = useState();
  const [milestonesJobEdit, setMilestonesJobEdit] = useState([]);
  const [taskdetailJobEdit, setTaskDetailJobEdit] = useState([]);

  // Gettind data from Job By Id
  const editJobTeam = () => {
    api
      .get('/jobinformation/getEmployee')
      .then((res) => {
        console.log(res.data.data);
        setEmployeeTeam(res.data.data);
      })
      .catch(() => {});
  };
  //milestone data in milestone
  const handleInputs = (e) => {
    setTeamProjects({ ...teamPojects, [e.target.name]: e.target.value });
  };

  const editTeamProjectss = () => {
    api
      .post('/projectteam/editTeam', teamPojects)
      .then(() => {
        message('Record editted successfully', 'success');
        getTeamById();
        setTimeout(() => {
          contactDataTeam(false);
        }, 300);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  // Api call for getting milestone name dropdown
  const getMilestoneEdit = () => {
    api
      .post('/projecttimesheet/getMilestoneTitle', { project_id: id })
      .then((res) => {
        setMilestonesJobEdit(res.data.data);
      })
      .catch(() => {
        message('Milestone not found', 'info');
      });
  };

  // Api call for getting milestone dropdown based on project ID
  const getTaskEdit = (projectId) => {
    api
      .post('/projecttimesheet/getTaskByID', { project_milestone_id: projectId })
      .then((res) => {
        setTaskDetailJobEdit(res.data.data);
      })
      .catch(() => {
        message('Task not found', 'info');
      });
  };

  useEffect(() => {
    editJobTeam();
    setTeamProjects(contactDataTeam);
  }, [contactDataTeam]);

  useEffect(() => {
    getMilestoneEdit();
  }, [id]);
  useEffect(() => {
    if (teamPojects && teamPojects.project_milestone_id) {
      // Use taskdetails.project_milestone_id directly to get the selected project ID
      const selectedTask = teamPojects.project_milestone_id;
      getTaskEdit(selectedTask);
    }
  }, [teamPojects && teamPojects.project_milestone_id]);

  return (
    <>
      <Modal size="lg" isOpen={editTeamModal}>
        <ModalHeader>
          Team Details
          <Button
            color="secondary"
            onClick={() => {
              setEditTeamEditModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          {/* milestone Details */}
          <Form>
            <FormGroup>
              {' '}
              <div>
                <Form>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label>Name</Label>
                        <Input
                          type="select"
                          name="employee_id"
                          onChange={handleInputs}
                          value={teamPojects && teamPojects.employee_id}
                        >
                          <option value="" defaultValue="selected"></option>
                          {employeeTeam &&
                            employeeTeam.map((ele) => {
                              return (
                                ele.e_count === 0 && (
                                  <option key={ele.employee_id} value={ele.employee_id}>
                                    {ele.first_name}
                                  </option>
                                )
                              );
                            })}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Milestone Title</Label>
                        <Input
                          type="select"
                          name="project_milestone_id"
                          value={teamPojects && teamPojects.project_milestone_id}
                          onChange={(e) => {
                            handleInputs(e);
                            const selectedTask = e.target.value;
                            getTaskEdit(selectedTask);
                          }}
                        >
                          <option>Select Project</option>
                          {milestonesJobEdit &&
                            milestonesJobEdit.map((e) => (
                              <option key={e.project_id} value={e.project_milestone_id}>
                                {e.milestone_title}
                              </option>
                            ))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Task</Label>
                        <Input
                          type="select"
                          name="project_task_id"
                          value={teamPojects && teamPojects.project_task_id}
                          onChange={handleInputs}
                        >
                          <option defaultValue="selected">Please Select</option>
                          {taskdetailJobEdit &&
                            taskdetailJobEdit.map((e) => (
                              <option key={e.project_milestone_id} value={e.project_task_id}>
                                {e.task_title}
                              </option>
                            ))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Designation</Label>
                        <br />
                        <span>{teamPojects && teamPojects.designation}</span>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Department</Label>
                        <br />
                        <span>{teamPojects && teamPojects.department}</span>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </div>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Row>
            <div className="pt-3 mt-3 d-flex align-items-center gap-2">
              <Button
                color="primary"
                onClick={() => {
                  editTeamProjectss();
                }}
              >
                Submit
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  setEditTeamEditModal(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </Row>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ProjectTeamEdit;
