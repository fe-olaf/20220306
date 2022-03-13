import { BrowserRouter, Routes, Route } from 'react-router-dom'
// 모든 컴포넌트들의 최상위 부모

// context api => 다음주
// BrowserRouter = 브라우저 히스토리 정보를 담고있는 context api 다
// 박스로 감싸져있어야 박스의 정보에 접근이 가능하다.

import BannerPage from './pages/banner'
import BannerCreatePage from './pages/banner-create'
import HomePage from './pages/Home'
import SigninPage from './pages/Signin'
import SignupPage from './pages/Signup'
import MyInfoPage from './pages/MyInfo'
import GNB from './components/shared/GNB'

import { UserContextProvider } from './contexts/user-context'
import { PATHS } from './constants'
import PrivateRoute from './components/shared/PrivateRoute'
import ResetCSS from './components/shared/ResetCSS'

const App = () => {
  return (
    <div>
      <ResetCSS />
      <UserContextProvider>
        <BrowserRouter>
          <GNB />
          <Routes>
            <Route path={PATHS.HOME} element={<HomePage />}></Route>
            <Route path="/banner" element={<BannerPage />}></Route>
            <Route
              path={PATHS.BANNER_CREATE}
              element={<BannerCreatePage />}
            ></Route>
            <Route path={PATHS.SIGN_IN} element={<SigninPage />}></Route>
            <Route path={PATHS.SIGN_UP} element={<SignupPage />}></Route>
            <Route
              path={PATHS.MY_INFO}
              element={
                <PrivateRoute>
                  <MyInfoPage />
                </PrivateRoute>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  )
}

export default App
