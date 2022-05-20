import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Navigation from 'components/Navigation';
import Profile from 'routes/Profile';

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <div
                style={{
                    maxWidth: 890,
                    width: "100%",
                    margin: "0 auto",
                    marginTop: 80,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Routes>
                    <Route path='/' element={isLoggedIn ? <Home userObj={userObj} /> : <Auth />} />
                    <Route path='/profile' element={isLoggedIn ? <Profile userObj={userObj} refreshUser={refreshUser} /> : <Auth />} />
                </Routes>
            </div>
        </Router>
    )
}

export default AppRouter;