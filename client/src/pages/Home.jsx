import React from "react";

const Home = () => {
  return (
    <>
      <main>
        <section className="hero-section">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>We are the world best IT Company</p>
              <h1>Welcome to Apna Web</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                aspernatur odio aperiam non minus. Magni a quaerat tempore
                cumque beatae, repudiandae ut enim quia deleniti laudantium aut
                maiores fugit laborum doloribus est voluptas dolor minu.
              </p>
              <div className="btn btn-group">
                <a href="/contact">
                  <button className="btn">connect now</button>
                </a>
                <a href="/about">
                  <button className="btn secondary-btn">learn more</button>
                </a>
              </div>
            </div>
            {/* hero images */}
            <div className="hero-image">
              <img
                src="./images/home.png"
                alt="heroimage"
                width="400px"
                height="500px"
              />
            </div>
          </div>
        </section>
      </main>

      {/* 2nd section */}
      <section className="section-analytics">
        <div className="container grid grid-four-cols">
          <div className="div1">
            <h2>50+</h2>
            <p>registered companies</p>
          </div>
          <div className="div1">
            <h2>100,00+</h2>
            <p>Clients Happy</p>
          </div>
          <div className="div1">
            <h2>500+</h2>
            <p>Well Know Developers</p>
          </div>
          <div className="div1">
            <h2>24/7</h2>
            <p>Service</p>
          </div>
        </div>
      </section>

      {/* 3rd section */}
      <section className="hero-section">
        <div className="container grid grid-two-cols">
          {/* hero images  */}
          <div className="hero-image">
            <img
              src="/images/design.png"
              alt="coding together"
              width="400"
              height="500"
            />
          </div>

          <div className="hero-content">
            <p>We are here to help you</p>
            <h1>Get Started Today</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
              aspernatur odio aperiam non minus. Magni a quaerat tempore cumque
              beatae, repudiandae ut enim quia deleniti laudantium aut maiores
              fugit laborum doloribus est voluptas dolor minu.
            </p>
            <div className="btn btn-group">
              <a href="/contact">
                <button className="btn">connect now</button>
              </a>
              <a href="/services">
                <button className="btn secondary-btn">learn more</button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
