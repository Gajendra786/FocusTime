import  React ,{ useState, useEffect}from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import {Focus} from './src/features/focus/Focus.js';
import {FocusHistory} from './src/features/focus/FocusHistory.js';
import {Timer} from './src/features/timer/timer.js';
import {colors} from './src/utils/colors';
import {spacing} from './src/utils/sizes';
import AsyncStorage from '@react-native-async-storage/async-storage';


// import Constants from 'expo-constants';



export default function App() {
 const [focusSubject,setFocusSubject] = useState(null);
 const [focusHistory,setFocusHistory] = useState([]);
  const addSubject=(value)=>{
    setFocusSubject(value);
  }
const STATUSES = {
  COMPLETE:1,
  CANCELLED:2
}
const onClear = ()=>{
  setFocusHistory([]);
}

const saveFocusHistory = async () =>{
  try{
    AsyncStorage.setItem("focusHistory",JSON.stringify(focusHistory))
  } catch(e){
    console.log(e);
  }
}

const loadFocusHistory = async () =>{
  try{
    const history = await AsyncStorage.getItem("focusHistory");

    if(history && JSON.parse(history).length){
      setFocusHistory(JSON.parse(history))
    }
  } catch(e){
    console.log(e);
  }
}


useEffect(()=>{
  loadFocusHistory();
},[])

useEffect(()=>{
  saveFocusHistory();
},[focusHistory])


  const addFocusSubjectHistoryWithState = (subject,status)=>{
     setFocusHistory([...focusHistory,{subject,status}])
  }
  // useEffect(()=>{
  //   if(focusSubject){
  //     setFocusHistory([...focusHistory,focusSubject])
  //   }
  // },[focusSubject])
  return (
    <View style={styles.container}>
    {focusSubject?(<Timer 
    focusSubject={focusSubject} 
    onTimerEnd={()=>{
    addFocusSubjectHistoryWithState(focusSubject,STATUSES.COMPLETE),
    setFocusSubject(null)}} 
    clearSubject={()=>{
      addFocusSubjectHistoryWithState(focusSubject,STATUSES.CANCELLED),
      setFocusSubject(null)}}
     />):(
       <>
       <Focus addSubject={addSubject}/>
       <FocusHistory focusHistory={focusHistory} onClear={onClear} />
       </>
       )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:Platform.OS === 'ios'?spacing.md:spacing.lg,
    backgroundColor:colors.darkBlue,
  }
});
