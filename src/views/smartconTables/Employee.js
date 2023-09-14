import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import { useEffect, useState } from 'react';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeCard from '../../components/dashboard/extraDashboard/EmployeeCard';
import api from '../../constants/api';
import message from '../../components/Message';
import CommonTable from '../../components/CommonTable';
import Image from '../../assets/images/users/user1.jpg';

const Cards = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllEmployees = () => {
    setLoading(true);
    api
      .get('/employeeModule/getCurrentEmployee')
      .then((res) => {
        setEmployees(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        message('Employee Data Not Found', 'info');
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  return (
    <>
      <div className="pt-xs-25">
        <BreadCrumbs />
        <CommonTable
          loading={loading}
          title="Employee    List"
          Button={
            <>
              <Row>
                <Col md="4">
                  <Link to="/EmployeeDetails">
                    <Button color="primary" className="shadow-none">
                      New
                    </Button>
                  </Link>
                </Col>
                <Col md="4">
                  <Link to="">
                    <Button color="primary" className="shadow-none mr-2">
                      Import
                    </Button>
                  </Link>
                </Col>
                <Col md="4">
                  <a
                    href="http://43.228.126.245/smartco-api/storage/excelsheets/Employee.xlsx"
                    download
                  >
                    <Button color="primary" className="shadow-none">
                      Sample
                    </Button>
                  </a>
                </Col>
              </Row>
            </>
          }
        ></CommonTable>

        <Row className="employee-img">
          {employees.map((blg) => (
            <Col sm="6" lg="6" xl="3" key={blg.employee_id_duplicate}>
              <EmployeeCard
                onClick={`/EmployeeEdit/${blg.employee_id_duplicate}?tab=1`}
                image={Image}
                id={blg.employee_id_duplicate}
                title={blg.first_name.charAt(0).toUpperCase() + blg.first_name.slice(1)}
                dateOfBirth={blg.date_of_birth}
                empId={blg.employee_id_duplicate}
                projectDesignation={blg.project_designation}
                gender={blg.gender}
                team={blg.team}
                empCode={blg.emp_code}
                email={blg.login_email}
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Cards;
