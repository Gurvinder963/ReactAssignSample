import axios from 'axios';
import React, { Component } from "react";
import { StyleSheet, View, Text, Button,  FlatList,TouchableOpacity, Alert } from 'react-native';

import moment from 'moment';
import {apiConfig} from '../src/config/config';
import styles from './appStyles/styles'
import color from "../src/values/color";
import {Utils} from "../src/util/Utils";
import strings from "../src/values/strings";


var headerDate='';
var headerIndex=0;


var tabColorCode2=color.blue;
var tabColorCode1=color.light_weight_blue;
var tabAvailableShift=true;
export default class App extends React.Component {
  state = {
    shifts: [],
    dataTopHeader: [],
    availableShifts:[],
    myShifts:[],
    refreshTab:false
  }

  componentDidMount() {


    axios.get(apiConfig.baseUrl+apiConfig.method_name_shift)
      .then(res => {
        const shifts = res.data;
       

        var occurences = { };
        for (var i = 0; i < shifts.length; i++) {
            if (typeof occurences[shifts[i].area] == "undefined") {
                occurences[shifts[i].area] = 1;
            } else {
                occurences[shifts[i].area]++;
            }
        }
        
        console.log(occurences);
        const result = Object.keys(occurences).map(key => ({[key]: occurences[key]}));
    
        console.log(result);

        var firstTabObject=result[0];
        var firstTabKey;
        for(var key in firstTabObject) {
          firstTabKey=key;
        }

        for (let i = 0; i < shifts.length; i++) 
        {
        
            if(shifts[i].area==firstTabKey){
              this.state.availableShifts.push(shifts[i]);
            }

        }

        this.setState({ shifts:shifts,dataTopHeader:result });

      })
  }
  renderSeparator = () => {  
    return (  
        <View  
            style={{  
                height: 1,backgroundColor: color.black,  
            }}  
        />  
    );  
}; 

renderSeparatorAvShifts = () => {  
  return (  
    <View  
    style={styles.divider}  
/>
  );  
};
getListViewItem = (key,index) => { 
  headerDate='';
  headerIndex=index; 
  while(this.state.availableShifts.length > 0) {
    this.state.availableShifts.pop();
}

  for (let i = 0; i < this.state.shifts.length; i++) 
  {
  
      if(this.state.shifts[i].area==key){
        this.state.availableShifts.push(this.state.shifts[i]);
      }

  }

  this.forceUpdate();

}  

bottomTabClicked = (value,index) => { 
  headerDate='';
 if(index==0){
  tabColorCode1=color.blue;
  tabColorCode2=color.light_weight_blue;

   
 this.state.myShifts.sort((a, b) => a.startTime - b.startTime);


 }
 else if(index==1){
  tabColorCode2=color.blue;
  tabColorCode1=color.light_weight_blue;
 }

  tabAvailableShift=value;
  this.forceUpdate();

}


onPressBookCancelButton = (item) => { 

  if(item.booked==false){
    item.booked=true;
    this.state.myShifts.push(item);
  }
  else{
    item.booked=false;

    for (let i = 0; i < this.state.myShifts.length; i++) 
       {
  
         if(this.state.myShifts[i].id==item.id){
         this.state.myShifts.pop(item);
         break;
         }

       }

  }
 
  this.forceUpdate();

} 


  renderItemComponent = (data) => {
   var colorCode;
   
   if(data.index==headerIndex){
    colorCode=color.blue
   }
   else{
    colorCode=color.light_weight_blue
   }

  console.log(data.item);
    
  for(var key in data.item) {
        return (  
          <Text style={{padding:10,  
           fontSize:18,  
           height: 44,color:colorCode}} onPress={
           
          this.getListViewItem.bind(this,key,data.index)}>{key+" ("+data.item[key]+")"}</Text>
         );
       }
   };


  renderItemComponentMyShifts = (data,myShift) => {

    var itemDate=new Date(data.item.startTime).toLocaleDateString();
 
   var totalShifts=0;
   var totalHors=0;

    for(let i=0;i<myShift.length;i++){
      var indexDate=new Date(myShift[i].startTime).toLocaleDateString();
   
      if(itemDate==indexDate){
        totalShifts=totalShifts+1;
        var hours = Math.abs(new Date(myShift[i].startTime) - new Date(myShift[i].endTime)) / 36e5;
        totalHors=totalHors+hours;
      
      }
    }

     var shouldHeaderDisplay=false;

     if(headerDate!=new Date(data.item.startTime).toLocaleDateString()){
      headerDate=new Date(data.item.startTime).toLocaleDateString();
      shouldHeaderDisplay=true;
     
     }
     else{
   
      shouldHeaderDisplay=false;

     }

      var isToday=Utils.isToday(new Date(data.item.startTime));
      var headerTitle;
      if(isToday){
        headerTitle=strings.today;
      }
      else{
        var formatedDate=moment(new Date(data.item.startTime)).format('MMM DD');
        headerTitle=formatedDate;
      }

      return (  
        <View>
        {shouldHeaderDisplay? <View>
        <View style={styles.itemHeaderMyShift}>
        <Text style={styles.myShiftTitle}>{headerTitle}</Text>
        <Text style={styles.itemSubTitle}>{totalShifts+" Shifts " + totalHors+" h"}</Text>
        </View>
        <View  
          style={styles.divider} />  
        </View>:null}

        <View style={{flexDirection:'row'}}>
        <Text style={styles.itemSubTitle}>{new Date(data.item.startTime).toLocaleTimeString()+"-"+new Date(data.item.endTime).toLocaleTimeString()}</Text>
       
        <TouchableOpacity
          style={styles.CancelButtonStyle}
          activeOpacity = { .5 }
          onPress={() => this.onPressBookCancelButton(data.item)}
           >
        <View>
            <Text style={styles.CancelTextStyle}>{strings.cancel}</Text>
            </View>
        </TouchableOpacity>
        </View>
        <Text style={styles.itemSubTitleMyShift}>{data.item.area}</Text>
        </View>
        );
    
    };



  renderItemComponentAvShifts = (data) => {

    
  
     var shouldHeaderDisplay=false;

     if(headerDate!=new Date(data.item.startTime).toLocaleDateString()){
      headerDate=new Date(data.item.startTime).toLocaleDateString();
      shouldHeaderDisplay=true;
     }
     else{
      shouldHeaderDisplay=false;
     }

      var isToday=Utils.isToday(new Date(data.item.startTime));
      var headerTitle;
      if(isToday){
        headerTitle=strings.today;
      }
      else{
        var formatedDate=moment(new Date(data.item.startTime)).format('MMM DD');
        headerTitle=formatedDate;
      }

    var txt;
    var txtStyle;
    var viewStyle;

      if(data.item.booked==false){
        txt=strings.book;
        txtStyle=styles.TextStyle;
        viewStyle=styles.SubmitButtonStyle;
      }
      else{
        txt=strings.cancel;
        txtStyle=styles.CancelTextStyle;
        viewStyle=styles.CancelButtonStyle;
      }

      return (  
        <View>
        {shouldHeaderDisplay? <View><Text style={styles.itemHeader}>{headerTitle}</Text>
        <View  
          style={styles.divider} />  
        </View>:null}

        <View style={{flexDirection:'row'}}>
        <Text style={styles.itemSubTitle}>{new Date(data.item.startTime).toLocaleTimeString()+"-"+new Date(data.item.endTime).toLocaleTimeString()}</Text>
       
        <TouchableOpacity
          style={viewStyle}
          activeOpacity = { .5 }
          onPress={() => this.onPressBookCancelButton(data.item)}>
        <View><Text style={txtStyle}>{txt}</Text></View>
        </TouchableOpacity>
        </View>
        </View>
        );
    
    };


  render() {
  
    return (
      <View style={styles.container}>
      {tabAvailableShift?
      <View style={styles.container}>
      <FlatList
            showsHorizontalScrollIndicator={false}
            data={this.state.dataTopHeader}
            horizontal={true}
            renderItem={item => this.renderItemComponent(item)}
            keyExtractor={(item, index) => 'key'+index}
            ItemSeparatorComponent={this.renderSeparator}/>
     <View  
          style={styles.divider}  
      />
      <FlatList
            data={this.state.availableShifts}
            renderItem={item => this.
            renderItemComponentAvShifts(item)}
            keyExtractor={(item, index) => item.id}
            ItemSeparatorComponent={this.renderSeparatorAvShifts} />
      </View>
          :
      <FlatList
            data={this.state.myShifts}
            renderItem={item => this.
            renderItemComponentMyShifts(item,this.state.myShifts)}
            keyExtractor={(item, index) => item.id}
            ItemSeparatorComponent={this.renderSeparatorAvShifts}
       
          />
    }
       <View style={{flexDirection:'column',position: 'absolute',backgroundColor:"#fff",
        bottom:0,}}>

       <View  
          style={styles.divider}  
       />

       <View style={{flexDirection:'row'}}>
       <Text style={{width:'50%',padding:15,textAlign:'center',fontSize:16,color:tabColorCode1}} onPress={
         
         this.bottomTabClicked.bind(this,false,0)}>{strings.myShifts}</Text>
       <Text style={{width:'50%',padding:15,textAlign:'center',color:tabColorCode2,fontSize:16}} onPress={
         
         this.bottomTabClicked.bind(this,true,1)}>{strings.avShifts}</Text>

      </View>

      </View>

      </View>

    )
  }
  
}
 