import  React,{useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {RoundedButton} from '../../components/RoundedButton.js'; 


export const Timing = ({onChangeTime})=>{
  return(
    <>
    <View>
    <RoundedButton size={75} title="10" onPress={()=>onChangeTime(10)} />
    </View>
     <View>
    <RoundedButton size={75} title="15" onPress={()=>onChangeTime(15)} />
    </View>
     <View>
    <RoundedButton size={75} title="20" onPress={()=>onChangeTime(20)} />
    </View>
    </>
  )
}