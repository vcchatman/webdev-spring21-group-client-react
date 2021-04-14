import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import home from "./components/home";
import EventDetails from "./components/event-details/event-details";
import AdminDashBoard from "./components/admin/admin-dashboard";
import LogIn from "./components/login/login";
import SignUp from "./components/signUp/signup";
// import Search from "./components/search/search";
import Profile from './components/profile/profile'
import SearchResults from "./components/searchResults";

function App() {

    // const [usernameReg, setUsernameReg] = useState("")
    // const [passwordReg, setPasswordReg] = useState("")

  return (
      <>
        <BrowserRouter>
          <Route path="/" exact={true} component={home}/>
          <Route path="/event/:eventId" exact={true} component={EventDetails}/>
          <Route path="/admin"  component={AdminDashBoard}/>
          <Route path="/search" component={SearchResults}/>
          <Route path="/api/login" exact={true} component={LogIn}/>
          <Route path="/signup" exact={true} component={SignUp}/>
          <Route path="/profile" exact={true} component={Profile}/>
        </BrowserRouter>
      </>
  );
}

export default App;
