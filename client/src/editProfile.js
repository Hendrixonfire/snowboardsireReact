import React, {useEffect, useState, useRef} from 'react';
import { useLocation,useParams ,useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './App.css';
import AuthService from './services/auth.service';
import UserService from './services/user.service';

function EditProfilePageReact(){

  const  lessonUsername  = JSON.parse(localStorage.getItem("user").replace(/(?=,(?!"))(,(?!{))/g,''));
  const [data, setSessions] = useState([]);
  const [isLeft, setIsLeft] = useState(false);
  const [userReview, setUserReview] = useState('');
  const [avatar, setAvatar] = useState("");
  const [userReviewFlag, setUserReviewState] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputAvatar = useRef(null);
  const { username } = useParams();
  const navigate = useNavigate();


  const getJoinedData = async () =>{
    const  { data } = await axios.post("http://localhost:4000/api/joinedSessions",{
      //https://snowboardaddictionreact.onrender.com
      username: lessonUsername
    });
    setSessions(data);

 }

  const getReviewData = async () =>{
    const  { data } = await axios.post("http://localhost:4000/api/userReviews",{
      //https://snowboardaddictionreact.onrender.com
      username: lessonUsername
    });
    setUserReviewState(data);
  }

  useEffect(()=>{
    getReviewData();
  }, [])

  useEffect(()=>{
      getJoinedData();
  }, [isLeft])

  useEffect(() => {
     getUser();
  }, []);

const getUser = async ()=>{
  const  { data } = await axios.post(`http://localhost:4000/api/member`,{
    //https://snowboardaddictionreact.onrender.com
    username: lessonUsername
  })
  console.log(data);
  setAvatar(data.avatar);
}



  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/api/upload", formData);
      setAvatar(data.url);
    } catch (err) {
      alert("Ошибка загрузки файла");
    }
  };

const saveChanges = async (event) => {
  event.preventDefault();
  try {
    const fields = {
      avatar
    };
    await axios.patch(`/api/update/${username}`, fields)
    setLoading(false);
    navigate(`/${username}`);
  } catch (err) {
    setLoading(false);
    console.log(err);
    alert("Ошибка обновления профиля");
  }
};
     
      
  const handleSendReview = (event, param1, param2) => {
    UserService.sendReview(param1, param2).then(
      ()  => {
        console.log('User left a review');
        setUserReviewState(prev=>!prev);
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
      <div className="UserEditPageContainer">
            <div className="navigationEditUserPage">
              <Link to="/">  <img className="logoRegister" src="/images/SA_Primary_Black_Lettering_CMYK_40795a05-689d-4bb9-95de-a4b1596bfaa0_110x.avif" width="55" height="55"  alt="" /></Link>
            
            </div>
            <div className='userEditInfoContainer'>
                <div className="userEditMainInfoContainer">
                  <div className='userEditNameAndAvatarContainer'>
                  <form className="editForm" onSubmit={saveChanges}>
                    <img
                    src={`http://localhost:4000${avatar}`}
                    //https://snowboardaddictionreact.onrender.com
                    className="avatar"
                    alt="logo"
                    onClick={() => inputAvatar.current.click()}
                  />
                      <input
              ref={inputAvatar}
              required
              type="file"
              name="avatar"
              style={{ display: "none" }}
              onChange={handleChangeFile}
            />
                  <h3 className='userEditMainInfoTitle'>{JSON.parse(localStorage.getItem("user").replace(/(?=,(?!"))(,(?!{))/g,''))}</h3> 
                    
                  <button onClick={saveChanges} className="editButton" type="submit">
                      Save changes
                  </button>
                  </form>
                  </div>
                  <div className='reviewEditContainer'>
                    { ( userReviewFlag === null) ? <><span>....Loading</span></>: ( userReviewFlag) ? <><div className="postReviewText"><span>Thank you for leaving a review.</span></div></> : (!userReviewFlag) ? <> <div className="userReviewInput">
                              <textarea className="userEditReviewInputText" type="text" id="review" name="review" required  onChange={e => setUserReview(e.target.value)}/>
                              <label>Review</label>
                        </div>   
                        <button type="submit" className="btnEditReview" onClick={event=>handleSendReview(event, userReview, lessonUsername)}>Send a Review</button> </> : ''}
                  </div>
                </div>
               
            </div>          

            
              
            </div>
          
                  
                
   
    )


}

export default  EditProfilePageReact;