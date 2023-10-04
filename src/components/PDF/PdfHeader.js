import PropTypes from "prop-types";

const PdfHeader = ({findCompany}) => {

  PdfHeader.propTypes = {
    findCompany: PropTypes.string,
  };
  return {
    columns:[
       {
          image:`${findCompany("cp.companyLogo")}`,
          style: 'logo',width: 160,alignment: 'left',margin: [0, -20, 0, 0]
      },
      {text:`${findCompany("cp.companyAddress1")}, ${findCompany("cp.companyAddress2")}, \n  ${findCompany("cp.companyAddress3")}, \n Email:${findCompany('cp.companyEmail')}`,alignment: 'right',fontSize: 10 },
        ],
    margin: [50, 20, 50, 10],
  };
}
export default PdfHeader
