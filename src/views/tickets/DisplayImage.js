import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
    background-image: url(${props => props.src})
`;

const DisplayImage = ({src, className = ''}) => {
    return (
        <div className={`c-image ${className}`}>
            <Wrapper src={src} className="c-image-content rounded"/>
        </div>
    );
};

export default DisplayImage;
