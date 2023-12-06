import React, { useState } from 'react';
//import PropTypes from 'prop-types';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
// import Converter from 'number-to-words';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';
import moment from 'moment';
import api from '../../constants/api';
// import PdfFooter from './PdfFooter';
// import PdfHeader from './PdfHeader';

const PdfProjectQuote = ({ id, quoteId }) => {
  PdfProjectQuote.propTypes = {
    id: PropTypes.any,
    quoteId: PropTypes.any,
  };
  const [hfdata, setHeaderFooterData] = React.useState();
  const [quote, setQuote] = React.useState([]);
  // const [projectDetail, setProjectDetail] = useState();
  const [lineItem, setLineItem] = useState([]);
  const [gTotal, setGtotal] = React.useState(0);
  // const [gstTotal, setGsttotal] = React.useState(0);
  // const [Total, setTotal] = React.useState(0);
  //const [lineItem, setLineItem] = useState(null);

  React.useEffect(() => {
    api.get('/setting/getSettingsForCompany').then((res) => {
      setHeaderFooterData(res.data.data);
    });
  }, []);

  const findCompany = (key) => {
    const filteredResult = hfdata.find((e) => e.key_text === key);
    return filteredResult.value;
  };

  // const getProjectById = () => {
  //   api
  //     .post('/project/getProjectsByIDs', { project_id: id })
  //     .then((res) => {
  //       setProjectDetail(res.data.data[0]);
  //     })
  //     .catch(() => { });
  // };

  // Get Quote By Id
  const getQuote = () => {
    api.post('/project/getTabQuoteById', { project_id: id }).then((res) => {
      setQuote(res.data.data[0]);
      console.log('quote2', res.data.data[0]);
    });
  };
  const getQuoteById = () => {
    api
      .post('/project/getQuoteLineItemsById', { quote_id: quoteId })
      .then((res) => {
        setLineItem(res.data.data);
        console.log('quote1', res.data.data);
        let grandTotal = 0;
        // let grand = 0;
        // let gst = 0;
        res.data.data.forEach((elem) => {
          grandTotal += elem.amount;
          //  grand += elem.actual_value;
        });
        setGtotal(grandTotal);
        // gst = grandTotal * 0.07;
        // setGsttotal(gst);
        // grand = grandTotal + gst;
        // setTotal(grand);
        //setViewLineModal(true);
      })
      .catch(() => { });
  };
  React.useEffect(() => {
    getQuote();
    getQuoteById();
    //getProjectById();
  }, []);

  const GetPdf = () => {
    const lineItemBody = [
      [
        {
          text: 'SN',
          style: 'tableHead',
          alignment: 'center'
        },
        {
          text: 'Description',
          style: 'tableHead',
          alignment: 'center'
        },
        {
          text: 'Qty',
          style: 'tableHead',
          alignment: 'center'
        },
        {
          text: 'Amount $',
          style: 'tableHead',
          alignment: 'right'
        },
      ]
    ]
    lineItem.forEach((element, index) => {
      lineItemBody.push([
        {
          text: `${index + 1}`,
          style: 'tableBody',
          alignment: 'center'

        },
        {
          text: `${element.description}`,
          style: 'tableBody',
          alignment: 'center'
        },

        {
          text: `${element.quantity}${element.unit}`,
          // border: [false, false, false, true],
          alignment: 'center',
          style: 'tableBody',
        },

        {
          text: `${(element.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 }))}`,
          // border: [false, false, false, true],
          style: 'tableBody',
          alignment: 'right'
        },

      ]);
    });


    const dd = {
      pageSize: 'A4',
      // header: PdfHeader({ findCompany }),
      pageMargins: [60, 40, 30, 0],
      // footer: PdfFooter,
      content: [       
        {text:`${findCompany("cp.companyName")}`,alignment: 'center', bold:true,fontSize: 18 ,color:'green' },
        {
          columns:[
            
            {text:`${findCompany("cp.companyAddress1")},\n ${findCompany("cp.companyAddress2")}, \n  ${findCompany("cp.companyAddress3")}`,alignment: 'right',fontSize: 11 },
              ],
          margin: [50, 20, 50, 10],
        },
        { text: `Date : ${(quote.quote_date) ? moment(quote.quote_date).format('DD-MM-YYYY') : ''} `, style: ['notesText', 'textSize'] },
         { text: `Ref   : ${quote.ref_no_quote ? quote.ref_no_quote : ''}`, style: ['invoiceAdd', 'textSize'],margin:[0,10,0,0] },
        {
          text: `QUOTATION`,
          alignment: 'center',
          fontSize: 12,
          decoration: 'underline', // Underline added here
          style: 'tableHead',
        },
        // {

        //     headerRows: 1,
        //     widths: ['105%', '51%'],
        //     body: [
        //       [
        //         {
        //           text: 'QUOTATION',
        //           alignment: 'center',
        //           decoration: 'underline', // Underline added here
        //           style: 'tableHead',
        //         },
        //       ],
        //     ],

        // }, '\n',

        '\n',
        { text: `TO :${quote.first_name ? quote.first_name : ''}`, style: ['notesText', 'textSize'] },

        '\n',

        {
          text: `
           Dear Sir,

           Thank you for your consideration and opportunity to render our services, we strongly believe our quote match your expectation. One (1) time erection and Modification preliminary quote for NFE-FLNG Demolition(0109J110039) for phase II.`,

          style: ['notesText', 'textSize']
        },
        '\n',

        {
          layout: {
            defaultBorder: true,
            hLineWidth: () => {
              return 1;
            },
            vLineWidth: () => {
              return 1;
            },
            hLineColor: (i) => {
              if (i === 1 || i === 0) {
                return 'black';
              }
              return 'black';
            },
            vLineColor: (i) => {
              if (i === 1 || i === 0) {
                return 'black';
              }
              return 'black';
            },
            hLineStyle: () => {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function () { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: () => {
              return 10;
            },
            paddingRight: () => {
              return 10;
            },
            paddingTop: () => {
              return 2;
            },
            paddingBottom: () => {
              return 2;
            },
            fillColor: () => {
              return 'white';
            },
          },
          table: {
            headerRows: 1,
            widths: ['18%', '37%', '20%', '24%'],

            body: lineItemBody
          },
        },
        '\n',
        {
          stack: [
            { text: `Total ($) :  ${(gTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 }))}`, style: ['textSize'], margin: [0, 0, 15, 0], alignment: 'right',bold:true },
            '\n',
            // { text: `GST:       ${(gstTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 }))}`, style: ['textSize'], margin: [330, 0, 0, 0] },
            // '\n',
            // { text: `Total $ :     ${(Total.toLocaleString('en-IN', { minimumFractionDigits: 2 }))}`, style: ['textSize'], margin: [320, 0, 0, 0] },
            // '\n\n\n',
            // { text: `TOTAL : ${Converter.toWords(Total)}`, style: 'bold', margin: [40, 0, 0, 0] }
          ]
        },
        '\n\n',       
        
          
             {
              text: `Terms and Condition:-`,
              decoration: 'underline',
              alignment:'Left',
              
                         },'\n',
            {
              text: `${findCompany("cp.quoteTermsAndCondition")}`,
              style: ['notesText', 'textSize'],
              margin:[30,0,0,0]
            },

          
        
//         {
//           columns: [
//             {
//               text: `Terms and Condition:- \n
// 1. All prices quoted are in SGD and excluding GST \n
// 2. Price quoted for specified requirement document provided, any additional scope shall be charged in addition \n
// 3. Re-work and/additional work shall follow yard tariff upon agreement from project manager and SA Dept\n
// 4. Payment terms 30 days from our date of invoices`,
//               style: ['notesText', 'textSize']
//             },

//           ],
//         },

        '\n',
        {
          text: 'Yours Truly,',
          style: 'textSize',
          margin: [0, 10, 0, 0],
        },
        '\n\n',
        {
          text: 'DIRECTOR',
          style: 'textSize',
          margin: [0, 10, 0, 0],
        },
        '\n\n',
        {
          text: `Tel No:${findCompany("cp.companyPhone")}`,
          style: 'textSize',
          decoration: 'underline',
          margin: [0, 0, 0, 0],
          alignment: 'left'
        },
        '\n',
        {
          text: `Email:${findCompany("cp.companyEmail")}`,
          style: 'textSize',
          margin: [0, -24, 20, 0],
          decoration: 'underline',
          color:'blue',
          alignment: 'right'
        },

        // {
        //   canvas: [{ type: 'line', x1: 105, y1: 0, x2: 0, y2: 0, lineWidth: 1 }],
        //   margin: [100, 0, -150, 0],
        // },
      ],
      margin: [0, 50, 50, 50],

      styles: {
        logo: {
          margin: [-20, 20, 0, 0],
        },
        address: {
          margin: [-10, 20, 0, 0],
        },
        invoice: {
          margin: [0, 30, 0, 10],
          alignment: 'right',
        },
        invoiceAdd: {
          alignment: 'left',
        },
        textSize: {
          fontSize: 10,
        },
        textSize1: {
          fontSize: 10,
          alignment: 'right',
          margin: [0, 0, 200, 0]
        },
        textSize2: {
          fontSize: 15,
          bold: 'true',
          alignment: 'left',
          margin: [100, 0, 0, 0]
        },
        notesTitle: {
          bold: true,
          margin: [0, 50, 0, 3],
        },
        tableHead: {
          border: [false, true, false, true],
          fillColor: '#eaf2f5',
          margin: [0, 5, 0, 5],
          fontSize: 10,
          bold: 'true',
        },
        tableBody: {
          border: [false, false, false, true],
          margin: [0, 5, 0, 5],
          alignment: 'left',
          fontSize: 10,
        },
        tableBody1: {
          border: [false, false, false, true],
          margin: [10, 5, 0, 5],
          alignment: 'right',
          fontSize: 10,
        },
        tableBody2: {
          border: [false, false, false, true],
          margin: [15, 5, 0, 5],
          alignment: 'center',
          fontSize: 10,
        },
      },
      defaultStyle: {
        columnGap: 20,
      },
    };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(dd, null, null, pdfFonts.pdfMake.vfs).open();
  };

  return (
    <>
      <span onClick={GetPdf}><Icon.Printer /></span>
    </>
  );
};


export default PdfProjectQuote;
