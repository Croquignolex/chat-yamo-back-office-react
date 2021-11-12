import React from "react"
import { connect } from "react-redux"
import { Mail, Lock } from "react-feather"
import { loginWithJWT } from "../../../../redux/actions/auth"
import { CardBody, FormGroup, Form, Input, Label } from "reactstrap"
import {setRequestGlobalAction} from "../../../../redux/actions/GeneralAction";

class LoginJWT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      remember: false
    };
  }

  handleLogin = e => {
    e.preventDefault();
    this.props.setRequestGlobalAction(true);
    this.props.loginWithJWT(this.state)
        .finally(() => {
          this.props.setRequestGlobalAction(false);
        });
  };

  render() {
    const { email, password } = this.state;
    return (
      <React.Fragment>
        <CardBody className="pt-1">
          <Form action="/" onSubmit={this.handleLogin}>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                placeholder="Login"
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Mail size={15} />
              </div>
              <Label size="large">Login</Label>
            </FormGroup>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Lock size={15} />
              </div>
              <Label>Password</Label>
            </FormGroup>
            <div className="d-flex justify-content-between">
              <button className="btn btn-primary btn-block">Login</button>
            </div>
          </Form>
        </CardBody>
      </React.Fragment>
    )
  }
}

export default connect(null, { setRequestGlobalAction, loginWithJWT })(LoginJWT)
