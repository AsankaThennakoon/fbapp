
import React from 'react';
import { View,Text,Image,StyleSheet} from "react-native";


class Logo extends React.Component{
    render(){
        return(
            <Image style={styles.logo} source={require('../assets/logo.png')}/>
        );
    }
}

const styles= StyleSheet.create({
    logo:{
        width:'100%',
        height:100
    }
});

export default Logo;