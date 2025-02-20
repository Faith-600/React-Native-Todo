
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import { IconButton } from 'react-native-paper';




function Task({text,onDelete,EditBtn,completed,checked}) {
    
  return (
    <View style={styles.wrapper}>
        <View style={styles.itemLeft}>
        <TouchableOpacity onPress={checked}>
            <View style={[styles.square,completed && styles.checkedSquare]}></View>
            </TouchableOpacity>
        <Text style={[styles.item,completed && styles.completedText]}>{text}</Text>
        </View>
        <View style={styles.iconBtn}>
        <IconButton icon='pencil' onPress={EditBtn}/>
        <IconButton icon='trash-can' onPress={onDelete}/>
       </View>
         </View>
        
       
  )
}


const styles = StyleSheet.create({
    wrapper: {
       backgroundColor: '#FFCCCB',
      padding: 20,
      borderRadius: 10,
      marginTop: 10,
      paddingRight: 20,
      flexDirection: 'row',  
      justifyContent:'space-between',  
      alignItems: 'center'
     
     
    },
    item: {
      fontSize: 18,
      fontFamily: 'Helvetica',
      marginLeft: 10,
   
    },
    itemLeft:{
        flexDirection: 'row',
        alignItems: 'center',
       
    },
    square: {
      width: 20,
      height: 20,
      backgroundColor: '#E6E6FA',
    },
    iconBtn:{
       flexDirection:'row'
      


       },
completedText:{
  textDecorationLine:'line-through',
  
}, 
  checkedSquare: {
    backgroundColor: '#4CAF50', 
  },

  

 

  });

export default Task