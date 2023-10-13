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
import { Link } from 'react-router-dom';
import message from '../../components/Message';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const Valuelist = () => {
  // All state variables
  const [valuelist, setValuelist] = useState();
  const [selectedItem, setSelectedSortingItem] = useState();
  const [loading, setLoading] = useState(false)


  //Api call for getting Valuelist Data
  const getValuelist = () => {
    api
      .get('/valuelist/getValueList')
      .then((res) => {
        setValuelist(res.data.data);
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

  // API call for Update Sort Order
  const changeSortingOrder = (e) => {
    /* eslint-disable-next-line */
    selectedItem.sort_order = parseInt(e.target.value);
    /* eslint-disable-line */
    api
      .post('/valuelist/updateSortOrder', selectedItem)
      .then(() => {
        getValuelist();
      })
      .catch(() => {
        message('Cannot get Update Data', 'error');
      });
  };

  useEffect(() => {
    // setTimeout(() => {
    //   $('#example').DataTable({
    //     pagingType: 'full_numbers',
    //     pageLength: 20,
    //     processing: true,
    //     dom: 'Bfrtip',
    //     buttons: [
    //       {
    //         extend: 'print',
    //         text: 'Print',
    //         className: 'shadow-none btn btn-primary',
    //       },
    //     ],
    //   });
    // }, 1000);
    getValuelist();
  }, []);

  //Structure of ValueList List view
  const columns = [
    {
      name: '#',
      selector: '',
      
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      
    },
    {
      name: 'Text (English)',
      selector: 'value',
   
    },
    {
      name: 'Value List Name',
      selector: 'key_text',
      
    },
    {
      name: 'Code',
      selector: 'code',
    
    },
    {
      name: 'ID',
      selector: 'valuelist_id',
      sortable: true,
      
    },
    {
      name: 'Order',
      selector: 'sort_order',
     
    },
  ];

  return (
    <div className="MainDiv">
      <div className="pt-xs-25">
        <BreadCrumbs />

        <CommonTable
        loading={loading}
          title="Value List"
          Button={
            <Link to="/ValuelistDetails">
              <Button color="primary" className=" shadow-none">
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
            {valuelist &&
              valuelist.map((element, index) => {
                return (
                  <tr key={element.valuelist_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/ValueListEdit/${element.valuelist_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.value}</td>
                    <td>{element.key_text}</td>
                    <td>{element.code}</td>
                    <td>{element.valuelist_id}</td>
                    <td>
                      <input
                        onFocus={() => {
                          setSelectedSortingItem(element);
                        }}
                        onBlur={(e) => {
                          changeSortingOrder(e);
                        }}
                        type="number"
                        min="0"
                        name="sort_order"
                        defaultValue={element.sort_order ? element.sort_order.toString() : 0}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};
export default Valuelist;
