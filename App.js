import React, {useEffect, useState} from 'react'
import { SafeAreaView, StatusBar, TextInput, StyleSheet, BackHandler, Button, View } from 'react-native'
import List from './src/components/List';
import {storeData, getData, removeValue} from './src/utils/storage';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [mainPage, setMainPage] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    //removeValue()
    getData()
    .then(items => setTodoList(items))
  }, []);

  useEffect(() => {
    storeData(todoList);
  }, [todoList]);

  useEffect(() => {
    const backAction = () => {
      if (!mainPage){
        setMainPage(true)
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [mainPage]);

  const onAddHandler = () => {
    if (inputText === '')
      return;
    mainPage
    ? addList()
    : addListItem()
    setInputText('');
  }

  const addList = () => {
    const newItem = {
      title: inputText,
      list: []
    }
    setTodoList([...todoList, newItem]);
  }

  const addListItem = () => {
    const newItem = {
      checked: false,
      text: inputText
    }
    let currentTodoList = [...todoList];
    currentTodoList[currentIndex].list.push(newItem);
    setTodoList(currentTodoList)
  }

  const onDeleteTodoHandler = (indexToDelete) => {
    let currentTodoList = [...todoList];
    if (mainPage){
      currentTodoList.splice(indexToDelete, 1);
    }else{
      currentTodoList[currentIndex].list.splice(indexToDelete, 1);
    }
    setTodoList(currentTodoList)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.row}>
        <TextInput 
          style={{borderWidth: 1, width: "100%", padding: 0}}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing = {onAddHandler}
          style={styles.input}
        />
        <Button 
          title="Add" 
          color="#008577"
          onPress={onAddHandler}
        />
      </View>
      <List 
        mainPage={mainPage} 
        setMainPage={setMainPage} 
        todoList={todoList} 
        setTodoList={setTodoList}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        onDelete={onDeleteTodoHandler}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: "5%",
    flex: 1,
    alignItems: 'center',
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 5
  },
  input: {
    flex: 1,
    borderWidth: 1,
    marginRight: 5,
    paddingHorizontal: 5,
    paddingVertical: 0
  },
});
