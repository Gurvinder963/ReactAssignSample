import {StyleSheet} from "react-native";
import color from "../values/color";
import size from "../values/dimens";


const styles = StyleSheet.create({
   
    container: {  
        flex: 1,  
    },  
    itemHeader: {  
      padding: size.size_10,  
      fontSize: size.size_18,  
      height: size.size_44, 
      color:color.selected_tab_color,
      fontWeight: 'bold',
      backgroundColor:color.light_white
    },
    itemHeaderMyShift: {  
    
      backgroundColor:color.light_white,
      flexDirection:'row'
    },
    myShiftTitle: {  
    
      padding: size.size_10,  
      fontSize: size.size_18,  
      height: size.size_44, 
      color:color.selected_tab_color,
      fontWeight: 'bold',
    },
    itemSubTitle: {  
    padding: size.size_10,  
    fontSize: size.size_16,  
    height: size.size_44, 
    color:color.selected_tab_color 
    }, 
  
    itemSubTitleMyShift: {  
    padding: size.size_2,  
    fontSize: size.size_14,  
    height: size.size_30, 
    marginStart:size.size_10,
    color:color.selected_tab_color 
    },
    label: {
    textAlign: 'right',
    backgroundColor: 'yellow',
    padding: size.size_3
    }, 
    SubmitButtonStyle: {
    marginLeft:size.size_60,
    paddingLeft:size.size_15,paddingRight:size.size_15,
    height:size.size_30,
    marginTop:size.size_10,
    textAlign:'center',
    alignItems:'center',
    borderRadius:size.size_20,
    borderWidth: 1,
    borderColor: color.green
    },
  
    TextStyle:{
    color:color.green,
    marginTop:size.size_4
    
    },
    divider:{
      height: 0.7,  
              width:"100%",
           
              backgroundColor: color.light_weight_blue,  
      
      },
  CancelButtonStyle: {
   
  marginLeft:size.size_60,
  paddingLeft:size.size_15,paddingRight:size.size_15,
  height:size.size_30,
  marginTop:size.size_10,
  textAlign:'center',
  alignItems:'center',
  borderRadius:size.size_20,
  borderWidth: 1,
  borderColor: color.red
   },
   
CancelTextStyle:{
color:color.red,
marginTop:size.size_4
     
},
  
  
item: {  
padding: size.size_10,  
fontSize: size.size_18,  
height: size.size_44,  
    },
});

export default styles;