import { Route, Routes } from 'react-router-dom';

import React, { lazy } from 'react';
import Loadable from '../layouts/loader/Loadable';

import UserToken from '../components/UserToken';
// import { Details } from '@material-ui/icons';

const FullLayout = Loadable(lazy(() => import('../layouts/FullLayout')));
// const BlankLayout = Loadable(lazy(() => import('../layouts/BlankLayout')));
/***** Pages ****/

// Modals
const EditCostingSummaryModal = Loadable(
  lazy(() => import('../components/Tender/EditCostingSummaryModal')),
);
const EnquiryTable = Loadable(lazy(() => import('../views/smartconTables/Enquiry')));
const AddLineItemModal = Loadable(lazy(() => import('../components/Tender/AddLineItemModal')));
const EditQuoteModal = Loadable(lazy(() => import('../components/Tender/EditQuoteModal')));
const EditLineItemModal = Loadable(lazy(() => import('../components/Tender/EditLineItemModal')));
const InvoiceData = Loadable(lazy(() => import('../components/FinanceTable/InvoiceData')));
const CreateReceipt = Loadable(lazy(() => import('../components/FinanceTable/CreateReceipt')));
const CreateNote = Loadable(lazy(() => import('../components/FinanceTable/CreateNote')));
const InvoiceModal = Loadable(lazy(() => import('../components/FinanceTable/InvoiceModal')));
const ReceiptModal = Loadable(lazy(() => import('../components/FinanceTable/ReceiptModal')));
const PdfData = Loadable(lazy(() => import('../views/smartconTables/Tickets')));
const PdfNext = Loadable(lazy(() => import('../views/smartconTables/GeneratePdf')));
const TicketsComponent = Loadable(lazy(() => import('../views/smartconTables/TicketsComponent')));
const Classic = Loadable(lazy(() => import('../views/dashboards/Cubosale')));
const Crypto = Loadable(lazy(() => import('../views/dashboards/Crypto')));
const Ecommerce = Loadable(lazy(() => import('../views/dashboards/Ecommerce')));
const General = Loadable(lazy(() => import('../views/dashboards/General')));
const Extra = Loadable(lazy(() => import('../views/dashboards/Extra')));
const About = Loadable(lazy(() => import('../views/About')));

/***** Apps ****/
const Notes = Loadable(lazy(() => import('../views/apps/notes/Notes')));
const Chat = Loadable(lazy(() => import('../views/apps/chat/Chat')));
const Contacts = Loadable(lazy(() => import('../views/apps/contacts/Contacts')));
const Calendar = Loadable(lazy(() => import('../views/apps/calendar/CalendarApp')));
const Email = Loadable(lazy(() => import('../views/apps/email/Email')));
const Shop = Loadable(lazy(() => import('../views/apps/ecommerce/Shop')));
const ShopDetail = Loadable(lazy(() => import('../views/apps/ecommerce/ShopDetail')));
const Treeview = Loadable(lazy(() => import('../views/apps/treeview/TreeView')));
const TicketList = Loadable(lazy(() => import('../views/apps/ticket/TicketList')));
const TicketDetail = Loadable(lazy(() => import('../views/apps/ticket/TicketDetail')));

/***** Ui Elements ****/
const Alerts = Loadable(lazy(() => import('../views/ui/Alerts')));
const Badges = Loadable(lazy(() => import('../views/ui/Badges')));
const Buttons = Loadable(lazy(() => import('../views/ui/Buttons')));
const Cards = Loadable(lazy(() => import('../views/ui/Cards')));
const Grid = Loadable(lazy(() => import('../views/ui/Grid')));
const Tables = Loadable(lazy(() => import('../views/ui/Tables')));
const Forms = Loadable(lazy(() => import('../views/ui/Forms')));
const Breadcrumbs = Loadable(lazy(() => import('../views/ui/Breadcrumbs')));
const Dropdowns = Loadable(lazy(() => import('../views/ui/DropDown')));
const BtnGroup = Loadable(lazy(() => import('../views/ui/BtnGroup')));
const Collapse = Loadable(lazy(() => import('../views/ui/Collapse')));
const ListGroup = Loadable(lazy(() => import('../views/ui/ListGroup')));
const Modal = Loadable(lazy(() => import('../views/ui/Modal')));
const Navbar = Loadable(lazy(() => import('../views/ui/Navbar')));
const Nav = Loadable(lazy(() => import('../views/ui/Nav')));
const Pagination = Loadable(lazy(() => import('../views/ui/Pagination')));
const Popover = Loadable(lazy(() => import('../views/ui/Popover')));
const Progress = Loadable(lazy(() => import('../views/ui/Progress')));
const Spinner = Loadable(lazy(() => import('../views/ui/Spinner')));
const Tabs = Loadable(lazy(() => import('../views/ui/Tabs')));
const Toasts = Loadable(lazy(() => import('../views/ui/Toasts')));
const Tooltip = Loadable(lazy(() => import('../views/ui/Tooltip')));

/***** Form Layout Pages ****/
const FormBasic = Loadable(lazy(() => import('../views/form-layouts/FormBasic')));
const FormGrid = Loadable(lazy(() => import('../views/form-layouts/FormGrid')));
const FormGroup = Loadable(lazy(() => import('../views/form-layouts/FormGroup')));
const FormInput = Loadable(lazy(() => import('../views/form-layouts/FormInput')));

/***** Form Pickers Pages ****/
const Datepicker = Loadable(lazy(() => import('../views/form-pickers/DateTimePicker')));
const TagSelect = Loadable(lazy(() => import('../views/form-pickers/TagSelect')));

/***** Form Validation Pages ****/
const FormValidate = Loadable(lazy(() => import('../views/form-validation/FormValidation')));
const FormSteps = Loadable(lazy(() => import('../views/form-steps/Steps')));
const FormEditor = Loadable(lazy(() => import('../views/form-editor/FormEditor')));
/***** Table Pages ****/
const Basictable = Loadable(lazy(() => import('../views/tables/TableBasic')));
const CustomReactTable = Loadable(lazy(() => import('../views/tables/CustomReactTable')));
const ReactBootstrapTable = Loadable(lazy(() => import('../views/tables/ReactBootstrapTable')));

/***** Chart Pages ****/
const ApexCharts = Loadable(lazy(() => import('../views/charts/ApexCharts')));
const ChartJs = Loadable(lazy(() => import('../views/charts/ChartJs')));

/***** Sample Pages ****/
const StarterKit = Loadable(lazy(() => import('../views/sample-pages/StarterKit')));
const Profile = Loadable(lazy(() => import('../views/sample-pages/Profile')));
const Gallery = Loadable(lazy(() => import('../views/sample-pages/Gallery')));
const SearchResult = Loadable(lazy(() => import('../views/sample-pages/SearchResult')));
const HelperClass = Loadable(lazy(() => import('../views/sample-pages/HelperClass')));

/***** Icon Pages ****/
const Bootstrap = Loadable(lazy(() => import('../views/icons/Bootstrap')));
const Feather = Loadable(lazy(() => import('../views/icons/Feather')));

/***** Map Pages ****/
const CustomVectorMap = Loadable(lazy(() => import('../views/maps/CustomVectorMap')));

/***** Widget Pages ****/
const Widget = Loadable(lazy(() => import('../views/widget/Widget')));

/***** CASL Access Control ****/
const CASL = Loadable(lazy(() => import('../views/apps/accessControlCASL/AccessControl')));

/***** Auth Pages ****/
const Error = Loadable(lazy(() => import('../views/auth/Error')));
// const RegisterFormik = Loadable(lazy(() => import('../views/auth/RegisterFormik')));
const LoginFormik = Loadable(lazy(() => import('../views/auth/LoginFormik')));

const DataTable = Loadable(lazy(() => import('../views/cubosale/Projects')));
const Reports = Loadable(lazy(() => import('../views/cubosale/Reports')));

// function setToken(userToken) {
//   sessionStorage.setItem('token', JSON.stringify(userToken));
// }

// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token;
// }

const AddProjects = Loadable(lazy(() => import('../views/cubosale/AddProjects')));
const EditProject = Loadable(lazy(() => import('../views/cubosale/EditProject')));

// Tender

const InvoiceTable = Loadable(lazy(() => import('../views/smartconTables/Invoice')));
const TaskTable = Loadable(lazy(() => import('../views/smartconTables/Task')));
const ProjectTable = Loadable(lazy(() => import('../views/smartconTables/Project')));
const ClientTable = Loadable(lazy(() => import('../views/smartconTables/Client')));
const LeadTable = Loadable(lazy(() => import('../views/smartconTables/Lead')));
const TimesheetTable = Loadable(lazy(() => import('../views/smartconTables/Timesheet')));
const ProductTable = Loadable(lazy(() => import('../views/smartconTables/product')));
const TestTable = Loadable(lazy(() => import('../views/smartconTables/Test')));
const PurchaseOrderTable = Loadable(lazy(() => import('../views/smartconTables/PurchaseOrder')));
const EmployeetrainingreportsTable = Loadable(
  lazy(() => import('../views/smartconTables/Employeetrainingreports')),
);
const StatementofAccountsReport = Loadable(
  lazy(() => import('../views/Reports/StatementofAccountsReport')),
);
const AgingReportsTable = Loadable(lazy(() => import('../views/smartconTables/AgingReports')));
const InvoiceByMonth = Loadable(lazy(() => import('../views/smartconTables/InvoiceByMonth')));
const EmployeeSalaryReport = Loadable(
  lazy(() => import('../views/smartconTables/EmployeeSalaryReport')),
);
const PayslipGeneratedReports = Loadable(
  lazy(() => import('../views/smartconTables/PayslipGeneratedReports')),
);
const IR8AReport = Loadable(lazy(() => import('../views/smartconTables/IR8AReport')));

// Details Table
const EnquiryDetails = Loadable(lazy(() => import('../views/detailTable/EnquiryDetails')));
const ProductDetailsTable = Loadable(lazy(() => import('../views/detailTable/ProductDetails')));
//const TaskDetailsTable = Loadable(lazy(() => import('../views/detailTable/TaskDetails')));
const ClientDetailsTable = Loadable(lazy(() => import('../views/detailTable/ClientDetails')));
const LeadDetailsTable = Loadable(lazy(() => import('../views/detailTable/LeadDetails')));
const TimesheetDetailsTable = Loadable(lazy(() => import('../views/detailTable/TimesheetDetails')));
// Finance Admin
const FinanceTable = Loadable(lazy(() => import('../views/smartconTables/Finance')));
const AccountsTable = Loadable(lazy(() => import('../views/smartconTables/Accounts')));
const AccountDetails = Loadable(lazy(() => import('../views/detailTable/AccountDetails')));
const ExpenseHeadTable = Loadable(lazy(() => import('../views/smartconTables/ExpenseHead')));
const ExpenseHeadDetails = Loadable(lazy(() => import('../views/detailTable/ExpenseHeadDetails')));
const SupplierTable = Loadable(lazy(() => import('../views/smartconTables/Supplier')));
const SupplierDetailsTable = Loadable(lazy(() => import('../views/detailTable/SupplierDetails')));
const SubConTable = Loadable(lazy(() => import('../views/smartconTables/Subcon')));
const SubConDetailsTable = Loadable(lazy(() => import('../views/detailTable/SubConDetails')));
const InventoryTable = Loadable(lazy(() => import('../views/smartconTables/Inventory')));
const VehicleTable = Loadable(lazy(() => import('../views/smartconTables/Vehicle')));
const VehicleDetails = Loadable(lazy(() => import('../views/detailTable/VehicleDetails')));
const WorkSheetTable = Loadable(lazy(() => import('../views/smartconTables/WorkSheet')));

// PayrollHR
const LeaveTable = Loadable(lazy(() => import('../views/smartconTables/Leave')));
const LeaveDetailsTable = Loadable(lazy(() => import('../views/detailTable/LeaveDetails')));
const LoanTable = Loadable(lazy(() => import('../views/smartconTables/Loan')));
const LoanDeatilsTable = Loadable(lazy(() => import('../views/detailTable/LoanDetails')));
const TrainingTable = Loadable(lazy(() => import('../views/smartconTables/Training')));
const TrainingDetailsTable = Loadable(lazy(() => import('../views/detailTable/TrainingDetails')));
const JobInformationTable = Loadable(lazy(() => import('../views/smartconTables/JobInformation')));
const JobInformationDetailsTable = Loadable(
  lazy(() => import('../views/detailTable/JobInformationDetails')),
);
const PayrollManagementTable = Loadable(
  lazy(() => import('../views/smartconTables/PayrollManagement')),
);
const Employee = Loadable(lazy(() => import('../views/smartconTables/Employee')));
const EmployeeDetailsTable = Loadable(lazy(() => import('../views/detailTable/EmployeeDetails')));
// const EmployeeDetailsData = Loadable(
//   lazy(() => import('../views/detailTable/EmployeeDetailsData')),
// );
const PayrollManagementDetails = Loadable(
  lazy(() => import('../views/detailTable/PayrollManagementDetails')),
);
const CPFCalculatorTable = Loadable(lazy(() => import('../views/smartconTables/CPFCalculator')));
const CPFCalculatorDetails = Loadable(
  lazy(() => import('../views/detailTable/CPFCalculatorDetails')),
);

// Admin
const StaffTable = Loadable(lazy(() => import('../views/smartconTables/Staff')));
const StaffDetailsTable = Loadable(lazy(() => import('../views/detailTable/StaffDetails')));
const Content = Loadable(lazy(() => import('../views/smartconTables/Content')));
const Help = Loadable(lazy(() => import('../views/smartconTables/Help')));
const ContentDetailsTable = Loadable(lazy(() => import('../views/detailTable/ContentDetails')));
const SubCategoryTable = Loadable(lazy(() => import('../views/smartconTables/SubCategory')));
const SubCategoryDetailsTable = Loadable(
  lazy(() => import('../views/detailTable/SubCategoryDetails')),
);
const ValuelistTable = Loadable(lazy(() => import('../views/smartconTables/Valuelist')));
const ValuelistDetailsTable = Loadable(lazy(() => import('../views/detailTable/ValuelistDetails')));
const SettingTable = Loadable(lazy(() => import('../views/smartconTables/Setting')));
const MilestoneListTable = Loadable(lazy(() => import('../views/smartconTables/MilestoneList')));
const TaskListTable = Loadable(lazy(() => import('../views/smartconTables/TaskList')));
const TimesheetListTable = Loadable(lazy(() => import('../views/smartconTables/TimesheetList')));
const TaskJobTable = Loadable(lazy(() => import('../views/smartconTables/TaskJob')));
const ProjectTaskTable = Loadable(lazy(() => import('../views/smartconTables/ProjectTask')));
const ProjectTimeSheetTable = Loadable(
  lazy(() => import('../views/smartconTables/ProjectTimesheet')),
);
const Section = Loadable(lazy(() => import('../views/smartconTables/Section')));
const SectionDetails = Loadable(lazy(() => import('../views/detailTable/SectionDetails')));
const ProjectDetails = Loadable(lazy(() => import('../views/detailTable/ProjectDetails')));
const SettingDetails = Loadable(lazy(() => import('../views/detailTable/SettingDetails')));
const MilestoneDetails = Loadable(lazy(() => import('../views/detailTable/MilestoneDetails')));
const ProjectTimesheetDetails = Loadable(
  lazy(() => import('../views/detailTable/ProjectTimesheetDetails')),
);
const ProjectTaskDetails = Loadable(lazy(() => import('../views/detailTable/ProjectTaskDetails')));
const TaskJobDetails = Loadable(lazy(() => import('../views/detailTable/TaskJobDetails')));
const CategoryTable = Loadable(lazy(() => import('../views/smartconTables/Category')));
const CategoryDetails = Loadable(lazy(() => import('../views/detailTable/CategoryDetails')));
const UserGroupTable = Loadable(lazy(() => import('../views/smartconTables/UserGroup')));
const UserGroupDetails = Loadable(lazy(() => import('../views/detailTable/UserGroupDetails')));
const Support = Loadable(lazy(() => import('../views/smartconTables/Support')));

//SupplierModal
const SupplierHistory = Loadable(lazy(() => import('../components/SupplierModal/SupplierHistory')));
const SubConHistory = Loadable(lazy(() => import('../components/SubConModal/SubConHistory')));
const SupportDetails = Loadable(lazy(() => import('../views/detailTable/SupportDetails')));
const PurchaseOrderDetails = Loadable(
  lazy(() => import('../views/detailTable/PurchaseOrderDetails')),
);

// Table Edit's

const ProductEdit = Loadable(lazy(() => import('../views/EditData/ProductEdit')));
const FinanceEdit = Loadable(lazy(() => import('../views/EditData/FinanceEdit')));
const TrainingEdit = Loadable(lazy(() => import('../views/EditData/TrainingEdit')));
const ProjectEdit = Loadable(lazy(() => import('../views/EditData/ProjectEdit')));
const ClientEdit = Loadable(lazy(() => import('../views/EditData/ClientEdit')));
const LeadEdit = Loadable(lazy(() => import('../views/EditData/LeadEdit')));
const VehicleEdit = Loadable(lazy(() => import('../views/EditData/VehicleEdit')));
const ContentEdit = Loadable(lazy(() => import('../views/EditData/ContentEdit')));
const HelpEdit = Loadable(lazy(() => import('../views/EditData/HelpEdit')));
const ExpenseHeadEdit = Loadable(lazy(() => import('../views/EditData/ExpenseHeadEdit')));
const SectionEdit = Loadable(lazy(() => import('../views/EditData/SectionEdit')));
const LoanEdit = Loadable(lazy(() => import('../views/EditData/LoanEdit')));
const LeavesEdit = Loadable(lazy(() => import('../views/EditData/LeavesEdit')));
const SubConEdit = Loadable(lazy(() => import('../views/EditData/SubConEdit')));
const SupplierEdit = Loadable(lazy(() => import('../views/EditData/SupplierEdit')));
const JobInformationEdit = Loadable(lazy(() => import('../views/EditData/JobInformationEdit')));
const CpfCalculatorEdit = Loadable(lazy(() => import('../views/EditData/CpfCalculatorEdit')));
const EmployeeEdit = Loadable(lazy(() => import('../views/EditData/EmployeeEdit')));
const StaffEdit = Loadable(lazy(() => import('../views/EditData/StaffEdit')));
const Login = Loadable(lazy(() => import('../views/detailTable/Login')));
const ValueListEdit = Loadable(lazy(() => import('../views/EditData/ValueListEdit')));
const SubCategoryEdit = Loadable(lazy(() => import('../views/EditData/SubCategoryEdit')));
const AccountsEdit = Loadable(lazy(() => import('../views/EditData/AccountsEdit')));
const TimesheetEdit = Loadable(lazy(() => import('../views/EditData/TimesheetEdit')));
const CategoryEdit = Loadable(lazy(() => import('../views/EditData/CategoryEdit')));
const SupportEdit = Loadable(lazy(() => import('../views/EditData/SupportEdit')));
const SettingEdit = Loadable(lazy(() => import('../views/EditData/SettingEdit')));
const InventoryEdit = Loadable(lazy(() => import('../views/EditData/InventoryEdit')));
const UserGroupEdit = Loadable(lazy(() => import('../views/EditData/UserGroupEdit')));
const PurchaseOrderEdit = Loadable(lazy(() => import('../views/EditData/PurchaseOrderEdit')));
const MilestoneEdit = Loadable(lazy(() => import('../views/EditData/MilestoneEdit')));
const TaskEdit = Loadable(lazy(() => import('../views/EditData/TaskEdit')));
const ProjectTimesheetEdit = Loadable(lazy(() => import('../views/EditData/ProjectTimesheetEdit')));
const TaskJobEdit = Loadable(lazy(() => import('../views/EditData/TaskJobEdit')));
const WorkSheetEdit = Loadable(lazy(() => import('../views/EditData/WorkSheetEdit')));
const EnquiryEdit = Loadable(lazy(() => import('../views/EditData/EnquiryEdit')));
//Reports
const ProjectReportTable = Loadable(lazy(() => import('../views/Reports/ProjectReport')));
const OverallSalesReportTable = Loadable(
  lazy(() => import('../views/Reports/OverAllSalesSummaryReport')),
);
const InvoiceByYearTable = Loadable(lazy(() => import('../views/Reports/InvoiceByYear')));
const TeamRevenue = Loadable(lazy(() => import('../views/Reports/TeamRevenue')));
// const TaskEdit= Loadable(lazy(() => import ('..')))

const SupportNewTable = Loadable(lazy(() => import('../views/smartconTables/SupportNew')));

//Reports
const CpfSummaryReports = Loadable(lazy(() => import('../views/smartconTables/CpfSummaryReports')));
const PurchaseGstReport = Loadable(lazy(() => import('../views/smartconTables/PurchaseGstReport')));

const Routernew = () => {
  const { token, setToken } = UserToken();
  return (
    <div>
      <Routes>
        <Route path="/" element={!token ? <LoginFormik setToken={setToken} /> : <FullLayout></FullLayout>}>
          {/* Tendar Modal */}
          <Route
            path="/editcostingsummary"
            name="editcostingsummary"
            element={<EditCostingSummaryModal />}
          ></Route>
          <Route path="/EnquiryDetails" name="clienttdata" element={<EnquiryDetails />}></Route>
          <Route path="/addlineitem" name="addlineitem" element={<AddLineItemModal />}></Route>
          <Route path="/editquote" name="editquote" element={<EditQuoteModal />}></Route>
          <Route path="/editlineitem" name="editlineitem" element={<EditLineItemModal />}></Route>
          <Route path="/invoicedata" name="invoicedata" element={<InvoiceData />}></Route>
          <Route path="/createreceipt" name="createreceipt" element={<CreateReceipt />}></Route>
          <Route path="/createnote" name="createnote" element={<CreateNote />}></Route>
          <Route path="/invoiceModal/:id" name="invoiceModal" element={<InvoiceModal />}></Route>
          <Route path="/receiptModal/:id" name="invoiceModal" element={<ReceiptModal />}></Route>
          {/* Table Edit's */}
        
          <Route path="/ProductEdit/:id" name="productdata" element={<ProductEdit />}></Route>
          <Route path="/FinanceEdit/:id" name="financedata" element={<FinanceEdit />}></Route>
          <Route path="/TrainingEdit/:id" name="trainingdata" element={<TrainingEdit />}></Route>
          <Route path="/ContentEdit/:id" name="contentdata" element={<ContentEdit />}></Route>
          <Route path="/HelpEdit/:id" name="contentdata" element={<HelpEdit />}></Route>
          <Route path="/VehicleEdit/:id" name="vehicledata" element={<VehicleEdit />}></Route>
          <Route path="/ProjectEdit/:id" name="projectdata" element={<ProjectEdit />}></Route>
          <Route path="/clientEdit/:id" name="clienttdata" element={<ClientEdit />}></Route>
          <Route path="/WorkSheetEdit/:id" name="worksheetdata" element={<WorkSheetEdit />}></Route>
          <Route path="/leadEdit/:id" name="leaddata" element={<LeadEdit />}></Route>
          <Route path="/sectionEdit/:id" name="sectiondata" element={<SectionEdit />}></Route>
          <Route path="/AccountsEdit/:id" name="accountdata" element={<AccountsEdit />}></Route>
          <Route path="/LeavesEdit/:id" name="leavedata" element={<LeavesEdit />}></Route>
          <Route path="/EnquiryEdit/:id" name="clienttdata" element={<EnquiryEdit />}></Route>
          <Route
            path="/expenseHeadEdit/:id"
            name="expenseheaddata"
            element={<ExpenseHeadEdit />}
          ></Route>
          <Route path="/LoanEdit/:id" name="loandata" element={<LoanEdit />}></Route>
          <Route path="/SubConEdit/:id" name="subcondata" element={<SubConEdit />}></Route>
          <Route path="/SupplierEdit/:id" name="supplierdata" element={<SupplierEdit />}></Route>
          <Route
            path="/JobInformationEdit/:id"
            name="jobinformationdata"
            element={<JobInformationEdit />}
          ></Route>
           <Route
            path="/CpfCalculatorEdit/:id"
            name="cpfcalculatordata"
            element={<CpfCalculatorEdit />}
          ></Route>
          <Route
            path="/EmployeeEdit/:id"
            name="employeedata"
            element={<EmployeeEdit />}
          ></Route>
          <Route path="/StaffEdit/:id" name="staffdata" element={<StaffEdit />}></Route>
          <Route path="/Login/:id" name="logindata" element={<Login />}></Route>
          <Route path="/ValueListEdit/:id" name="valulistdata" element={<ValueListEdit />}></Route>
          <Route
            path="/SubCategoryEdit/:id"
            name="subcategorydata"
            element={<SubCategoryEdit />}
          ></Route>
          <Route path="/CategoryEdit/:id" name="categorydata" element={<CategoryEdit />}></Route>
          <Route path="/SupportEdit/:id" name="supportdata" element={<SupportEdit />}></Route>
          <Route path="/SettingEdit/:id" name="settingdata" element={<SettingEdit />}></Route>
          <Route path="/Inventory" name="inventorydata" element={<InventoryTable />}></Route>
          <Route path="/inventoryEdit/:id" name="inventorydata" element={<InventoryEdit />}></Route>
          <Route path="/UserGroupEdit/:id" name="usergroupdata" element={<UserGroupEdit />}></Route>
          <Route
            path="/PurchaseOrderEdit/:id"
            name="purchaseorderdata"
            element={<PurchaseOrderEdit />}
          ></Route>
          <Route path="/MilestoneEdit/:id" name="milestonedata" element={<MilestoneEdit />}></Route>
          <Route path="/TaskEdit/:id" name="taskdata" element={<TaskEdit />}></Route>
          <Route
            path="/ProjectTimesheetEdit/:id"
            name="timesheetdata"
            element={<ProjectTimesheetEdit />}
          ></Route>
          <Route path="/TaskJobEdit/:id" name="teamdata" element={<TaskJobEdit />}></Route>

          {/* Supplier Modal */}
          <Route
            path="/SupplierHistory/:id"
            name="supplierdata"
            element={<SupplierHistory />}
          ></Route>
          <Route path="/SubConHistory/:id" name="subcondata" element={<SubConHistory />}></Route>
          <Route
            path="/TimesheetEdit/:id"
            name="timesheettdata"
            element={<TimesheetEdit />}
          ></Route>
          <Route
            path="/JobInformationEdit/:id"
            name="jobinformationdata"
            element={<JobInformationEdit />}
          ></Route>

          <Route path="/pdf/:id" name="pdfData" element={<PdfData />}></Route>
          <Route path="/pdfnext" name="pdfData" element={<PdfNext />}></Route>
          <Route path="/TicketsComponent" name="pdfData" element={<TicketsComponent />}></Route>
          <Route path="/projects" element={<DataTable />} />
          <Route path="/" element={<Classic />} />
          <Route path="/dashboards/crypto" name="Classic" element={<Crypto />}></Route>
          <Route path="/dashboards/ecommerce" name="ecommerce" element={<Ecommerce />}></Route>
          <Route path="/dashboards/general" name="general" element={<General />}></Route>
          <Route path="/dashboards/extra" name="extra" element={<Extra />}></Route>
          <Route path="/about" name="about" element={<About />}></Route>
          <Route path="/apps/notes" name="notes" element={<Notes />}></Route>
          <Route path="/apps/chat" name="chat" element={<Chat />}></Route>
          <Route path="/apps/contacts" name="contacts" element={<Contacts />}></Route>
          <Route path="/apps/calendar" name="calendar" element={<Calendar />}></Route>
          <Route path="/apps/email" name="email" element={<Email />}></Route>
          <Route path="/ecom/shop" name="email" element={<Shop />}></Route>
          <Route path="/ecom/shopdetail" name="email" element={<ShopDetail />}></Route>
          <Route path="/tickt/ticket-list" name="ticket list" element={<TicketList />}></Route>
          <Route path="/Enquiry" name="tenderdata" element={<EnquiryTable />}></Route>
          <Route
            path="/tickt/ticket-detail"
            name="ticket detail"
            element={<TicketDetail />}
          ></Route>
          <Route path="/apps/treeview" name="email" element={<Treeview />}></Route>
          <Route path="/ui/alerts" name="alerts" element={<Alerts />}></Route>
          <Route path="/ui/badges" name="badges" element={<Badges />}></Route>
          <Route path="/ui/buttons" name="buttons" element={<Buttons />}></Route>
          <Route path="/ui/cards" name="cards" element={<Cards />}></Route>
          <Route path="/ui/grid" name="grid" element={<Grid />}></Route>
          <Route path="/ui/table" name="table" element={<Tables />}></Route>
          <Route path="/ui/forms" name="forms" element={<Forms />}></Route>
          <Route path="/ui/breadcrumbs" name="breadcrumbs" element={<Breadcrumbs />}></Route>
          <Route path="/ui/dropdown" name="dropdown" element={<Dropdowns />}></Route>
          <Route path="/ui/button-group" name="button group" element={<BtnGroup />}></Route>
          <Route path="/ui/collapse" name="collapse" element={<Collapse />}></Route>
          <Route path="/ui/list-group" name="list-group" element={<ListGroup />}></Route>
          <Route path="/ui/modal" name="modal" element={<Modal />}></Route>
          <Route path="/ui/navbar" name="navbar" element={<Navbar />}></Route>
          <Route path="/ui/nav" name="nav" element={<Nav />}></Route>
          <Route path="/ui/pagination" name="pagination" element={<Pagination />}></Route>
          <Route path="/ui/popover" name="popover" element={<Popover />}></Route>
          <Route path="/ui/progress" name="progress" element={<Progress />}></Route>
          <Route path="/ui/spinner" name="spinner" element={<Spinner />}></Route>
          <Route path="/ui/tabs" name="tabs" element={<Tabs />}></Route>
          <Route path="/ui/toasts" name="toasts" element={<Toasts />}></Route>
          <Route path="/ui/tooltip" name="tooltip" element={<Tooltip />}></Route>
          <Route path="/form-layout/form-basic" name="form-basic" element={<FormBasic />}></Route>
          <Route path="/form-layout/form-grid" name="form-grid" element={<FormGrid />}></Route>
          <Route path="/form-layout/form-group" name="form-group" element={<FormGroup />}></Route>
          <Route path="/form-layout/form-input" name="form-input" element={<FormInput />}></Route>
          <Route path="/form-pickers/datepicker" name="datepicker" element={<Datepicker />} />
          <Route path="/form-pickers/tag-select" name="tag-select" element={<TagSelect />}></Route>
          <Route path="/form-validation" name="form-validation" element={<FormValidate />}></Route>
          <Route path="/form-steps" name="form-steps" element={<FormSteps />}></Route>
          <Route path="/form-editor" name="form-editor" element={<FormEditor />}></Route>

          <Route path="/tables/basic-table" name="basic-table" element={<Basictable />}></Route>
          <Route path="/tables/react-table" name="react-table" element={<CustomReactTable />} />
          <Route path="/tables/data-table" name="data-table" element={<ReactBootstrapTable />} />
          <Route path="/charts/apex" name="apex" element={<ApexCharts />}></Route>
          <Route path="/charts/chartjs" name="chartjs" element={<ChartJs />}></Route>
          <Route path="/sample-pages/profile" name="profile" element={<Profile />}></Route>
          <Route path="/sample-pages/helper-class" name="helper-class" element={<HelperClass />} />
          <Route path="/sample-pages/starterkit" name="starterkit" element={<StarterKit />} />
          <Route path="/sample-pages/gallery" name="gallery" element={<Gallery />}></Route>
          <Route
            path="/sample-pages/search-result"
            name="search-result"
            element={<SearchResult />}
          />
          <Route path="/icons/bootstrap" name="bootstrap" element={<Bootstrap />}></Route>
          <Route path="/icons/feather" name="feather" element={<Feather />}></Route>
          <Route path="/map/vector" name="vector" element={<CustomVectorMap />}></Route>
          <Route path="/widget" name="widget" element={<Widget />}></Route>
          <Route path="/casl" name="casl" element={<CASL />}></Route>
          <Route path="/auth/404" name="404" element={<Error />}></Route>
          <Route path="/projects/addproject" name="addproject" element={<AddProjects />}></Route>
          <Route
            path="/projects/editproject/:id"
            name="editproject"
            element={<EditProject />}
          ></Route>
          <Route path="/projects/projectreport" name="projectreport" element={<Reports />}></Route>
          <Route
            path="/OverAllSalesSummaryReport"
            name="reports"
            element={<OverallSalesReportTable />}
          ></Route>
          <Route path="/InvoiceByYear" name="reports" element={<InvoiceByYearTable />}></Route>
          <Route path="/TeamRevenue" name="reports" element={<TeamRevenue />}></Route>
          {/* Tender */}
        
          <Route path="/Task" name="taskdata" element={<TaskTable />}></Route>
          
          <Route
            path="/ProductDetails"
            name="productdata"
            element={<ProductDetailsTable />}
          ></Route>

          <Route path="/Project" name="projectdata" element={<ProjectTable />}></Route>
          <Route path="/Client" name="clienttdata" element={<ClientTable />}></Route>
          <Route path="/ClientDetails" name="clienttdata" element={<ClientDetailsTable />}></Route>
          {/* <Route path="/TaskDetails" name="taskdata" element={<TaskDetailsTable />}></Route> */}
          <Route path="/Lead" name="leaddata" element={<LeadTable />}></Route>
          <Route path="/LeadDetails" name="leaddata" element={<LeadDetailsTable />}></Route>
          <Route path="/Product" name="productdata" element={<ProductTable />}></Route>
          <Route path="/Timesheet" name="timesheetdata" element={<TimesheetTable />}></Route>
          <Route path="/WorkSheet" name="accountdata" element={<WorkSheetTable />}></Route>
          <Route
            path="/TimesheetDetails"
            name="timesheetdata"
            element={<TimesheetDetailsTable />}
          ></Route>

          <Route path="/Finance" name="financedata" element={<FinanceTable />}></Route>
          <Route path="/Invoice" name="invoicedata" element={<InvoiceTable />}></Route>
          <Route path="/Accounts" name="accountdata" element={<AccountsTable />}></Route>
          <Route path="/AccountDetails" name="accountdata" element={<AccountDetails />}></Route>
          <Route path="/ExpenseHead" name="expenseheaddata" element={<ExpenseHeadTable />}></Route>
          <Route
            path="/ExpenseHeadDetails"
            name="expenseheaddata"
            element={<ExpenseHeadDetails />}
          ></Route>
          <Route path="/Supplier" name="supplierdata" element={<SupplierTable />}></Route>
          <Route
            path="/SupplierDetails"
            name="supplierdata"
            element={<SupplierDetailsTable />}
          ></Route>
          <Route path="/Subcon" name="subcondata" element={<SubConTable />}></Route>
          <Route path="/SubConDetails" name="subcondata" element={<SubConDetailsTable />}></Route>
          <Route path="/Inventory" name="inventorydata" element={<InventoryTable />}></Route>
          <Route path="/Vehicle" name="vehicledata" element={<VehicleTable />}></Route>
          <Route path="/VehicleDetails" name="vehicledata" element={<VehicleDetails />}></Route>
          <Route path="/Leave" name="leavedata" element={<LeaveTable />}></Route>
          <Route path="/LeaveDetails" name="leavedata" element={<LeaveDetailsTable />}></Route>
          <Route path="/Loan" name="loandata" element={<LoanTable />}></Route>
          <Route path="/LoanDetails" name="loandata" element={<LoanDeatilsTable />}></Route>
          <Route
            path="/TrainingDetails"
            name="trainingdata"
            element={<TrainingDetailsTable />}
          ></Route>
          <Route path="/Training" name="trainingdata" element={<TrainingTable />}></Route>
          <Route
            path="/JobInformation"
            name="jobinformationdata"
            element={<JobInformationTable />}
          ></Route>
          <Route
            path="/JobInformationDetails"
            name="jobinformationdata"
            element={<JobInformationDetailsTable />}
          ></Route>

          <Route path="/CPFCalculator" name="cpfdata" element={<CPFCalculatorTable />}></Route>
          <Route
            path="/CPFCalculatorDetails"
            name="cpfdata"
            element={<CPFCalculatorDetails />}
          ></Route>
          <Route path="/Staff" name="staffdata" element={<StaffTable />}></Route>
          <Route path="/StaffDetails" name="staffdata" element={<StaffDetailsTable />}></Route>
          <Route path="/SubCategory" name="subcategorydata" element={<SubCategoryTable />}></Route>
          <Route path="/ProjectReport" name="report" element={<ProjectReportTable />}></Route>
          <Route
            path="/SubCategoryDetails"
            name="subcategorydata"
            element={<SubCategoryDetailsTable />}
          ></Route>

          <Route path="/Valuelist" name="valuelistdata" element={<ValuelistTable />}></Route>
          <Route
            path="/ValuelistDetails"
            name="valuelistdata"
            element={<ValuelistDetailsTable />}
          ></Route>
          <Route path="/Section" name="sectiondata" element={<Section />}></Route>
          <Route path="/SectionDetails" name="sectiondata" element={<SectionDetails />}></Route>
          <Route path="/ProjectDetails" name="sectiondata" element={<ProjectDetails />}></Route>
          <Route path="/Setting" name="settingdata" element={<SettingTable />}></Route>
          <Route
            path="/MilestoneList"
            name="milestonedata"
            element={<MilestoneListTable />}
          ></Route>
          <Route
            path="/MilestoneDetails"
            name="milestonedata"
            element={<MilestoneDetails />}
          ></Route>
          <Route
            path="/ProjectTimesheetDetails"
            name="timesheetdata"
            element={<ProjectTimesheetDetails />}
          ></Route>
          <Route
            path="/ProjectTaskDetails"
            name="taskdata"
            element={<ProjectTaskDetails />}
          ></Route>
          <Route path="/TaskJobDetails" name="teamdata" element={<TaskJobDetails />}></Route>
          <Route path="/TaskList" name="taskdata" element={<TaskListTable />}></Route>
          <Route
            path="/TimesheetList"
            name="timesheetdata"
            element={<TimesheetListTable />}
          ></Route>

          <Route path="/TaskJob" name="teamdata" element={<TaskJobTable />}></Route>
          <Route path="/ProjectTask" name="taskdata" element={<ProjectTaskTable />}></Route>
          <Route
            path="/ProjectTimeSheet"
            name="timesheetdata"
            element={<ProjectTimeSheetTable />}
          ></Route>
          <Route path="/SettingDetails" name="settingdata" element={<SettingDetails />}></Route>
          <Route path="/Category" name="categorydata" element={<CategoryTable />}></Route>
          <Route path="/CategoryDetails" name="categorydata" element={<CategoryDetails />}></Route>
          <Route path="/UserGroup" name="usergroupdata" element={<UserGroupTable />}></Route>
          <Route
            path="/UserGroupDetails"
            name="usergroupdata"
            element={<UserGroupDetails />}
          ></Route>
          <Route path="/Employee" name="employeedata" element={<Employee />}></Route>
          <Route
            path="/EmployeeDetails"
            name="employeedata"
            element={<EmployeeDetailsTable />}
          ></Route>
          {/* <Route
            path="/EmployeeDetailsData/:id"
            name="employeedata"
            element={<EmployeeDetailsData />}
          ></Route> */}
          <Route
            path="/PayrollManagement"
            name="payrollmnagementdata"
            element={<PayrollManagementTable />}
          ></Route>
          <Route
            path="/PayrollManagementDetails/:id"
            name="payrollmanagementdata"
            element={<PayrollManagementDetails />}
          ></Route>
          <Route path="/Content" name="contentdata" element={<Content />}></Route>
          <Route path="/Help" name="contentdata" element={<Help />}></Route>
          <Route
            path="/ContentDetails"
            name="contentdata"
            element={<ContentDetailsTable />}
          ></Route>
          <Route path="/test" name="clienttdata" element={<TestTable />}></Route>
          <Route path="/Support" name="supportdata" element={<Support />}></Route>
          <Route path="/SupportNew" name="supportdata" element={<SupportNewTable />}></Route>
          <Route path="/SupportDetails" name="tenderdata" element={<SupportDetails />}></Route>
          <Route path="/PurchaseOrder" name="purchasedata" element={<PurchaseOrderTable />}></Route>
          <Route
            path="/Employeetrainingreports"
            name="reports"
            element={<EmployeetrainingreportsTable />}
          ></Route>
          <Route
            path="/StatementofAccountsReport"
            name="reports"
            element={<StatementofAccountsReport />}
          ></Route>
          <Route path="/AgingReports" name="reports" element={<AgingReportsTable />}></Route>
          <Route path="/CpfSummaryreports" name="reports" element={<CpfSummaryReports />}></Route>
          <Route path="/InvoiceByMonth" name="reports" element={<InvoiceByMonth />}></Route>
          <Route
            path="/EmployeeSalaryReport"
            name="reports"
            element={<EmployeeSalaryReport />}
          ></Route>
          <Route
            path="/PayslipGeneratedReports"
            name="reports"
            element={<PayslipGeneratedReports />}
          ></Route>
          <Route path="/IR8AReport" name="reports" element={<IR8AReport />}></Route>
          <Route path="/PurchaseGstReport" name="reports" element={<PurchaseGstReport />}></Route>

          <Route
            path="/PurchaseOrderDetails"
            name="purchaseorder"
            element={<PurchaseOrderDetails />}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default Routernew;
