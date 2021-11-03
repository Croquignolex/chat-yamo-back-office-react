import React from "react"
import * as Yup from "yup"
import {connect} from "react-redux";
import { Formik, Field, Form } from "formik"
import {NotificationManager} from "react-notifications";
import {
    Col,
    Row,
    Card,
    Media,
    Button,
    CardBody,
    FormGroup, Spinner
} from "reactstrap"

import { history } from "../../history";
import {AUTH} from "../../utility/urls/frontend";
import {logoutWithJWT} from "../../redux/actions/auth";
import userImg from "../../assets/img/user-default.png";
import {changePassword} from "../../redux/actions/IndependentActions";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";

class Password extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    handleSubmit = (data, {resetForm}) => {
        this.setState({loading: true});
        const {oldpass, newpass} = data;
        changePassword(oldpass, newpass, this.props.backOfficeUserId)
            .then(() => {
                resetForm({values: ''});
                NotificationManager.success("Password successfully changed, you need to connect back");
                setTimeout(() => {
                    // Redirect to login page after 2 seconds
                    this.props.logoutWithJWT()
                    history.push(AUTH.LOGIN);
                }, 2000);
            })
            .finally(() => {
                this.setState({loading: false});
            });
    };

    render() {
        return (
            <>
                <Breadcrumbs
                    breadCrumbTitle="Change password"
                    breadCrumbActive="Change password"
                />
                <Card>
                    <CardBody>
                        <Media>
                            <Media className="mr-1" left href="#">
                                <Media
                                    object
                                    alt="User"
                                    width="64"
                                    height="64"
                                    src={userImg}
                                    className="rounded-circle"
                                />
                            </Media>
                        </Media>
                        <Row className="pt-1">
                            <Col sm="12">
                                <Formik
                                    onSubmit={this.handleSubmit}
                                    validationSchema={formSchema}
                                    initialValues={{oldpass: "", newpass: "", confirmpass: ""}}
                                >
                                    {({ errors, touched }) => (
                                        <Form>
                                            <FormGroup>
                                                <Field
                                                    id="oldpass"
                                                    name="oldpass"
                                                    type="password"
                                                    placeholder="Old Password"
                                                    className={`form-control ${errors.oldpass && touched.oldpass && "is-invalid"}`}
                                                />
                                                {errors.oldpass && touched.oldpass && <div className="text-danger">{errors.oldpass}</div>}
                                            </FormGroup>
                                            <FormGroup>
                                                <Field
                                                    id="newpass"
                                                    name="newpass"
                                                    type="password"
                                                    placeholder="New Password"
                                                    className={`form-control ${errors.newpass && touched.newpass && "is-invalid"}`}
                                                />
                                                {errors.newpass && touched.newpass && <div className="text-danger">{errors.newpass}</div>}
                                            </FormGroup>
                                            <FormGroup>
                                                <Field
                                                    type="password"
                                                    id="confirmpass"
                                                    name="confirmpass"
                                                    placeholder="Confirm Password"
                                                    className={`form-control ${errors.confirmpass && touched.confirmpass && "is-invalid"}`}
                                                />
                                                {errors.confirmpass && touched.confirmpass && <div className="text-danger">{errors.confirmpass}</div>}
                                            </FormGroup>
                                            <div className="d-flex justify-content-start flex-wrap">
                                                {this.state.loading ? <Spinner color="primary" /> : (
                                                    <>
                                                        <Button.Ripple className="mr-1 mb-1" color="primary" type="submit">
                                                            Save Changes
                                                        </Button.Ripple>
                                                        <Button.Ripple className="mb-1" color="danger" type="reset" outline>
                                                            Cancel
                                                        </Button.Ripple>
                                                    </>
                                                )}
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </>
        )
    }
}

const formSchema = Yup.object().shape({
    oldpass: Yup.string().required("Required"),
    newpass: Yup.string().test(
        "passwords-match",
        "Password must be different than old password",
        function (value) {
            return this.parent.oldpass !== value;
        }
    ),
    confirmpass: Yup.string()
        .oneOf([Yup.ref("newpass"), null], "Passwords must match")
        .required("Required")
})

const mapStateToProps = state => {
    return {
        backOfficeUserId: state.authUser?.data?.entityId,
    }
};

export default connect(mapStateToProps, {logoutWithJWT})(Password)

