import React, { Component } from 'react';
import Relay, { Mutation } from 'react-relay';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import { browserHistory } from 'react-router';

export default class NewPost extends React.Component {

    state = {
        content: ''
    };

    createNewPost() {
        Relay.Store.commitUpdate(new NewPostMutation({content: this.state.content}), {
            onFailure: (transaction) => {
                let error = transaction.getError() || new Error('NewPost mutation failed :-(');
                alert(error);
            },
            onSuccess: (res) => {
                console.info('successful mutation!', res);
                let {newPost: {post: {id}}} = res;
                // Navigate to this post
                browserHistory.push(`/${id}`);
            }
        })
    }

    render() {
        return (
            <div style={styles.wrapper}>
                <TextField
                    hintText="Type something here"
                    onChange={({target: {value: content}}) => this.setState({content})}
                    value={this.state.content}
                    autoFocus
                    onEnterKeyDown={this.createNewPost.bind(this)}
                />
                <RaisedButton
                    label="Save"
                    primary
                    disabled={this.state.content.length < 1}
                    onClick={this.createNewPost.bind(this)}
                />
            </div>
        );
    }
}

let styles = {
    wrapper: {
        display: 'flex'
    }
};

// Mutation to save content
class NewPostMutation extends Mutation {

    getMutation() {
        return Relay.QL`mutation {newPost}`
    }

    getVariables() {
        return {
            content: this.props.content
        }
    }

    getFatQuery() {
        return Relay.QL`
            fragment on NewPostPayload {
                post {
                    id
                    content
                }
            }
        `
    }

    getConfigs() {
        return [{
            type: 'REQUIRED_CHILDREN',
            children: [Relay.QL`
            fragment on NewPostPayload {
                post {
                    id
                    content
                }
            }
            `]
        }];
    }
}