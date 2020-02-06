import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
export default class LoadingCompoent extends Component {
    constructor() {
        super();
    }

    componentWillUnmount() {

    }

    render() {
        if (this.props.loading) {
            return (
                <View style={{ position: 'absolute', width: '100%', height: '110%', zIndex: 1 }}>
                    <ActivityIndicator size='large' color='red' style={{ flex: 1 }}></ActivityIndicator>
                </View>
            )
        }

        else {
            return (
                <View></View>
            )
        }

    }
}