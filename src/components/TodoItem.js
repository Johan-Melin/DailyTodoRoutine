import React, {useState} from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import CheckBox from '@react-native-community/checkbox';

const TodoItem = ({listItem, onDelete}) => {
    const [isChecked, setIsChecked] = useState(false);
    const {text} = listItem.item;
    return (
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                <CheckBox
                    style={{marginLeft: -6}}
                    disabled={false}
                    value={isChecked}
                    onValueChange={setIsChecked}
                />
                <View style={{flex: 1}}>
                    <Text numberOfLines={1} style={isChecked ? styles.done : null}>{text}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => onDelete(listItem.index)} style={{justifyContent: "center"}}>
                <View style={{paddingVertical: 2, paddingLeft: 10, paddingRight: 2}}>
                    <Text>X</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    done: {
        textDecorationLine: 'line-through',
    },
});

export default TodoItem
