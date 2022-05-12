import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from 'Routes/Auth';
import Home from 'Routes/Home';
import Navigation from 'Components/Navigation';
import Profile from 'Routes/Profile';

const AppRouter = ( {isLoggedIn} ) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                <Route path='/' element={isLoggedIn ? <Home /> : <Auth />} />
                <Route path='/profile' element={isLoggedIn ? <Profile /> : <Auth />} />
            </Routes>
        </Router>
    )
}

export default AppRouter;