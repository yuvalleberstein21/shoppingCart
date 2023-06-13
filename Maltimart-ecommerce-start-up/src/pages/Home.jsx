import React from "react";
import Helmet from "../components/Helmet/Helmet";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom'
import '../styles/home.css'
import { Container, Row, Col } from "reactstrap";
import heroImg from '../assets/images/hero-img.png';
import Services from "../services/Services";


const Home = () => {

    const year = new Date().getFullYear();

    return (
        <Helmet title={"Home"}>
            <section className="hero__section">
                <Container>
                    <Row>
                        <Col lg='6' md='6'>
                            <div className="hero__content">
                                <p className="hero__subtitle">Trending product in {year}</p>
                                <h2>Make Your Interior More Minimalistic & Modern</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque totam, quae quia, omnis
                                    saepe amet facilis repellendus consequuntur aut esse
                                    cumque architecto assumenda qui? Placeat assumenda officia
                                    accusantium voluptate ipsum?
                                </p>
                                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn"><Link to="/shop">SHOP NOW</Link></motion.button>
                            </div>
                        </Col>

                        <Col lg='6' md='6'>
                            <div className="hero__img">
                                <img src={heroImg} alt="" />
                            </div>
                        </Col>





                    </Row>
                </Container>
            </section>

            <Services />
            <section className="trending__products">
                <Container>
                    <Row>
                        <Col lg='12' className="text-center">
                            <h2 className="section__title">Trending Products</h2>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Home;
