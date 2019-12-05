import React, { Component } from 'react';
import Alert from './layout/notify';
class Login extends Component {
    state = {
        email: '',
        password: '',
        username:'',
        message: {},
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = async (e) => {
        e.preventDefault()
        const { email, password ,username} = this.state
        console.log({ email, password });
        try {
            let res = await fetch('http://localhost:5000/api/user/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, email, password })
            });
            let json = await res.json();
            if(json.success){
                localStorage.setItem('token',json.token)
                this.props.history.push(`/user/${json.user._id}`,{user:json.user})
            }else{
                let err = new Error(`${json.message}`);
                throw err

            }
           
        } catch (error) {
            this.setState({
                message: { text: `Error unable to login ${error}`, messageType: 'error' },
                canShowMessage: true
            })
        }
    }


    render() {
        let { message, canShowMessage } = this.state
        return (
            <div className="container w-50">
                <div className='row mt-4'>
                    <div className='col-md-6 col-lg-6 mx-auto'>
                        <div className='card'>
                            <div className='card-body'>
                                {canShowMessage ? (
                                    <Alert message={message.text} messageType={message.messageType} />
                                ) : null}
                                <h1 className='text-center pb-4 pt-4'>
                                    <span className='text-primary'>
                                        <i className='fas fa-lock'></i>
                                        Login
                                    </span>
                                </h1>
                                <form onSubmit={this.onSubmit}>
                                    <div className='from-group'>
                                        <label htmlFor='email'>Username</label>
                                        <input type='text'
                                            className='form-control'
                                            name='username' value={this.state.username}
                                            onChange={this.onChange}
                                            required />
                                    </div>
                                    <div className='from-group'>
                                        <label htmlFor='email'>Email</label>
                                        <input type='email'
                                            className='form-control'
                                            name='email' value={this.state.email}
                                            onChange={this.onChange}
                                            required />
                                    </div>
                                    <div className='from-group'>
                                        <label htmlFor='password'>Password</label>
                                        <input type='password'
                                            className='form-control'
                                            name='password' value={this.state.password}
                                            onChange={this.onChange}
                                            required />
                                    </div>
                                    <input type="submit" value="Submit" className='btn btn-primary btn-block mt-4' />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login