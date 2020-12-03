import React, { useState } from "react";
import Video from "assets/videos/video.mp4";
import { Button } from "../ButtonItem.js";
import {
  MainContainer,
  MainBg,
  VideoBg,
  MainContent,
  MainH1,
  MainBtnWrapper,
  ArrowForward,
  ArrowRight,
} from "./MainElements";

const MainSection = () => {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover);
  };
  return (
    <MainContainer id="home">
      <MainBg>
        <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
      </MainBg>
      <MainContent>
        <MainH1>Services At Your Doorstep</MainH1>

        <MainBtnWrapper>
          <Button
            to="profile"
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            primary="true"
            dark="true"
          >
            Get started {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </MainBtnWrapper>
      </MainContent>
    </MainContainer>
  );
};

export default MainSection;
