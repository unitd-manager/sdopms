import React from 'react'
import {Form, Table} from 'reactstrap';
import { Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import * as Icon from 'react-feather';


export default function ExpenseHeadSubHead({SubexpenseDetails,setExpenseData,SetExpenseSuphead,deleteRecord}) {
    ExpenseHeadSubHead.propTypes = {
        SubexpenseDetails: PropTypes.any,
        setExpenseData: PropTypes.any,
        SetExpenseSuphead: PropTypes.func,
        deleteRecord: PropTypes.func
      }
       // Structure of subHead List view
  const columns = [
    {
      name: 'Title',
      id:1
    },

    {
      name: 'Edit',
     id:2
    },
    {
      name: 'Del',
      id:3
    },
  ];
  return (
    // ExpenseHeadSubHead Table
    <Form>
        <Table id="example" className="display">
            <thead>
              <tr>
                {columns.map((cell) => {
                  return <td key={cell.id}>{cell.name}</td>
                })}
              </tr>
            </thead>
            <tbody>
              {SubexpenseDetails &&
                SubexpenseDetails.map((element) => {
                  return (
                    <tr key={element.expense_Sub_group_id}>
                      <td>{element.title}</td>
                      <td>
                        <Link to="">
                          <span
                            onClick={() => {
                              setExpenseData(element);
                              SetExpenseSuphead(true);
                            }}
                          >
                            <Icon.Edit2 />
                          </span>
                        </Link>
                      </td>
                      <td>
                        <Link to="">
                          <span onClick={() => deleteRecord(element.expense_sub_group_id)}>
                            <Icon.Trash2 />
                          </span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
      </Form>
  )
}   