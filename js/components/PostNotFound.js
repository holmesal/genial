import React, {Component} from 'react';

export default class PostNotFound extends React.Component {

    render() {
        console.info(this.props.error.toString())
        return (
            <div>
                <p>:-( could not find a post with that id</p>
                <hr />
                <h3>Error:</h3>
                <p>{this.props.error.toString()}</p>
            </div>
        );
    }
}