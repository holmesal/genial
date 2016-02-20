import React, {Component} from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';

export default class Landing extends React.Component {

    render() {
        return (
            <div style={styles.wrapper}>
                <Link to="/new">
                    <RaisedButton
                        label="Create a new post"
                        primary
                    />
                </Link>
            </div>
        );
    }
}

let styles = {
    wrapper: {
        display: 'flex'
    }
};