import React, { useState } from 'react';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types';
import api from '../../constants/api';
import ComponentCard from '../ComponentCard';
import AttachmentModalV2 from '../Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../ProjectModal/ViewFileComponentV2';

function AttachmentPortalsTab({
  dataForPicture,
  dataForAttachment,
  setAttachmentModal,
  id,
  attachmentModal,
  pictureData,
  attachmentData,
}) {
  AttachmentPortalsTab.propTypes = {
    dataForPicture: PropTypes.any,
    dataForAttachment: PropTypes.func,
    setAttachmentModal: PropTypes.func,
    id: PropTypes.any,
    attachmentModal: PropTypes.bool,
    pictureData: PropTypes.any,
    attachmentData: PropTypes.any,
  };
  const [roomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [getFile, setGetFile] = useState(null);

  const getFiles = (RoomName) => {
    api.post('/file/getListOfFiles', { record_id: id, room_name: RoomName }).then((res) => {
      setGetFile(res.data);

      if (res.data) {
        return 1;
      }
      console.log(getFile)
      return 0;
    });
  };

  return (
    <div>
      <Row>
        <Form>
          <FormGroup>
            <Row>
              <Col md="6">
                <ComponentCard title="Picture">
                  <Row>
                    <Col xs="5" md="5" className="mb-3">
                      {getFiles('EmployeePicture') ? (
                        ''
                      ) : (
                        <Button
                          className="shadow-none"
                          color="primary"
                          onClick={() => {
                            setRoomName('EmployeePicture');
                            setFileTypes(['JPG', 'PNG', 'GIF']);
                            dataForPicture();
                            setAttachmentModal(true);
                          }}
                        >
                          <Icon.Image className="rounded-circle" width="20" />
                        </Button>
                      )}{' '}
                    </Col>
                  </Row>
                  <AttachmentModalV2
                    moduleId={id}
                    recordType="EmployeePicture"
                    roomName={roomName}
                    altTagData="EmployeePicData"
                    desc="EmployeePicData"
                    fileTypes={fileTypes}
                    modelType={pictureData.modelType}
                    attachmentModal={attachmentModal}
                    setAttachmentModal={setAttachmentModal}
                  />
                  <ViewFileComponentV2
                    moduleId={id}
                    roomName="Employeepicture"
                    recordType="EmployeePicture"
                  />
                </ComponentCard>
              </Col>
              <Col md="6">
                <ComponentCard title="Work Permit">
                  <Row>
                    <Col xs="5" md="5" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setRoomName('Employeeworkpermit');
                          setFileTypes(['JPG', 'PNG', 'GIF', 'PDF']);
                          dataForAttachment();
                          setAttachmentModal(true);
                        }}
                      >
                        <Icon.File className="rounded-circle" width="20" />
                      </Button>
                    </Col>
                  </Row>
                  <AttachmentModalV2
                    moduleId={id}
                    attachmentModal={attachmentModal}
                    setAttachmentModal={setAttachmentModal}
                    roomName={roomName}
                    fileTypes={fileTypes}
                    altTagData="WorkPermit"
                    desc="workPermit"
                    recordType="Employeeworkpermit"
                    mediaType={attachmentData.modelType}
                  />
                  <ViewFileComponentV2
                    moduleId={id}
                    roomName="Employeeworkpermit"
                    recordType="Employeeworkpermit"
                  />
                </ComponentCard>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </Row>
      <Row>
        {/* Picture and Attachments Form */}
        <Form>
          <FormGroup>
            <Row>
              <Col md="6">
                <ComponentCard title="WSQ">
                  <Row>
                    <Col xs="5" md="5" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setRoomName('wsq');
                          setFileTypes(['JPG', 'PNG', 'GIF', 'PDF']);
                          dataForAttachment();
                          setAttachmentModal(true);
                        }}
                      >
                        <Icon.File className="rounded-circle" width="20" />
                      </Button>
                    </Col>
                  </Row>
                  <AttachmentModalV2
                    moduleId={id}
                    attachmentModal={attachmentModal}
                    setAttachmentModal={setAttachmentModal}
                    roomName={roomName}
                    fileTypes={fileTypes}
                    altTagData="wsq Data"
                    desc="wsq Data"
                    recordType="WsqAttachment"
                    mediaType={attachmentData.modelType}
                  />
                  <ViewFileComponentV2 moduleId={id} roomName="wsq" recordType="WsqAttachment" />
                </ComponentCard>
              </Col>
              <Col md="6">
                <ComponentCard title="Digital Sign">
                  <Row>
                    <Col xs="5" md="5" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setRoomName('digitalSign');
                          setFileTypes(['JPG', 'PNG', 'GIF', 'PDF']);
                          dataForAttachment();
                          setAttachmentModal(true);
                        }}
                      >
                        <Icon.File className="rounded-circle" width="20" />
                      </Button>
                    </Col>
                  </Row>
                  <AttachmentModalV2
                    moduleId={id}
                    attachmentModal={attachmentModal}
                    setAttachmentModal={setAttachmentModal}
                    roomName={roomName}
                    fileTypes={fileTypes}
                    altTagData="digitalSign Data"
                    desc="digitalSign Data"
                    recordType="digitalSign"
                    mediaType={attachmentData.modelType}
                  />
                  <ViewFileComponentV2
                    moduleId={id}
                    roomName="digitalSign"
                    recordType="digitalSign"
                  />
                </ComponentCard>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </Row>

      <Row>
        {/* Picture and Attachments Form */}
        <Form>
          <FormGroup>
            <Row>
              <Col md="6">
                <ComponentCard title="CSOC">
                  <Row>
                    <Col xs="5" md="5" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setRoomName('csoc');
                          setFileTypes(['JPG', 'PNG', 'GIF', 'PDF']);
                          dataForAttachment();
                          setAttachmentModal(true);
                        }}
                      >
                        <Icon.File className="rounded-circle" width="20" />
                      </Button>
                    </Col>
                  </Row>
                  <AttachmentModalV2
                    moduleId={id}
                    attachmentModal={attachmentModal}
                    setAttachmentModal={setAttachmentModal}
                    roomName={roomName}
                    fileTypes={fileTypes}
                    altTagData="csoc Data"
                    desc="csoc Data"
                    recordType="csoc"
                    mediaType={attachmentData.modelType}
                  />
                  <ViewFileComponentV2 moduleId={id} roomName="csoc" recordType="csoc" />
                </ComponentCard>
              </Col>
              <Col md="6">
                <ComponentCard title="Other Files">
                  <Row>
                    <Col xs="5" md="5" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setRoomName('EmployeeOtherFiles');
                          setFileTypes(['JPG', 'PNG', 'GIF', 'PDF']);
                          dataForAttachment();
                          setAttachmentModal(true);
                        }}
                      >
                        <Icon.File className="rounded-circle" width="20" />
                      </Button>
                    </Col>
                  </Row>
                  <AttachmentModalV2
                    moduleId={id}
                    attachmentModal={attachmentModal}
                    setAttachmentModal={setAttachmentModal}
                    roomName={roomName}
                    fileTypes={fileTypes}
                    altTagData="otherFiles Data"
                    desc="otherFiles Data"
                    recordType="EmployeeOtherFiles"
                    mediaType={attachmentData.modelType}
                  />
                  <ViewFileComponentV2
                    moduleId={id}
                    roomName="EmployeeOtherFiles"
                    recordType="EmployeeOtherFiles"
                  />
                </ComponentCard>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </Row>
      <Row>
        {/* Picture and Attachments Form */}
        <Form>
          <FormGroup>
            <ComponentCard title="Housing / Accommodation">
              <Row>
                <Col xs="5" md="5" className="mb-3">
                  <Button
                    className="shadow-none"
                    color="primary"
                    onClick={() => {
                      setRoomName('housing');
                      setFileTypes(['JPG', 'PNG', 'GIF', 'PDF']);
                      dataForAttachment();
                      setAttachmentModal(true);
                    }}
                  >
                    <Icon.File className="rounded-circle" width="20" />
                  </Button>
                </Col>
              </Row>
              <AttachmentModalV2
                moduleId={id}
                attachmentModal={attachmentModal}
                setAttachmentModal={setAttachmentModal}
                roomName={roomName}
                fileTypes={fileTypes}
                altTagData="housing Data"
                desc="housing Data"
                recordType="housing"
                mediaType={attachmentData.modelType}
              />
              <ViewFileComponentV2 moduleId={id} roomName="housing" recordType="housing" />
            </ComponentCard>
          </FormGroup>
        </Form>
      </Row>
    </div>
  );
}

export default AttachmentPortalsTab;
