import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    View
} from 'react-native';

import TagInput from 'react-native-tags-input';

export default class TagsInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: {
                tag: '',
                tagsArray: []
            },
        };
    }

    updateTagState = (state) => {
        this.setState({
            tags: state
        })
       
    };


    render() {
        return (
            <View style={styles.container}>
                <TagInput style={styles.textIn} placeholder="tags"
                    updateState={this.updateTagState}
                    tags={this.state.tags}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

        flexDirection: 'column',



        alignSelf: 'stretch',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    textIn: {
        width: '100%',
        // backgroundColor: 'red',
        borderWidth: 1,
        height: 50,
        borderRadius: 10,
        padding: 10,

    }
});