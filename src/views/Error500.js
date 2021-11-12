import React from "react";
import PropTypes from 'prop-types';
import { Card, CardBody, Button, Row, Col } from "reactstrap";

import errorImg from "../assets/img/pages/500.png"

const Error500 = ({ title, content, linkText, refresh, onLinkClick }) => {
    const _onLinkClick = e => {
        e.preventDefault();
        onLinkClick();
    };

    return (
        <Row className="m-0">
            <Col sm="12">
                <Card className="auth-card bg-transparent shadow-none rounded-0 mb-0 w-100">
                    <CardBody className="text-center">
                        <img
                            src={errorImg}
                            alt="ErrorImg"
                            className="img-fluid align-self-center mt-75"
                        />
                        <h1 className="font-large-2 my-2">{title}</h1>
                        <p className="pt-2 mb-0">
                            {content}
                        </p>
                        {refresh && (
                            <Button.Ripple tag="a" size="lg" color="primary" className="mt-2" onClick={_onLinkClick}>
                                {linkText}
                            </Button.Ripple>
                        )}
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};
Error500.propTypes = {
    refresh: PropTypes.bool,
    title: PropTypes.string,
    content: PropTypes.string,
    linkText: PropTypes.string,
    onLinkClick: PropTypes.func,
};

Error500.defaultProps = {
    content: "We are sorry, unable to gat a response for this request.",
    title: "Something went wrong",
    onLinkClick: () => null,
    linkText: 'Try again',
    refresh: true
};

export default Error500;
