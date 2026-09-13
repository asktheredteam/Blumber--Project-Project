import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import heroSlides from "./heroSlide";
import "../styles/Hero.css";
import { MdOutlineArrowForward } from "react-icons/md";
function heroSection() {
  const featureBtnRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const currentHero = heroSlides[currentSlide];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const lastSlide = heroSlides.length - 1;
        if (prev === lastSlide) {
          return 0;
        }

        return prev + 1;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {" "}
      <section
        className="hero"
        style={{
          backgroundImage: `url(${currentHero.image})`,
        }}
      >
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>{currentHero.title}</h1>

          <p>{currentHero.subtitle}</p>

          <button ref={featureBtnRef}>
            {currentHero.button}
            <MdOutlineArrowForward
              onClick={() => featureBtnRef.current.click()}
            />
          </button>
        </div>
      </section>
    </>
  );
}
export default heroSection;
