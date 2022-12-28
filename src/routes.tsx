import { Routes, Route } from 'react-router-dom'
// import Check from './pages/Check'
import ChecknationalCode from './pages/ChecknationalCode'
import Login from './pages/Login'

const AppRouter = (): JSX.Element => {
    return <>
        <Routes >
            <Route path='/login' element={<Login />} />
            <Route path='/check' element={<ChecknationalCode />} />
            {/* <Route path='/checkts' element={<ChecknationalCode />} /> */}
        </Routes>
    </>
}

export default AppRouter
