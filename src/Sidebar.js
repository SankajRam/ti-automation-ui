import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './styles/Sidebar.css';

/**
 * Sidebar component for rendering a navigation sidebar.
 * @param {Object} props - The component props.
 * @param {string} props.activePage - The active page identifier.
 * @param {function} props.onPageChange - The callback function for page change.
 * @param {Array} props.pages - The array of page objects.
 * @returns {JSX.Element} - JSX element representing the navigation sidebar.
 */
const Sidebar = ({ activePage, onPageChange, pages }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  /**
   * Toggles the sidebar open/close state.
   */
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <aside className={`sidebar ${isSidebarOpen ? '' : 'collapsed'}`}>
      <div className="toggle-button" onClick={handleToggleSidebar}>
        {/* Display different icons based on the sidebar state */}
        {isSidebarOpen ? (
          <FaTimes className="icon-collapse" />
        ) : (
          <FaBars className="icon-expand" />
        )}
      </div>
      <ul>
        {/* Render navigation buttons */}
        {pages.map((page) => (
          <li key={page.id}>
            <button
              onClick={() => onPageChange(page.id)}
              className={activePage === page.id ? 'active' : ''}
            >
              {page.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;