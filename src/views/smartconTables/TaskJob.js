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
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const TaskJob = () => {
  //All state variable
  const [taskJob, setTaskJob] = useState(null);
  const [loading, setLoading] = useState(false)


  //getting data from jobinformation
  const getTask = () => {
    setLoading(true)
    api
      .get('/projectteam/getProjectTeam')
      .then((res) => {
        setTaskJob(res.data.data);
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
    getTask();
  }, []);
  //structure of jobinformation list view
  const columns = [
    {
      name: 'ID',
     
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      
    },
    {
      name: 'Name',
     
    },
    {
      name: 'Designation',
      
    },
    {
      name: 'Department',
      
    },
   
    {
      name: 'id',
      
    },
  ];

  return (
    
    <div className="MainDiv">
    <div className=" pt-xs-25">
      <BreadCrumbs/>
        <CommonTable
                loading={loading}
          title="Team List"
          Button={
            <Link to="/TaskJobDetails">
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
            {taskJob &&
              taskJob.map(
                (element, index) => {
                  return (
                    <tr key={element.project_team_id}>
                      <td>{index + 1}</td>
                      <td>
                        <Link to={`/TaskJobEdit/${element.project_team_id}`}>
                          <Icon.Edit2 />
                        </Link>
                      </td>
                      <td>{element.first_name}</td>
                      <td>{element.designation}</td>
                      <td>{element.department}</td>
                      <td>{element.project_team_id}</td>
                    </tr>
                  );
                })}
          </tbody>
</CommonTable>      
</div>
</div>
  );
};

export default TaskJob;
