import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import {Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import 'react-data-table-component-extensions/dist/index.css';
import { Link } from 'react-router-dom';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

function Timesheet() {
  const [timeSheet, setTimeSheet] = useState(null);
  const getTimeSheet = () => {
    api.get('/projecttask/getTimesheet').then((res) => {
      setTimeSheet(res.data.data);
      console.log(res.data.data);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      $('#example').DataTable({
        pagingType: 'full_numbers',
        pageLength: 20,
        processing: true,
        dom: 'Bfrtip',
        buttons: [
          {
            extend: 'print',
            text: 'Print',
            className: 'shadow-none btn btn-primary',
          },
        ],
      });
    }, 1000);

    getTimeSheet();
  }, []);

  const columns = [
    {
      name: '#',
      selector: 'attendance_id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
   
    {
      name: 'Employee Name',
      selector: 'first_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Date',
      selector: 'entry_date',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Time In',
      selector: 'time_in',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Time Out',
      selector: 'time_out',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
      
    {
      name: 'Normal Hours',
      selector: 'normal_hours',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'OT Hours',
      selector: 'employee_ot_hours',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Ph Hours',
      selector: 'employee_ph_hours',
      sortable: true,
      grow: 0,
    },
    
    {
      name: 'On Leave',
      selector: 'on_leave',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />

        <CommonTable
          title="Timesheet List"
          Button={
            <Link to="/TimesheetDetails">
              <Button color="primary" className="shadow-none">
                Add New
              </Button>
            </Link>
          }
        >
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {timeSheet &&
              timeSheet.map((element,index) => {
                return (
                  <tr key={element.staff_id}>
                  <td>{index + 1}</td>
                    <td>
                      <Link to={`/TimesheetEdit/${element.staff_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.first_name}</td>
                    <td>{element.entry_date}</td>
                    <td>{element.time_in}</td>
                    <td>{element.time_out}</td>
                    <td>{element.normal_hours}</td>
                    <td>{element.employee_ot_hours}</td>
                    <td>{element.employee_ph_hours}</td>
                    <td>{element.on_leave}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
}

export default Timesheet;
