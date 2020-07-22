import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { viewAllTasks, updateTask } from "../../actions/taskActions";
import Task from './Task';

class Tasks extends Component {
    constructor(props) {
        super(props);
        this.onChangeUpdateIsCompleted = this.onChangeUpdateIsCompleted.bind(this);
    }



    componentDidMount() {
        this.props.viewAllTasks(this.props.userId);
    }

    onChangeUpdateIsCompleted = e => {
        let data = {
            completed: e.target.checked,
            taskId: e.target.id,
            authorId: this.props.userId
        }
        this.props.updateTask(data);
    }


    render() {

        let taskslist;
        if (this.props.tasks.tasksList.length > 0) {
            let previewList = this.props.tasks.tasksList.slice(0, 3);
            taskslist = previewList.map(task => (

                <p style={{'font-size':'1.5rem'}}>

                    {task.description}

                    <input
                        type="checkbox"
                        id={task._id}
                        defaultChecked={task.completed}
                        onChange={this.onChangeUpdateIsCompleted}
                    />
                </p>

            ))
        }
        return (
            <div className="ContentContainer">
                <h1 className="CardHeader">
                    <Link to={`/${this.props.userId}/tasks`}>Tasks</Link>
                </h1>
                {taskslist}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userId: state.auth.user.id,
    tasks: state.tasks
})



export default connect(mapStateToProps, { viewAllTasks, updateTask })(Tasks);