
import './App.css';
import LoginForm from './Components/Authentification/login';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import RegisterForm from './Components/Authentification/register';
import ListSujets from './Components/Sujets/ListSujets';

function App() {
  return (
    <div className="App">
   
   <BrowserRouter>
        <Switch>
         
          <Route path="/" exact render={(props) => <LoginForm {...props} />} />
          <Route path="/login" exact render={(props) => <LoginForm {...props} />} />
          <Route path="/register" exact render={(props) => <RegisterForm {...props} />} />
          <Route path="/Sujets" exact render={(props) => <ListSujets {...props} />} />

         
         
         
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
