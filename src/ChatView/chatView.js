import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
// import SimpleModalLauncher from "./SimpleModalLauncher/SimpleModalLauncher";
import SimpleModalLauncher from "../SimpleModalLauncher/SimpleModalLauncher";

class ChatViewComponent extends React.Component {
    constructor() {
        super();
        this.state = { isOpen: false, isId:""};
    }

    handleShowDialog = (index) => {
        this.setState({ isOpen: !this.state.isOpen, isId:index});
        console.log("cliked");
      };

    componentDidMount = () => {
        const container = document.getElementById('chatview-container');
        if(container)
            container.scrollTo(0, container.scrollHeight);
    }
    componentDidUpdate = () => {
        const container = document.getElementById('chatview-container');
        if(container)
            container.scrollTo(0, container.scrollHeight);
    }

    render() {

        const { classes } = this.props;

        if(this.props.chat === undefined) {
            return(<main className={classes.content}></main>);
        } else if(this.props.chat !== undefined) {
            return(
                <div>
                    <div className={classes.chatHeader}>
                        Your conversation with {this.props.chat.users.filter(_usr => _usr !== this.props.user)[0]}
                    </div>
                    <main id='chatview-container' className={classes.content}>
                        {
                            this.props.chat.messages.map((_msg, _index) => {

                                // var matches = _msg.message.match("https://firebasestorage.googleapis.com");
                                
                                if(_msg.type === 2){
                                    return(
                                    //     <div key={_index} className={_msg.sender === this.props.user ? classes.userSent : classes.friendSent}>
                                    //     <img
                                    //     className="imgItemRight"
                                    //     src={_msg.message}
                                    //     alt="content message"
                                    //     width= "200" height= "300"
                                    // />
                                    // </div>
         
         <div key={_index} className={_msg.sender === this.props.user ? classes.userSent : classes.friendSent}>
             {!this.state.isOpen &&  (
                  <SimpleModalLauncher buttonLabel="Open image modal" image={_msg.message}>
      <div className={classes.imageModal}>
        <img
          className={classes.imageInModal}
          src={_msg.message}
          alt="Nature"
        />
      </div>
    </SimpleModalLauncher>
        // <img
        //   className="small"
        //   src={_msg.message}
        //   onClick={this.handleShowDialog.bind(this,_index)}
        //   alt="no image"
        //    width= "200" height= "300"
        // />
             )}
        {/* {this.state.isOpen && _index=== this.state.isId &&  (
        //   <dialog
        //     className="dialog"
        //     style={{ position: "static", left: "20%",
        //     top: "10%" }}
        //     open
        //     onClick={this.handleShowDialog}
        //   >
        //     <img
        //       className="image"
        //       src={_msg.message}
        //       onClick={this.handleShowDialog.bind(this,_index)}
        //       alt="no image"
              
        //     />
        //   </dialog>
//  <SimpleModalLauncher buttonLabel="Open image modal">
//       <div className={classes.imageModal}>
//         <img
//           className={classes.imageInModal}
//           src={_msg.message}
//           alt="Nature"
//         />
//       </div>
//     </SimpleModalLauncher>

        )} */}
           
      </div>
    // <SimpleModalLauncher buttonLabel="Open image modal">
    //   <div className={classes.imageModal}>
    //     <img
    //       className={classes.imageInModal}
    //       src="https://placeimg.com/800/450/nature"
    //       alt="Nature"
    //     />
    //   </div>
    // </SimpleModalLauncher>

                                    )
                                }
                                else if(_msg.type === 3){
                                    return(
                                        <div key={_index} className={_msg.sender === this.props.user ? classes.userSent : classes.friendSent}>
                                            {/* <Link to= {'_msg.message'} target="_blank" download="abc.pdf">Download</Link> */}
                                            <a href={ _msg.message } download target="_blank" >Click to download</a>
                                       {/* {_msg.message} */}
                                   </div>
                                    )

                                }
                                else{
                                    return(
                                        <div key={_index} className={_msg.sender === this.props.user ? classes.userSent : classes.friendSent}>
                            
                                       {_msg.message}
                                   </div>
                                    )
                                   
                                }
                                // return(
                                //     <div key={_index} className={_msg.sender === this.props.user ? classes.userSent : classes.friendSent}>
                                    
                                //          <img
                                //             className="imgItemRight"
                                //             src={_msg.message}
                                //             alt="content message"
                                //         />
                                //         {/* {_msg.message} */}
                                //     </div>
                                // )
                            })
                        }
                    </main>
                </div>
            );
        } else {
            return (<div className='chatview-container'>Loading...</div>);
        }
    }
}

export default withStyles(styles)(ChatViewComponent);