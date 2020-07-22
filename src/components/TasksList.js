import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createNewTask, viewAllTasks } from "../actions/taskActions";
import Task from './cards/Task';

class TasksList extends Component {
    constructor() {
        super();
        this.state = {
            newTask: "",
            error: ""
        };
    }

    componentDidMount() {

        if (this.props.tasks.tasksList.length === 0) {
            this.props.viewAllTasks(this.props.userId);
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        let data = {
            description: this.state.newTask,
            authorId: this.props.userId
        }
        if (this.state.newTask === '') {
            this.setState({ error: 'task can not be empty' })
        } else {

            this.props.createNewTask(data);
            this.setState({ newTask: '', error: '' })
        }
    }



    render() {

        let taskslist;
        if (this.props.tasks.tasksList.length > 0) {
            taskslist = this.props.tasks.tasksList.map(task => (

                <Task {...task} key={task._id} />

            ))
        }

        return (
            <div>
                <h1 className="PageTitle">Tasks list</h1>
                <Link to={`/${this.props.userId}/dashboard`}>Back</Link>

                {taskslist}
                <form onSubmit={this.onSubmit}>
                    <span style={{ color: 'red' }}>{this.state.error}</span><br/>
                    <input
                        className="WrapperInputs"
                        placeholder="New Task"
                        onChange={this.onChange}
                        value={this.state.newTask}
                        id="newTask"
                        type="text"
                    />

                    <button type="submit" className="Button1">
                        Add
            </button>

                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userId: state.auth.user.id,
    tasks: state.tasks
})

const mapDispatchToProps = dispatch => {
    return {
        createNewTask: (data) => {
            dispatch(createNewTask(data))
        },
        viewAllTasks: (authorId) => {
            dispatch(viewAllTasks(authorId))
        }

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TasksList);