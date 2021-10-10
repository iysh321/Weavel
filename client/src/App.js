import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  useHistory,
  Redirect,
  Link,
} from "react-router-dom";
import axios from "axios";
import Modal from "./components/Modal/Modal";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage/MyPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import {
  Container,
  Header,
  Logo,
  LoginButton,
  Body,
  Footer,
  FooterLine,
  FooterContents,
  FooterProjectLink,
  FooterTeamLink,
} from "./App.style";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const history = useHistory();

  const handleLogout = () => {
    axios.post("https://localhost:4000/signout").then((res) => {
      setUserinfo(null);
      setIsLogin(false);
      history.push("/");
    });
  };

  return (
    <BrowserRouter>
      <Container>
        <Header>
          <Logo src="./images/logo.svg"></Logo>
          <div>
            <Link to="/">
              <span>홈</span>
            </Link>
            <Link to="/mypage">
              <span>마이페이지</span>
            </Link>
          </div>
          <Link to="/login">
            <LoginButton>로그인</LoginButton>
          </Link>
        </Header>
        <Body>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            {/* <Route exact path="/">
              <MainPage />
            </Route>
            <Route exact path="/">
              <SignupPage />
            </Route> */}
            <Route exact path="/">
              <MyPage />
            </Route>
          </Switch>
        </Body>
        <FooterLine>
          <div></div>
        </FooterLine>
      </Container>
      <Footer>
        <FooterContents>
          <a href="https://github.com/codestates/Weavel/wiki" target="_blank">
            <FooterProjectLink>
              <img src="./images/githubLogo.svg" />
              <span>Codemon</span>
            </FooterProjectLink>
          </a>
          <FooterTeamLink>
            <a href="https://github.com/suzyhwang" target="_blank">
              황소영
            </a>
            <a href="https://github.com/choigicheol" target="_blank">
              최기철
            </a>
            <a href="https://github.com/iysh321" target="_blank">
              정인용
            </a>
            <a href="https://github.com/devSominPark" target="_blank">
              박소민
            </a>
          </FooterTeamLink>
        </FooterContents>
      </Footer>
    </BrowserRouter>
  );
}

export default App;
