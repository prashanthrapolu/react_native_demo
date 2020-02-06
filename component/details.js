import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'
import LoadingCompoent from './loadingCompoent';
import { FlatList } from 'react-native-gesture-handler';
export default class DetailsComponent extends Component {

    constructor() {
        super();
        this.state = {
            tokendata: '',
            detailsData: undefined,
            isLoading: false,
        }
    }
    componentDidMount() {
        console.log(this.props.navigation.state['params']['data']);
        console.log("====================hghgjghjg======");
        let data = this.props.navigation.state['params']['data'];
        let token = this.props.navigation.state['params']['token'];
        this.setState({ tokendata: token })
        this.getData(data.recipeId, token);
    }

    getData = (id, token) => {
        this.setState({ isLoading: true })
        fetch('http://35.160.197.175:3006/api/v1/recipe/' + id + '/details',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            }).then((response) => {

                if (response.status == 200) {
                    this.setState({ isLoading: false })
                    return response.json();
                } else {
                    console.log("****///****");
                }
                this.setState({ isLoading: false })
            }).then((responseJSON) => {
                this.setState({ isLoading: false })

                this.setState({ detailsData: responseJSON });



                console.log('========recpelistrecpelistrecpelist============================');
            }).catch((error) => {
                console.log(error);
                this.setState({ isLoading: false })
            })
    }

    render() {
        if (this.state.detailsData) {
            return (
                <View style={styles.container}>
                   
                    <View style={styles.complexity}>

                        <Text style={styles.complexText} >
                            complexity:
                        {this.state.detailsData.complexity}
                        </Text>

                    </View>
                    <View style={styles.image}>
                        <Image style={styles.recepeimg} source={{ uri: this.state.detailsData.photo }}></Image>
                        <Text style={styles.text_name}>Name: {this.state.detailsData.name}</Text>
                        <Text style={styles.text_name}>
                            preparationTime :
                        {this.state.detailsData.preparationTime}</Text>
                        <Text style={styles.text_name}>
                            Name : {this.state.detailsData.firstName}
                            {this.state.detailsData.lastName} </Text>
                        {/* <FlatList
                            data={this.state.detailsData.metaTags}
                            renderItem={({ item }) => {
                                return (
                                    <View>
                                        <Text>{item}</Text>
                                    </View>
                                )
                            }}
                        >

                        </FlatList> */}
                    </View>

                </View>
            )
        }
        else {
            return <LoadingCompoent loading={this.state.isLoading}></LoadingCompoent>
          
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray'


    },
    complexity: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    complexText: {
        fontSize: 20,
        padding: 10,
        color: 'blue',
        fontWeight: '700'
    },
    image: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 10
    },
    recepeimg: {
        width: '100%',
        height: 200,
        borderRadius: 10
    },
    text_name: {
        fontSize: 15,
        paddingTop: 5,
        fontWeight: '700',
        textAlign: 'center'
    }
})