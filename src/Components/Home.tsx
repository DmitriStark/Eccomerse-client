import "../css/Home.css";

export function Home() {
  return (
    <div className="home-container">
      <div className="me-container">
        <img src="images/mewobackground.png" alt="" />
      </div>
      <div className="obout">
        <h1>Its Me ╰(*°▽°*)╯</h1>
        <p>my github <a href="https://github.com/DmitriStark">Click here</a></p>
        <p>my youtube <a href="https://www.youtube.com/channel/UCibMun2cCSrO_sC9cy36lUQ">Click here</a></p>
      </div>
    </div>
  );
}
