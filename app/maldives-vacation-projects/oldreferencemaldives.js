import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/legacy/image";
import Head from "next/head";
import ContactFormMal from "../components/ContactFormMal";
import AOSWrapper from "../components/AOSWrapper";
import { Flower, Dumbbell, Waves, UtensilsCrossed } from "lucide-react";
import styled from "styled-components";

const HeroSection = styled.section`
  padding: 4rem 0;
  background: url("/bg.avif");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  text-align: center;
  color: white;
  margin-bottom: 0rem;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  color: black;
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const HeroSubtitle = styled.span`
  font-size: clamp(2rem, 3vw, 1.3rem);
  color: #333;
  font-weight: 500;
  display: block;
  margin-top: 1rem;
`;

const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  background: ${(props) => (props.active ? "#333" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
`;

const PropertyCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin: 2rem 0;

  .property-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  .property-details {
    padding: 2rem;
  }

  @media (max-width: 768px) {
    .property-image {
      height: 300px;
    }
  }
`;

const AmenityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`;

const AmenityCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  transition: transform 0.3s ease;
  font-size: 0.85rem;

  svg {
    width: 18px;
    height: 18px;
    color: #333;
  }

  &:hover {
    transform: translateY(-3px);
    background: #f0f0f0;
  }
`;

const PropertyDetailsSection = styled.div`
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;

  &.loaded {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TabContentSection = styled.div`
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TableContainer = styled.div`
  .table {
    border-collapse: collapse;
    width: 100%;
  }

  th {
    background-color: #f8f9fa;
    border-bottom: 2px solid #dee2e6;
    padding: 1rem;
    font-weight: 600;
    text-align: left;
    color: #495057;
  }

  td {
    padding: 0.75rem 1rem;
    color: #343a40;
    border-bottom: 1px solid #dee2e6;
  }

  tr {
    transition: background-color 0.3s;

    &:hover {
      background-color: #f1f1f1;
    }
  }
`;

const SectionTitle = styled.h3`
  text-align: left;
  margin-bottom: 3px;
  font-weight: 700;
  font-size: 2.1em;
  position: relative;
  padding-bottom: 5px;
`;

const ContactSection = styled.div`
  padding: 5rem 0;
  text-align: center;

  .contact-image {
    width: 25%;
    margin-bottom: 1.5rem;

    @media (max-width: 768px) {
      width: 50%;
    }
  }

  .contact-title {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .contact-subtitle {
    color: #666;
    margin-bottom: 2rem;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 2rem 0;
  margin: 0 auto;
  overflow: hidden;
  max-width: 1000px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem;
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  aspect-ratio: 4/3;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  .image-title {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    color: white;
    font-weight: 500;
    font-size: clamp(0.875rem, 2vw, 1rem);
    text-align: center;
  }

  @media (max-width: 992px) {
    aspect-ratio: 3/2;
  }

  @media (max-width: 576px) {
    aspect-ratio: 16/9;
    margin-bottom: 0;
  }
`;

const StatsSection = styled.section`
  padding: 4rem 0;
  margin: 4rem 0;
`;

const StatCard = styled.div`
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .stat-number {
    font-size: 2.5rem;
    font-weight: 800;
    color: #ff6347;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    color: #666;
    font-size: 1rem;
  }
`;

const FeatureSection = styled.section`
  padding: 4rem 0;
  max-width: 1000px;
  margin: 0 auto;
  background: white;
`;

const SectionContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 0;
`;

const PropertyTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 1rem;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: #ff6347;
    border-radius: 2px;
  }
`;

const PropertyDescription = styled.p`
  max-width: 800px;
  margin: 0 auto 3rem;
  text-align: center;
  line-height: 1.8;
  color: #666;
  font-size: 1.1rem;
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto 3rem;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 500px;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    img {
      height: 300px;
    }
  }
`;

const AmenitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 2rem auto;
`;

const AmenityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .icon {
    font-size: 1.5rem;
    color: #ff6347;
  }
`;

const AboutSection = styled.div`
  max-width: 1000px;
  margin: 4rem auto;
  padding: 3rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);

  .about-header {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;

    img {
      width: 100px;
      height: auto;
    }
  }

  .about-title {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 1rem;
    position: relative;
    padding-bottom: 1rem;

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 4px;
      background: #ff7f00;
      border-radius: 2px;
    }
  }

  .about-content {
    line-height: 1.8;
    color: #666;
  }
`;

const PropertyDetailsWrapper = styled.div`
  padding: 4rem 0;

  .section-title {
    text-align: center;
    font-size: 2.5rem;
    font-weight: 900;
    color: #333;
    margin-bottom: 1rem;
    position: relative;
  }

  .property-description {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #666;
    max-width: 800px;
    margin: 0 auto 3rem;
    text-align: center;
  }
`;

const PropertyDetailsCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  margin-top: 2rem;
`;

const TableWrapper = styled(TableContainer)`
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  .table-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 1.5rem;
    position: relative;
    padding-bottom: 10px;

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 3px;
      background: #ff6347;
      border-radius: 2px;
    }
  }
`;

const DetailsHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  text-align: center;

  .section-title {
    font-size: 2rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 1rem;
    position: relative;
    padding-bottom: 1rem;

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: #333;
      border-radius: 2px;
    }
  }

  .tab-buttons {
    margin-top: 1.5rem;
  }
`;

export default function MaldivesProject() {
  const [activeTab, setActiveTab] = useState("BeachVillas");
  const [isPropertyVisible, setIsPropertyVisible] = useState(false);
  const [isTabContentVisible, setIsTabContentVisible] = useState(false);
  const propertyDetailsRef = useRef(null);
  const tabContentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "propertyDetails") {
              setIsPropertyVisible(true);
            } else if (entry.target.id === "tabContent") {
              setIsTabContentVisible(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (propertyDetailsRef.current) {
      propertyDetailsRef.current.id = "propertyDetails";
      observer.observe(propertyDetailsRef.current);
    }
    if (tabContentRef.current) {
      tabContentRef.current.id = "tabContent";
      observer.observe(tabContentRef.current);
    }

    return () => {
      if (propertyDetailsRef.current) {
        observer.unobserve(propertyDetailsRef.current);
      }
      if (tabContentRef.current) {
        observer.unobserve(tabContentRef.current);
      }
    };
  }, []);

  const properties = {
    BeachVillas: {
      image: "/maldives/Villa2.jpg",
      data: [
        { key: "LIVING ROOM", value: "25.8" },
        { key: "KITCHEN/DINING", value: "18.7" },
        { key: "BEDROOM 3", value: "14.4" },
        { key: "BATHROOM 3", value: "3.5" },
        { key: "POOL", value: "11.6" },
        { key: "BEDROOM 1", value: "23.4" },
        { key: "BEDROOM 2", value: "23.4" },
        { key: "BATHROOM 1", value: "8.7" },
        { key: "BATHROOM 2", value: "8.7" },
        { key: "BALCONY 1", value: "11.7" },
        { key: "BALCONY 2", value: "7.1" },
        { key: "OPEN BALCONY", value: "7.1" },
      ],
    },
    GardenVillas: {
      image: "/maldives/Villa3.jpg",
      data: [
        { key: "LIVING ROOM", value: "25.9" },
        { key: "KITCHEN/DINING", value: "18.7" },
        { key: "BEDROOM 3", value: "14.4" },
        { key: "BATHROOM 3", value: "3.5" },
        { key: "POOL", value: "11.6" },
        { key: "BEDROOM 1", value: "23.4" },
        { key: "BEDROOM 2", value: "23.4" },
        { key: "BATHROOM 1", value: "8.7" },
        { key: "BATHROOM 2", value: "8.7" },
        { key: "BALCONY 1", value: "11.7" },
        { key: "BALCONY 2", value: "7.1" },
        { key: "OPEN BALCONY", value: "7.1" },
        { key: "GARDEN", value: "69.8" },
      ],
    },
  };

  return (
    <>
      <Head>
        <meta name="Author" content="Homebaba"></meta>
        <meta name="Email" content="info@homebaba.ca"></meta>
        <title>Maldives Vacation Projects | Homebaba</title>
        <meta
          name="Description"
          content="Explore the Maldives Vacation Projects handpicked by Homebaba. Find your dream home in the Greater Toronto Area with us."
        ></meta>
        <link
          rel="canonical"
          href="https://homebaba.ca/maldives-vacation-projects"
        />
        <meta name="robots" content="index, follow"></meta>
        <meta property="og:type" content="og:website" />
        <meta
          property="og:title"
          content="Maldives Vacation Projects | Homebaba"
        />
        <meta
          property="og:description"
          content="Explore the Maldives Vacation Projects handpicked by Homebaba."
        />
        <meta
          property="og:url"
          content="https://homebaba.ca/maldives-vacation-projects"
        />
        <meta property="og:site_name" content="Homebaba" />
      </Head>

      <Navbar borderrr="sticky-top"></Navbar>
      <a href="#mycontact" className="phone-deal-float">
        <div className="phone-deal-content">
          <img
            src="/contact-bottom-2.png"
            alt="Agent"
            className="phone-deal-avatar"
          />
          <div className="phone-deal-text">
            <div className="deal-title">Send Me Info</div>
          </div>
        </div>
      </a>
      <AOSWrapper>
        <HeroSection>
          <div className="container">
            <HeroTitle>Explore Maldives Vacation Homes</HeroTitle>
            <HeroSubtitle>
              Discover Paradise in the Heart of the Indian Ocean
            </HeroSubtitle>
            <p
              className="mt-0 text-center mx-auto"
              style={{ maxWidth: "700px", color: "gray" }}
            >
              Experience luxury living in the Maldives with our exclusive
              collection of beachfront and garden villas. Crystal-clear waters,
              pristine beaches, and world-class amenities await.
            </p>
          </div>
        </HeroSection>
      </AOSWrapper>
      <div className="container px-3 px-md-4">
        <ImageGrid>
          {[
            {
              src: "/maldives/Villa1.jpg",
              alt: "Villa 1",
              title: "Beachfront Villa",
            },
            {
              src: "/maldives/Villa2.jpg",
              alt: "Villa 2",
              title: "Ocean View Suite",
            },
            {
              src: "/maldives/Villa3.jpg",
              alt: "Villa 3",
              title: "Garden Villa",
            },
            {
              src: "/maldives/Villa4.jpg",
              alt: "Villa 4",
              title: "Premium Pool Villa",
            },
          ].map((image, index) => (
            <ImageWrapper
              key={index}
              data-aos={index < 2 ? "fade-right" : "fade-left"}
              data-aos-duration="1000"
              data-aos-delay="50"
            >
              <img src={image.src} alt={image.alt} loading="lazy" />
              <div className="image-title">{image.title}</div>
            </ImageWrapper>
          ))}
        </ImageGrid>
      </div>
      <FeatureSection>
        <div className="container">
          <SectionTitle className="text-center mb-5">
            Experience Luxury Living
          </SectionTitle>
          <div className="row mx-0 gx-4">
            {[
              {
                icon: "🌅",
                title: "Breathtaking Views",
                description:
                  "Wake up to stunning ocean views and pristine beaches",
              },
              {
                icon: "🏊‍♂️",
                title: "Private Pool",
                description:
                  "Each villa comes with an optional private infinity pool",
              },
              {
                icon: "🍽️",
                title: "Fine Dining",
                description:
                  "World-class restaurants and personalized dining experiences",
              },
              {
                icon: "🛥️",
                title: "Water Activities",
                description: "From diving to yacht tours, adventure awaits",
              },
            ].map((feature, index) => (
              <div key={index} className="col-md-3 col-6 bg-light">
                <div className="text-center">
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                    {feature.icon}
                  </div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: "#666", fontSize: "0.9rem" }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FeatureSection>
      <PropertyDetailsWrapper>
        <div className="container">
          <h2 className="section-title">The VILLA By Premier</h2>
          <p className="property-description">
            THE VILLA by Premier is located on the Island of Goidhoo and is
            surrounded by white sandy beaches and crystal-clear lagoons that the
            Maldives is renowned for.
          </p>
          <PropertyDetailsCard>
            <div className="row g-0">
              <div className="col-lg-6">
                <div
                  id="propertyCarousel"
                  className="carousel slide"
                  data-bs-ride="carousel"
                  data-bs-interval="3000"
                >
                  <div className="carousel-inner">
                    {[
                      {
                        src: "/maldives/Villa1.jpg",
                        alt: "Luxury Property 1",
                      },
                      {
                        src: "/maldives/Villa2.jpg",
                        alt: "Luxury Property 2",
                      },
                      {
                        src: "/maldives/Villa3.jpg",
                        alt: "Luxury Property 3",
                      },
                    ].map((image, index) => (
                      <div
                        key={index}
                        className={`carousel-item ${
                          index === 0 ? "active" : ""
                        }`}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="img-fluid rounded"
                          style={{
                            width: "100%",
                            height: "400px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#propertyCarousel"
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
                    data-bs-target="#propertyCarousel"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                  <ol className="carousel-indicators">
                    {[
                      "/maldives/Villa1.jpg",
                      "/maldives/Villa2.jpg",
                      "/maldives/Villa3.jpg",
                    ].map((_, index) => (
                      <li
                        key={index}
                        data-bs-target="#propertyCarousel"
                        data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                      ></li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="p-4 p-lg-5">
                  <div className="amenities-section">
                    <h3
                      className="mb-4"
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "600",
                        color: "#444",
                      }}
                    >
                      Amenities
                    </h3>
                    <div className="row row-cols-2 g-3 mb-4">
                      {[
                        { icon: <Flower size={18} />, text: "Spa" },
                        { icon: <Dumbbell size={18} />, text: "Gymnasium" },
                        {
                          icon: <UtensilsCrossed size={18} />,
                          text: "Restaurant",
                        },
                        { icon: <Waves size={18} />, text: "Water Sports" },
                      ].map((item, index) => (
                        <div key={index} className="col-6 col-md-6">
                          <AmenityCard>
                            <span className="icon">{item.icon}</span>
                            <span
                              style={{ fontSize: "0.85rem", fontWeight: "500" }}
                            >
                              {item.text}
                            </span>
                          </AmenityCard>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="mb-0">
                    It is just 98 km from the country's main Velana
                    International Airport, a scenic 20-minute flight by seaplane
                    or a one-and-a-half-hour ride by speed boat from Velana
                    international airport.
                  </p>
                </div>
              </div>
            </div>
          </PropertyDetailsCard>
        </div>
      </PropertyDetailsWrapper>

      <TabContentSection
        ref={tabContentRef}
        className={`${isTabContentVisible ? "visible" : ""}`}
      >
        <div className="container">
          <PropertyDetailsCard>
            <div className="p-4">
              <DetailsHeader>
                <h2 className="section-title">Property Details</h2>
                <p className="text-muted mb-3" style={{ maxWidth: "600px" }}>
                  Explore our luxurious villa specifications and layouts
                </p>
                <div className="tab-buttons">
                  {Object.keys(properties).map((tab) => (
                    <TabButton
                      key={tab}
                      active={activeTab === tab}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab.replace(/([A-Z])/g, " $1").trim()}
                    </TabButton>
                  ))}
                </div>
              </DetailsHeader>

              <div className="row g-4">
                <div className="col-md-12">
                  <div className="position-relative h-100 d-flex justify-content-center align-items-center">
                    <img
                      src={properties[activeTab].image}
                      alt={activeTab}
                      className="img-fluid rounded shadow-sm"
                      style={{
                        width: "60%",
                        height: "300px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>

                <div className="col-md-6 mx-auto">
                  <TableWrapper>
                    <h3 className="table-title">Area Specifications</h3>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th style={{ width: "60%" }}>SPACE</th>
                            <th style={{ width: "40%" }}>AREA (m²)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {properties[activeTab].data.map((row, index) => (
                            <tr key={index}>
                              <td>{row.key}</td>
                              <td>{row.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TableWrapper>
                  <div className="mt-4 p-4 bg-light rounded">
                    <p className="mb-0 text-center" style={{ color: "#666" }}>
                      The development consists of 32 beach villas overlooking
                      the sandy and serene beach and 32 garden villas
                      overlooking the calming greenery of the island.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </PropertyDetailsCard>
        </div>
      </TabContentSection>

      <div
        className="container mt-5 d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <div className="container mt-5" style={{ minHeight: "50vh" }}>
          <div
            className="d-flex align-items-start"
            style={{
              margin: "0",
              padding: "1.5rem",
              backgroundColor: "#f9f9f9",
              borderRadius: "0.5rem",
              borderLeft: "5px solid #ff7f00", // Orange color
              width: "100%",
              maxWidth: "100%", // Expand across the container
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Added shadow for better visibility
              position: "relative",
            }}
          >
            <div className="w-100">
              <div className="d-flex align-items-center">
                <h5
                  style={{
                    fontWeight: "700",
                    marginBottom: "1rem",
                    marginRight: "1rem", // Spacing between heading and logo
                    textAlign: "left",
                    color: "#333",
                    position: "relative",
                  }}
                >
                  About Premier Property Private Limited
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-4px",
                      left: "0",
                      width: "50px",
                      height: "4px",
                      backgroundColor: "#ff7f00", // Orange underline
                      borderRadius: "2px",
                    }}
                  ></span>
                </h5>
                <img
                  src="/maldives/premiere.png"
                  alt="Premier Property Logo"
                  style={{
                    width: "70px", // Adjusted size for balance
                    borderRadius: "0.25rem",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </div>
              <p
                className="mb-4"
                style={{
                  lineHeight: "1.6",
                  color: "#555",
                  marginBottom: "0", // Remove default margin for better control
                }}
              >
                Premier Property Private Limited is a leading real estate firm
                established on February 20, 2014, located at 7th Floor,
                Hazaarumaage, Fareedhee Magu, Male' 20191, Republic of Maldives.
                Under the leadership of Managing Director Dr. Hassan Saeed, the
                company excels in various aspects of real estate, including
                development, management, consultancy, rentals, and sales. With a
                dedicated team of 16 full-time and 14 part-time professionals,
                Premier Property offers comprehensive services tailored to meet
                diverse real estate needs, establishing itself as a prominent
                player in the Maldives real estate industry.
              </p>
              <footer className="blockquote-footer">
                Premier Property Private Limited{" "}
                <cite title="Source Title">
                  Registration number: C-0158/2014
                </cite>
              </footer>
            </div>
          </div>
        </div>
      </div>

      <ContactSection>
        <div className="container">
          <img
            src="/contact-bottom-2.png"
            alt="Contact"
            className="contact-image"
          />
          <h4 className="contact-title">Have any Questions?</h4>
          <p className="contact-subtitle">
            Speak to our Preconstruction expert today
          </p>
          <div className="row justify-content-center mx-0">
            <div className="col-md-6">
              <ContactFormMal />
            </div>
          </div>
        </div>
      </ContactSection>
      <div className="py-5 my-4"></div>
      <Image
        src="/line.png"
        alt="Line image"
        height="4"
        width="100"
        layout="responsive"
        className="img-fluid foot-up-img"
      />
      <Footer />
    </>
  );
}
