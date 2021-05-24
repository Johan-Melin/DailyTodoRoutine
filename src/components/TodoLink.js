import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const TodoLink = ({listItem, setMainPage, setListShowing, setCurrentIndex, onDelete}) => {
    const linkHandler = () => {
        setMainPage(false);
        setCurrentIndex(listItem.index)
        setListShowing(listItem.item.list);
    }
    
    const {title} = listItem.item;
    return (
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <TouchableOpacity style={{flex: 1}} onPress={linkHandler}>
                <Text numberOfLines={1}>{title}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(listItem.index)} style={{justifyContent: "center"}}>
                <View style={{paddingVertical: 2, paddingLeft: 10, paddingRight: 2}}>
                    <Text>X</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default TodoLink
