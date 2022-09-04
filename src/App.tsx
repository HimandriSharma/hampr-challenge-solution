import "antd/dist/antd.min.css";
import Characters from './components/Characters'
import Navbar from './components/Navbar'


function App() {
  return (
    <div className="App">
      <Navbar />
      <Characters />
    </div>
  )
}

export default App