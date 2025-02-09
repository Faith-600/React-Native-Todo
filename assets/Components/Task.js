
import {View,Text,StyleSheet,} from 'react-native'



function Task(props) {
    
  return (
    <View style={styles.wrapper}>
        <View style={styles.itemLeft}>
            <View style={styles.square}></View>
        <Text style={styles.item}>{props.text}</Text>
        </View>
        <View style={styles.circular}></View>
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
      justifyContent: 'space-between',  
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
    circular:{
        width:12,
        height:12,
        backgroundColor:'#E6E6FA',
        borderRadius:10,
       
    }
  });

export default Task