import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import moment from 'moment';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';


const MilestoneList = () => {
  //All state variable
  const [milestone, setMilestone] = useState(null);
  const [loading, setLoading] = useState(false)

  //getting data from supplier
  const getMilestone = () => {
    setLoading(true)
    api.get('/milestone/getMilestone').then((res) => {
      setMilestone(res.data.data);
        $('#example').DataTable({
          pagingType: 'full_numbers',
          pageLength: 20,
          processing: true,
          dom: 'Bfrtip',
          searching: true,
          buttons: [ {
            extend: 'print',
            text: "Print",
            className:"shadow-none btn btn-primary",
        }],
        });
        setLoading(false)
      }).catch(()=>{
        setLoading(false)
      });
    };

  useEffect(() => {

    getMilestone();
  }, []);
  //structure of supplier list view
  const columns = [
    {
      name: '#',
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
      selector: 'milestone_title',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Description',
      selector: 'description',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'From Date',
      selector: 'from_date',
      sortable: true,
      grow: 0,
    },
    {
      name: 'To Date',
      selector: 'to_date',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Act Date',
      selector: 'actual_completed_date',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      grow: 0,
    },
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs/>

        <CommonTable
                loading={loading}
          title="Milestone List"
          Button={
            <Link to="/MilestoneDetails">
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
            {milestone &&
              milestone.map((element, index) => {
                  return (
                    <tr key={element.project_milestone_id}>
                      <td>{index + 1}</td>
                      <td>
                      <Link to={`/MilestoneEdit/${element.project_milestone_id}`}>
                        <Icon.Edit2 />
                      </Link>
                      </td>
                      <td>{element.milestone_title}</td>
                      <td>{element.description}</td>
                      <td>{element.from_date ? moment(element.from_date).format('DD-MM-YYYY') : ''}</td>
                      <td>{element.to_date ? moment(element.to_date).format('DD-MM-YYYY') : ''}</td>
                      <td>{element.actual_completed_date ? moment(element.actual_completed_date).format('DD-MM-YYYY') : ''}</td>
                      <td>{element.status}</td>
                    </tr>
                );
              })}
          </tbody>
          </CommonTable>
      </div>
    </div>
  );
};

export default MilestoneList;
