import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const authService = getAuth();
    const navigate = useNavigate();

    const onLogOutClick = () => {
        authService.signOut();
        navigate('/');
    };

    return (
        <>
            <span>Profile</span>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );

};

export default Profile;