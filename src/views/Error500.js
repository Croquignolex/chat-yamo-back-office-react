import React from "react";
import PropTypes from 'prop-types';
import errorImg from "../assets/img/pages/500.png";
import { Card, CardBody, Button, Row, Col } from "reactstrap";

const Error500 = ({ title, content, linkText, onLinkClick }) => {
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
                        <Button.Ripple
                            tag="a"
                            // href="/"
                            size="lg"
                            color="primary"
                            className="mt-2"
                            onClick={_onLinkClick}
                        >
                            {linkText}
                        </Button.Ripple>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};
Error500.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    onLinkClick: PropTypes.func,
    linkText: PropTypes.string,
};

Error500.defaultProps = {
    title: "Something went wrong",
    content: "We are sorry, the request is not available.",
    onLinkClick: () => null,
    linkText: 'Try again'
};

export default Error500;
