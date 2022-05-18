import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Navigation from 'components/Navigation';
import Profile from 'routes/Profile';

const AppRouter = ({ isLoggedIn, userObj }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                <Route path='/' element={isLoggedIn ? <Home userObj={userObj} /> : <Auth />} />
                <Route path='/profile' element={isLoggedIn ? <Profile userObj={userObj} /> : <Auth />} />
            </Routes>
        </Router>
    )
}

export default AppRouter;