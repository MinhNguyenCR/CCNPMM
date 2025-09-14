import myAvatar from './image/My avatar.jpg'
import './App.css';
import {Button} from 'buoi7/dist/index.js'

function App() {

  function Avatar() {
    return (  
      <div className="avatar">
        <img  src={myAvatar} alt="" style={{ width: "150px", height: "150px" }} />
      </div>
    );
  }

  function MemberInfo() {
    return (  
      <div className="info">
        <h2>Nguyễn Đức Minh</h2>
        <p>Tuổi: 20</p>
        <Button />
      </div>
    );
  }

  function Comment() {
    return (  
      <div className="comment">
        Sinh viên khoa CNTT-HCMUTE
      </div>
    );
  }
  

  return (
    <div className="App">
      <Avatar/>
      <MemberInfo/>
      <Comment/>
    </div>
  );
}

export default App;
