import React, { useCallback, useEffect, useState } from "react"
import { View } from "react-native"
import { Header } from "../components/header/Header"
import { Spacer } from "../components/Spacer";
import { PasswordInputBox } from "../components/PasswordInputBox";
import { stateUserInfo } from "../states/stateUserInfo";
import database from '@react-native-firebase/database';
import { useNavigation } from "@react-navigation/native";

export const AddPasswordScreen = () => {
    const [firstInput, setFirstInput] = useState('');
    const [secondInput, setSecondInput] = useState('');
    const [isInputFirst, setIsInputFirst] = useState(true);
    const userInfo = useRecoilValue(stateUserInfo);
    const navigation = useNavigation();

    const onPressBack = useCallback(() => {
        navigation.goBack();
    }, []);

    const onCompleteInputPassword = useCallback(async() => {
        if(firstInput !== secondInput)
            return;

        const userDB = `/users/${userInfo.uid}`;

        await database().ref(userDB).update({
            password: firstInput,
        })

        navigation.goBack();
    }, [firstInput, secondInput, userInfo]);

    useEffect(() => {
        if(firstInput.length < 4) return;

        if(secondInput.length < 4) return;

        if(firstInput === secondInput) {
            // 저장
            onCompleteInputPassword();
        }
    }, [firstInput, secondInput]);

    return (
        <View style={{ flex:1 }}>
            <Header>
                <Header.Group>
                    <Header.Icon iconName='arrow-back' onPress={onPressBack}></Header.Icon>
                    <Spacer Spacer={12}/>
                    <Header.Title title='비밀번호 추가'/>
                </Header.Group>
            </Header>
            <View style={{flex:1, paddingTop:32, }}>
                <PasswordInputBox 
                    value={isInputFirst ? firstInput : secondInput}
                    onChangeText={(text) => {
                        if(isInputFirst) {
                            setFirstInput(text);

                            if(text.length === 4) {
                                setIsInputFirst(false);
                            }
                        } else {
                            setSecondInput(text);
                        }
                    }}
                />
            </View>
        </View>
    )
}