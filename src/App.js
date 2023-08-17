import { useState } from 'react';
import Sidebar from './Sidebar';
import useClearDataOnPageLeave from './hooks/use-clear-data-on-page-leave';
import useUUIDCookie from './hooks/use-uuid-cookie';
import pagesData from './data/pages.json';
import RgFormPage from './pages/RgFormPage/RgFormPage';
import KvFormPage from './pages/KvFormPage/KvFormPage';
import VmFormPage from './pages/VmFormPage/VmFormPage';
import SqlMIFormPage from './pages/SqlMIFormPage/SqlMIFormPage';
import PostgreSqlFormPage from './pages/PostgreSqlFormPage/PostgreSqlFormPage';
import SettingsPanel from './components/SettingsPanel';
import PipelinePage from './pages/PipelinePage/PipelinePage';
import LbFormPage from './pages/LbFormPage/LbFormPage';
import './styles/App.css';

/**
 * App component for rendering the main application.
 * @returns {JSX.Element} JSX element representing the main application.
 */
const App = () => {
  // State to keep track of the active page
  const [activePage, setActivePage] = useState('rg');
  const [portfolio, setPortfolio] = useState('singtel-bu-div-project');
  const [environment, setEnvironment] = useState('dev');
  const uuid = useUUIDCookie();
  const { pages } = pagesData;
  
  // Custom hook to clear data when leaving the page
  useClearDataOnPageLeave(`${process.env.REACT_APP_API_BASE_URL}/end-session/`, uuid);

  /**
   * Object containing page components.
   * @type {Object}
   */
  const PageComponents = {
    RgFormPage,
    KvFormPage,
    VmFormPage,
    SqlMIFormPage,
    PostgreSqlFormPage,
    PipelinePage,
    LbFormPage
  };

  /**
   * Callback function for page change.
   * @param {string} pageId - The identifier of the page to navigate to.
   */
  const handlePageChange = (pageId) => {
    setActivePage(pageId);
  };

  /**
   * Renders the active page based on the current active page state.
   * @returns {JSX.Element|null} JSX element representing the active page, or null if no match.
   */
  const renderActivePage = () => {
    const activePageData = pages.find((page) => page.id === activePage);
    if (activePageData) {
      const ActiveComponent = PageComponents[activePageData.component];
      return (
          <>
            {activePageData.name.toLocaleLowerCase().includes("form") ? <SettingsPanel portfolio={portfolio} onPortfolioChange={handlePortfolioChange} environment={environment} onEnvironmentChange={handleEnvironmentChange} /> : <></>}
            <ActiveComponent uuid={uuid} portfolio={portfolio} environment={environment}/>
          </>    
        );
    }
    return null;
  };

  // Callback function for handling changes in the input fields
  const handlePortfolioChange = (value) => {
    setPortfolio(value);
  };
  
  const handleEnvironmentChange = (value) => {
    setEnvironment(value);
  };

  return (
    <div>
      {/* Render the sidebar component */}
      <Sidebar activePage={activePage} onPageChange={handlePageChange} pages={pages} />
      {/* Render the content of the active page */}
      <div className="content">
        {renderActivePage()}
      </div>
    </div>
  );
};

export default App;