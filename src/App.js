import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import TopNavBar from './components/TopNavBar';
import Login from './components/login';
import Signup from './components/signup';
import TaskDetails from './components/taskDetails';
import TasksList from './components/tasksList';
import addTaskForm from './components/addTaskForm';
function App() {
  return (
    <div className="App">
    <div>
      <TopNavBar/>
    </div>
      <div>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup"  component={Signup}/>
            <Route exact path="/user/:id" component={TasksList}/>
            <Route exact path="/user/:id/add" component={addTaskForm} />
            <Route exact path="/tasks/:id/details/:taskId" component={TaskDetails} />
            <Route path="*" component={TaskDetails} />
            <Route exact path="/" render={() => <Redirect to="/tasks" />} />
          </Switch>
        </Router>
      </div>

    </div>
  );
}

export default App;
