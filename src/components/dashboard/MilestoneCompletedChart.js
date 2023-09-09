import React, { useEffect, useState } from 'react';
import { Col, FormGroup, Label, Input,Row } from 'reactstrap';
import Chart from 'react-apexcharts';
import ComponentCard from '../ComponentCard';
import api from '../../constants/api';

const MilestoneCompleted = () => {
  const [taskTitles, setTaskTitles] = useState([]);
  const [actualHourData, setActualHourData] = useState([]);
  const [estimatedHourData, setEstimatedHourData] = useState([]);
  const [projects, setProjects] = useState([]);

  const HourData = (selectedProjectId) => {
    // Make API call to retrieve the data
    api.post('/stats/getMilestoneCompletedStats', { project_id: selectedProjectId })
      .then((response) => {
        // Check if the response data is not empty
        if (response.data && response.data.data && response.data.data.length > 0) {
          // Assuming the response data is an array of objects with keys: milestone_title, actual_completed_date, and to_date
          const hourData = response.data.data;
          const milestoneData = hourData.map((item) => ({
            title: item.milestone_title,
            actualDate: new Date(item.actual_completed_date).toLocaleDateString(), // Convert to local date string
            estimatedDate: new Date(item.to_date).toLocaleDateString(), // Convert to local date string
          }));

          setTaskTitles(milestoneData.map((item) => item.title));
          setActualHourData(milestoneData.map((item) => item.actualDate));
          setEstimatedHourData(milestoneData.map((item) => item.estimatedDate));
        } else {
          // If the response data is empty, reset the state to show an empty chart or display a message
          setTaskTitles([]);
          setActualHourData([]);
          setEstimatedHourData([]);
        }
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
      });
  };

  useEffect(() => {
    api.get('projecttask/getProjectTitle')
      .then((res) => {
        setProjects(res.data.data);
      })
      .catch((error) => {
        console.log('Error fetching projects:', error);
      });
  }, []);

  const optionscolumn = {
    colors: ['#745af2', '#263238'],
    chart: {
      fontFamily: "'Rubik', sans-serif",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: taskTitles,
      labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Date',
        color: '#8898aa',
      },
      labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: 'dark',
      y: {
      
        formatter(val) {
          return val; // Since the date is already in the format you want, simply return it as is
        },
      },
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
    },
    legend: {
      show: true,
      position: 'bottom',
      width: '50px',
      fontFamily: "'Montserrat', sans-serif",
      labels: {
        colors: '#8898aa',
      },
    },
  };
  

  const seriescolumn = [
    {
      name: 'Actual Completed Date',
      data: actualHourData,
    },
    {
      name: 'Estimated Date',
      data: estimatedHourData,
    },
  ];

  return (
    <Row>
      <Col md="12">
      <ComponentCard title="Milestone Statistics">
        <FormGroup>
          <Label for="projectSelect">Select Project</Label>
          <Input
            type="select"
            name="project_id"
            onChange={(e) => {
              const selectedProjectId = e.target.value;
              HourData(selectedProjectId);
            }}
          >
            <option value="">Select Project</option>
            {projects &&
              projects.map((element) => (
                <option key={element.project_id} value={element.project_id}>
                  {element.title}
                </option>
              ))}
          </Input>
        </FormGroup>

        
          <Chart options={optionscolumn} series={seriescolumn} type="bar" height="300" />
 
      </ComponentCard>
    </Col>
    </Row>

  );
};

export default MilestoneCompleted;
