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
import { ToastContainer } from 'react-toastify';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import Flag from '../../components/Flag';
import message from '../../components/Message';

const Lead = () => {
  //Const Variables
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(false)


  // get Clients
  const getLead = () => {
    api.get('/lead/getLead').then((res) => {
      setLead(res.data.data);
      $('#example').DataTable({
        pagingType: 'full_numbers',
        pageLength: 20,
        processing: true,
        dom: 'Bfrtip',
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

    
  // update publish
  const updateFlag = (obj) => {
    obj.flag = !obj.flag;
    api
      .post('/lead/update-flag', obj)
      .then(() => {
        getLead();
        message('Flag updated successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  useEffect(() => {
  
    getLead();
  }, []);
  //  stucture of client list view
  const columns = [
    {
      name: 'id',
      selector: 'lead_id',
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
      name: 'Flag',
      selector: 'flag',
      cell: () => <Icon.Flag />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: 'Title',
      selector: 'lead_title',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Date',
      selector: 'due_date',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Company Name',
      selector: 'company_name',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Employee Name',
      selector: 'employee_name',
      sortable: true,
      grow: 0,
    },
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
        {/* ClientDetailsn Add Button */}
        <ToastContainer></ToastContainer>
        <CommonTable
        loading={loading}
          title="Lead List"
          Button={
            <Link to="/LeadDetails">
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
            {lead &&
              lead.map((element, i) => {
                return (
                  <tr key={element.lead_id}>
                    <td>{i + 1}</td>
                    <td>
                      <Link to={`/LeadEdit/${element.lead_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>
                      <span
                        onClick={() => {
                          updateFlag(element);
                        }}
                      >
                        <Flag value={element.flag ? 1 : 0} />
                      </span>
                    </td>
                    <td>{element.lead_title}</td>
                    <td>{element.due_date? moment(element.due_date).format('YYYY-MM-DD'):''}</td>
                    <td>{element.company_name}</td>
                    <td>{element.employee_name}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>

      </div>
    </div>
  );
};

export default Lead;
