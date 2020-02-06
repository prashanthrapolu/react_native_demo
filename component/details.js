import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'
import LoadingCompoent from './loadingCompoent';
export default class DetailsComponent extends Component {

    constructor() {
        super();
        this.state = {
            tokendata: '',
            detailsData: undefined,
            complexity: '',
            photo: '',
            name: '',
            preparationTime: '',
            firstName: '',
            lastName: '',
            isLoading: false
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

    getData(id, token) {
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

                this.setState({ complexity: this.state.detailsData.complexity })
                this.setState({ photo: this.state.detailsData.photo });
                this.setState({ name: this.state.detailsData.name });
                this.setState({ preparationTime: this.state.detailsData.preparationTime });
                this.setState({ firstName: this.state.detailsData.firstName });
                this.setState({ lastName: this.state.detailsData.lastName });
                console.log(this.state.photo)
                console.log('========recpelistrecpelistrecpelist============================');
            }).catch((error) => {
                console.log(error);
                this.setState({ isLoading: false })
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <LoadingCompoent loading={this.state.isLoading}></LoadingCompoent>
                <View style={styles.complexity}>

                    <Text style={styles.complexText} >
                        complexity:
                        {this.state.complexity}
                    </Text>

                </View>
                <View style={styles.image}>
                    <Image style={styles.recepeimg} source={{ uri: this.state.photo }}></Image>
                    <Text style={styles.text_name}>Name: {this.state.name}</Text>
                    <Text style={styles.text_name}>
                        preparationTime :
                        {this.state.preparationTime}</Text>
                    <Text style={styles.text_name}>
                        Name : {this.state.firstName}
                        {this.state.lastName} </Text>
                </View>

            </View>
        )
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