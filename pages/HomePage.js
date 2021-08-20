import React from 'react';

import{ View,Text,StyleSheet,Image, ScrollView, Button, TouchableOpacity, FlatList} from 'react-native';
import ToolBar from '../components/ToolBar';
import Logo from '../components/Logo';
import MyButton from '../components/MyButton';
import { Assets } from '@react-navigation/stack';
import TextBox from '../components/TextBox';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

import * as ImagePicker from 'react-native-image-picker';
import { ReportBase } from 'istanbul-lib-report';

class HomePage extends React.Component{


    constructor(props){
        super(props);

         

        this.state= {text:'',mid:'',posts:[], url:'', photo:null};
        this.Login=this.Login.bind(this);
        this.Register=this.Register.bind(this);

        this.post=this.post.bind(this);


        
        
    }

    componentDidMount(){
        let user=firebase.auth().currentUser;
        this.state.mid=user.uid;

        var ref= firebase.database().ref('posts');
        ref.on('value',(data)=>{
            
            let post_arry=[];
            
            var objects = data.toJSON();
            for(const pid in objects){
                var obj=objects[pid];    

                var mid=obj.mid;
                console.log("@@@@@@@@@@@@@@@@"+mid+"@@@@@@@@@");

                var refM=firebase.database().ref('member/'+mid);
                refM.on('value',(data)=>{

                    var object=objects[pid];
                    console.log("@@@@@@@@@@@@@@@@"+pid+"@@@@@@@@@");

                    var text= object.post;

                    console.log("@@@@@@@@@@@@@@@@"+text+"@@@@@@@@@");
                    console.log("@@@@@@@@@@@@@@@@"+data.toJSON().name+"@@@@@@@@@");



                    post_arry.push(
                        {
                            id:pid,
                            mid:mid,
                            post:text,
                            photo:object.photo,
                            likes:object.likes,
                            name:data.toJSON().name
                        }
                    );
                    this.setState({
                        posts:post_arry
                    });
                });
            }
              
            console.log(data+"######################");
        });
    }
    render(){
        console.log(this.state.posts);

        const {photo} =this.state;
        return(
           

            <View>
                <Logo/>
                <ScrollView scrollEnabled={true}>
                   

                    <TextBox 
                    label="Write a Post " 
                    hint="Whats on yout mind"
                    value={this.state.text}
                    oct={(text)=> this.setState({text:text})}
                    ></TextBox>

                    <Button title="Choose a photo" 
                      onPress={this.handlePhoto}> 
                    </Button>

                    

                     

                       {photo && (
                            <Image 
                            source={{uri:photo.assets[0].uri}}
                            //source={{uri:'file:///data/data/com.industrialmaster.fbapp/cache/rn_image_picker_lib_temp_42a20602-66cf-47ab-8586-2db997ff1c92.jpg'}}
                            
                            style={{width:100,height:100}}
                        />

                       )}
                       

                    
                    <Button title="POST"
                    onPress={this.post}
                    />


                    <FlatList
                         data={this.state.posts}
                         renderItem={
                             ({item,index})=>{

                                let image = (item.photo)? {uri:item.photo } : require('../assets/post.jpg');
                                 return(

                                    <View style={styles.postbox}>
                                    <View style={styles.post_heder}>
                                    <Image source={require('../assets/profile_photo.jpg')}
                                       style={styles.profile_photo}>
            
                                    </Image>
                                    <Text style={styles.profile_name}>{item.name} </Text>
                                    </View>
                                   
                                    <Text style={styles.post_text}>{item.post}</Text>
                                    <Image  
                                    source={image}
                                    style={styles.post_image}
                                    >
            
                                    </Image>
                                    <View style={styles.like_bar}>
                                        <Text>{item.likes} Likes</Text>
                                    </View>
            
                                    <View style={styles.button_bar}
                                    >
                                        <TouchableOpacity style={styles.button}
                                            onPress={()=>{
                                                var ref = firebase.database().ref('posts/'+item.id+"/likes");
                                                ref.transaction(function(likeCount){
                                                    return (likeCount||0)+1;
                                                });
                                            }}
                                        >
                                            <Image source={require('../assets/like.png')}></Image>
                                            <Text style={styles.button_text}>Like</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button}>
                                            <Image source={require('../assets/comment.png')}></Image>
                                            <Text style={styles.button_text}>Comment</Text>
                                        </TouchableOpacity>
                                         <TouchableOpacity style={styles.button}>
                                            <Image source={require('../assets/share.png')}></Image>
                                            <Text style={styles.button_text}>Share</Text>
                                        </TouchableOpacity>
                                       
            
                                    </View>
            
                                </View>
            

                                    
                                 );
                             }
                         }>
                            
                    </FlatList>






 
                   
                </ScrollView>



            </View>
                
            
        );
    }

    //seee this different coding for this hadlephot function this one is use
    //use for without bind(this) in constructor

    handlePhoto =  ()=>{
        const options={};
        ImagePicker.launchImageLibrary(options,  (response)=>{

            console.log("Response= "+JSON.stringify(response.assets[0].uri));

    
           

           if(response.assets[0].uri){
                this.setState({
                    photo : response
  
                });



                //upload to firebase and get the URL
                //a). Image Object should convert to base 64

               

                //b). Converted base 64 format content should sent to firebase





                let name= response.assets[0].fileName;
                const image= response.assets[0].uri;

                console.log(name+image+"**************************");
                const imageRef= firebase.storage().ref('posts').child(name);


                this.uriToBlob(image)
                .then((blob)=>{

                    return imageRef.put(blob,{contentType:'image/jpeg'});

                })
                .then(()=>{
                    return imageRef.getDownloadURL();
                })
                .then((url1)=>{ 
                    console.log("URL"+url1);
                    this.setState({
                        url:url1
                    });
                })
                .catch((error)=>{

                    console.log(error);
                });


                   
            }
        });
    }


    uriToBlob = (uri)=>{

        console.log("^^^^^^^^^^^"+uri+"^^^^^^^^^^^^^^^^")
        return new Promise((resolve,reject)=>{

            //xhr=xml html request object  
            const xhr = new XMLHttpRequest();
            xhr.onload = function(){
                resolve(xhr.response)
            };

            xhr.onerror=function(){
                reject(new Error('URI to Blob Faild'));
            }

            xhr.responseType='blob';
            xhr.open('GET',uri,true);
            xhr.send(null);

        })

    }


    Register(){
        const {navigate} =this.props.navigation;
        navigate("Register");

    }
    Login(){
        const {navigate} =this.props.navigation;
        navigate("Login");

    }
    post(){
        let text=this.state.text;
        let mid = this.state.mid;
        let url = this.state.url;

        fetch(
            
            'https://myfb-54ea4-default-rtdb.firebaseio.com/posts.json',
            {
                method:'POST',
                body:JSON.stringify(
                    {
                        post:text,
                        mid:mid,
                        photo:url
                    }
                )
            }
        ).then(
            res=>{
                console.log(res);
                alert("Success");
                this.setState({text:''});
            }
        ).catch(
            err=>console.log(err)
        );

    }
}




const styles= StyleSheet.create({
    text:{
        fontSize:20,
        paddingTop:80,
        paddingBottom:80,
        textAlign:'center'

    
    },

    postbox:{
        flex:1,
        borderWidth:1,
        borderColor:'#474477',
        backgroundColor:'#fff',
        alignItems:'center',
        padding:0,
        paddingBottom:20,
        paddingTop:20

    },
    post_image:{
        width:'100%',
        height:300

    },
    post_text:{
        padding:10
    },
    profile_photo:{
        width:40,
        height:40,
        borderRadius:20
    },
    post_heder:{
        width:'100%',
        
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10 
    },
    profile_name:{
        width:'80%',
        paddingTop:10
    },
    like_bar:{
        width:'100%',
        flex:1,
        flexDirection:'row',
        padding:10

    },
    button_bar:{
        width:'100%',
        flex:1,
        flexDirection:'row',
        padding:10,
        justifyContent:'space-between'

    },
    button:{
        flex:1,
        flexDirection:'row',
      

    },
    button_text:{
        paddingLeft:5
    }

});

export default HomePage;