
import React, {useEffect, useState} from 'react';

import {Link} from 'react-router-dom'
import axios from 'axios'
import './App.css';
import AuthService from './services/auth.service';

function SessionsReactPage(){
 const  lessonUsername  = JSON.parse(localStorage.getItem("user").replace(/(?=,(?!"))(,(?!{))/g,''));;
 const [data, setSessions] = useState([]);
 const [isJoined, setIsJoined] = useState(false);
 const [userInputData, setUserInputData] = useState('');

 const getData = async () =>{
    const  { data } = await axios.post("http://localhost:4000/api/sessions",{
      //https://snowboardaddictionreact.onrender.com
      username: lessonUsername
    });
    setSessions(data)
 }

  useEffect(()=>{
      getData();
  }, [isJoined])

    const getInitialState = () => {
      const value = '';
      return value;
    }; 
    const [value, setValue] = useState(getInitialState);
    function getInputData(val){
      setUserInputData(val.target.value.toLowerCase())
    }

    function getDropValue(e){
      setValue(e.target.value);
    }

    let uniqueSessionTypes = (data) =>{
        let uniqueTypes = [
          ...new Set(data.map((element)=> element.lessonType))
        ];
        return uniqueTypes
    }

    const handleJoinLesson = (event, param1, param2) => {
      AuthService.joinLesson(lessonUsername,  param1, param2).then(
        ()  => {
          console.log('User joined te session');
          setIsJoined(prev=>!prev);
        },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
                console.log(resMessage);
            }
      )
    
    }


    return(
      <div className="RegisterPageContainer">
            <div className="navigationRegister">
              <Link to="/"> 
                <img className="logoRegister" src="/images/SA_Primary_Black_Lettering_CMYK_40795a05-689d-4bb9-95de-a4b1596bfaa0_110x.avif" width="55" height="55"  alt="" />
              </Link>
            </div>
            <div className="bigSearchContainer">
              <div className="searchContainer">
                <label className='labelClass'>
                Find a session by type: <input className="userSearchInput" placeholder="Enter session type" type="text" onChange={getInputData} />
                </label>
             </div>
            
              <div className="searchDropContainer">
                  <label for="sessions">Choose session type:</label>
                  <select className='gridItem' name="sessions" value={value}  onChange={getDropValue} selected="selected">
                      <option value="" selected="selected" hidden="hidden">Choose here</option>
                      <option value={"All sessions"}>All sessions</option>
                      {uniqueSessionTypes(data).map(data=>(
                        <option value={data}>{data}</option>
                      ))}
                  </select>
                  <p> { userInputData ? 
                    `Clear search input to choose from the DropBox!`
                  : `You selected ${value}`}</p>
              </div>
          </div>
         
            <div className="sessionBorderContainer" >
            <div className="gridCollumnTitles">
            <div className='sessionTypeTitle'>Session Type</div>
                <div className='sessionDateTitle'>Session Date</div>
                <div className='sessionDescriptionTitle'>Session Description</div> 
                <div className='sessionDescriptionTitleEmpty'></div> 
                </div>
            { data.filter(session=>{
                 if (userInputData === '' && value ==='') {return session
                 } else if ((value !== "All sessions") && userInputData === '') {return session.lessonType.toLocaleLowerCase().includes(value.toLocaleLowerCase())}
                 else {return session.lessonType.toLocaleLowerCase().includes(userInputData)}
            }).map((sessions, index) => 
                  (         <>
                 
                         <div className="lessonType" key={index} value={sessions.lessonType}> {sessions.lessonType}</div> 
                          <div className="lessonDate" key={index}  value={sessions.lessonDate}> {sessions.lessonDate}</div> 
                          <div className="lessonDescription" key={index}  value={sessions.lessonDescription}> {sessions.lessonDescription}
                          </div>
                           <button className="sessionJoinButton" onClick={event=> handleJoinLesson(event, sessions.lessonDate, sessions.lessonType)}>Join session</button> 
                          </>
                  ))}    
            </div>          
    </div>
    )


}

export default SessionsReactPage;