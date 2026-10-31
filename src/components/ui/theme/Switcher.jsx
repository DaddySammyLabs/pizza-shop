/* src/components/theme/Switcher.jsx */

import "./Switcher.css";
import sunIcon from "../../assets/icons/icon-sun.svg";
import moonIcon from "../../assets/icons/icon-moon.png";

function Switcher() {
  return (
    <div className="switch">
      <div className="theme light">
        <img src={sunIcon} alt="sun" />
      </div>
    </div>
  );
}

export default Switcher;

// function Switcher() {
//   return (
//     <div className="switch">
//       <div className="theme light"></div>
//     </div>
//   );
// }

// export default Switcher;
