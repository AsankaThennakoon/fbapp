import React from 'react';
import { View,Text,StyleSheet } from 'react-native';


class ToolBar extends React.Component{
    render(){
        return(
            <View>
                <Text style={styles.bar}> {this.props.title}</Text>
            </View>
        );
    }
}

const styles =StyleSheet.create({
    bar:{
        backgroundColor:'#4833FF',
        color:'#fff',
        padding: 10,
        fontSize:20,
        fontWeight:'bold'
    }
});

export default ToolBar; 