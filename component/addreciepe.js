import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';



import TagInput from 'react-native-tags-input';

export default class AddReciepeComponent extends Component {
    constructor(props) {
        super(props)
        // this.setState({ emails: [] });
        // TagsInput
        this.state = {
            token: '',
            tags: {
                tag: '',
                tagsArray: []
            },
            tagAr: [],



        }
    }
    componentDidMount() {

        let token = this.props.navigation.state['params']['token']
        this.setState({ token: token });
        console.log("123456789==123456789");
        console.log(token);
        console.log("123456789==123456789");

    }

   

    updateTagState = (state) => {

        this.setState({ tagAr: state.tagsArray })
        this.setState({
            tags: state
        })
        console.log('submit');
        console.log(this.state.tagsArray);
        console.log('submit');


    };

    submit = () => {

        console.log(this.state);

        fetch('http://35.160.197.175:3006/api/v1/recipe/add',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'name': this.state.name,
                    'preparationTime': this.state.preparationTime,
                    'serves': this.state.serves,
                    'complexity': this.state.complexity,
                    'metaTags': this.state.tagAr,
                    'ytUrl': this.state.ytUrl,
                })
            }).then((response) => {
                if (response.status == 200) {
                    return response.json()
                } else {

                }

                this.setState({ isLoading: false })
            }).then((responseJSON) => {
                this.setState({ isLoading: false })
              
                this.props.navigation.navigate('Home', { token: this.state.token });

            }).catch((error) => {
                console.log('====================================');
                console.log(error);
                console.log('====================================');
                this.setState({ isLoading: false })
            })
    }


    render() {
        return <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <ScrollView >
                <View style={styles.container}>
                    <TextInput style={styles.input}
                        placeholder='Name'
                        value={this.state.name}
                        onChangeText={(name) => this.setState({ name })}>
                    </TextInput>

                    <TextInput style={styles.input}
                        placeholder='preparation time'
                        value={this.state.preparationTime}
                        onChangeText={(preparationTime) => this.setState({ preparationTime })}>
                    </TextInput>

                    <TextInput style={styles.input}
                        placeholder='Serves'
                        value={this.state.serves}
                        onChangeText={(serves) => this.setState({ serves })}>
                    </TextInput>
                    <View style={styles.container}>
                        <TagInput style={styles.textIn} placeholder="metaTags"
                            updateState={this.updateTagState}
                            tags={this.state.tags}
                        />
                    </View>
                    <TextInput style={styles.input}
                        placeholder='Complexity'
                        value={this.state.complexity}
                        onChangeText={(complexity) => this.setState({ complexity })}>
                    </TextInput>

                    <TextInput style={styles.input}
                        placeholder='Youtube Url'
                        value={this.state.ytUrl}
                        onChangeText={(ytUrl) => this.setState({ ytUrl })}>
                    </TextInput>



                    <TouchableOpacity style={styles.btn} onPress={this.submit}>
                        <Text style={styles.btnText}>Submit</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10
    },
    input: {
        width: '95%',
        // backgroundColor: 'red',
        borderWidth: 1,
        height: 50,
        borderRadius: 10,
        padding: 10,
        margin: 10
    },
    btn: {
        backgroundColor: 'lightgray',
        width: 250,
        height: 50,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
    },
    btnText: {
        fontWeight: '700'
    },
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
})