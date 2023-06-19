import React, { useState } from "react";
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import '../styles/login.css';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();




    const signup = async (e) => {
        e.preventDefault();

        setLoading(true)

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('userImage', file);

        try {
            await axios.post('/register', formData)
                .then(response => {
                    navigate('/login')
                    toast.success('user created !')
                })
        } catch (error) {
            setLoading(false)
            toast.error('something went wrong')
        }

        // try {

        //     const userCredential = await createUserWithEmailAndPassword(
        //         auth,
        //         email,
        //         password
        //     );
        //     const user = userCredential.user
        //     const storageRef = ref(storage, `images/${Date.now() + username}`)
        //     const uploadTask = uploadBytesResumable(storageRef, file)

        //     uploadTask.on((error) => {
        //         toast.error(error.message)
        //     }, () => {
        //         getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        //             await updateProfile(user, {
        //                 //update user profile
        //                 displayName: username,
        //                 photoURL: downloadURL
        //             });

        //             //store user data in firestore database
        //             await setDoc(doc(db, 'users', user.uid), {
        //                 uid: user.uid,
        //                 displayName: username,
        //                 email,
        //                 photoURL: downloadURL,
        //             });

        //         });
        //     }
        //     );

        //     setLoading(false)
        //     toast.success('Account created')
        //     navigate('/login')
        // } catch (error) {
        //     setLoading(false)
        //     toast.error('something went wrong')
        // }

    }
    return (
        <Helmet title='Signup'>
            <section>
                <Container>
                    <Row>
                        {
                            loading ? <Col lg='12' className="text-center"><h5 className="fw-bold">Loading....</h5></Col> :
                                <Col lg='6' className="m-auto text-center">
                                    <h3 className="fw-bold mb-4">Signup</h3>

                                    <Form className="auth__form" onSubmit={signup}>
                                        <FormGroup className="form__group">
                                            <input type="text" placeholder="Username" value={FormData.username} onChange={e => setUsername(e.target.value)} />
                                        </FormGroup>
                                        <FormGroup className="form__group">
                                            <input type="email" placeholder="Enter your email" value={FormData.email} onChange={e => setEmail(e.target.value)} />
                                        </FormGroup>
                                        <FormGroup className="form__group">
                                            <input type="password" placeholder="Enter your password" value={FormData.password} onChange={e => setPassword(e.target.value)} />
                                        </FormGroup>
                                        <FormGroup className="form__group">
                                            <input type="file" onChange={e => setFile(e.target.files[0])} />
                                        </FormGroup>
                                        <button type="submit" className="buy__btn auth__btn">Create an Account</button>
                                        <p>Already have an account? <Link to='/login'>Login</Link></p>
                                    </Form>
                                </Col>
                        }
                    </Row>
                </Container>
            </section>

        </Helmet>
    );
};

export default Signup;
