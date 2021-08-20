import React from 'react';
import ToolBar from '../components/ToolBar';

import{ View,Text} from 'react-native';

class AboutPage extends React.Component{
    render(){
        return(
            <View>
                <ToolBar title="Home About US"></ToolBar>
            </View>
        );
    }
}

export default AboutPage;