import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTask, deleteTask } from "../../actions/taskActions";

class Task extends Component {


    onChangeUpdateDescription = e => {

        let data = {
            description: e.target.value,
            taskId: this.props._id,
            authorId: this.props.userId
        }

        this.props.updateTask(data);

    }

    onChangeUpdateIsCompleted = e => {
        let data = {
            completed: e.target.checked,
            taskId: this.props._id,
            authorId: this.props.userId
        }
        this.props.updateTask(data);
    }

    deleteTask() {

        let taskId = this.props._id;
        let authorId = this.props.userId;
        // return;
        this.props.deleteTask(taskId, authorId);
    }

    render() {


        return (


            <div>


                <input
                    className="WrapperInputs"
                    type="text"
                    id={this.props._id}
                    defaultValue={this.props.description}
                    onChange={this.onChangeUpdateDescription}
                />
                <input
                    type="checkbox"
                    id={this.props._id}
                    defaultChecked={this.props.completed}
                    onChange={this.onChangeUpdateIsCompleted}
                />
                <button onClick={() => this.deleteTask()}>
                    remove
                </button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userId: state.auth.user.id,
    tasks: state.tasks
})



export default connect(mapStateToProps, { updateTask, deleteTask })(Task);