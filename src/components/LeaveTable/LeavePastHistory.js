import React from 'react';
import { Row, Form, Table } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function LeavePastHistory({ PastleavesDetails }) {
    LeavePastHistory.propTypes = {
    PastleavesDetails: PropTypes.object,
  };
// Past leave History table
const columns = [
    {
      name: 'From date',
      
    },

    {
      name: 'To date',
      
    },
    {
      name: 'Leave Type',
     
    },
    {
      name: ' No Of Days',
      
    },
  ];

  return (
    <Form>
      <Row>
              <Table id="example1" className="display border border-secondary rounded">
                <thead>
                  <tr>
                    {columns.map((cell) => {
                      return <td key={cell.name}>{cell.name}</td>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {PastleavesDetails &&
                    PastleavesDetails.map((element) => {
                      return (
                        <tr key={element.employee_id}>
                          <td>{moment(element.from_date).format('YYYY-MM-DD')}</td>
                          <td>{moment(element.to_date).format('YYYY-MM-DD')}</td>
                          <td>{element.leave_type}</td>
                          <td>{element.no_of_days}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Row>
    </Form>
  );
}
