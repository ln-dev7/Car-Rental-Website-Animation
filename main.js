import "./style.scss";
import gsap from "gsap";
import { CustomEase } from "gsap/all";

const ease = CustomEase.create("custom", "M0,0 C1,-0.09 0,1.05 1,1 ");
const duration = 2;

const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");
const show = document.querySelector(".show");
const back = document.querySelector(".back");

const cars = document.querySelectorAll(".car");
const texts = document.querySelectorAll(".text");
const images = document.querySelectorAll(".image");

let currentCar = 0;

arrowLeft.addEventListener("click", () => {
  if (currentCar === 0) return;
  if (currentCar !== cars.length - 2) {
    gsap.to(show, {
      opacity: 0,
      y: 80,
      duration: duration,
      ease: ease,
    });
  }
  currentCar--;
  cars.forEach((car) => {
    gsap.to(car, {
      x: `-${currentCar * 100}%`,
      duration: duration,
      ease: ease,
    });
  });
  texts.forEach((text) => {
    gsap.to(text, {
      y: `-${currentCar * 100}%`,
      duration: duration,
      ease: ease,
    });
  });
});

arrowRight.addEventListener("click", () => {
  if (currentCar === cars.length - 1) return;
  if (currentCar === cars.length - 2) {
    gsap.to(show, {
      opacity: 1,
      y: 0,
      duration: duration,
      ease: ease,
    });
  }
  currentCar++;
  cars.forEach((car) => {
    gsap.to(car, {
      x: `-${currentCar * 100}%`,
      duration: duration,
      ease: ease,
    });
  });
  texts.forEach((text) => {
    gsap.to(text, {
      y: `-${currentCar * 100}%`,
      duration: duration,
      ease: ease,
    });
  });
});

show.addEventListener("click", () => {
  gsap.to(show, {
    duration: duration,
    ease: ease,
    opacity: 0,
    y: 80,
    onComplete: () => {
      images.forEach((image, index) => {
        gsap.to(image, {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: index * 0.15,
        });
      });
    },
  });
  gsap.to(".content", {
    y: -100,
    scale: 0.9,
    duration: duration,
    ease: ease,
  });
  gsap.to(".arrow-left, .arrow-right", {
    display: "none",
  });
  gsap.to(back, {
    display: "block",
  });
});

back.addEventListener("click", () => {
  images.forEach((image, index) => {
    gsap.to(image, {
      y: (index + 1) * 32,
      opacity: 0,
      duration: 1,
      delay: index * 0.15,
      onComplete: () => {
        gsap.to(show, {
          duration: duration,
          ease: ease,
          opacity: 1,
          y: 0,
        });
        gsap.to(".content", {
          y: 0,
          scale: 1,
          duration: duration,
          ease: ease,
        });
        gsap.to(".arrow-left, .arrow-right", {
          display: "block",
        });
        gsap.to(back, {
          display: "none",
        });
      },
    });
  });
});
