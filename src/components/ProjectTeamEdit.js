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
  Table
} from 'reactstrap';
import PropTypes from 'prop-types';
import api from '../constants/api';

const ProjectTeamEdit = ({
  editTeamModal,
  setEditTeamEditModal,
  contactDataTeam,
}) => {
  ProjectTeamEdit.propTypes = {
    editTeamModal: PropTypes.bool,
    setEditTeamEditModal: PropTypes.func,
    contactDataTeam: PropTypes.object,
  };

  const [employeeTeam, setEmployeeTeam] = useState([]);
  const [teamPojects, setTeamProjects] = useState({});

  const fetchEmployeeDetails = (projectTeamId) => {
    api
      .post('/projectteam/getEmployeeByID', { project_team_id: projectTeamId })
      .then((res) => {
        setEmployeeTeam(res.data.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    // When the contactDataTeam changes, fetch the employee details for the selected team
    if (contactDataTeam && contactDataTeam.project_team_id) {
      fetchEmployeeDetails(contactDataTeam.project_team_id);
    }

    // Update teamProjects with the new contactDataTeam
    setTeamProjects(contactDataTeam);
  }, [contactDataTeam]);

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
          <Form>
            <FormGroup>
              <div>
                <Form>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label>Team Name</Label>
                        <Input
                          type="text"
                          name="team_title"
                          value={teamPojects && teamPojects.team_title}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Table id="example" className="display border border-secondary rounded">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>First Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employeeTeam &&
                          employeeTeam.map((element, index) => {
                            return (
                              <tr key={element.project_team_id}>
                                <td>{index + 1}</td>
                                <td>{element.first_name || element.employee_name}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
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
