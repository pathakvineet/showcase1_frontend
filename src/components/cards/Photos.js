import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPhotosForThumbnails } from "../../actions/photoActions";
class Photos extends Component {
    constructor() {
        super();
        this.state = {

        };

    }

    componentDidMount() {
        this.props.getPhotosForThumbnails(this.props.userId);
    }

    render() {

        let photosList;
        if (this.props.photoThumbnails) {
            photosList = this.props.photoThumbnails.map(photo => (

                <img src={`https://ik.imagekit.io/gn8ijtmfci/${photo.url}?tr=w-50,h-50`} alt={photo} />

            ))
        }


        return (
            <div className="ContentContainer">
                <h1 className="CardHeader">
                    <Link to={`/${this.props.userId}/photos`}>Photos</Link>
                </h1>
                <div className="PhotoPreview">
                    {photosList}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    userId: state.auth.user.id,
    photoThumbnails: state.photos.photoThumbnails
})

export default connect(mapStateToProps, { getPhotosForThumbnails })(Photos);