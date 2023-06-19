import React, { useState } from "react";
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/login.css';



const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const signIn = async (e) => {
        e.preventDefault();


        try {
            await axios.post('/login', {
                email: email,
                password: password,
            }).then((response) => {
                if (response.data.message) {
                    toast.error(response.data.message)

                } else {

                    localStorage.setItem('user', response.data[0].id);
                    toast.success('Success logged in')
                    navigate('/checkout')
                }
            })


        } catch (error) {
            setLoading(false)
            toast.error(error.message)
        }
    }

    return (
        <Helmet title='Login'>
            <section>
                <Container>
                    <Row>
                        {
                            loading ? <Col lg='12' className="text-center"><h5 className="fw-bold">Loading....</h5></Col> :
                                <Col lg='6' className="m-auto text-center">
                                    <h3 className="fw-bold mb-4">Login</h3>

                                    <Form className="auth__form" onSubmit={signIn}>
                                        <FormGroup className="form__group">
                                            <input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} />
                                        </FormGroup>
                                        <FormGroup className="form__group">
                                            <input type="password" placeholder="Enter your password" value={password} onChange={handlePasswordChange} />
                                        </FormGroup>

                                        <button type="submit" className="buy__btn auth__btn">Login</button>
                                        <p>Don't have an account? <Link to='/signup'>Create an account</Link></p>
                                    </Form>
                                </Col>
                        }
                    </Row>
                </Container>
            </section>

        </Helmet>
    );
};

export default Login;
