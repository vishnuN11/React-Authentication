
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import About from './component/About';
import Home from './component/Home';
import LoginNew from './component/LoginNew';
import Navbar from './component/Navbar';
import Register from './component/Register';
import Login from './Login';
import Profile from './Profile';
import {Provider} from 'react-redux';

import {store} from './redux/store'


function App() {

  
  return (
    <Provider store={store}>
<BrowserRouter>
<Navbar/>
<Route path="/" exact component={Home}></Route>
<Route path="/about"  component={About}></Route>
<Route path="/login"  component={LoginNew}></Route>
<Route path="/register"  component={Register}></Route>

</BrowserRouter>

</Provider>
     
   
  );
}

export default App;
