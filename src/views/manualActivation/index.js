import React from "react";
import Select from "react-select";
import * as Icon from "react-feather";

import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import {Col, Row, Form, Input, Button, Spinner, Label} from "reactstrap";

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
            subscription:  {label: 'Default', value: 'DEFAULT'}
        }
    }

    updateSearchInput = (e) => {
        this.setState({error: null});
        const user = e?.target?.value;
        this.setState({user})
    };

    updateSubscriptionSelect = (subscription) => {
        this.setState({subscription});
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

        const {user, file, subscription} = this.state;

        if(user && file) {
            const bytesArray =  file.split("data:image/jpeg;base64,");
            activateSubscription(user, bytesArray[1], subscription.value)
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

        const {error, loading, data, user, file, subscription, pictureCropperModal} = this.state;

        const selectItems = [
            {label: 'Default', value: 'DEFAULT'},
            {label: 'Incognito', value: 'INCOGNITO'},
            {label: 'Advanced filters', value: 'ADVANCED_FILTERS'},
            {label: 'Diaspora', value: 'DIASPORA'},
            {label: 'Conversation', value: 'CONVERSATION'},
            {label: 'Premium', value: 'PREMIUM'},
        ];

        return (
            <>
                <Breadcrumbs
                    breadCrumbTitle="Manual activation"
                    breadCrumbActive="Insert data for activation"
                />
                <Row>
                    <Col lg={12} sm={12}>
                        <Form className="d-flex mx-auto" onSubmit={this.handleUpload}>
                            <div className="w-25">
                                <Label>Enter user id</Label>
                                <Input
                                    type="text"
                                    placeholder="Enter user id..."
                                    onChange={(this.updateSearchInput)}
                                    value={user}
                                />
                            </div>
                            <div className="w-25 ml-1">
                                <Label>Choose subscription pack</Label>
                                <Select
                                    value={subscription}
                                    options={selectItems}
                                    onChange={this.updateSubscriptionSelect}
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
                                        <Icon.AlertTriangle size={40} className="text-warning" />
                                        <h4 className="text-warning">{error.input}</h4>
                                    </>
                                ) : (
                                    <>
                                        <Icon.X size={40} className="text-danger" />
                                        <h4 className="text-danger">Could not proceed manual activation</h4>
                                    </>
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
