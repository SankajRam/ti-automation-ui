import '../styles/LoadingModal.css';

/**
 * LoadingModal component for rendering a loading modal with the provided content.
 * @param {object} props
 * @param {string} props.children - The content to be displayed within the loading modal.
 */
const LoadingModal = ({ children }) => (
  <div className="loading-modal">
    {children}
  </div>
);

export default LoadingModal;
