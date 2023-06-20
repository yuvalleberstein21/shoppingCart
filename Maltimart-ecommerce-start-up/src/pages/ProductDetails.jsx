import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import { cartActions } from "../redux/slices/cartSlice";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import '../styles/product-details.css';
import { motion } from "framer-motion";
import ProductsList from "../components/UI/ProductsList";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import axios from "axios";


const ProductDetails = () => {

    const [product, setProduct] = useState({});

    const [tab, setTab] = useState('desc');
    const reviewUser = useRef('');
    const reviewMsg = useRef('');
    const dispatch = useDispatch();

    const [category, setCategory] = useState([]);


    const [rating, setRating] = useState(null);
    const { id } = useParams();




    const [productData, setProductsData] = useState([]);
    const [allProductData, setAllProductsData] = useState([]);



    const getProduct = async () => {
        await axios.get(`/getSingleProduct/${id}`).then(response => {
            setProductsData(response.data);

        })
    }

    const getAllProducts = async () => {
        await axios.get(`/getAllProducts`).then(response => {
            setAllProductsData(response.data);

        })
    }





    useEffect(() => {
        getAllProducts();
        getProduct();

    }, []);



    const relatedProducts = productData.filter(item => item.category === 'shoes');



    const submitHandler = (e) => {
        e.preventDefault();

        const reviewUserName = reviewUser.current.value
        const reviewUserMsg = reviewMsg.current.value

        const reviewObj = {
            userName: reviewUserName,
            text: reviewUserMsg,
            rating: rating,
        };
        console.log(reviewObj);
        toast.success('Review submitted')
    }

    const addToCart = (product) => {
        dispatch(cartActions.addItem({
            id,
            productName: product.productName,
            imgUrl: product.imgUrl,
            category: product.category,
            price: product.price
        }))
        toast.success('Product added successfully');
    }


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [product]);

    return (

        <Helmet title="productName">
            <CommonSection title="productName" />

            <section className="pt-0">
                <Container>
                    <Row>
                        {
                            productData.map(product => (
                                <>
                                    <Col lg='6' key={product.productID} className="product__deteails-img">
                                        <img src={product.imgUrl} alt="" />
                                    </Col>

                                    <Col lg='6'>
                                        <div className="product__details">
                                            <h2>{product.productName}</h2>
                                            <div className="product__rating d-flex align-items-center gap-5 mb-3">
                                                <div>
                                                    <span>
                                                        <i className="ri-star-s-fill"></i>
                                                    </span>
                                                    <span>
                                                        <i className="ri-star-s-fill"></i>
                                                    </span>
                                                    <span>
                                                        <i className="ri-star-s-fill"></i>
                                                    </span>
                                                    <span>
                                                        <i className="ri-star-s-fill"></i>
                                                    </span>
                                                    <span>
                                                        <i className="ri-star-half-s-line"></i>
                                                    </span>
                                                </div>
                                                <p>

                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center gap-5">
                                                <span className="product__price">${product.price}</span>
                                                <span>Category: {product.category}</span>
                                            </div>
                                            <p className="mt-3">{product.shortDesc}</p>

                                            <motion.button whileTap={{ scale: 1.2 }} className="buy__btn"
                                                onClick={() => addToCart(product)}>Add To Cart
                                            </motion.button>
                                        </div>
                                    </Col>
                                </>
                            ))
                        }
                    </Row>

                </Container>
            </section>

            <section>
                <Container>
                    <Row>
                        {
                            productData.map(product => (
                                <Col lg='12'>
                                    <div className="tab__wrapper d-flex align-items-center gap-5">
                                        <h6 className={`${tab === 'desc' ? 'active__tab' : ""} `} onClick={() => setTab('desc')}>
                                            Description</h6>
                                        <h6 className={`${tab === 'rev' ? 'active__tab' : ""} `} onClick={() => setTab('rev')}></h6>
                                        Reviews
                                    </div>

                                    {
                                        tab === 'desc' ? (
                                            <div className="tab__content mt-5">
                                                <p>{product.description}</p>
                                            </div>
                                        ) : (
                                            <div className="product__review mt-5">
                                                <div className="review__wrapper">
                                                    <ul>

                                                        <li className="mb-4">

                                                            <h6>Jhon Doe</h6>
                                                            <span>{product.rating} (rating)</span>

                                                        </li>

                                                    </ul>
                                                    <div className="review__form">
                                                        <h4>Leave your experience</h4>
                                                        <form action="" onSubmit={submitHandler}>
                                                            <div className="form__group">
                                                                <input type="text" placeholder="Enter name" ref={reviewUser} required />
                                                            </div>
                                                            <div className="form__group d-flex align-items-center gap-5 rating__group">
                                                                <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(1)}>1<i className="ri-star-s-fill"></i></motion.span>
                                                                <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(2)}>2<i className="ri-star-s-fill"></i></motion.span>
                                                                <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(3)}>3<i className="ri-star-s-fill"></i></motion.span>
                                                                <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(4)}>4<i className="ri-star-s-fill"></i></motion.span>
                                                                <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(5)}>5<i className="ri-star-s-fill"></i></motion.span>
                                                            </div>

                                                            <div className="form__group">
                                                                <textarea rows={4} type="text" placeholder="Review Message..." ref={reviewMsg} required />
                                                            </div>
                                                            <motion.button whileTap={{ scale: 1.2 }} type="submit" className="buy__btn">Submit</motion.button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                </Col>
                            ))
                        }

                        <Col lg='12' className="mt-5">
                            <h2 className="related__title">You might also like</h2>
                        </Col>
                        <ProductsList data={relatedProducts} />

                    </Row>

                </Container>
            </section>
        </Helmet>
    );
};

export default ProductDetails;
