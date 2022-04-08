import logo from './logo.svg';
import './App.css';
import News from './Component/News';
import NewsContent from './Component/NewsContent';
import CreateNewContent from './Component/CreateNewContent';
import NewsHasApproved from './Component/NewsHasApproved';
function App() {
  return (
    <div className="container">
      <NewsContent />
    </div>
  );
}

export default App;
