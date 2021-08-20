import React from 'react';
import{View,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import HomePage from './pages/HomePage';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';





//class App extends React.Component{}
//above code is exactly same with below code either one can use
//const App = () =>{} 

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage} />
        
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Home" component={HomePage} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


