
import { motion } from "framer-motion";
import AuthService from './services/auth.service';
import useState from 'react'
import '../src/dist/modal.css';

function Modal({
  active,
  setActive,
  text,
  btn1,
  btn2
}) {
const [active, setActive] = useState(false);

  const clickLogout = () => {
    AuthService.logout().then(
        () => {
          setActive(false);
           window.location.reload(true)
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
  
        }
      );
  };



  return (
    <div
      className={active ? "modal-background modal-active" : "modal-background"}
      onClick={() => setActive(false)}
    >
      {active && (
        <motion.div
          className="modal"
          id="glow-on-hover-modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            type: "spring",
          }}
        >
          
            <div className="modal-logout">
              <p>{text}</p>
              <div className="modal-btns">
                <button className="open-btn" onClick={() => setActive(false)}>
                  {btn1}
                </button>
                <button
                  className="close-btn open-btn"
                  onClick={clickLogout}
                >
                  {btn2}
                </button>
              </div>
            </div>
          
        </motion.div>
      )}
    </div>
  );
}

export default Modal;
