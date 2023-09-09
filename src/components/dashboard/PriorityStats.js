import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
import api from '../../constants/api';
import ComponentCard from '../ComponentCard';

const PriorityStats = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeStats, setEmployeeStats] = useState([]);
  const [datas, setDatas] = useState([]);

  // Get the employee statistics based on the selected employee
  const getStats = (employeeId) => {
    api.post('/stats/getPriorityTasks', { employee_id: employeeId })
      .then((res) => {
        const { data } = res.data;
        setDatas(data.task_titles);
        setEmployeeStats(data.task_priorities);
      })
      .catch(() => {});
  };

  useEffect(() => {
    api.get('jobinformation/getEmployee')
      .then((res) => {
        setEmployees(res.data.data);
      })
      .catch((error) => {
        console.log('Error fetching employees:', error);
      });
  }, []);

  const optionsbar = {
    chart: {
      id: 'bar-chart',
      fontFamily: "'Rubik', sans-serif",
    },
    xaxis: {
      categories: datas, // Priority levels as X-axis labels
      labels: {
        style: {
          colors: '#8898aa',
        },
      },
    },
    yaxis: {
      categories: ['1', '2', '3', '4', '5'], // Task titles as Y-axis labels
      labels: {
        style: {
          colors: '#8898aa',
        },
      },
      tickAmount: 5, // Number of ticks on the Y-axis, corresponding to the number of categories
      min: 0, // Set the minimum value of the Y-axis to match the first category
      max: 5, // Set the maximum value of the Y-axis to match the last category
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      }
    },
    colors: [
      'rgb(30, 136, 229)',
      'rgb(38, 198, 218)',
      'rgb(236, 239, 241)',
      'rgb(116, 90, 242)',
      '#ef5350',
    ],
    tooltip: {
      fillSeriesColor: false,
      theme: 'dark',
    },
  };

  // Create a separate data series for each task
  const seriesbar = datas.map((task, index) => ({
    name: task, // Task title as the series name
    data: employeeStats[index], // Priority levels as the data points
  }));
  
  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Employee Priorities">
          <Form>
            <FormGroup>
              <Label for="employeeSelect">Select Employee</Label>
              <Input
                type="select"
                name="employee_id"
                onChange={(e) => {
                  const selectedEmployeeId = e.target.value;
                  getStats(selectedEmployeeId);
                }}
              >
                <option value="">Select Employee</option>
                {employees &&
                  employees.map((element) => (
                    <option key={element.employee_id} value={element.employee_id}>
                      {element.first_name}
                    </option>
                  ))}
              </Input>
            </FormGroup>
          </Form>
          {employeeStats && (
            <Chart options={optionsbar} series={seriesbar} type="bar" height="450" />
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default PriorityStats;