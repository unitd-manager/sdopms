import React, { useEffect, useState } from 'react';
import {Col,Modal,ModalBody,FormGroup,ModalHeader,Label} from 'reactstrap';
// import * as Icon from 'react-feather';
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
import moment from 'moment';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';


function WorkSheetTask() {
  //const { id } = useParams();
  const [WorkSheet, setWorkSheet] = useState(null);
  const [lineItem, setLineItem] = useState([]);
  // const [selectedItemId, setSelectedItemId] = useState(null); // State to store the selected item ID
  const [viewLineModal, setViewLineModal] = useState(false);
  const getTimeSheet = () => {
    api.get('/projecttask/gettaskhistory').then((res) => {
      setWorkSheet(res.data.data);
      console.log(res.data.data);
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
    //   setLoading(false)
    // }).catch(()=>{
    //   setLoading(false)
    });
  };
  const getLineItem = (taskId) => {
    api.post('/projecttask/getWorksheettaskById', { task_history_id: taskId }).then((res) => {
      setLineItem(res.data.data);
      console.log("1",res.data.data);
    });
  };
  
  //console.log(selectedItemId);
  const viewLineToggle = () => {
    setViewLineModal(!viewLineModal);
  };
  // const viewLineToggle = () => {
  //   setViewLineModal(!viewLineModal);
  // };
  useEffect(() => {
getLineItem();
    getTimeSheet();
  }, []);

  const columns = [
    {
      name: '#',
      selector: 'work_sheet_id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    // {
    //   name: 'Edit',
    //   selector: 'edit',
    //   cell: () => <Icon.Edit2 />,
    //   grow: 0,
    //   width: 'auto',
    //   button: true,
    //   sortable: false,
    // },
    {
      name: 'Project Code',
      selector: 'project_code',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Name',
      selector: 'first_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    
    {
      name: 'Date',
      selector: 'date',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Total Head Count',
      selector: 'head_count',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Total one day Amount',
      selector: 'total_amount',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Total to Share Per Amount',
      selector: 'share_per_head',
      sortable: true,
      grow: 0,
    },
     {
      name: 'Task Type',
      selector: 'task_type',
      sortable: true,
      grow: 0,
    },
   {
      name: 'Pipe ',
      selector: 'pipe',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Plank ',
      selector: 'pipe',
      sortable: true,
      grow: 0,
    },

    {
      name: 'Volume ',
      selector: 'pipe',
      sortable: true,
      grow: 0,
    },

    {
      name: 'TB ',
      selector: 'pipe',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Others ',
      selector: 'pipe',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Pipe Value ',
      selector: 'pipe',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Plank Value ',
      selector: 'pipe',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Volume Value ',
      selector: 'pipe',
      sortable: true,
      grow: 0,
    },
    {
      name: 'TB value ',
      selector: 'pipe',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Others value ',
      selector: 'pipe',
      sortable: true,
      grow: 0,
    },

    // {
    //   name: 'Volume Erection ',
    //   selector: 'volume_erection',
    //   sortable: true,
    //   grow: 0,
    // },
    // {
    //   name: 'Plank Erection ',
    //   selector: 'plank_erection',
    //   sortable: true,
    //   grow: 0,
    // },
    // {
    //   name: 'TB Erection ',
    //   selector: 'tb_erection',
    //   sortable: true,
    //   grow: 0,
    // },
    // {
    //   name: 'Pipe Dismantle ',
    //   selector: 'share_per_head',
    //   sortable: true,
    //   grow: 0,
    // },
    // {
    //   name: 'Plank Dismantle ',
    //   selector: 'share_per_head',
    //   sortable: true,
    //   grow: 0,
    // },
    // {
    //   name: 'Volume Dismantle ',
    //   selector: 'share_per_head',
    //   sortable: true,
    //   grow: 0,
    // },
    // {
    //   name: 'TB Dismantle ',
    //   selector: 'share_per_head',
    //   sortable: true,
    //   grow: 0,
    // },
    // {
    //   name: 'Others Dismantle ',
    //   selector: 'share_per_head',
    //   sortable: true,
    //   grow: 0,
    // },
    // {
    //   name: 'Total Dismantle Amount ',
    //   selector: 'share_per_head',
    //   sortable: true,
    //   grow: 0,
    // },
    // {
    //   name: 'Total Erection Amount ',
    //   selector: 'share_per_head',
    //   sortable: true,
    //   grow: 0,
    // },
    
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />

        <CommonTable
          title="WorkSheet List"
          >
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {WorkSheet &&
              WorkSheet.map((element,index) => {
                return (
                  <tr key={element.task_history_id}>
                  <td>{index + 1}</td>
                  <td>
                    {' '}
                    <Link to={`/ProjectEdit/${element && element.project_id}?tab=5`}>
                      {element.project_code}
                    </Link>
                  </td>
                  <td>{element.first_name}</td>
                    {/* <td>
                      <Link to={`/WorkSheetEdit/${element.task_history_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td> */}
                    <td>
                    <Col md="2">
                      <Label>
                        <u onClick={() => {
                          viewLineToggle(element.task_history_id);
                          getLineItem(element.task_history_id);
                          setViewLineModal(true)}}
                          >
                          {/* {element.date} */}
                          {element.date?moment(element.date).format('DD-MM-YYYY'):''}
                        </u>
                      </Label>
                    </Col>
                  </td>                                      
                    <td style={{ textAlign: 'right' }}>{element.head_count}</td>
                    <td style={{ textAlign: 'right' }}>{element.total_amount}</td>
                    <td style={{ textAlign: 'right' }}>{element.share_per_head}</td>
                    <td >{element.task_type}</td>
                    <td style={{ textAlign: 'right' }}>{element.pipe}</td>
                    <td style={{ textAlign: 'right' }}>{element.plank}</td>
                    <td style={{ textAlign: 'right' }}>{element.volume}</td>
                    <td style={{ textAlign: 'right' }}>{element.tb}</td>
                    <td style={{ textAlign: 'right' }}>{element.others}</td>
                    <td style={{ textAlign: 'right' }}>{element.pipe_value}</td>
                    <td style={{ textAlign: 'right' }}>{element.plank_value}</td>
                    <td style={{ textAlign: 'right' }}>{element.volume_value}</td>
                    <td style={{ textAlign: 'right' }}>{element.tb_value}</td>
                    <td style={{ textAlign: 'right' }}>{element.others_value}</td>
                    {/* <td>{element.pipe_dismantle}</td>
                    <td>{element.plank_dismantle}</td>
                    <td>{element.volume_dismantle}</td>
                    <td>{element.tb_dismantle}</td>
                    <td>{element.others_dismantle}</td>
                    <td>{element.total_erection_amount}</td>
                    <td>{element.total_dismantle_amount}</td>
                    <td>{element.actual_total_amount}</td> */}
                  
                  </tr>
                );
              })}
          </tbody>
          <Modal size="xl" isOpen={viewLineModal} toggle={viewLineToggle.bind(null)}>
                <ModalHeader toggle={viewLineToggle.bind(null)}>Work Done by Employee</ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <table className="lineitem border border-secondary rounded">
                      <thead>
                        <tr>
                          <th scope="col">SN.No </th>
                          <th scope="col">Employee Name </th>
                         
                          <th scope="col">Date </th>
                          <th scope="col">Share Amount</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {lineItem &&
                          lineItem.map((e,index) => {
                            return (
                              <tr>
                                <td data-label="SN.No">{index+1}</td>
                                <td data-label="Employee Name">{e.first_name}</td>
                               
                                <td data-label="Date">{e.date}</td>
                                <td data-label="Share Per Head">{e.share_per_head}</td>
                              
                              
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </FormGroup>
                </ModalBody>
              </Modal> 
        </CommonTable>
      </div>
    </div>
  );
}

export default WorkSheetTask;
