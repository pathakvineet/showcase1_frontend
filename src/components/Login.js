import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import { Link } from "react-router-dom";
import '../assets/styles/loginup.css';
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {
                email: "",
                password: ""
            }
        }
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push(`/${this.props.auth.user.id}/dashboard`);
        }

    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.auth.isAuthenticated) {
            this.props.history.push(`/${nextProps.auth.user.id}/dashboard`); // push user to dashboard when they login

        }

    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    validate(email, password) {

        let errors = this.state.errors;
        if (email === '') {
            errors.email = 'email should not be empty'
        } else {
            errors.email = ''
        }
        if (password === '') {
            errors.password = 'password should not be empty'
        } else {
            errors.password = ''
        }

        this.setState({ errors });
    }

    onSubmit = e => {
        e.preventDefault();
        this.validate(this.state.email, this.state.password);
        const loginData = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(this.state);
        if (this.state.errors.password || this.state.errors.email) return;
        this.props.loginUser(loginData);
        this.setState({
            email: '',
            password: '',
            errors: {
                email: '',
                password: ''
            }
        })
    }
    render() {
        return (
            <div className="LoginUpView">
                <div className="Wrapper">
                    <h1 className="LogHeader">Hackathon</h1>
                    <form onSubmit={this.onSubmit}>

                        <input
                            className="WrapperInputs"
                            onChange={this.onChange}
                            value={this.state.email}
                            placeholder="Email"
                            id="email"
                            type="email"
                        />

                        <input
                            className="WrapperInputs"
                            placeholder="Password"
                            onChange={this.onChange}
                            value={this.state.password}
                            id="password"
                            type="password"
                        />
                        <p style={{ color: 'red' }}>{this.state.errors.email}</p>
                        <p style={{ color: 'red' }}>{this.state.errors.password}</p>
                        <div>
                            <button type="submit" className="Button1" style={{ 'margin-top': '200px' }}>
                                login
                            </button>
                        </div>

                    </form>
                    <p>New to the challenge ? <Link to='/signup' >sign up</Link></p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps, { loginUser })(Login);