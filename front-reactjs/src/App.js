
import './App.css';
import LoginForm from './Components/Authentification/login';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import RegisterForm from './Components/Authentification/register';

function App() {
  return (
    <div className="App">
   
   <BrowserRouter>
        <Switch>
         
          <Route path="/" exact render={(props) => <LoginForm {...props} />} />
          <Route path="/login" exact render={(props) => <LoginForm {...props} />} />
          <Route path="/register" exact render={(props) => <RegisterForm {...props} />} />
         
         
         
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
