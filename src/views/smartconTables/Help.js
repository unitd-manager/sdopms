import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import message from '../../components/Message';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const Help = () => {
  //Const Variables
  const [content, setContent] = useState(null);
  //getting data from content
  const getContent = () => {
    api
      .get('/content/getHelpContent')
      .then((res) => {
        setContent(res.data.data);
      })
      .catch(() => {
        message('Cannot get Content Data', 'error');
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

    getContent();
  }, []);
  //Structure of Content List view
  const Contentcolumns = [
    {
      name: '#',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => (
        <Link to="/">
          {' '}
          <Icon.Edit3 />
        </Link>
      ),
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },

    {
      name: 'Title',
      selector: 'title',
      sortable: true,
      grow: 0,
      wrap: true,
    },
  
  ];

  return (
    <div className="MainDiv  pt-xs-25">
      <BreadCrumbs />

      <CommonTable
        title="Help List"
      
      >
        <thead>
          <tr>
            {Contentcolumns.map((cell) => {
              return <td key={cell.name}>{cell.name}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {content &&
            content.map((element, index) => {
              return (
                <tr key={element.content_id}>
                  <td>{index + 1}</td>
                  <td>
                    {' '}
                    <Link to={`/HelpEdit/${element.content_id}`}>
                      <Icon.Edit2 />
                    </Link>
                  </td>
                  <td>{element.title}</td>
                 
                </tr>
              );
            })}
        </tbody>
      </CommonTable>
    </div>
  );
};
export default Help;