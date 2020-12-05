import React from "react";
import Icon1 from "assets/images/svg-5.svg";
import Icon2 from "assets/images/svg-6.svg";
import Icon3 from "assets/images/svg-7.svg";
import Icon4 from "assets/images/svg-8.svg";

import {
  ServicesContainer,
  ServicesCard,
  ServicesH1,
  ServicesH2,
  ServicesIcon,
  ServicesWrapper,
} from "./ServiceItems";

const Services = () => {
  return (
    <>
      <ServicesContainer id="services">
        <ServicesH1>Our Services</ServicesH1>
        <ServicesWrapper>
          <ServicesCard>
            <ServicesIcon src={Icon1} />
            <ServicesH2>Salon Experience At Home!</ServicesH2>
          </ServicesCard>
          <ServicesCard>
            <ServicesIcon src={Icon2} />
            <ServicesH2> Please don't pet the pests!</ServicesH2>
            {/* <ServicesP>Call the professionals for the pest control</ServicesP> */}
          </ServicesCard>
          <ServicesCard>
            <ServicesIcon src={Icon3} />
            <ServicesH2>
              Crack-free plumbing that won’t break the bank!
            </ServicesH2>
          </ServicesCard>
          <ServicesCard>
            <ServicesIcon src={Icon4} />
            <ServicesH2>& Many More...</ServicesH2>
          </ServicesCard>
        </ServicesWrapper>
      </ServicesContainer>
    </>
  );
};

export default Services;
