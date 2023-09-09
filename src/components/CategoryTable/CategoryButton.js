import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import ComponentCardV2 from '../ComponentCardV2';
// import DeleteButton from '../DeleteButton';


export default function CategoryButton({
  editCategoryData,
  // navigate,
  applyChanges,
  saveChanges,
  // id,
  backToList,
}) {
  CategoryButton.propTypes = {
    editCategoryData: PropTypes.any,
    // navigate: PropTypes.func,
    applyChanges: PropTypes.func,
    saveChanges: PropTypes.func,
    // id: PropTypes.string,
    backToList: PropTypes.func,
  };
  return (
    <Form>
      <FormGroup>
        <ComponentCardV2>
          <Row>
            <Col>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  editCategoryData();
                  saveChanges();
                }}
              >
                Save
              </Button>
            </Col>
            <Col>
              <Button
                color="primary"
                className="shadow-none"
                onClick={() => {
                  editCategoryData();
                  applyChanges();
                  console.log('cancel process');
                }}
              >
                Apply
              </Button>
            </Col>
           
            <Col>
              <Button
                color="dark"
                className="shadow-none"
                onClick={() => {
                  backToList();
                  console.log('back to list');
                }}
              >
                Back to List
              </Button>
            </Col>
          </Row>
        </ComponentCardV2>
      </FormGroup>
    </Form>
  );
}
