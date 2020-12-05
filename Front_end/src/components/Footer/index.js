import React from 'react'
import{FooterContainer, FooterLink, FooterWrap, FooterLinkItems, FooterLinksContainer, FooterLinksWrapper, FooterLinkTitle, SocialIconLink, SocialIcons,SocialLogo, SocialMedia,SocialMediaWrap, WebsiteRights } from './FooterItems'
import{FaInstagram, FaTwitter, FaFacebook, FaLinkedin} from 'react-icons/fa'
import {animateScroll as scroll} from 'react-scroll'

const Footer = () => {
    const toggleHome = () => {
        scroll.scrollToTop()
    };

    return (
        <FooterContainer>
            <FooterWrap>
                <FooterLinksContainer>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle> Get To Know Us </FooterLinkTitle>
                                <FooterLink to="/profile">How it works</FooterLink>
                                <FooterLink to="/profile">Careers</FooterLink>
                                <FooterLink to="/profile">Terms of Service</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle> Contact Us </FooterLinkTitle>
                                <FooterLink to="/profile">Contact</FooterLink>
                                <FooterLink to="/profile">Support Community</FooterLink>
                                <FooterLink to="/profile">Destinations</FooterLink>   
                        </FooterLinkItems>  
                    </FooterLinksWrapper>

                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>Customer Success </FooterLinkTitle>
                            <FooterLink to="/profile">Overview</FooterLink>
                                <FooterLink to="/profile">User Stories</FooterLink>
                                <FooterLink to="/profile">Professional Services </FooterLink>
                                
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle> Social Media </FooterLinkTitle>
                                <FooterLink to="/profile">Instagram</FooterLink>
                                <FooterLink to="/profile">Twitter</FooterLink>
                                <FooterLink to="/profile">Facebook</FooterLink>   
                        </FooterLinkItems>
                        
                    </FooterLinksWrapper>
                </FooterLinksContainer>
                <SocialMedia>
                    <SocialMediaWrap>
                        <SocialLogo to='/' onClick={toggleHome}>
                            C&G
                        </SocialLogo>
                        <WebsiteRights> C&G © 2020 All rights reserved.</WebsiteRights>
                        <SocialIcons>
                            <SocialIconLink href="/" target="_blank" aria-label="Instagram">
                                <FaInstagram />
                            </SocialIconLink>
                        </SocialIcons>

                        <SocialIcons>
                            <SocialIconLink href="/" target="_blank" aria-label="Twitter">
                                <FaTwitter />
                            </SocialIconLink>
                        </SocialIcons>

                        <SocialIcons>
                            <SocialIconLink href="/" target="_blank" aria-label="Facebook">
                                <FaFacebook />
                            </SocialIconLink>
                        </SocialIcons>

                        <SocialIcons>
                            <SocialIconLink href="/" target="_blank" aria-label="Linkedin">
                                <FaLinkedin />
                            </SocialIconLink>
                        </SocialIcons>

                    </SocialMediaWrap>
                </SocialMedia>
            </FooterWrap>
        </FooterContainer>
          
            
        
    )
}

export default Footer
