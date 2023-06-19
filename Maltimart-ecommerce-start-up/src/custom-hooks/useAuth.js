import { useEffect, useState } from "react";
// import { onAuthStateChanged } from 'firebase/auth';
// // import { auth } from '../firebase.config';




const useAuth = () => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const user = localStorage.getItem('user');

        if (user) {
            setCurrentUser(user)
        }
        else {
            setCurrentUser(null)
        }

        // onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //         setCurrentUser(user)
        //     } else {
        //         setCurrentUser(null)
        //     }
        // })

    }, []);



    return {
        currentUser,
    };
};

export default useAuth;
