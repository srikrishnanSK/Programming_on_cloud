import styled from "styled-components";

export const DataContainer = styled.div`
  color: #000;
  background: ${({ lightBg }) => (lightBg ? "#f9f9f9" : "#e2e2e3")};

  @media screen and (max-width: 760px) {
    padding: 100px 0;
  }
`;

export const DataWrapper = styled.div`
  display: grid;
  z-index: 1;
  width: 100%;
  //   height: 100%;
  max-width: 1100px;
  margin-right: auto;
  margin-left: auto;
  padding: 0 24px;
  justify-content: center;
`;

export const DataRow = styled.div`
  display: grid;
  grid-auto-column: minmax(auto, 1fr);
  align-items: center;
  grid-template-areas: ${({ imgStart }) =>
    imgStart ? `'col2 col1'` : `'col1 col2'`};

  @media screen and (max-width: 768px) {
    grid-template-areas: ${({ imgStart }) =>
      imgStart ? `'col1 col2'` : `'col1 col2' 'col2 col2'`};
  }
`;

export const Column1 = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;

  grid-area: col1;
`;

export const TextWrapper = styled.div`
  max-width: 540px;
  padding-top: 0;
  padding-bottom: 60px;
`;

export const TopLine = styled.div`
  color: #000;
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

export const Heading = styled.h1`
  margin-bottom: 24px;
  font-size: 48px;
  line-height: 1.1;
  font-weight: 600;
  color: ${({ lightText }) => (lightText ? "#f7f8fa" : "#010606")};

  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`;

export const Subtitle = styled.p`
  max-width: 440px;
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 24px;
  color: ${({ darkText }) => (darkText ? "#010606" : "#000")};
`;

export const BtnWrap = styled.div`
  diaplay: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const ImgWrap = styled.div`
  max-width: 555px;
  // margin: 0 0 10px 0;
  // padding-right: 0;
  height: 100%;
`;

export const Column2 = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;
  grid-area: col2;
`;

export const Img = styled.img`
  width: 100%;
  // //   height:100%;
  // width: 555px !important;
  // height: 555px !important;
  margin-top: 0;
  //   margin-right: 10px;
  padding-right: 0;
  margin-left: 10px;
`;
