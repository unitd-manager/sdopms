import React, { useEffect, useState } from 'react';
import { Button, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-fixedheader';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import { columns } from '../../data/Tender/ProductData';
import api from '../../constants/api';
import message from '../../components/Message';
// import LottieComponent from '../../components/LottieComponent';

const Test = () => {
  //state variables
  //const [products, setProducts] = useState();
  //get api for products

  const [loading, setLoading] = useState(false);

  const changePublishStatus = (publishValue, id) => {
    setLoading(true);
    api
      .post('/commonApi/updatePublish', {
        tablename: 'product',
        idColumn: 'product_id',
        idValue: id,
        value: parseInt(publishValue, 10),
      })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        } else {
          message('Unable to edit record.', 'error');
        }
      })
      .catch(() => {
        message('Network connection error.');
      });
  };
  const getAllProducts = () => {
    /* eslint-disable */
    setLoading(true);
    $('#example').DataTable({
      dom: 'Bfrtip',
      serverSide: true,
      searching: true,
      scrollX: true,
      lengthChange: false,
      pageLength: 50,
      buttons: ['excel'],
      bDestroy: true,
      ajax: {
        type: 'POST',
        url: 'http://43.228.126.245:3001/product/getProductsPagination',
      },
      lengthMenu: [
        [10, 100, -1],
        [10, 100, 'All'],
      ],
      drawCallback: function (settings) {
        $(document).on('click', '#publish', function (e) {
          e.preventDefault();
          changePublishStatus($(this).attr('data-status'), $(this).attr('data-value'));
        });
        $(document).on('click', '.notes', function (e) {
          e.preventDefault();
          toggle();
        });
      },
      select: true,
      colReorder: true,
      columns: [
        {
          render: function (data, type, row, meta) {
            return row.product_id;
          },
        },
        {
          render: function (data, type, row, meta) {
            return row.product_id;
          },
        },
        {
          render: function (data, type, row, meta) {
            return row.item_code;
          },
        },
        {
          render: function (data, type, row, meta) {
            return row.title;
          },
        },
        {
          render: function (data, type, row, meta) {
            return row.product_type;
          },
        },
        {
          render: function (data, type, row, meta) {
            return row.price;
          },
        },
        {
          render: function (data, type, row, meta) {
            return row.unit;
          },
        },
        {
          render: function (data, type, row, meta) {
            return row.qty_in_stock;
          },
        },
        {
          render: function (data, type, row, meta) {
            return row.modified_by;
          },
        },
        {
          render: function (data, type, row, meta) {
            if (row.published == 1) {
              return `<span data-status='0' data-value=${row.product_id} id="publish" class="cursor-pointer badge bg-success"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></span>`;
            } else {
              return `<span data-status='1' data-value=${row.product_id} id="publish" class="cursor-pointer badge bg-danger"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></span>`;
            }
          },
        },
        // {
        //   render: function (data, type, row, meta) {
        //     return `<button type="button" class="btn btn-block btn-warning btn-sm notes"
        //        >Notes</button><button type="button" class="btn btn-block btn-info btn-sm history"
        //        >History</button>`;
        //   },
        // },
      ],
    });
    // apiCall
    //   .get('/product/getProducts')
    //   .then((res) => {
    //     setProducts(res.data.data);
    //     /* eslint-disable */
    //     $(document).ready(function () {
    //       $('#example thead tr')
    //       .clone(true)
    //       .addClass('filters')
    //       .appendTo('#example thead');
    //       $('#example').DataTable({
    //         pagingType: 'full_numbers',
    //         pageLength: 20,
    //         processing: true,
    //         dom: 'Bfrtip',
    //         buttons: [
    //           {
    //             extend: 'print',
    //             text: 'Print',
    //             className: 'shadow-none btn btn-primary',
    //           },
    //         ],
    //         initComplete: function () {
    //           this.api()
    //             .columns()
    //             .every(function () {
    //               var column = this;
    //               if ($(column.header()).find('div').hasClass('select')) {
    //                 var select = $('<select><option value="">All</option></select>')
    //                   .appendTo($(column.header()).find('div.select').empty())
    //                   .on({
    //                     change: function () {
    //                       var val = $.fn.dataTable.util.escapeRegex($(this).val());
    //                       column.search(val ? '^' + val + '$' : '', true, false).draw();
    //                     },
    //                     click: function (e) {
    //                       // stop click event bubbling
    //                       e.stopPropagation();
    //                     },
    //                   });
    //                 column
    //                   .data()
    //                   .unique()
    //                   .sort()
    //                   .each(function (d, j) {
    //                     if (d) {
    //                       select.append(`<option value=${d}>${d}</option>`);
    //                     }
    //                   });
    //               } else if ($(column.header()).find('div').hasClass('input')) {
    //                 var select = $('<input >')
    //                   .appendTo($(column.header()).find('div.input').empty())
    //                   .on({
    //                     change: function () {

    //                       var val = $.fn.dataTable.util.escapeRegex($(this).val());
    //                      console.log(val)
    //                       column.search(val ? '^' + val + '$' : '', true, false).draw();
    //                     },
    //                     click: function (e) {
    //                       // stop click event bubbling
    //                       e.stopPropagation();
    //                     },
    //                   });

    //               }
    //             });
    //         },
    //       });

    //     });

    //     $('.filterable .filters input').keyup(function (e) {
    //       /* Ignore tab key */
    //       var code = e.keyCode || e.which;
    //       if (code == '9') return;
    //       /* Useful DOM data and selectors */
    //       var $input = $(this),
    //         inputContent = $input.val().toLowerCase(),
    //         $panel = $input.parents('.filterable'),
    //         column = $panel.find('.filters th').index($input.parents('th')),
    //         $table = $panel.find('.table'),
    //         $rows = $table.find('tbody tr');
    //       /* Dirtiest filter function ever ;) */
    //       var $filteredRows = $rows.filter(function () {
    //         var value = $(this).find('td').eq(column).text().toLowerCase();
    //         return value.indexOf(inputContent) === -1;
    //       });
    //       /* Clean previous no-result if exist */
    //       $table.find('tbody .no-result').remove();
    //       /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
    //       $rows.show();
    //       $filteredRows.hide();
    //       /* Prepend no-result row if all rows are filtered */
    //       if ($filteredRows.length === $rows.length) {
    //         $table
    //           .find('tbody')
    //           .prepend(
    //             $(
    //               '<tr className="no-result text-center"><td colspan="' +
    //                 $table.find('.filters th').length +
    //                 '">No result found</td></tr>',
    //             ),
    //           );
    //       }
    //     });
    //     /* eslint-disable */
    //   })
    //   .catch(() => {
    //     message('Product Data Not Found', 'info');
    //   });
    setLoading(false);
  };

  // update publish
  // const updatePublish=(obj)=>{
  // obj.published=!obj.published;
  // console.log('published',obj.published)
  // apiCall
  // .post('/product/update-Publish', obj)
  // .then(() => {
  //   getProducts();
  //   message('Publish updated successfully', 'success');

  // })
  // .catch(() => {
  //   message('Unable to edit record.', 'error');
  // });
  // }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />

        <CommonTable
          loading={loading}
          additionalClasses={'table'}
          title="Product List"
          Button={
            <>
              <Col>
                <Link to="/ProductDetails">
                  <Button color="primary" className="shadow-none">
                    Add New
                  </Button>
                </Link>
              </Col>
              <Col>
                <a
                  href="http://43.228.126.245/pms-shimi/storage/excelsheets/Product.xlsx"
                  download
                >
                  <Button color="primary" className="shadow-none">
                    Sample
                  </Button>
                </a>
              </Col>
            </>
          }
        >
          <thead>
            <tr className="filters">
              {columns.map((cell) => {
                return (
                  <th key={cell.name}>
                    {cell.name}
                    {cell.sorttype && cell.sorttype === 'select' && (
                      <div className={'select'}></div>
                    )}
                    {cell.sorttype && cell.sorttype === 'input' && <div className={'input'}></div>}
                    {!cell.sorttype && <div></div>}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody></tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default Test;
