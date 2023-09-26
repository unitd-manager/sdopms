import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import { Link } from 'react-router-dom';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const Opportunity = () => {
  const [tenders, setTenders] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTenders = () => {
    api
      .get('/tender/getTenders')
      .then((res) => {
        setTenders(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getTenders();
  }, []);

  const columns = [
    {
      name: '#',
      selector: '',
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
      name: 'Enquiry date',
      selector: 'enquiry_date',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Enquiry No',
      selector: 'opportunity_code',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Customer',
      selector: 'company_name',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Reference',
      selector: 'office_ref_no',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'BID Expiry',
      selector: 'project_end_date',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
    {
      name: 'Service',
      selector: 'services',
      sortable: true,
      width: 'auto',
    },
    {
      name: 'Enquiry Status',
      selector: 'status',
      sortable: true,
      width: 'auto',
    },
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
        <CommonTable
          loading={loading}
          title="Enquiry List"
          Button={
            <Link to="/EnquiryDetails">
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
            {tenders &&
              tenders.map((element, index) => {
                return (
                  <tr key={element.opportunity_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/EnquiryEdit/${element.opportunity_id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.enquiry_date}</td>
                    <td>{element.opportunity_code}</td>
                    <td>{element.company_name}</td>
                    <td>{element.office_ref_no}</td>
                    <td>{element.project_end_date }</td>
                    <td>{element.services}</td>
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

export default Opportunity;
