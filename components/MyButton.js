import React from 'react';
import { View, Text, StyleSheet,Button } from 'react-native';

class MyButton extends React.Component{

    render(){
        return(
            <View style={styles.button}>
                <Button onPress={this.props.onPress} title={this.props.title}></Button>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    button:{margin:5}
});
export default MyButton;