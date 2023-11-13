import React from 'react';
import { Row, Col, Form} from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';
import Erection from './Erection';
import Dismantle from './Dismantle';

function ErectionDismantle({
  worksheet,
  handleInputs,
  handleDismantle,
  handleErection,
  newTotalMonthPay,
  totalDeductions,
  finalGrossPay,
 
  
}) {
    ErectionDismantle.propTypes = {
    worksheet: PropTypes.object,
    handleDismantle: PropTypes.func,
    handleErection: PropTypes.func,
    handleInputs: PropTypes.func,
    finalGrossPay: PropTypes.number,
    totalDeductions: PropTypes.any,
    newTotalMonthPay:PropTypes.any,
  };
  return (
    <div>
      <Form>
        <Row>
          <Col md="6">
            <ComponentCard title="Unit Rate of Erection">
              <Erection
              worksheet={worksheet}
              handleInputs={handleInputs}
              handleDismantle={handleDismantle}
              handleErection={handleErection}
              newTotalMonthPay={newTotalMonthPay}
              totalDeductions={totalDeductions}
              finalGrossPay={finalGrossPay}
              
              />
            </ComponentCard>
          </Col>
          <Col md="6">
            <ComponentCard title="Unit Rate of Dismantle">
              <Dismantle
               worksheet={worksheet}
               handleInputs={handleInputs}
               handleDismantle={handleDismantle}
               handleErection={handleErection}
               newTotalMonthPay={newTotalMonthPay}
               totalDeductions={totalDeductions}
               //otAmount={otAmount}
              />
            </ComponentCard>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default ErectionDismantle;
