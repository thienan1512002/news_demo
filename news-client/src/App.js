import logo from './logo.svg';
import './App.css';
import News from './Component/News';
import NewsContent from './Component/NewsContent';
import CreateNewsContent from './Component/CreateNewContent';
import NewsHasApproved from './Component/NewsHasApproved';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
 function App() {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/news-details">News Details</Link>
        </li>
        <li>
          <Link to="/create-news-header">Create News Header </Link>
        </li>
      </ul>
      <br></br>
      <Switch>
        <Route exact path="/">
          <NewsHasApproved />
        </Route>
        <Route
          path="/create-news-content/:id"
          children={<CreateNewsContent />}
        />

        <Route path="/news-details/:id" children={<NewsContent/>}/>
          
        
        <Route path="/create-news-header">
          <News />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
