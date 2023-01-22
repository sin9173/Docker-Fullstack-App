import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

import Axios from 'axios';

function App() {

  const [lists, setLists] = useState([])
  const [value, setValue] = useState("")

  useEffect(() => {
    //여기서 데이터베이스에 있는 값을 가져옴
    Axios.get(`/api/values`)
    .then(response => {
      console.log('response : ', response.data);
      setLists(response.data);
    })
  }, [])

  //CHANGE EVENT (키입력시 이벤트)
  const changeHandler = (event) => {
    setValue(event.currentTarget.value);
  }

  //SUBMIT EVENT (데이터를 서버로 보냄)
  const submitHandler = (event) => {
    event.preventDefault();

    Axios.post(`/api/value`, {value: value})
    .then(response => {
      if(response.data.success) {
        console.log('response : ', response);
        setLists([...lists, response.data])
        setValue("")
      } else {
        alert('값을 DB에 넣는데 실패했습니다.');
      }
    })
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
      <div className="container">

        {/* state에 있는 데이터 가져오기 */}
        {lists && lists.map((list, index) => (
          <li key={index}>{list.value}</li>
        ))}
        <br/>

        <form className="example" onSubmit={submitHandler}>
          <input type="text" placeholder="입력해주세요." onChange={changeHandler} value={value}/>
          <button type="submit">확인</button>
        </form>
      </div>
      </header>
    </div>
  );
}

export default App;
