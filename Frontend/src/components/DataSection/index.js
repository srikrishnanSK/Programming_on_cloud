import React from 'react'
import {Button} from '../ButtonItem'


import { DataContainer, DataWrapper, DataRow, Column1, Column2, TextWrapper, TopLine,Heading, Subtitle, BtnWrap, ImgWrap, Img} from './DataItems.js'


const DataSection = ({lightBg, id, imgStart, topline, lightText, headline, darkText,description, buttonLabel, img, alt}) => {
    return (
        <>
            <DataContainer lightBg={lightBg} id={id}>
                <DataWrapper>
                    <DataRow imgStart={imgStart}>
                        <Column1>
                          <TextWrapper>
                              <TopLine>{topline}</TopLine>
                              <Heading lightText={lightText}>{headline}</Heading>
                              <Subtitle darkText={darkText}>{description}</Subtitle>
                              <BtnWrap>
                                  <Button to='home' > {buttonLabel}</Button>
                              </BtnWrap>
                          </TextWrapper>
                        </Column1>
                        <Column2>
                        <ImgWrap>
                          <Img src = {img}  alt={alt}/>
                        </ImgWrap>
                        </Column2>
                    </DataRow>
                </DataWrapper>
            </DataContainer>
            
        </>
    )
}

export default DataSection
