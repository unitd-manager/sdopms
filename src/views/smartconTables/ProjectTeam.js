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
import message from '../../components/Message';
import api from '../../constants/api'; // Import your API library or use a fetch/axios/etc.


export default function ProjectTeam({
  addContactToggleTeam,
  addContactModalTeam,
  setEditTeamEditModal,
  id,
  teamById,
  setContactDataTeam,
  getTeamById,
}) {
  ProjectTeam.propTypes = {
    addContactToggleTeam: PropTypes.func,
    setEditTeamEditModal: PropTypes.func,
    addContactModalTeam: PropTypes.bool,
    id: PropTypes.any,
    teamById: PropTypes.array, // Assuming teamById is an array
    setContactDataTeam: PropTypes.func,
    getTeamById: PropTypes.func,
  };

  const [selectedTeamTitle, setSelectedTeamTitle] = useState('');
  const [employeeTeam, setEmployeeTeam] = useState([]);

  // Function to fetch team titles
  const getTeamTitles = () => {
    api
      .get('/projectteam/getProjectTeam')
      .then((res) => {
        setEmployeeTeam(res.data.data); 
      })
      .catch(() => {
        message('Team titles not found', 'info');
      });
  };

  /// Insert or update team member
const insertTeamMember = () => {
  // Check if a team title is selected
  if (!selectedTeamTitle) {
    message('Please select a team title', 'danger');
    return;
  }

  // Check if a project ID is available
  if (!id) {
    message('Project ID not available', 'error');
    return;
  }

  // Find the team with the selected team title
  const existingTeam = employeeTeam.find((team) => team.team_title === selectedTeamTitle);

  if (!existingTeam) {
    message('Selected team title not found', 'danger');
    return;
  }

  // Update the project ID for the existing team
  const updatedTeam = {
    ...existingTeam,
    project_id: id,
  };

  api
    .post(`/projectteam/editTeam`, updatedTeam)
    .then(() => {
      message('Team member updated successfully.', 'success');
      getTeamById(); // Assuming this function retrieves updated team data
    })
    .catch(() => {
      message('Network connection error.', 'error');
    });
};
useEffect(() => {
  getTeamTitles();

 }, [id]);

  return (
    <Form>
      <Row>
        <Col md="3">
          <FormGroup>
            <Button
              color="primary"
              className="shadow-none"
              onClick={addContactToggleTeam.bind(null)}
            >
              Add New
            </Button>
            <Modal
              size="lg"
              isOpen={addContactModalTeam}
              toggle={addContactToggleTeam.bind(null)}
            >
              <ModalHeader  style={{ backgroundColor: ' #0096FF', color: 'white' }} toggle={addContactToggleTeam.bind(null)}>
                New Team Member
              </ModalHeader>
              <ModalBody>
                <Row>
                  <Col md="12">
                    <Card>
                      <CardBody>
                        <Form>
                        <Row>
                            <Col md="4">
                              <FormGroup>
                                <Label>Select Team Title</Label>
                                <Input
                                  type="select"
                                  onChange={(e) => {
                                    setSelectedTeamTitle(e.target.value);
                                  }}
                                  value={selectedTeamTitle}
                                >
                                  <option value="">Please Select</option>
                                  {employeeTeam &&
                                    employeeTeam.map((e) => {
                                      return (
                                        <option
                                          key={e.project_team_id}
                                          value={e.team_title}
                                        >
                                          {e.team_title}
                                        </option>
                                      );
                                    })}
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
                  onClick={addContactToggleTeam.bind(null)}
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
            <th>Name</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {teamById &&
            teamById.map((element, index) => {
              return (
                <tr key={element.project_team_id}>
                  <td>{index + 1}</td>
                  <td>
                    <span
                      onClick={() => {
                        setContactDataTeam(element);
                        setEditTeamEditModal(true);
                      }}
                    >
                      <Icon.Edit2 />
                    </span>
                  </td>
                  <td>{element.team_title}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      
    </Form>
    
  );
}
