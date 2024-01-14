import React, { useEffect } from "react";
import { View } from "react-native";
import { Typography } from "./components/Typography";

export const SplashView = (props) => {

    useEffect(() => {
        setTimeout(() => {
            props.onFinishLoad();
        }, 2000)
    }, [])

    return (
        <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
            <Typography fontSize={26}>
                SPLASH
            </Typography>
        </View>
    )
}