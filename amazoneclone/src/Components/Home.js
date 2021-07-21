import React, { useState, useEffect, useLayoutEffect } from "react";

import "../Css/home.css";
import FlipMove from "react-flip-move";
// import CSSTransitionGroup from "react-transition-group";

import Product from "./Product";
import "aos/dist/aos.css";

function useWindowSize() {
  const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  console.log(size);
  return size;
}
function Home() {
  const dsplay = useWindowSize();
  const [slide, setSlide] = useState("");
  useEffect(() => {
    if (dsplay < 430) {
      setSlide("fade-left");
    } else {
      setSlide("");
    }
  }, [dsplay]);

  return (
    <div className="home">
      <div className="homeContainer">
        <div className="home_container">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/Events/Pug/GW/Event_hero_Teaser_PC_1500X600_eng._CB664069228_.jpg"
                  className=" home_img d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/PC/Mayactivation/Accessoriesday1/D23140543_IN_CEPC_Electronicsaccessories_underRs999_3000x12000.5x._CB669031984_.jpg"
                  className=" home_img d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Samsung/SamsungM/Family/16thJune/D20729242_IN_WLME_SamsungM_Family_DesktopTallHero_1500x600._CB666608686_.jpg"
                  className=" home_img d-block w-100"
                  alt="..."
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="home-product" style={{ marginTop: "-180px" }}>
          <FlipMove data-aos={slide}>
            <Product
              className="home_animation1"
              id="1"
              title='HP 15 (2021) Thin & Light Ryzen 3-3250 Laptop, 8 GB RAM, 1TB HDD, 39.62 cms (15.6") FHD Screen, Windows 10, MS Office (15s-gr0011AU)'
              price="35000"
              img="https://m.media-amazon.com/images/I/41mQtYQUzmL._AC_UY327_FMwebp_QL65_.jpg"
            />
          </FlipMove>
          <FlipMove data-aos={slide}>
            <Product
              className="home_animation1"
              id="2"
              title="Pigeon by Stovekraft Basics Aluminium Non-stick Cookware Set, Set of 3 (With one lid), Pink"
              price="2500"
              img="https://m.media-amazon.com/images/I/61JlllBcGpL._AC_UL480_FMwebp_QL65_.jpg"
            />
          </FlipMove>
          <FlipMove data-aos={slide}>
            <Product
              className="home_animation1"
              id="3"
              title="boAt Airdopes 281 Bluetooth Truly Wireless Earbuds with Mic(Active Black)"
              price="1500"
              img="https://m.media-amazon.com/images/I/61U4ZnmUl2L._AC_UY327_FMwebp_QL65_.jpg"
            />
          </FlipMove>
          <FlipMove data-aos={slide}>
            <Product
              className="home_animation2 home_animationmd2"
              id="4"
              title="Mi 11X Pro 5G (Lunar White, 8GB RAM, 128GB Storage) | Snapdragon 888 | 108MP Camera"
              price="18500"
              img="https://images-eu.ssl-images-amazon.com/images/I/41qJxT0iJSS._AC_SX184_.jpg"
            />
          </FlipMove>
          <FlipMove data-aos={slide}>
            <Product
              className="home_animation2 home_animationmd2"
              id="5"
              title="Amazon Brand - Solimo Lily Bloom 144 TC 100% Cotton Double Bedsheet with 2 Pillow Covers, Green"
              price="3000"
              img="https://m.media-amazon.com/images/I/51RDqstL6kL.jpg"
            />
          </FlipMove>
          <FlipMove data-aos={slide}>
            <Product
              className="home_animation2 home_animationmd2"
              id="6"
              title="Bildos Cotton & Khadi Cotton Reusable Super Breathable Fabric Face mask with Adjustable Ear Loop (Pack of 12)"
              price="300"
              img="https://m.media-amazon.com/images/I/9131tSnEdaS._AC_UL480_FMwebp_QL65_.jpg"
            />
          </FlipMove>
          <FlipMove data-aos={slide}>
            <Product
              className="home_animation2 home_animationmd3"
              id="7"
              title="Afflatus Men's Slim Fit Cotton Casual Shirt"
              price="600"
              img="https://m.media-amazon.com/images/I/41+nsVPmsYL._AC_UL480_FMwebp_QL65_.jpg"
            />
          </FlipMove>
          <FlipMove data-aos={slide}>
            <Product
              className="home_animation3 home_animationmd3"
              id="8"
              title="Men's Century-12 Running,Walking,Sports Shoes"
              price="1500"
              img="https://m.media-amazon.com/images/I/71LVvI-gCUS._AC_UL480_FMwebp_QL65_.jpg"
            />
          </FlipMove>
          <FlipMove data-aos={slide}>
            <Product
              className="home_animation3 home_animationmd3"
              id="9"
              title="KUBA Smart Band ID115C Fitness Tracker Watch with Heart Rate, Activity Tracker Water Resistant Body Functions Like Steps Counter, Calorie Counter, (Men and Women)"
              price="999"
              img="https://m.media-amazon.com/images/I/61lecqJdPOS._AC_SR180,120_QL70_.jpg"
            />
          </FlipMove>
          <FlipMove data-aos={slide}>
            <Product
              className="home_animation3 home_animationmd4"
              id="10"
              title="Lifelong PVC Home Gym Set 10-20kg Plate 3feet curl Rod and Dumbbells rods with Gym Accessories"
              price="8999"
              img="https://m.media-amazon.com/images/I/91Yoh5TKI8L._AC_UL480_FMwebp_QL65_.jpg"
            />
          </FlipMove>
          <FlipMove data-aos={slide}>
            <Product
              className="home_animation3 home_animationmd4"
              id="11"
              title="SAVYA HOME® APEX Chairs Delta MB Chair Umbrella Base Office Chair (Standard, Black)"
              price="4000"
              img="https://m.media-amazon.com/images/I/71Euoz3js9S._AC_UL480_FMwebp_QL65_.jpg"
            />
          </FlipMove>
          <FlipMove data-aos={slide}>
            <Product
              className="home_animation4 home_animationmd4"
              id="12"
              title="iFFALCON 103 cm (40 inches) Full HD Android Smart LED TV 40F2A (Black) (2021 Model) | With Built-in Voice Assistant"
              price="25000"
              img="https://m.media-amazon.com/images/I/81cMqXIzWtS._AC_SR180,120_QL70_.jpg"
            />
          </FlipMove>
          <FlipMove data-aos={slide}>
            <Product
              className="home_animation4 home_animationmd5"
              id="13"
              title="Story@Home Cotton Bath and Hand Towel 450 GSM (Set of 6, Navy Blue, Lime)"
              price="800"
              img="https://m.media-amazon.com/images/I/81SZQgWotpL._AC_UL480_FMwebp_QL65_.jpg"
            />
          </FlipMove>
          <FlipMove data-aos={slide}>
            <Product
              className="home_animation4 home_animationmd5"
              id="14"
              title="LEKZED HEAVY DUTY PROFESSIONAL ELECTRIC HAIR CLIPPER NP Runtime: 0 Trimmer for Men & Women (Multicolor) Hair Trimmer"
              price="800"
              img="https://m.media-amazon.com/images/I/412JFRgulLL._AC_UL480_FMwebp_QL65_.jpg"
            />
          </FlipMove>
          <FlipMove data-aos={slide}>
            <Product
              className="home_animation5"
              id="15"
              title="Tread Mall Portable Laptop Bed Tray Table with Foldable Legs, Foldable Lap Desk for Eating, Working, Writing, Gaming, Drawing on Bed/Couch/Sofa/Floor…"
              price="6000"
              img="https://m.media-amazon.com/images/I/51ZTlYhF7YS._AC_UY327_FMwebp_QL65_.jpg"
            />
          </FlipMove>
          <FlipMove data-aos={slide}>
            <Product
              className="home_animation5"
              id="16"
              title="Wakefit Wood Napper Mini Sofa - 3 Seater"
              price="16000"
              img="https://m.media-amazon.com/images/I/51+5m7SoHML._AC_UL480_FMwebp_QL65_.jpg"
            />
          </FlipMove>
        </div>
      </div>
    </div>
  );
}

export default Home;
