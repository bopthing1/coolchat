import socketClient from "socket.io-client";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

const SERVER = "localhost:9000";

function App() {
  const socket = socketClient(SERVER);
  socket.emit("e", "e");

  return (
    <div className="App">
      <p>hello react!</p>
    </div>
  );
}

export default App;
