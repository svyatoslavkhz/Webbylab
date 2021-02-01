import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Navbar} from './components/Navbar';
import {MainPage} from './pages/MainPage'
import {CreatePage} from './pages/CreatePage';
import {EditPage} from './pages/EditPage';
import {ImportPage} from './pages/ImportPage'
import {MoviePage} from './pages/MoviePage';
import './App.css';
import 'materialize-css';


function App() {
  return (
    <div className="App">
       <Router>
         <Navbar />
         <Switch>
         <div className="container">
           <Route path='/' exact component={MainPage} />
           <Route path='/create' exact component={CreatePage} />
           <Route path='/import' exact component={ImportPage} />
           <Route path='/edit/:id' component={EditPage} />
           <Route path='/movie/:id' exact component={MoviePage} />
          </div>
         </Switch>
         </Router>
      </div>
  );
}

export default App;
