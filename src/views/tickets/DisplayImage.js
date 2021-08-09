import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
    background-image: url(${props => props.src})
`;

const DisplayImage = ({src}) => {
    return (
        <div className="c-image">
            <Wrapper src={src} className="c-image-content"/>
        </div>
    );
};

export default DisplayImage;
