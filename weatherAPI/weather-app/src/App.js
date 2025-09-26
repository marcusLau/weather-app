import './App.css';
import { Button } from './components'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <p>Get current weather information for any city</p>
      </header>
      <main className="App-main">
        <Button className="click-button">
          Test
        </Button>
        {/* Search form will go here */}
        {/* Weather display will go here */}
      </main>
    </div>
  );
}

export default App;
