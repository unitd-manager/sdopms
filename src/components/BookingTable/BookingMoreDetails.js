import React,{useState} from 'react';
import { ToastContainer } from 'react-toastify';
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Button,
} from 'reactstrap';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';
import AttachmentModalV2 from '../Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../ProjectModal/ViewFileComponentV2';
import AddNote from '../Tender/AddNote';
import ViewNote from '../Tender/ViewNote';

export default function BookingMoreDetails({
  activeTab,
  toggle,
  handleserviceInputs,
  servicelinkeddetails,
  dataForPicture,
  attachmentModal,
  setAttachmentModal,
  id,
  pictureData,
}) {
  BookingMoreDetails.propTypes = {
    activeTab: PropTypes.any,
    toggle: PropTypes.func,
    handleserviceInputs: PropTypes.func,
    servicelinkeddetails: PropTypes.any,
    dataForPicture: PropTypes.func,
    attachmentModal: PropTypes.bool,
    setAttachmentModal: PropTypes.func,
    id: PropTypes.any,
    pictureData: PropTypes.any,
  };

  const[roomName,setRoomName]=useState('')
  const[fileTypes,setFileTypes]=useState();

  return (
    <ComponentCard title="More Details">
      <ToastContainer></ToastContainer>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab === '1' ? 'active' : ''}
            onClick={() => {
              toggle('1');
            }}
          >
            ServiceLinked
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === '2' ? 'active' : ''}
            onClick={() => {
              toggle('2');
            }}
          >
            Customer Acknowledgement
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === '3' ? 'active' : ''}
            onClick={() => {
              toggle('3');
            }}
          >
            Attachment
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="p-4" activeTab={activeTab}>
        <TabPane tabId="1">
          <ComponentCard title="ServiceLinked">
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>BookingId</Label>
                  <Input
                    type="text"
                    onChange={handleserviceInputs}
                    value={servicelinkeddetails && servicelinkeddetails.booking_id}
                    name="booking_id"
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>BookingService</Label>
                  <Input
                    value={servicelinkeddetails && servicelinkeddetails.booking_service_id}
                    type="text"
                    onChange={handleserviceInputs}
                    name="booking_service_id"
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Service</Label>
                  <Input
                    value={servicelinkeddetails && servicelinkeddetails.service}
                    type="text"
                    onChange={handleserviceInputs}
                    name="service"
                  ></Input>
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
        </TabPane>
        <TabPane tabId="2">
          <ComponentCard title="Customer Acknowledgement"></ComponentCard>
        </TabPane>
        <TabPane tabId="3">
          
        <ComponentCard title="Picture">
            <Row>
              <Col xs="12" md="3" className="mb-3">
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    setRoomName('BookingPicture')
                    setFileTypes(["JPG", "PNG", "GIF"]);
                    dataForPicture();
                    setAttachmentModal(true);}}><Icon.Image className="rounded-circle" width="20" /></Button>
              </Col>
            </Row>
            <AttachmentModalV2
              moduleId={id}
              attachmentModal={attachmentModal}
              setAttachmentModal={setAttachmentModal}
              roomName={roomName}
              fileTypes={fileTypes}
              altTagData="Booking Data"
              desc="Booking Data"
              recordType="BookingPicture"
              mediaType={pictureData.modelType}
            />
            <ViewFileComponentV2 moduleId={id} roomName="BookingPicture" recordType="BookingPicture" />
          </ComponentCard>

          <Row>
            <ComponentCard title="Add a note">
              <AddNote recordId={id} roomName="BookingEdit" />
              <ViewNote recordId={id} roomName="BookingEdit" />
            </ComponentCard>
          </Row>
        </TabPane>
      </TabContent>
    </ComponentCard>
  );
}
