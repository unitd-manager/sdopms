/* eslint-disable */
import React from 'react';
import { Button, Col, Row,Form, FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import { HasAccess ,usePermify} from '@permify/react-role';
import ComponentCardV2 from './ComponentCardV2';

const ApiButton = ({ editData,deleteData, navigate,  backToList, module }) => {
  ApiButton.propTypes = {
    editData: PropTypes.func,
    deleteData: PropTypes.func,
    navigate: PropTypes.any,
    //applyChanges: PropTypes.func,
    backToList: PropTypes.func,
    module: PropTypes.string,
  };
  const { isAuthorized, isLoading } = usePermify();

  
  const fetchData = async (type) => {
    // Pass roles and permissions accordingly
    // You can send empty array or null for first param to check permissions only
    if (await isAuthorized(null, `${module}-${type}`)) {
       return true
    }else{
      return false
    }
};

  return (
    <Form>
      {/* <Card tag="h4" className="border-bottom px-4 py-3 mb-0">
        <div className="d-flex flex-row-reverse"> */}
        {/* <FormGroup>
          <ComponentCardV2> */}
          <Row>
            <Col >
              {' '}
              <HasAccess
                roles={null}
                permissions={`${module}-edit`}
                renderAuthFailed={<p></p>}
              >
                <Button
                  onClick={() => {
                    editData()
                      setTimeout(()=>{
                        backToList();
                      },1000)
                    
                  }}
                  color="primary"
                >
                  {' '}
                  Save
                </Button>
              </HasAccess>
            </Col>
            <Col >
              {' '}
              <HasAccess
                roles={null}
                permissions={`${module}-edit`}
                renderAuthFailed={<p></p>}
              >
                <Button
                  onClick={() => {
                    editData();
                    //applyChanges();
                  }}
                  color="primary"
                >
                  Apply
                </Button>
              </HasAccess>
            </Col>
            <Col >
              {' '}
              <Button
                onClick={() => {
                  backToList();
                }}
                color="dark"
              >
                Back To List
              </Button>
            </Col>
            <Col >
              {' '}
              <HasAccess
                roles={null}
                permissions={`${module}-remove`}
                renderAuthFailed={<p></p>}
              >
                <Button color="danger" onClick={() => {deleteData();
                 setTimeout(()=>{
                  backToList();
                },1000)
                }}>
                  Delete
                </Button>
              </HasAccess>
            </Col>
          </Row>
        
      {/* </ComponentCardV2>
      </FormGroup> */}
      </Form>
    
  );
};

export default ApiButton;