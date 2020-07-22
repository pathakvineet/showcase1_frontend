import React, { Component } from "react";
import { connect } from "react-redux";
import { uploadPhoto, getPhotosList , deletePhoto} from "../actions/photoActions";
import { Link } from "react-router-dom";
import Resizer from 'react-image-file-resizer';
class PhotosList extends Component {
    state = {

        // Initially, no file is selected 
        selectedFile: null,
        error: ''
    };

    // On file select (from the pop up) 
    onFileChange = event => {
        console.log('event', event.target.files[0]);

        // return;
        if(event) {
            Resizer.imageFileResizer(
                event.target.files[0],
                240,
                240,
                'JPEG',
                100,
                0,
                uri => {
                    console.log('uri',uri)
                    this.setState({
                        selectedFile: uri,
                        error: ''
                    });
                },
                'blob'
            );
        }
    

        // Update the state 
        // this.setState({
        //     selectedFile: event.target.files[0],
        //     error: ''
        // });

    };

    // On file upload (click the upload button) 
    onFileUpload = () => {

        // Create an object of formData 
        const formData = new FormData();

        // Update the formData object 
        formData.append("file", this.state.selectedFile);
        formData.append('authorId', this.props.userId);


        // return;
        if (this.state.selectedFile == null) {
            this.setState({
                error: 'please upload a file'
            })
        } else {

            this.props.uploadPhoto(formData);
            this.setState({
                error: '',
                selectedFile: null
            })
        }
    };

    componentDidMount() {
        this.props.getPhotosList(this.props.userId);
    }

    deleteImage(photoId){
        this.props.deletePhoto(photoId, this.props.userId);
    }

    render() {

        let photoList;
        if (this.props.photosList) {
            photoList = this.props.photosList.map(photo => (
                <div>
                    <img src={`https://ik.imagekit.io/gn8ijtmfci/${photo.url}?tr=w-240,h-240`} alt={photo} />
                    <button onClick={()=> this.deleteImage(photo._id)}>delete</button>
                </div>
            ))
        }

        return (
            <div>
                <h1 className="PageTitle">photos list</h1>
                <Link to={`/${this.props.userId}/dashboard`}>Back</Link>
                <p style={{ color: 'red' }}>{this.state.error}</p>
                <input type="file" accept="image/*" onChange={this.onFileChange} />
                {
                    this.props.uploadingImage ? <button>Uploading...</button> :
                        <button className="Button4" onClick={this.onFileUpload}>Post</button>
                }
                <form>
                </form>
                <div  className="PhotoShowcase">
                {photoList}
                </div>
            </div>


        )
    }
}

const mapStateToProps = state => ({
    userId: state.auth.user.id,
    photosList: state.photos.photosList,
    uploadingImage: state.photos.uploading
})

export default connect(mapStateToProps, { uploadPhoto, getPhotosList, deletePhoto })(PhotosList);