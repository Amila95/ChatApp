import moment from 'moment';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Files from '@material-ui/icons/FileCopy';
import IconButton from '@material-ui/core/IconButton';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import { myStorage } from '../index';
import CircularProgress from '@material-ui/core/CircularProgress';


class ChatTextBoxComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoading:false,
            chatText: '',
            type:1,
            currentPhotoFile : null
        };
    }

    render() {
      let buttonSection;
        const { classes } = this.props;
        const { isLoading} = this.state;

        if(!isLoading){
          buttonSection = <div>
                            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange = {
    this.onChoosePhoto
} hidden/>
{/* upload */}
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          className={classes.sendBtn}
          aria-label="Upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
      {/* upload */}

      <input accept=".pdf" className={classes.input} id="icon-button-file" type="file" onChange = {
    this.onChoosePhoto
} hidden/>
{/* file attchament */}
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          className={classes.sendBtn}
          aria-label="Upload picture"
          component="span"
        >
          <Files />
        </IconButton>
      </label>
      {/* upload */}

      
     
                <Send onClick={this.submitMessage} className={classes.sendBtn}  ></Send>
          </div>
        }else{
          buttonSection=<CircularProgress className={classes.progress} color="primary" />
        }

        return(
            <div className={classes.chatTextBoxContainer}>
                <TextField
                    placeholder='Type your message..'
                    onKeyUp={(e) => this.userTyping(e)}
                    id='chattextbox'
                    className={classes.chatTextBox}
                    onFocus={this.userClickedInput}>
                </TextField>
                {buttonSection}
            </div>
        );
    }
    userTyping = (e) => e.keyCode === 13 ? this.submitMessage() : this.setState({ chatText: e.target.value });
    messageValid = (txt) => txt && txt.replace(/\s/g, '').length;
    userClickedInput = () => this.props.userClickedInputFn();
    submitMessage = () => {
        if(this.messageValid(this.state.chatText)) {
            this.props.submitMessageFn(this.state.chatText, this.state.type);
            document.getElementById('chattextbox').value = '';
        }
    }
    // image uploading
    onChoosePhoto = event => {
        if (event.target.files && event.target.files[0]) {
            this.setState({
                isLoading: !this.state.isLoading
            })
            this.currentPhotoFile = event.target.files[0] 
            const prefixFiletype = event.target.files[0].type.toString()
            if (prefixFiletype.indexOf('image/') === 0 ) {
              this.setState({
                type:2
              })
                 this.uploadPhoto()
            }
            else if(prefixFiletype.indexOf('pdf')){
              this.setState({
                type:3
              })
                 this.uploadPhoto()
            }
            
            else {
                this.setState({
                    isLoading: false
                })
                this.props.showToast(0, 'This file is not an image')
            }
        } else {
            this.setState({
                isLoading: false
            })
        }
    }

    uploadPhoto = () => {
        if (this.currentPhotoFile) {
          const timestamp = moment()
            .valueOf()
            .toString()
          const uploadTask = myStorage
            .ref()
            .child(timestamp)
            .put(this.currentPhotoFile)
            
          uploadTask.on(
            'state_changed',
            (snapshot)=>{
                //progrss
            },
            err => {
                //err
              this.setState({ isLoading: false })
              console.log(err.message)
              // this.props.showToast(0, err.message)
            },
            () => {
                //complete
                console.log("start:");
              uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                this.setState({chatText: downloadURL })
                console.log("Download:");
                this.submitMessage()
                this.setState({ isLoading: false ,type:1,chatText:''
                })
               
              })
            }
          )
        } else {
          this.setState({ isLoading: false })
          this.props.showToast(0, 'File is null')
        }
      }
    //
}

export default withStyles(styles)(ChatTextBoxComponent);