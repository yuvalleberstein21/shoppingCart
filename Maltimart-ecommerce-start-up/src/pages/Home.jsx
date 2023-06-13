import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import ProductsList from '../components/UI/ProductsList';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom'
import '../styles/home.css'
import { Container, Row, Col } from "reactstrap";
import heroImg from '../assets/images/hero-img.png';
import Services from "../services/Services";


import products from "../assets/data/products";

const Home = () => {

    const [trendingProducts, setTrendingProducts] = useState([])
    const [bestSalesProducts, setBestSalesProducts] = useState([])
    const year = new Date().getFullYear();


    useEffect(() => {
        const filterdTrendingProducts = products.filter(
            (item) => item.category === 'chair');

        const filterdBestSalesProducts = products.filter(
            (item) => item.category === 'sofa');

        setTrendingProducts(filterdTrendingProducts);
        setBestSalesProducts(filterdBestSalesProducts);

    }, []);

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
                        <ProductsList data={trendingProducts} />
                    </Row>
                </Container>
            </section>

            <section className="best__sales">
                <Container>
                    <Row>
                        <Col lg='12' className="text-center">
                            <h2 className="section__title">Best Sales</h2>
                        </Col>
                        <ProductsList data={bestSalesProducts} />
                    </Row>
                </Container>
            </section>

        </Helmet>
    );
};

export default Home;
