import React from "react";
import sliderData from "./SliderData.js";

const Slider = ({ slides, id }) => (
    <div id={id} className="carousel slide" data-bs-ride="carousel" data-bs-interval="8000">
        <div className="carousel-inner">
            {slides.map((slide, index) => (
                <div key={slide.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                    <img src={slide.imageUrl} alt={slide.altText} className="d-block w-100" />
                </div>
            ))}
        </div>
        {["prev", "next"].map((direction) => (
            <button
                key={direction}
                className={`carousel-control-${direction}`}
                type="button"
                data-bs-target={`#${id}`}
                data-bs-slide={direction}
            >
                <span
                    className={`carousel-control-${direction}-icon`}
                    aria-hidden="true"
                ></span>
                <span className="sr-only">{direction === "prev" ? "" : ""}</span>
            </button>
        ))}
    </div>
);

const InfoSection = () => (
    <section className="info-section py-5 bg-light">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-6 mb-4 mb-md-0">
                    <h2 className="text-primary font-weight-bold">VZW JET</h2>
                    <h3 className="text-secondary">Jeugd en Toekomst</h3>
                    <p className="mt-3 text-muted">
                        VZW JET is a youth organization focused on the personal development of
                        young people through mentoring or buddy systems and various activities.
                    </p>
                    <a href="#youtube-info" className="btn btn-primary btn-lg mt-3">
                        About Us
                    </a>
                </div>
                <div className="col-md-6">
                    <Slider slides={sliderData} id="eventSlider" />
                </div>
            </div>
        </div>
    </section>
);

export default InfoSection;

