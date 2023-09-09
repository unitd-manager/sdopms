import React, { useEffect } from 'react';
import { Row, Col, Card, CardBody, Button, Input, FormGroup } from 'reactstrap';
import CommonTable from "../CommonTable";

const InvoiceSummary = () => {


  useEffect(() => {
   
  }, []);

  const columns = [
    {
      name: "Invoice Date",
      selector: "opportunity_id",
      grow: 0,
      wrap: true,
    },
    {
      name: "Due Date",
      selector: "company_name",
      grow: 0,
      width: "auto",
      button: true,
      sortable: false,
    },
    {
      name: "Invoice No",
      selector: "delete",
      grow: 0,
      width: "auto",
      wrap: true,
    },
    {
      name: "Company Name",
      selector: "opportunity_code",
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: "Invoice Period Date",
      selector: "title",
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: "Invoice Amount",
      selector: "company_name",
      sortable: true,
      grow: 0,
    },
    {
      name: "GST",
      selector: "contact_name",
      sortable: true,
      width: "auto",
      grow: 3,
    },
    {
      name: "Total",
      selector: "category",
      sortable: true,
      grow: 2,
      width: "auto",
    },
    {
      name: "Received",
      selector: "status",
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: "Balance",
      selector: "status",
      sortable: true,
      grow: 2,
      wrap: true,
    },
  ];

  return (
    <>
     <Card>
        <CardBody>
          <Row>
            <Col></Col>
            <Col>
              <FormGroup>
                <Input type="select" name="endDate">
                    <option defaultValue="Current Month">Current Month</option>
                    <option value="Previous Month">Previous Month</option>
                    <option value="Last 3 Months">Last 3 Months</option>
                    <option value="Last 6 Months">Last 6 Months</option>
                    <option value="Last 9 Months">Last 9 Months</option>
                    <option value="Last 12 Months">Last 12 Months</option>
                </Input>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Input type="select" name="company_id">
                        <option value="">Select Company Name</option>
                        <option value="37">abc company</option>
                        <option value="95">abc company</option>
                        <option value="40">ABC New company</option>
                        <option value="1">ABC New company Pte </option>
                        <option value="2">ABC Supplier</option>
                        <option value="47">amazon</option>
                        <option value="14">Androidcompany</option>
                        <option value="20">apple company</option>
                        <option value="12">Apple SIngapore Pte Ltd</option>
                        <option value="75">Apple software</option>
                        <option value="88">asdggd</option>
                        <option value="70">c1</option>
                        <option value="50">cognizant</option>
                        <option value="82">comapany</option>
                        <option value="67">comcast</option>
                        <option value="81">company</option>
                        <option value="68">company1</option>
                        <option value="51">croma</option>
                        <option value="84">customer</option>
                        <option value="86">customer</option>
                        <option value="24">DFFFFFF</option>
                        <option value="10">DK Pte Ltd</option>
                        <option value="72">facebook</option>
                        <option value="90">fe brt</option>
                        <option value="25">fffuuf</option>
                        <option value="48">flipkart</option>
                        <option value="71">flipkart</option>
                        <option value="49">foodie</option>
                        <option value="34">gokila</option>
                        <option value="46">gokila</option>
                        <option value="54">hanipa</option>
                        <option value="39">hawai</option>
                        <option value="26">hbjn</option>
                        <option value="61">hcl company</option>
                        <option value="93">higurey</option>
                        <option value="17">Hope Engineering and Construction</option>
                        <option value="16">JA Associates</option>
                        <option value="6">Jing Shaw Pte Ltd</option>
                        <option value="5">Kate Williams</option>
                        <option value="79">kit</option>
                        <option value="69">koo</option>
                        <option value="92">list company</option>
                        <option value="29">manpower</option>
                        <option value="91">Mari</option>
                        <option value="13">Marina Bay</option>
                        <option value="22">marzu constructin</option>
                        <option value="64">name</option>
                        <option value="78">Name67</option>
                        <option value="23">NAMEER</option>
                        <option value="55">Navab And </option>
                        <option value="15">New bright trading Pte Ltd</option>
                        <option value="4">New Frame Tech Ltd</option>
                        <option value="80">newc</option>
                        <option value="3">Philips Boon</option>
                        <option value="44">philips boon</option>
                        <option value="85">project</option>
                        <option value="9">Quak Pta LTd</option>
                        <option value="43">raffff</option>
                        <option value="66">raffic</option>
                        <option value="31">rafi</option>
                        <option value="32">rafi</option>
                        <option value="45">rafi</option>
                        <option value="59">rafi</option>
                        <option value="27">Raiza</option>
                        <option value="60">rajasthan</option>
                        <option value="63">ramu company</option>
                        <option value="83">ramu company</option>
                        <option value="52">rani</option>
                        <option value="56">RASATHI</option>
                        <option value="57">RASATHI</option>
                        <option value="58">RASATHI</option>
                        <option value="65">rasathi</option>
                        <option value="76">rasathi</option>
                        <option value="38">rty</option>
                        <option value="94">saivam</option>
                        <option value="33">shdkfllflf</option>
                        <option value="35">shdkfllflf</option>
                        <option value="41">siva</option>
                        <option value="42">siva</option>
                        <option value="62">smart</option>
                        <option value="77">Smart</option>
                        <option value="19">Sulfiya Beauty Parlour</option>
                        <option value="87">suple</option>
                        <option value="73">tata company</option>
                        <option value="18">test</option>
                        <option value="89">Test345</option>
                        <option value="74">titan</option>
                        <option value="11">Unison International Singapore Pte Ltd</option>
                        <option value="53">united technologies</option>
                        <option value="7">Universal Software Solutions Pte Ltd</option>
                        <option value="28">Wilson</option>
                        <option value="8">ZAp Pte Ltd</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md="1">
            <FormGroup>
              <Button color="primary" className="shadow-none">Go</Button>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>

        <CommonTable title="Invoice Summary" >
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

          </tbody>
      </CommonTable>
      </Card>
    
    </>
  );
}

export default InvoiceSummary;