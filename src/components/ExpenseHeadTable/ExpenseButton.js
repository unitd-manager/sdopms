import React from 'react'
import { Row, Col, Form, FormGroup,Button } from 'reactstrap';
import PropTypes from 'prop-types'
import ComponentCardV2 from '../ComponentCardV2';

export default function ExpenseButton({editExpenseData,navigate,applyChanges,backToList}) {
    ExpenseButton.propTypes = {
        editExpenseData: PropTypes.func,
        navigate: PropTypes.any,
        applyChanges: PropTypes.func,
        backToList: PropTypes.func
      }
  return (
    <Form>
        <FormGroup>
          <ComponentCardV2>
            <Row>
              <Col>
                <Button className='shadow-none'
                  color="primary"
                  onClick={() => {
                    editExpenseData();
                    navigate('/ExpenseHead');
                  }}>Save
                </Button>
              </Col>
              <Col>
                <Button className='shadow-none'
                  color="primary"
                  onClick={() => {
                    editExpenseData();
                    applyChanges();
                    console.log('cancel process');
                  }}> Apply
                </Button>
              </Col>
              <Col>
                <Button className='shadow-none'
                  color="dark"
                  onClick={() => {
                    backToList();
                    console.log('back to list');
                  }}>Back to List
                </Button>
              </Col>
            </Row>
          </ComponentCardV2>
        </FormGroup>
      </Form>
  )
}