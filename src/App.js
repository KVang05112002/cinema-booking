import './App.scss';
import { BrowserRouter, Route } from 'react-router-dom';

import Footer from './component/footer/Footer';
import Header from './component/header/Header';
import Router from './configs/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <BrowserRouter>
      <Route render={
        props => (
          <>
            <Header  {...props} />
            <Router />
            <Footer />

          </>
        )
      } />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
