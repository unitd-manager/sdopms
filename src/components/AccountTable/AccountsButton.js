import React from 'react'
import { Row, Col, Form, FormGroup,Button } from 'reactstrap';
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import ComponentCardV2 from '../ComponentCardV2';
// import DeleteButton from '../DeleteButton';


export default function AccountsButton({editAccountsData,backToList}) {
    AccountsButton.propTypes = {
        editAccountsData: PropTypes.any,
        backToList: PropTypes.func
      }
      const navigate = useNavigate();

  return (
    <Form>
    <FormGroup>
      <ComponentCardV2>
        <Row>
          <Col>
            <Button className='shadow-none'
              color="primary"
              onClick={() => {
                editAccountsData();
                navigate('/Accounts');
              }}
            >
              Save
            </Button>
          </Col>
          <Col>
            <Button className='shadow-none'
              color="primary"
              onClick={() => {
                editAccountsData();
                // applyChanges();
                console.log('cancel process');
              }}
            >
              Apply
            </Button>
          </Col>
          <Col>
            <Button className='shadow-none'
              color="dark"
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
  )
}