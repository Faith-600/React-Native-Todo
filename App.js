import React,{useEffect, useState} from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView } from 'react-native';
import Task from './assets/Components/Task';
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function App() {
  const [task,setTask] = useState("");
  const [taskItems,setTaskItems] = useState([]);
  const [edit,setEdit] =useState(null)




  // Handle edit Todo
const editTodo =(todo)=>{
setEdit(todo);
setTask(todo.text)
}

//Handle Update Todo

const handleUpdateTask = ()=>{
   const updatedTodos = taskItems.map((item)=>{
    if(item.id ===edit.id ){
      return {...item,text:task}
    }
    return item
   })
 
   setTaskItems(updatedTodos)
   setEdit(null)
   setTask("")

}


// Loading Todos

const loadTodos = async()=>{
  try{
    const storedTodos = await AsyncStorage.getItem('todos');
    console.log('Loaded todos:', storedTodos);
    if (storedTodos) {
      setTaskItems(JSON.parse(storedTodos));
    } else {
      setTaskItems([]); 
    
}
  }catch(error){
  console.error('Error Loading Todos',error);
  
  }
}
// Saving tasks with asyncStorage
const saveTodos = async(todos)=>{
  try{
    await AsyncStorage.setItem('todos',JSON.stringify(todos));
    console.log('Saved todos:', todos);
  }catch(error){
   console.error('Error saving Todos',error);
   
  }
} 

useEffect(()=>{
  loadTodos()
},[]);



// Handle Submit
    const handleSubmitTask =()=>{
      if (task.trim() === "") return;
      const newTask = {
        id: Date.now(), 
        text: task,
        completed:false,
      };
      const updatedTask =[...taskItems,newTask];
     setTaskItems(updatedTask);
     setTask("");
     setEdit(null)
     saveTodos(updatedTask)
         }

         const handleDelete = (index)=>{
         let copyOfItems = [...taskItems]
          copyOfItems.splice(index,1)
          setTaskItems(copyOfItems)
           saveTodos(copyOfItems)
         }

        //  Toggle Task Completion
        const toggleTaskCompletion = (id) => {
          const updatedTodos = taskItems.map((item) => {
            if (item.id === id) {
              return { ...item, completed: !item.completed }; 
            }
            return item;
          });
          setTaskItems(updatedTodos);
        };

  return (
    <View style={styles.container}>
     {/* Today Task Build up */}
     <View style={styles.first}>
      <Text style={styles.second}>Today's Task</Text>
     <View style={styles.items}>
      {taskItems.length === 0 ?
      (
      <View style={styles.goalContainer}><Text style={styles.goal}> What Is Your Goal For Today ? </Text></View>) 
      :(
      taskItems.map((item,index)=>{
      return (
        <TouchableOpacity key={item.id} >
         <Task text ={item.text} onDelete={() => handleDelete(index)}  EditBtn={()=>editTodo(item)}
            completed={item.completed}
            checked={() => toggleTaskCompletion(item.id)}
          />
        </TouchableOpacity>
      )
    }))}
   
     </View>
     </View>

     {/* Write a Task */}
     <KeyboardAvoidingView 
       behavior={Platform.OS ==='ios'?'padding':'height'}
      style={styles.write}>
      <TextInput style={styles.inputed} placeholder={'Write a Task'} value={task} onChangeText={text=>setTask(text)}></TextInput>
    
    {
      edit !==null ? (
        <View>
         <TouchableOpacity onPress={handleUpdateTask}>
      <View style={styles.addWrapp}>
        <Text style={styles.addText}>save</Text>
      </View>
     </TouchableOpacity>
     </View>
      ):(
        <View>
        <TouchableOpacity onPress={handleSubmitTask}>
        <View style={styles.addWrapp}>
          <Text style={styles.addText}>+</Text>
        </View>
       </TouchableOpacity>
       </View>
      )
    }
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
   goalContainer: {
    justifyContent: 'center', 
    alignItems: 'center',
    alignContent:'center',  
    height: '80%', 
   
  },
  
  goal: {
    fontSize: 18,
    fontFamily:"serif",
    textAlign: 'center', 
  }
  
});
