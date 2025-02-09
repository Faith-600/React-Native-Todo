import React,{useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView } from 'react-native';
import Task from './assets/Components/Task';


export default function App() {
  const [task,setTask] = useState();
  const [taskItems,setTaskItems] = useState([])

    const handleSubmitTask =()=>{
     setTaskItems([...taskItems,task]);
     setTask('');
         }

         const handleDelete = (index)=>{
   let copyOfItems = [...taskItems]
     copyOfItems.splice(index,1)
    setTaskItems(copyOfItems)
         }
  return (
    <View style={styles.container}>
     {/* Today Task Build up */}
     <View style={styles.first}>
      <Text style={styles.second}>Today's Task</Text>
     <View style={styles.items}>
      {taskItems.map((item,index)=>{
      return (
        <TouchableOpacity key={index} onPress={()=>handleDelete(index)}>
         <Task text ={item} key={index}/>
        </TouchableOpacity>
      )
      })}
   
     </View>
     </View>

     {/* Write a Task */}
     <KeyboardAvoidingView 
       behavior={Platform.OS ==='ios'?'padding':'height'}
      style={styles.write}>
      <TextInput style={styles.inputed} placeholder={'Write a Task'} value={task} onChangeText={text=>setTask(text)}></TextInput>
    
     <TouchableOpacity onPress={()=>handleSubmitTask()}>
      <View style={styles.addWrapp}>
        <Text style={styles.addText}>+</Text>
      </View>
     </TouchableOpacity>
     </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    
   },
   first:{
   padding:30,
 
   },
   second:{
    fontSize: 30,
    fontFamily:'Arial'
   },
   write:{
   position:'absolute',
   bottom:60,
   width:'100%',
   flexDirection:'row',
   justifyContent:'space-between',
   alignItems:'center'
   },
   inputed:{
   paddingVertical:15,
   width:250,
   paddingHorizontal:15,
   borderRadius:60,
   borderColor:'#C0C0C0',
   borderWidth:2,
   },
   addWrapp:{
    width:60,
    height:60,
    borderColor:'#C0C0C0',
    borderRadius:60,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:2,
   },
   addText:{

   }
});
