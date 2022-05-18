import { useNavigate } from "react-router-dom";
import { authService, dbService } from "fbase";
import { getDocs, query, collection, where, orderBy } from "firebase/firestore";
import { useEffect } from "react";

const Profile = ({ userObj }) => {
    const navigate = useNavigate();

    const onLogOutClick = () => {
        authService.signOut();
        navigate('/');
    };

    const getMyNweet = async () => {
        const q = query(collection(dbService, "nweets"),
            where("creatorId", "==", userObj.uid), orderBy("nweets", "desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
        })
    }

    useEffect(() => {
        getMyNweet();
    }, [])

    return (
        <>
            <span>Profile</span>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );

};

export default Profile;