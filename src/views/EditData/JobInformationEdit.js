import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Button,
  CardTitle,
  TabContent,
  TabPane,
  Input,
} from 'reactstrap';
import Swal from 'sweetalert2';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useNavigate, useParams } from 'react-router-dom';
import '../form-editor/editor.scss';
import { ToastContainer } from 'react-toastify';
import * as Icon from 'react-feather';
import 'bootstrap/dist/css/bootstrap.min.css';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import message from '../../components/Message';
import api from '../../constants/api';
import Jobinformationedit from '../../components/JobInformation/Jobinformationedit';
import JobKeyDetails from '../../components/JobInformation/JobKeyDetails';
import JobLeaveandMedical from '../../components/JobInformation/JobLeaveandMedical';
import JobWorkingHours from '../../components/JobInformation/JobWorkingHours';
import JobProbation from '../../components/JobInformation/JobProbation';
import JobSalary from '../../components/JobInformation/JobSalary';
//import JobInformationSalary from '../../components/JobInformation/JobInformationSalary';
import ViewNote from '../../components/Tender/ViewNote';
import AddNote from '../../components/Tender/AddNote';
import JobTermination from '../../components/JobInformation/JobInformationTermination';
import JobBank from '../../components/JobInformation/Job';
import Tab from '../../components/ProjectTabs/Tab';

const JobInformationEdit = () => {
  //All state variable
  const [activeTab, setActiveTab] = useState('1');
  const [job, setJob] = useState();
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [JobInformationEditModal, setJobInformationEditModal] = useState(false);
  const [overTimeRate, setOverTimeRate] = useState('');
  const [allBank, setAllBank] = useState();
  const [roomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState();
  const [update, setUpdate] = useState(false);

  //navigation and parameters
  const { id } = useParams();
  const navigate = useNavigate();
  //Button fuctions
  const applyChanges = () => {};
  const backToList = () => {
    navigate('/JobInformation');
  };

  // Getting data from jobinformation By Id
  const editJobById = () => {
    api
      .post('/jobinformation/EditjobinformationById', { job_information_id: id })
      .then((res) => {
        setJob(res.data.data[0]);
        setOverTimeRate(res.data.data[0].overtime_pay_rate);
      })
      .catch(() => {
        //message('JobInformation Data Not Found', 'info');
      });
  };
  //jobinformation data in jobinformationDetails
  const handleInputsJobInformation = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };
  //Calculation for gst
  const handleRadioGst = (radioVal, overtimeRate, basicPay) => {
    /* eslint-disable */
    if (basicPay == '') {
      basicPay = 0;
    }
    if (overtimeRate == '') {
      overtimeRate = 0;
    }
    if (radioVal === '1') {
      setOverTimeRate((parseFloat(basicPay) / 30) * parseFloat(1 / 8) * parseFloat(overtimeRate));
    } else {
      setOverTimeRate(0);
    }
  };
  const editJobData = () => {
    // Check if overtime rate is a valid number (greater than or equal to 0)
    const overtimeRate = parseFloat(job.over_time_rate);
      job.overtime_pay_rate = overtimeRate;
      if (
        job.working_days &&
        job.working_days !== '' &&
        job.basic_pay !== '' &&
        job.join_date !== ''
      ) {
        // Check if overtime is equal to 1 (Yes)
        if (job.overtime === '1') {
          // Check if overtimeRate is empty
          if (isNaN(overtimeRate) || overtimeRate === '') {
            message('Validation message for overtime rate.', 'warning');
          } else {
            // Perform the API call when overtime is Yes and overtimeRate is not empty
            api
              .post('/jobinformation/edit-jobinformation', job)
              .then(() => {
                message('Record edited successfully', 'success');
              })
              .catch(() => {
                message('Unable to edit record.', 'error');
              });
          }
        } else {
          // Perform the API call when overtime is No
          api
            .post('/jobinformation/edit-jobinformation', job)
            .then(() => {
              message('Record edited successfully', 'success');
            })
            .catch(() => {
              message('Unable to edit record.', 'error');
            });
        }
      } else {
        message('Please fill all required fields.', 'warning');
      }
     
  };
  //Logic for editting data in db
  // const editJobData = () => {
  //   if(job.over_time_rate!=='')
  //   {
  //   job.overtime_pay_rate = overTimeRate;
  //   if (
  //     job.working_days &&
  //     job.working_days !== '' &&
  //     job.basic_pay !== '' &&
  //     job.join_date !== ''
  //   ) {
  //     if (job.over_time_rate !== '') {
  //       api
  //         .post('/jobinformation/edit-jobinformation', job)
  //         .then(() => {
  //           message('Record editted successfully', 'success');
  //         })
  //         .catch(() => {
  //           message('Unable to edit record.', 'error');
  //         });
  //     }
  //   }} else {
  //     message('Please fill all required fields.', 'warning');
  //   }
  // };

  // Start for tab refresh navigation #Renuka 1-06-23
  const tabs = [
    { id: '1', name: 'Working hours' },
    { id: '2', name: 'Leave and Medical' },
    { id: '3', name: 'Probation Details (KET)' },
    { id: '4', name: 'Salary Information' },
    { id: '5', name: 'CPF Information' },
    { id: '6', name: 'Bank Information' },
    { id: '7', name: 'Termination Information' },
    { id: '8', name: 'Attachment' },
    { id: '9', name: 'Add a Note' },
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };
  // End for tab refresh navigation #Renuka 1-06-23

  //for duplicating job information
  const insertJobInformation = () => {
    Swal.fire({
      title: `Are you sure? ${id}`,
      text: 'Do you wish to duplicate the job information',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.isConfirmed) {
        api.post('/jobinformation/edit-jobinformation', { job_information_id: id }).then(() => {
          Swal.fire('Your Job Information duplicated successfully', 'success').then(() => {
            setJobInformationEditModal(true);
          });
          editJobData();
        });
      }
    });
  };

  //attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };
  const BankDetails = () => {
    api
      .get('/bank/getBank')
      .then((res) => {
        setAllBank(res.data.data);
      })
      .catch(() => {
        message('JobInformation Data Not Found', 'info');
      });
  };

  useEffect(() => {
    BankDetails();
    editJobById();
  }, [id]);
  const [overtimeApplicable, setOvertimeApplicable] = useState(
    localStorage.getItem('overtimeApplicable') === 'true' || (job && job.overtime === 1),
  );

  // Use useEffect to save the overtimeApplicable state in localStorage
  useEffect(() => {
    localStorage.setItem('overtimeApplicable', overtimeApplicable);
  }, [overtimeApplicable]);

  return (
    <>
      <BreadCrumbs />
      <CardTitle>Step 1 (Job Information)</CardTitle>
      <CardTitle>
        <Label>Employee Name:</Label>
        {job && job.first_name}
      </CardTitle>
      <CardTitle>
        <Label>NRIC no:</Label>
        {job && job.nric_no} 
      </CardTitle>
      <ToastContainer></ToastContainer>
      <Jobinformationedit
        editJobData={editJobData}
        // id={id}
        applyChanges={applyChanges}
        navigate={navigate}
        backToList={backToList}
        // insertJobInformation={insertJobInformation}
        JobInformationEditModal={JobInformationEditModal}
        setJobInformationEditModal={setJobInformationEditModal}
        job={job}
      ></Jobinformationedit>
      <Form>
        <FormGroup>
          {/* JobInformation Details */}
          <JobKeyDetails
            handleInputsJobInformation={handleInputsJobInformation}
            job={job}
            insertJobInformation={insertJobInformation}
            id={id}
          ></JobKeyDetails>

          <ComponentCard title="More Details">
            <Tab toggle={toggle} tabs={tabs} />
            <TabContent className="p-4" activeTab={activeTab}>
              <TabPane tabId="1">
                <JobWorkingHours
                  handleInputsJobInformation={handleInputsJobInformation}
                  job={job}
                ></JobWorkingHours>
              </TabPane>
              <TabPane tabId="2">
                <JobLeaveandMedical
                  handleInputsJobInformation={handleInputsJobInformation}
                  job={job}
                ></JobLeaveandMedical>
              </TabPane>
              <TabPane tabId="3">
                <JobProbation
                  handleInputsJobInformation={handleInputsJobInformation}
                  job={job}
                ></JobProbation>
              </TabPane>
              <TabPane tabId="4">
                {/* <JobInformationSalary
                  handleInputsJobInformation={handleInputsJobInformation}
                  handleRadioGst={handleRadioGst}
                  job={job}
                  overTimeRate={overTimeRate}
                ></JobInformationSalary> */}
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <Label>Salary Period</Label>
                      <Input
                        type="select"
                        value={job && job.payment_type}
                        name="payment_type"
                        onChange={handleInputsJobInformation}
                      >
                        <option defaultValue="selected">Please Select</option>
                        <option value="monthly">Monthly</option>
                        <option value="fortnightly">Fort Nightly</option>
                        <option value="weekly">Weekly</option>
                        <option value="daily">Daily</option>
                        <option value="hourly">Hourly</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Date(s) of Salary Payment</Label>
                      <Input
                        type="text"
                        onChange={handleInputsJobInformation}
                        value={job && job.salary_payment_dates}
                        name="salary_payment_dates"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Date(s) of Overtime Payment (if different)</Label>
                      <Input
                        type="text"
                        onChange={handleInputsJobInformation}
                        value={job && job.overtime_payment_dates}
                        name="overtime_payment_dates"
                      />
                    </FormGroup>
                  </Col>

                  <Col md="4">
                    <FormGroup>
                      <Label>
                        {' '}
                        Working Calendar(No of Days/Week)(KET)<span className="required">
                          {' '}
                          *
                        </span>{' '}
                      </Label>
                      <Input
                        type="select"
                        value={job && job.working_days}
                        name="working_days"
                        onChange={handleInputsJobInformation}
                      >
                        <option defaultValue="selected">Please Select</option>
                        <option value="5">5</option>
                        <option value="5.5">5.5</option>
                        <option value="6">6</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>
                        {' '}
                        Basic Pay <span className="required"> *</span>{' '}
                      </Label>
                      <Input
                        type="numbers"
                        onChange={(e) => {
                          handleInputsJobInformation(e);
                          handleRadioGst(job.over_time_rate, e.target.value, job.overtime);
                        }}
                        value={job && job.basic_pay}
                        name="basic_pay"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label> Overtime Applicable</Label>
                      <br></br>
                      <Label> Yes </Label>
                      <Input
                        name="overtime"
                        type="radio"
                        value="1"
                        checked={overtimeApplicable}
                        onChange={(e) => {
                          setOvertimeApplicable(!overtimeApplicable); // Toggle the state
                          handleInputsJobInformation(e);
                          handleRadioGst(job.over_time_rate, e.target.value, job.basic_pay);
                        }}
                      />{' '}
                      &nbsp; &nbsp;
                      <Label> No </Label>
                      <input
                        name="overtime"
                        type="radio"
                        value="0"
                        checked={!overtimeApplicable}
                        onChange={(e) => {
                          setOvertimeApplicable(!overtimeApplicable); // Toggle the state
                          handleInputsJobInformation(e);
                          handleRadioGst(job.over_time_rate, e.target.value, job.basic_pay);
                        }}
                      />{' '}
                    </FormGroup>
                  </Col>
                  {overtimeApplicable && (
                    <Col md="4">
                      <FormGroup>
                        <Label>
                          Overtime Rate<span className="required"> *</span>
                        </Label>
                        <Input
                          type="select"
                          onChange={(e) => {
                            handleInputsJobInformation(e);
                            handleRadioGst(job.overtime, e.target.value, job.basic_pay);
                          }}
                          value={job && job.over_time_rate}
                          name="over_time_rate"
                        >
                          <option defaultValue="selected">Please Select</option>
                          <option value="1.5">1.5</option>
                          <option value="2.0">2.0</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  )}

                  <Col md="4">
                    <FormGroup>
                      <Label>Overtime Pay Rate/ Hour</Label>
                      <br></br>
                      <span>{overTimeRate}</span>
                    </FormGroup>
                  </Col>

                  <Col md="4">
                    <FormGroup>
                      <Label>Transport</Label>
                      <Input
                        type="numbers"
                        onChange={handleInputsJobInformation}
                        value={job && job.allowance1}
                        name="allowance1"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Entertainment</Label>
                      <Input
                        type="numbers"
                        onChange={handleInputsJobInformation}
                        value={job && job.allowance2}
                        name="allowance2"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Food</Label>
                      <Input
                        type="numbers"
                        onChange={handleInputsJobInformation}
                        value={job && job.allowance3}
                        name="allowance3"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Shift Allowance</Label>
                      <Input
                        type="numbers"
                        onChange={handleInputsJobInformation}
                        value={job && job.allowance4}
                        name="allowance4"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Others</Label>
                      <Input
                        type="numbers"
                        onChange={handleInputsJobInformation}
                        value={job && job.allowance5}
                        name="allowance5"
                      />
                    </FormGroup>
                  </Col>

                  <Col md="4">
                    <FormGroup>
                      <Label>Housing</Label>
                      <Input
                        type="numbers"
                        onChange={handleInputsJobInformation}
                        value={job && job.deduction1}
                        name="deduction1"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Transportation</Label>
                      <Input
                        type="numbers"
                        onChange={handleInputsJobInformation}
                        value={job && job.deduction2}
                        name="deduction2"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Others</Label>
                      <Input
                        type="numbers"
                        onChange={handleInputsJobInformation}
                        value={job && job.deduction3}
                        name="deduction3"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Food</Label>
                      <Input
                        type="numbers"
                        onChange={handleInputsJobInformation}
                        value={job && job.deduction4}
                        name="deduction4"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Levy</Label>
                      <Input
                        type="numbers"
                        onChange={handleInputsJobInformation}
                        value={job && job.levy_amount}
                        name="levy_amount"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="5">
                <JobSalary
                  handleInputsJobInformation={handleInputsJobInformation}
                  job={job}
                ></JobSalary>
              </TabPane>
              <TabPane tabId="6">
                <JobBank
                  handleInputsJobInformation={handleInputsJobInformation}
                  job={job}
                  allBank={allBank}
                ></JobBank>
              </TabPane>
              <TabPane tabId="7">
                <JobTermination
                  handleInputsJobInformation={handleInputsJobInformation}
                  job={job}
                ></JobTermination>
              </TabPane>
              <TabPane tabId="8">
                <Form>
                  <FormGroup>
                    <ComponentCard title="Attachments">
                      <Row>
                        <Col xs="12" md="3" className="mb-3">
                          <Button
                            className="shadow-none"
                            color="primary"
                            onClick={() => {
                              setRoomName('Booking');
                              setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'PDF']);
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
                        altTagData="BookingRelated Data"
                        desc="BookingRelated Data"
                        recordType="RelatedPicture"
                        mediaType={attachmentData.modelType}
                        update={update}
                        setUpdate={setUpdate}
                      />
                      <ViewFileComponentV2
                        moduleId={id}
                        roomName="Booking"
                        recordType="RelatedPicture"
                        update={update}
                        setUpdate={setUpdate}
                      />
                    </ComponentCard>
                  </FormGroup>
                </Form>
              </TabPane>
              <TabPane tabId="9">
                {/* ADD NOTE */}
                <ComponentCard title="Add a note">
                  <AddNote recordId={id} roomName="JobInfoEdit" />
                  <ViewNote recordId={id} roomName="JobInfoEdit" />
                </ComponentCard>
              </TabPane>
            </TabContent>
          </ComponentCard>
        </FormGroup>
      </Form>
    </>
  );
};
export default JobInformationEdit;
