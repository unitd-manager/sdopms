import React, { useState, useEffect } from 'react';
import { Row, Col, Input } from 'reactstrap';
import PropTypes from 'prop-types';

function Dismantle({
  worksheet,
  handleInputs,
  handleDismantle,

}) {
  // Initialize totalDeductions with the default value

  Dismantle.propTypes = {
    worksheet: PropTypes.object,
    handleDismantle: PropTypes.func,
    handleInputs: PropTypes.func,
   
  };

  // Function to calculate the total deduction based on default values
  const [totalDeductionsAmount, setTotalDeductionsAmount] = useState(0);

  // Use useEffect to update totalDeductions whenever relevant fields change
  useEffect(() => {
    const DismantlePipe = parseFloat(worksheet.dismantle_pipe || 0);
    const DismantleVolume = parseFloat(worksheet.dismantle_volume || 0);
    const DismantlePlanks = parseFloat(worksheet.dismantle_planks || 0);
    const DismantleTB = parseFloat(worksheet.dismantle_t_b || 0);
    const DismantleOthers = parseFloat(worksheet.dismantle_others || 0);

    const newGrossPay =
      DismantlePipe + DismantleVolume + DismantlePlanks + DismantleTB + DismantleOthers;

    setTotalDeductionsAmount(newGrossPay);
  }, [
    worksheet.dismantle_pipe,
    worksheet.dismantle_volume,
    worksheet.dismantle_planks,
    worksheet.dismantle_t_b,
    worksheet.dismantle_others,
  ]);


  return (
    <div>
      <Row>
        <Col md="9">Pipe</Col>
        <Col md="3">
          <Input
            
            name="dismantle_pipe"
            type="text"
            value={worksheet && worksheet.dismantle_pipe}
            onChange={(e) => {
              handleInputs(e);
              handleDismantle(
                e.target.value,
                worksheet.dismantle_t_b,
                worksheet.dismantle_planks,
                worksheet.dismantle_others,
                worksheet.dismantle_volume,
               
              );
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md="9"> T/B</Col>
        <Col md="3">
          <Input
            name="dismantle_t_b"
            type="text"
            value={worksheet && worksheet.dismantle_t_b}
            onChange={(e) => {
              handleInputs(e);
              handleDismantle(
                e.target.value,
                worksheet.dismantle_pipe,
                worksheet.dismantle_planks,
                worksheet.dismantle_others,
                worksheet.dismantle_volume,
              );
            }}
          />
        </Col>
      </Row>

      <Row>
        <Col md="9">Planks</Col>
        <Col md="3">
          <Input
            name="dismantle_planks"
            type="text"
            value={worksheet && worksheet.dismantle_planks}
            onChange={(e) => {
              handleInputs(e);
              handleDismantle(
                e.target.value,
                worksheet.dismantle_pipe,
                worksheet.dismantle_t_b,
                worksheet.dismantle_others,
                worksheet.dismantle_volume,
              );
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md="9">Others</Col>
        <Col md="3">
          <Input
            name="dismantle_others"
            type="text"
            value={worksheet && worksheet.dismantle_others}
            onChange={(e) => {
              handleInputs(e);
              handleDismantle(
                e.target.value,
                worksheet.dismantle_pipe,
                worksheet.dismantle_t_b,
                worksheet.dismantle_planks,
                worksheet.dismantle_volume,
              );
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md="9">Volume</Col>
        <Col md="3">
          <Input
            name="dismantle_volume"
            type="text"
            value={worksheet && worksheet.dismantle_volume}
            onChange={(e) => {
              handleInputs(e);
              handleDismantle(
                e.target.value,
                worksheet.dismantle_pipe,
                worksheet.dismantle_t_b,
                worksheet.dismantle_planks,
                worksheet.dismantle_others,
              );
            }}
          />
        </Col>
      </Row>

      <Row>
        <Col md="9">
          <b>Total Dismantle Amount</b>
        </Col>
        <Col md="3">
          <Input
            disabled
            name="total_dismantle_amount"
            type="text"
            value={totalDeductionsAmount}
            onChange={handleInputs}
          />
        </Col>
      </Row>
      {/* <Row>
        <Col md="9"></Col>
        <Col md="3"></Col>
      </Row> */}
      {/* <Row>
        <Col md="9"></Col>
        <Col md="3">
          <Input name="" type="text" onChange={handleInputs}  disabled/>
         
        </Col>
      </Row>
      <Row>
        <Col md="9"></Col>
        <Col md="3">
          <Input name="" type="text" onChange={handleInputs}
          disabled />
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <Input value={totalDedAmount} disabled />
        </Col>
        <Col md="3"></Col>
      </Row> */}
    </div>
  );
}

export default Dismantle;
