import React from "react"
import {Card, CardHeader, CardTitle, Row, Col} from "reactstrap"

import LoginJWT from "./LoginJWT"
import loginImg from "../../../../assets/img/logo.png"

import "../../../../assets/scss/pages/authentication.scss"

class Login extends React.Component {
  render() {
    return (
      <Row className="m-0 justify-content-center">
        <Col sm="8" xl="7" lg="10" md="8" className="d-flex justify-content-center">
          <Card className="login-card rounded-10 w-100">
            <Row className="m-0">
              <Col lg="6" className="d-lg-block d-none text-center align-self-center px-1 py-0">
                <img src={loginImg} alt="..." height={300} />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="pt-5 px-2 login-tabs-container">
                  <CardHeader className="pb-1">
                    <CardTitle>
                      <h4 className="mb-0">LOGIN</h4>
                    </CardTitle>
                  </CardHeader>
                  <p className="px-2 auth-title">
                    Welcome back, please login to your account.
                  </p>
                  <LoginJWT />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    )
  }
}
export default Login
