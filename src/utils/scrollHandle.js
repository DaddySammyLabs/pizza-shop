// toUse in in main-app
function App() {
  const [scroll, setScroll] = useState(0);
  const scrollUp = () => {
    setScroll(window.scrollX);
  };

  const upButton = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useState(() => {
    window.addEventListener("scroll", scrollUp);
  }, []);

  const toBlock = (heigh) => {
    window.scrollTo({ top: heigh, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY);

    window.addEventListener("scroll", handleScroll);

    // cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div ref={parent} className="apps">
        <Header upButton={upButton} toBlock={toBlock} />
      </div>

      <Guarantees upButton={upButton} scroll={scroll} />
    </>
  );
}
export default App;

// toUse in in component
// function Header({ upButton, toBlock }) {
//   return (
//     <>
//       <ul className="navbar-list">
//         <li>
//           <a onClick={upButton}>{texts.about}</a>
//           {/* <button onClick={upButton}>{texts.about}</button> */}
//         </li>
//         <li>
//           <a onClick={() => toBlock(600)}>{texts.service}</a>
//         </li>
//         <li>
//           <a onClick={() => toBlock(1200)}>{texts.portfolio}</a>
//         </li>
//       </ul>
//     </>
//   );
// }
// export default Header;

// function Guarantees({ upButton, scroll, texts }) {
//   return (
//     <>
//       <div onClick={upButton} className="footer">
//         {texts.author}
//       </div>
//       <div onClick={upButton} className={scroll < 1960 ? "" : "btn-up"}>
//         <img src={"/icons/up.svg"} />
//       </div>
//     </>
//   );
// }
// export default Guarantees;

// styles.css scroll-up-button
// .btn-up {
//   position: fixed;
//   right: 5vw;
//   bottom: 6vw;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   transition: 0.3s linear;
//   animation: appearance 2s forwards;
//   border: none;
//   opacity: 0;
//   transform: translateY(0px);
//   background: transparent;

//   /* width: 50px; */
// }

// .btn-up img {
//   width: 100%;
// }
