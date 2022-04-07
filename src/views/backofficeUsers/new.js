import React from "react";

import Error500 from "../Error500";
import FormInput from "../../components/FormInput";
import {requiredChecker} from "../../helpers/helpers";
import {NotificationManager} from "react-notifications";
import {Button, Card, FormGroup, Label, Spinner, Form} from "reactstrap";
import {addBackofficeUser} from "../../redux/actions/IndependentActions";

class NewBackofficeUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false,
            roles: {data: [], errorMessage: '', isValid: true},
            lastName: {data: '', errorMessage: '', isValid: true},
            password: {data: '', errorMessage: '', isValid: true},
            username: {data: '', errorMessage: '', isValid: true},
            firstName: {data: '', errorMessage: '', isValid: true}
        }
    }

    handleNew = (e) => {
        e.preventDefault();
        // Reset error data
        this.setState({loading: true});
        const { roles, firstName, lastName, password, username } = this.state;
        const { handleCompleted, backOfficeUserId } = this.props;
        const _roles = requiredChecker(roles);
        const _username = requiredChecker(username);
        const _lastName = requiredChecker(lastName);
        const _password = requiredChecker(password);
        const _firstName = requiredChecker(firstName);
        // Set value
        this.setState({
            roles: _roles,
            username: _username,
            lastName: _lastName,
            password: _password,
            firstName: _firstName,
        });
        // Check validation
        const validationOK = (_username.isValid && _lastName.isValid && _password.isValid && _firstName.isValid && _roles.isValid);
        // Check & send request
        if(validationOK) {
            addBackofficeUser(
                _username.data,
                _firstName.data,
                _lastName.data,
                _password.data,
                _roles.data,
                backOfficeUserId
            )
                .then(() => {
                    NotificationManager.success("Utilisateur ajouté avec succèss", null);
                    handleCompleted();
                })
                .catch(error => this.setState({ error }))
                .finally(() => this.setState({loading: false}));
        } else this.setState({loading: false});
    };

    render() {

        const { error, loading, firstName, lastName, password, username } = this.state;

        if(error) {
            return (
                <Card className="sidebar-content h-100">
                    <Error500 onLinkClick={this.loadData} />
                </Card>
            )
        }

        return (
            <Form role="form" className="mt-2" onSubmit={this.handleNew}>
                <FormGroup>
                    <Label>Username</Label>
                    <FormInput
                        input={username}
                        label="Ex: user@chat-yamo.com"
                        handleInput={(data) => this.setState({ username: {...username, data}, error: null })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Fist name</Label>
                    <FormInput
                        input={firstName}
                        label="Ex: Alex"
                        handleInput={(data) => this.setState({ firstName: {...firstName, data}, error: null })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Last name</Label>
                    <FormInput
                        input={lastName}
                        label="Ex: Croquignolex"
                        handleInput={(data) => this.setState({ lastName: {...lastName, data}, error: null })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <FormInput
                        type="password"
                        input={password}
                        handleInput={(data) => this.setState({ password: {...password, data}, error: null })}
                    />
                </FormGroup>
                <div className="d-flex justify-content-between">
                    {(loading) ? <Spinner color="primary" /> : (
                        <Button color="primary" className="rounded" type="submit">
                            Save
                        </Button>
                    )}
                </div>
            </Form>
        )
    }
}

export default NewBackofficeUser;
