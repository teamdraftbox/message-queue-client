import React, { Component } from 'react';
import Alert from './layout/notify';
class Login extends Component {
    state = {
        task: null,
        message: {},
        canShowMessage:null,
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = async (e) => {
        e.preventDefault()
        const { task } = this.state;
        const { id } = this.props.match.params;
        let token = localStorage.getItem('token')
        try {
            let res = await fetch(`http://localhost:5000/api/user/${id}/task`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name: task })
            });
            let json = await res.json();
            if (json.success) {

                this.props.history.push(`/user/${id}`)
            } else {
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
        let {canShowMessage,message} = this.state;
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
                                        Add New Task
                                    </span>
                                </h1>
                                <form onSubmit={this.onSubmit}>
                                    <div className='from-group'>
                                        <label htmlFor='task'>New Task</label>
                                        <input type='text'
                                            className='form-control'
                                            name='task' value={this.state.task}
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