import React from 'react';
import { Link } from 'react-router-dom';
import {Button } from 'reactstrap';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { columns, data } from '../../data/PayrollHR/CPFCalculatorData';
import "react-data-table-component-extensions/dist/index.css";
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

function CPFCalculator() {
  const tableData = {
    columns,
    data,
  };
  return (
    <>
    <BreadCrumbs/>
      <CommonTable
          title="CPF Calculator List"
          Button={
            <Link to="/CPFCalculatorDetails">
              <Button color="primary" className=" shadow-none">
                Add New
              </Button>
            </Link>
          }
        >
          <DataTableExtensions
      {...tableData}
    >
      <DataTable
        noHeader
        defaultSortField="id"
        defaultSortAsc={false}
        pagination
        highlightOnHover
      />
    </DataTableExtensions>
          </CommonTable>

    
    </>
  )
}

export default CPFCalculator