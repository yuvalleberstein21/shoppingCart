import React, { useEffect, useState } from "react";
import CommonSection from "../components/UI/CommonSection";
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from "reactstrap";
import '../styles/shop.css';

// import products from '../assets/data/products';
import ProductList from "../components/UI/ProductsList";
import axios from "axios";
const Shop = () => {

    const [productsData, setProductsData] = useState([]);


    const getAllProducts = async () => {
        await axios.get('/getAllProducts').then(response => {
            setProductsData(response.data);
            console.log(response.data)
        })
    }


    useEffect(() => {
        getAllProducts();
    }, []);



    const handleFilter = e => {
        const filterValue = e.target.value;

        let filteredProducts = [];

        if (filterValue === 'shoes') {
            filteredProducts = productsData.filter((item) => item.category === 'shoes');
        } else if (filterValue === 'shirt') {
            filteredProducts = productsData.filter((item) => item.category === 'shirt');
        } else if (filterValue === 'pants') {
            filteredProducts = productsData.filter((item) => item.category === 'pants');
        } else if (filterValue === 'hat') {
            filteredProducts = productsData.filter((item) => item.category === 'hat');
        }
        if (filterValue === 'all') {
            filteredProducts = productsData; // Reset to original data
        }
        setProductsData(filteredProducts);
    };



    const handleSearch = e => {
        const searchTerm = e.target.value;

        const searchedProducts = productsData.filter(item => item.productName.toLowerCase().
            includes(searchTerm.toLowerCase()))

        setProductsData(searchedProducts);
    }

    return (
        <Helmet title='Shop'>
            <CommonSection title='Products' />

            <section>
                <Container>
                    <Row>
                        <Col lg='3' md='6'>
                            <div className="filter__widget">
                                <select onChange={handleFilter}>
                                    <option value="all">Filter By Category</option>
                                    <option value="shoes">Shoes</option>
                                    <option value="shirt">Shirt</option>
                                    <option value="pants">Pants</option>
                                    <option value="hat">Hat</option>
                                </select>
                            </div>
                        </Col>
                        <Col lg='3' md='6' className="text-end">
                            <div className="filter__widget">
                                <select>
                                    <option>Sort By</option>
                                    <option value="ascending">Ascending</option>
                                    <option value="descending">Descending</option>
                                </select>
                            </div>
                        </Col>
                        <Col lg='6' md='12'>
                            <div className="search__box">
                                <input type="text" placeholder="Search....." onChange={handleSearch} />
                                <span>
                                    <i className="ri-search-line"></i>
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="pt-0">
                <Container>
                    <Row>
                        {
                            productsData.length === 0 ? <h1 className="text-center fs-4">No products are found!</h1> :
                                <ProductList data={productsData} />
                        }
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Shop;
