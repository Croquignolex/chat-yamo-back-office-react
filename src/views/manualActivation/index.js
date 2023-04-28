import * as Icon from "react-feather";
import React from "react";

import Error500 from "../Error500";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import {Col, Row, Form, Input, Button, Spinner, Card, Label} from "reactstrap";

import CroupArea from "./CroupArea";
import FormModal from "../../components/FormModal";
import {readFile, extractCroppedImage} from "../../helpers/helpers";
import {activateSubscription} from "../../redux/actions/IndependentActions";

class Exports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: null,
            data: null,
            user: "",
            file: "",
            pictureCropperModal: {show: false, title: "", src: null},
        }
    }

    updateSearchInput = (e) => {
        const user = e?.target?.value;
        this.setState({user})
    };

    handleImageUpload = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            readFile(file)
                .then((imageDataUrl) => {
                    this.setState({error: null});
                    this.togglePictureCropperModal(imageDataUrl);
                })
                .catch(() => {
                    this.setState({ error: {input: "Error when read image file"} });
                });
        } else {
            this.setState({ error: {input: "Error when load image"} });
        }
    };

    handlePictureCroup = (imageSrc, croppedAreaPixels) => {
        this.togglePictureCropperModal();
        extractCroppedImage(imageSrc, croppedAreaPixels)
            .then((base64image) => {
                this.setState({file: base64image})
            })
            .catch(() => {
                this.setState({ error: {input: "Error while image crouping"} });
            });
    };

    togglePictureCropperModal = (src) => {
        const {pictureCropperModal} = this.state;
        if(pictureCropperModal.show) {
            document.getElementById('upload').value = "";
            this.setState({pictureCropperModal: {...pictureCropperModal, show: false}});
        }
        else {
            this.setState({pictureCropperModal: {show: true, title: "Croup image", src}});
        }
    };

    handleUpload = (e) => {
        e.preventDefault();
        // Reset error data
        this.setState({loading: true, data: null, error: null});

        const {user, file} = this.state;

        if(user && file) {
            const bytesArray =  file.split("data:image/jpeg;base64,");
            activateSubscription(user, bytesArray[1])
                .then((data) => {
                    this.setState({data, file: "", user: ""})
                })
                .catch((error) => this.setState({ error }))
                .finally(() => this.setState({loading: false}))
        } else {
            this.setState({ error: {input: "Please provide all the fields before submit"}, loading: false });
        }
    };

    render() {

        const {error, loading, data, user, file, pictureCropperModal} = this.state;

        return (
            <>
                <Breadcrumbs
                    breadCrumbTitle="Manual activation"
                    breadCrumbActive="Insert data for activation"
                />
                <Row>
                    <Col lg={8} sm={12}>
                        <Form className="d-flex mx-auto" onSubmit={this.handleUpload}>
                            <div className="w-50">
                                <Label>Enter user id</Label>
                                <Input
                                    type="text"
                                    placeholder="Enter user id..."
                                    onChange={(this.updateSearchInput)}
                                    value={user}
                                />
                            </div>
                            <div className="ml-1">
                                <Button outline color="primary" className="rounded mt-1" tag="label">
                                    Choose image
                                    <Input
                                        hidden
                                        type="file"
                                        id='upload'
                                        name="file"
                                        accept="image/*"
                                        onChange={this.handleImageUpload}
                                    />
                                </Button>
                            </div>
                            <div className="ml-1">
                                {(!loading) && (
                                    <Button color="primary" className="rounded mt-1" type="submit">
                                        Upload
                                    </Button>
                                )}
                            </div>
                        </Form>
                        {(file) && (
                            <>
                                <hr/>
                                <img alt="..." src={file} style={{ width: "50%" }} />
                            </>
                        )}
                        <hr/>
                        <div className="mt-50 text-center">
                            {(loading) ? <Spinner color="primary" /> : (
                                (data !== null) && (
                                    <>
                                        <Icon.Check size={40} className="text-success" />
                                        <h4 className="text-success">Manual activation requested</h4>
                                    </>
                                )
                            )}
                            {(error) && (
                                (error.input) ? (
                                    <>
                                        <Icon.X size={40} className="text-danger" />
                                        <h4 className="text-danger">{error.input}</h4>
                                    </>
                                ) : (
                                    <Card className="sidebar-content h-100">
                                        <Error500 refresh={false} />
                                    </Card>
                                )
                            )}
                        </div>
                    </Col>
                </Row>

                <FormModal small modal={pictureCropperModal} toggleModal={this.togglePictureCropperModal}>
                    <CroupArea handleModal={this.handlePictureCroup} src={pictureCropperModal.src} />
                </FormModal>
            </>
        )
    }
}

export default Exports;
