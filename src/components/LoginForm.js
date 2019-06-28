import React, { Component } from 'react';
import { VERIFY_USER} from '../components/Events';

export default class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state ={
            nickname:"",
            error:""
        };
    }

    setUser = ({user,isUser})=>{
        console.log("aaaa");
        if(isUser){
            this.setError("User name taken")
        }else{
            this.props.setUser(user)
            this.setError("")
        }
    }

    setError = (error) =>{
        this.setState({error})
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        const { socket } = this.props
        const { nickname } = this.state
        socket.emit(VERIFY_USER, nickname, this.setUser)
        console.log(nickname);
    }

    handleChange =(e) =>{
        this.setState({nickname: e.target.value})
    }

    render() {
        const { nickname, error} = this.state
        return (
            <div className="login">
                <form onSubmit={this.handleSubmit} className="loin-form">
                    <label htmlFor="nickname">
                        <h2>Got a nickname?</h2>
                    </label>
                    <input 
                    ref={(input)=>{this.textInput = input}}
                    type="text"
                    id="nickname"
                    value={nickname}
                    onChange={this.handleChange}
                    placeholder={'MYCoolUsername'}
                    />
                    <div className="error">
                        {error? error: null}
                    </div>
                </form>    
            </div>
        )
    }
}
