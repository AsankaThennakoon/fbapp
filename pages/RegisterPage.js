import React from 'react';

import{ View,Text} from 'react-native';
import Logo from '../components/Logo';
import MyButton from '../components/MyButton';
import TextBox from '../components/TextBox';
import ToolBar from '../components/ToolBar';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

class RegisterPage extends React.Component{


    constructor(props){
        super(props);



        this.state={name:'',email:'',contact:'',password:''};


        this.Login=this.Login.bind(this);
        this.Register=this.Register.bind(this);
    }

    //intialize firebase
    componentDidMount(){


        //here i add this if it is already intia;ized within anothe page it will not occure here so i add the if condition
        if(!firebase.apps.length){

            var firebaseConfig = {
                apiKey: "AIzaSyCpwQu_Mh0ZFcpTsF6yx8nxy-kmepkLQbM",
                authDomain: "myfb-54ea4.firebaseapp.com",
                databaseURL: "https://myfb-54ea4-default-rtdb.firebaseio.com/",
                projectId: "myfb-54ea4",
                storageBucket: "myfb-54ea4.appspot.com",
                messagingSenderId: "723702670952",
                appId: "1:723702670952:android:c64a18b200193c43e9fddd",
                measurementId: "G-8GSGZQ44ST"
              };
    
              firebase.initializeApp(firebaseConfig);
              console.log(firebase);
    


        }
      
    }
    render(){
        return(
            <View>
                 <ToolBar title="Registration Page"></ToolBar>
                 <Logo/>
                 <TextBox  lable="Enter Name" hint="Asanka Thennakkon" name="name" value={this.state.name}   oct={(text)=>this.setState({name:text})}/>
                 <TextBox lable="Enter Emaile" hint="Asanka@gmail.com" name="email"value={this.state.email}  oct={(text)=>this.setState({email:text})}/>
                 <TextBox lable="Enter Mobile" hint="07126198" name="contact"value={this.state.contact}  oct={(text)=>this.setState({contact:text})}/>
                 <TextBox lable="Enter Password" hint="1234" name="password"value={this.state.password}  oct={(text)=>this.setState({password:text})}/>

                 <MyButton title="REGISTER" onPress={this.Register}/>
                 <Text style={{textAlign:'center'}}>Allready Registed?</Text>
                 <MyButton title="LOGIN" onPress={this.Login}/>
                 
            </View>
        );
    }

    Register(){
        let name = this.state.name;
        let email= this.state.email;
        let contact= this.state.contact;
        let password= this.state.password;
        let {navigate}=this.props.navigation;

        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(
            function(data){

                console.log(data);
                //this one is print for identify the data which are our when we 
                //creating a new user example userid
                firebase.database().ref('member/'+data.user.uid).set(
                    {
                        name:name,
                        email:email,
                        contact:contact
                    }

                );
             



                alert("Success");
                navigate("Login");
                console.log("User Created Success");



            },
            function(error){


                console.log("error creating user"+error);
            }
        )

    }
    Login(){
        const {navigate} =this.props.navigation;
        navigate("Login");

    }

}

export default RegisterPage;