import React, { Component } from "react";
import { connect } from "react-redux";
import { signupUser } from "../actions/authActions";
import { Link } from "react-router-dom";
import '../assets/styles/loginup.css';
class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            selectedFile: null,
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: {
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                image: ''
            }
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push(`/${this.props.auth.user.id}/dashboard`);
        }
    }

    onFileChange = event => {
        // Update the state 
        this.setState({ selectedFile: event.target.files[0] });
    };

    componentWillReceiveProps(nextProps) {

        if (nextProps.auth.isAuthenticated) {
            this.props.history.push(`/${nextProps.auth.user.id}/dashboard`); // push user to dashboard when they login

        }

    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    validate(username, email, password, confirmPassword, image) {

        let errors = this.state.errors;
        if (username === '') {
            errors.username = 'username should not be empty'
        } else { errors.username = '' }
        if (email === '') {
            errors.email = 'email should not be empty'
        } else { errors.email = '' }
        if (password === '') {
            errors.password = 'password should not be empty'
        } else { errors.password = '' }

        if (confirmPassword === '') {
            errors.confirmPassword = 'email should not be empty'
        } else { errors.confirmPassword = '' }
        console.log(image);
        if (image === null) {
            errors.image = 'upload an image';
        } else { errors.image = '' }
        this.setState({ errors });
    }

    onSubmit = e => {
        e.preventDefault();
        this.validate(this.state.username, this.state.email,
            this.state.password, this.state.confirmPassword,
            this.state.selectedFile);
        // const userData = {
        //     username: this.state.username,
        //     email: this.state.email,
        //     password: this.state.password,
        //     confirmPassword: this.state.confirmPassword
        // }
        if (this.state.errors.password || this.state.errors.email ||
            this.state.errors.username || this.state.errors.confirmPassword ||
            this.state.errors.image) return;
        const formData = new FormData();
        formData.append("file", this.state.selectedFile);
        formData.append("username", this.state.username);
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);
        formData.append('confirmPassword', this.state.confirmPassword);
        this.props.signupUser(formData);
        this.setState({
            selectedFile: null,
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: {
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                image: ''
            }
        })
    }

    render() {

        return (
            <div className="LoginUpView">
                <h1 className="LogHeader">Hackathon</h1>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <input
                            className="WrapperInputs"
                            placeholder="Username"
                            onChange={this.onChange}
                            value={this.state.username}
                            id="username"
                            type="text"
                        />

                        <input
                            className="WrapperInputs"
                            placeholder="Email"
                            onChange={this.onChange}
                            value={this.state.email}
                            id="email"
                            type="email"
                        />
                    </div>
                    <div>
                        <input
                            className="WrapperInputs"
                            placeholder="Password"
                            onChange={this.onChange}
                            value={this.state.password}
                            id="password"
                            type="password"
                        />

                        <input
                            className="WrapperInputs"
                            placeholder="Confirm Password"
                            onChange={this.onChange}
                            value={this.state.confirmPassword}
                            id="confirmPassword"
                            type="password"
                        />

                    </div>
                    <div>
                        <input
                            type="file"
                            onChange={this.onFileChange}
                        />
                    </div>
                    <p style={{ color: 'red' }}>{this.state.errors.username}</p>
                    <p style={{ color: 'red' }}>{this.state.errors.email}</p>
                    <p style={{ color: 'red' }}>{this.state.errors.password}</p>
                    <p style={{ color: 'red' }}>{this.state.errors.confirmPassword}</p>
                    <p style={{ color: 'red' }}>{this.state.errors.image}</p>
                    <div>
                        {
                            this.props.signupLoader ? <button className="Button1">Signing up...</button> :
                                <button type="submit" className="Button1">
                                    Sign Up
                        </button>
                        }
                    </div>

                </form>
                <p>already have an account.<Link to='/' >login</Link></p>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    signupLoader: state.auth.signupLoading
});

export default connect(mapStateToProps, { signupUser })(SignUp);