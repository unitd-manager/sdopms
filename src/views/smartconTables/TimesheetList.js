import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import moment from 'moment';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const ProjectTimeSheet = () => {
  //All state variable
  const [timeSheet, setTimesheet] = useState(null);
  const [loading, setLoading] = useState(false);

  //getting data from timeSheet
  const getTimesheet = () => {
    setLoading(true);
    api
      .get('/projecttimesheet/getProjectTimesheet')
      .then((res) => {
        setTimesheet(res.data.data);
        $('#example').DataTable({
          pagingType: 'full_numbers',
          pageLength: 20,
          processing: true,
          dom: 'Bfrtip',
          searching: true,
          buttons: [
            {
              extend: 'print',
              text: 'Print',
              className: 'shadow-none btn btn-primary',
            },
          ],
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getTimesheet();
  }, []);
  //structure of projectTask list view
  const columns = [
    {
      name: '#',
      selector: 'project_timesheet_id',
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
      name: 'Title',
      selector: 'task_title',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Date',
      selector: 'date',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Name',
      selector: 'first_name',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Hours',
      selector: 'hours',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Description',
      selector: 'description',
      sortable: true,
      grow: 0,
      wrap: true,
    },
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />

        <CommonTable
          loading={loading}
          title="TimeSheet List"
          Button={
            <Link to="/ProjectTimesheetDetails">
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
              timeSheet.map((element, index) => {
                return (
                  <tr key={element.project_timesheet_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/ProjectTimesheetEdit/${element.project_timesheet_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.task_title}</td>
                    <td>{element.date ? moment(element.date).format('DD-MM-YYYY') : ''}</td>
                    <td>{element.first_name}</td>
                    <td>{element.hours}</td>
                    <td>{element.status}</td>
                    <td>{element.description}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default ProjectTimeSheet;
