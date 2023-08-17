# Cloud Automation Tool - React Frontend

This project is a React frontend for a cloud automation tool that simplifies the creation of Azure CAF configuration files (tfvars). Users can fill out a form, providing the necessary inputs. The form data is then converted to JSON and sent to a backend API server. The backend processes the JSON input, generates tfvars files using Jinja2 templates, and returns the tfvars data. The tfvars data is displayed in a text area on the page, allowing users to review and make any necessary changes. Additionally, the interface provides convenient features to save the tfvars data as a file or copy it to the clipboard, enabling users to quickly download or share the generated tfvars files

## Project Structure

The project structure is based on the Create React App (CRA) boilerplate.

## Prerequisites

Before running the project, ensure you have the following dependencies installed:

- Node.js (v18.16.0 or higher)
- npm (v9.7.2 or higher)

## Quickstart

Follow these steps to set up the project:

1. Clone the repository to your local machine.
2. Navigate to the project directory: `cd ti-automation-ui`
3. Install dependencies: `npm install`
4. Set up environment variables:
   - Ensure there is a `.env` file in the root directory.
   - Modify the `REACT_APP_API_BASE_URL` environment variables if the backend API address has changed.
5. Start the development server: `npm start`
6. Access the application at [http://localhost:3000](http://localhost:3000)

---
**NOTE**
This project is built using Create React App, which provides a foundation for developing React applications. The following scripts are available:

- `npm start`: Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- `npm test`: Launches the test runner in interactive watch mode.
- `npm run build`: Builds the app for production to the `build` folder.

For more information on deployment and troubleshooting, refer to the [Create React App documentation](https://create-react-app.dev/).

---

## Project Documentation

- [Project Documentation: Cloud Automation Tool - React Frontend](./docs/Project_Documentation.md)
