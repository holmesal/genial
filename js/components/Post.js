import React, {Component} from 'react';
import Relay from 'react-relay';

class Post extends React.Component {

    render() {
        return (
            <div style={styles.wrapper}>
                <p>id: <strong>{this.props.post.id}</strong></p>
                <p>content: <strong>{this.props.post.content}</strong></p>
            </div>
        );
    }
}

let styles = {
    wrapper: {
        //display: 'flex'
    }
};

export default Relay.createContainer(Post, {

    fragments: {
        post: () => Relay.QL`
            fragment on Post {
                id
                content
            }
        `
    }

});