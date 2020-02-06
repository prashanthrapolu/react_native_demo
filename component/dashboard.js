import React, { Component } from 'react'
import { View, Text, AsyncStorage, FlatList, Image, StyleSheet, TextInput, Button, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import LoadingCompoent from './loadingCompoent';

export default class DashboardComponent extends Component {

    constructor() {
        super();
        this.state = {
            recpelist: [],
            token: '',
            isLoading: false
        }
    }
    componentDidMount() {

        this.setState({ isLoading: true });
        let token = this.props.navigation.state['params']['token'];
        this.setState({ token: token })
        fetch('http://35.160.197.175:3006/api/v1/recipe/cooking-list',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            }).then((response) => {
                if (response.status == 200) {
                    return response.json()
                } else {
                    console.log("****///****");
                }
                // this.setState({ isLoading: false })
            }).then((responseJSON) => {
                this.setState({ isLoading: false });

                this.setState({ recpelist: responseJSON });

            }).catch((error) => {
                console.log(error);
                this.setState({ isLoading: false })
            })
    }

    componentWillUnmount() {

    }

    render() {
        if (this.state.recpelist.length != 0) {
            return (
                // <ScrollView>
                <View style={styles.container}>

                    <View style={styles.btn_custom}>


                        <TouchableOpacity>
                            <Text style={styles.btn} onPress={() => this.props.navigation.navigate('Add', { token: this.state.token })}>Add Recipe</Text>
                        </TouchableOpacity>


                    </View>
                    <View>
                        <FlatList
                            data={this.state.recpelist}

                            keyExtractor={item => item.recipeId}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ padding: 10 }}>
                                        <Image source={{ uri: item.photo }} style={{ width: '100%', height: 150, borderRadius: 10 }} />
                                        <Text style={styles.item} onPress={() => this.props.navigation.navigate('Details', { data: item, token: this.state.token })} >{item.name}</Text>
                                    </View>
                                )
                            }
                            }
                        />
                    </View>
                </View>

            )
        }
        else {
            return (
                <LoadingCompoent loading={this.state.isLoading}></LoadingCompoent>
            )
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },

    btn: {
        fontSize: 20,
        color: 'blue',
        textAlign: "right"

    },

    btn_custom: {
        flex: 2,
        padding: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',


    }
})
