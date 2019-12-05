import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class TasksList extends Component {
    state = {
        tasks: null,
    }

    addTask = () => {
        const { id } = this.props.match.params;
        this.props.history.push(`/user/${id}/add`)
    }
    async componentDidMount() {
        const { id } = this.props.match.params;
        let userId = this.props.location.state || id;
        let token = localStorage.getItem('token')
        try {
            let res = await fetch(`http://localhost:5000/api/user/${userId}/task`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            let json = await res.json();
            if (json.success) {
                this.setState({
                    tasks: json.tasks
                })
            } else {
                let err = new Error(`${json.message}`);
                throw err

            }

        } catch (error) {
            this.setState({
                tasks: []
            })
        }
    }


    render() {
        const columns = [{
            Header: 'Name',
            accessor: 'name' // String-based value accessors!
        }, {
            Header: 'Status',
            accessor: 'status',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }]
        if (this.state.tasks) {
            return (
                <div className="container mt-4 mb-4">
                    <button onClick={this.addTask} className="btn btn-primary">ADD TASKS</button>
                    <ReactTable
                        data={this.state.tasks}
                        columns={columns}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    Loading...
                </div>
            )

        }

    }
}


export default TasksList