import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  Outlet
} from "react-router-dom";
import NavBarHeader from "./Pages/Web/Components/navbar";
import Home from './Pages/Web/home';
import Login from './Pages/Web/login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostQuestion from './Pages/Web/post_questions';
import Footer from "./Pages/Web/Components/Footer";
import MyPost from "./Pages/Web/MyPost";
import MyPostEdit from "./Pages/Web/MyPostEdit";
import AllPost from "./Pages/Web/AllPost";

const Layout = () => {
  return (
    <>
     <NavBarHeader/>
     <Outlet />
     <Footer/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path : "/",
    element : <Layout/>,
    children : [
     {
      path : "/",
      element : <Login/>
     },
     {
      path : "/home",
      element : <Home/>
     },
     {
      path : "/create-new-post",
      element : <PostQuestion/>
     },
     {
      path : "/my-post",
      element : <MyPost  title="My Posts" items="self"/>
     },
     {
      path : "/all-post",
      element : <AllPost  title="All Posts" items="all"/>
     },
     {
      path : "/my-post-edit/:slug",
      element : <MyPostEdit/>
     }

    ]
  },
  {
    path : "/login",
    element : <Login/>
  }
])

const App = () =>{
  return (
    <div >
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
