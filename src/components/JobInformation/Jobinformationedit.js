import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormGroup } from 'reactstrap';
import ComponentCardV2 from '../ComponentCardV2';
import JobInformation from '../SupplierModal/JobInformationEditModal';
// import PdfKET from '../PDF/PdfKET';
import ApiButton from '../ApiButton';
// import PdfEmployeeContract from '../PDF/PdfEmployeeContract';

export default function Jobinformationedit({
  editJobData,
  //id,
  // applyChanges,
  navigate,
  //insertJobInformation,
  JobInformationEditModal,
  setJobInformationEditModal,
  // job,
}) {
  Jobinformationedit.propTypes = {
    // applyChanges: PropTypes.func,
    editJobData: PropTypes.any,
    //id: PropTypes.any,
    //insertJobInformation: PropTypes.any,
    JobInformationEditModal: PropTypes.any,
    setJobInformationEditModal: PropTypes.any,
    navigate: PropTypes.any,
    //job: PropTypes.any,
  };
  const backToList = () => {
    navigate('/JobInformation');
  };
  return (
    <Form>
      <FormGroup>
        <ComponentCardV2>
          <Row>
            {/* <Col>
              <PdfKET lang="arabic" />
            </Col>
            <Col>
              <PdfEmployeeContract job={job}></PdfEmployeeContract>
            </Col> */}
            {/* <Col>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  editJobData();
                  setTimeout(()=>{
                    navigate('/JobInformation');
                  },1000);
                 
                }}
              >
                {' '}
                Save{' '}
              </Button>
            </Col>
            <Col>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  editJobData();
                  applyChanges();
                }}
              >
                {' '}
                Apply{' '}
              </Button>
            </Col>
            <Col>
              <Button
                className="shadow-none"
                color="dark"
                onClick={() => {
                  navigate('/JobInformation');
                }}
              >
                Back to List
              </Button>
            </Col> */}
            <ApiButton
              editData={editJobData}
              navigate={navigate}
              applyChanges={editJobData}
              backToList={backToList}
              // deleteData={deleteLoanData}
              module="Job Information"
            ></ApiButton>
            <Col>
              {/* <Button className="shadow-none" onClick={() => insertJobInformation(id)} color="dark">
                Duplicate
              </Button> */}
              <JobInformation
                JobInformationEditModal={JobInformationEditModal}
                setJobInformationEditModal={setJobInformationEditModal}
              ></JobInformation>
            </Col>
          </Row>
        </ComponentCardV2>
      </FormGroup>
    </Form>
  );
}
