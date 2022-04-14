import './App.css';
import News from './Component/News';
import NewsContent from './Component/NewsContent';
import CreateNewsContent from './Component/CreateNewContent';
import NewsHasApproved from './Component/NewsHasApproved';
import UpdateSequence from './Component/UpdateSequence';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
 function App() {
  return (
    
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand">iWorkspace</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create-news-header">
                  Create News Header{" "}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <br></br>
      <Switch>
        <Route exact path="/">
          <NewsHasApproved />
        </Route>
        <Route
          path="/create-news-content/:id"
          children={<CreateNewsContent />}
        />

        <Route path="/news-details/:id" children={<NewsContent />} />
        <Route path="/update-sequence/:id" children={<UpdateSequence />} />
        <Route path="/create-news-header">
          <News />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
