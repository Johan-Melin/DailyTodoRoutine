import React, {useState} from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import TodoItem from './TodoItem'
import TodoLink from './TodoLink'

const List = ({mainPage, setMainPage, todoList, currentIndex, setCurrentIndex, onDelete}) => {
    const [listShowing, setListShowing] = useState([]);

    return (
        <>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 0.1}}>
                    <TouchableOpacity onPress={() => setMainPage(true)}>
                        <Text>{mainPage || '<'}</Text>
                    </TouchableOpacity>
                </View >
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text numberOfLines={1}>{mainPage || todoList[currentIndex]?.title}</Text>
                </View>
                <View style={{flex: 0.1}} /> 
            </View>
            <FlatList
                data={mainPage ? todoList : listShowing}
                extraData={mainPage ? todoList : listShowing}
                keyExtractor={(item, index) => item+index}
                renderItem={item => mainPage 
                    ? <TodoLink 
                        listItem={item} 
                        setListShowing={setListShowing} 
                        setMainPage={setMainPage} 
                        setCurrentIndex={setCurrentIndex}
                        onDelete={onDelete}
                    /> 
                    : <TodoItem 
                        listItem={item} 
                        onDelete={onDelete}
                    />
                }
                style={{width: "100%"}}
            />
        </>
    )
}

export default List
