import './App.css';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';

function App() {

  const Layout = () => (
    <div className='app_wrapper'>
      <div className="appContainer">
        <Sidebar />
        <div className="appOutlet">
          <Topbar />
          <div className="outlet-wrapper">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );


  const SecuriteRoute = ({children}) =>{
/*     if(!currentUser){
      return(
        <Navigate to="/login" />
      )
    } */
    return children;
}


  const router = createBrowserRouter([
    {
      path: '/',
      element: (<SecuriteRoute><Layout/></SecuriteRoute>),
      children:[
        {
          path: '/',
          element: <Home/>,
        }
      ]
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/register',
      element: <Register/>
    }
]);

  return (    
    <>
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
