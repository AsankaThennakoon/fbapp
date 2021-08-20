import React from 'react';
import { View, Text,TextInput,StyleSheet } from 'react-native';

class TextBox extends React.Component{
    render(){
        return(
            <View style={styles.textBox}>
                <Text >{this.props.lable}</Text>
                <TextInput 
                 placeholder={this.props.hint}
                 name={this.props.name} 
                 value={this.props.value}
                 onChangeText={this.props.oct}></TextInput>
            </View>
        );
    }
}


const styles=StyleSheet.create({
    textBox:{

        borderWidth:1,
        borderRadius:5,
        borderColor:'#4233ff',
        
        padding:5,
        margin:5
    }
});
export default TextBox;