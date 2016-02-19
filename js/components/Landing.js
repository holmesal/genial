import React, {Component} from 'react';
import { Link } from 'react-router';

export default class Landing extends React.Component {

    render() {
        return (
            <div style={styles.wrapper}>
                <Link to="/new">Create a new post</Link>
            </div>
        );
    }
}

let styles = {
    wrapper: {
        display: 'flex'
    }
};