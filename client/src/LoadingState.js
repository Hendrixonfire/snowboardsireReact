import { motion } from "framer-motion";
import '../src/dist/loadingstate.css'
function LoadingState({ err }, props) {
  const btnReload = () => {
    window.location.reload();
  };
  return (
    <div className="loaderDiv">
      <motion.div
        className="loader"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, ease: "linear", repeat: Infinity }}
      >
        <motion.div className="loadingCircle"></motion.div>
      </motion.div>
      {err && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Undexpected Error!</p>
          <button className="open-btn" onClick={btnReload}>
           Reload
          </button>
        </div>
      )}
    </div>
  );
}
export default LoadingState;
