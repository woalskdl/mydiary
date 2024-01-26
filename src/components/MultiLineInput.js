import React, { useState } from "react";
import { TextInput, View } from "react-native";

export const MultiLineInput = (props) => {
    const [focused, setFocused] = useState(false);

    return (
        <View style={{
            alignSelf:'stretch',
            paddingHorizontal:12,
            paddingVertical:8,
            borderRadius:4,
            borderWidth:1,
            borderColor: focused ? 'black' : 'gray'
        }}>
            <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                value={props.value}
                multiline
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                style={[props.style, { 
                    fontSize: props.fontSize ?? 20, 
                    height:props.height ?? 200
                }]}
                onFocus={() => {
                    setFocused(true);
                }}
                onBlur={() => {
                    setFocused(false);
                }}
                onSubmitEditing={props.onSubmitEditing}
            />
        </View>
    )
}