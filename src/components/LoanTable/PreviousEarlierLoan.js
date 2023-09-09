import React from 'react';
import { Form, FormGroup, Table } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import ComponentCard from '../ComponentCard';

export default function PreviousEarlierLoan({ loan }) {
  PreviousEarlierLoan.propTypes = {
    loan: PropTypes.any,
  };
  const columns = [
    {
      name: '#',
    },
    {
      name: 'Type of Loan',
    },
    {
      name: 'Status',
    },
    {
      name: 'Date',
    },
    {
      name: 'Loan Start Date',
    },
    {
      name: 'Total Loan Amount',
    },
    {
      name: 'AmountPayable(permonth)',
    },
    {
      name: 'Loan Closing Date',
    },
  ];
  return (
    <Form>
      <FormGroup>
        <ComponentCard title="PreviousLoan/EarlierLoan">
          <div className="MainDiv">
            <div className="container">
              <Table id="example" className="display border border-secondary rounded">
                <thead>
                  <tr>
                    {columns.map((cell) => {
                      return <td key={cell.name}>{cell.name}</td>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {loan &&
                    loan.map((element, index) => {
                      return (
                        <tr key={element.loan_id}>
                          <td>{index + 1}</td>
                          <td>{element.type}</td>
                          <td>{element.status}</td>
                          <td>{element.date ? moment(element.date).format('YYYY-MM-DD') : ''}</td>
                          <td>
                            {element.loan_start_date
                              ? moment(element.loan_start_date).format('YYYY-MM-DD')
                              : ''}
                          </td>
                          <td>{element.amount}</td>
                          <td>{element.month_amount}</td>
                          <td>{element.loan_closing_date
                              ? moment(element.loan_closing_date).format('YYYY-MM-DD')
                              : ''}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          </div>
        </ComponentCard>
      </FormGroup>
    </Form>
  );
}
