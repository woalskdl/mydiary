import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { View } from "react-native";
import { Header } from "../components/header/Header";
import { Spacer } from "../components/Spacer";
import { useRecoilState } from "recoil";
import { stateUserInfo } from "../states/stateUserInfo";
import { Button } from "../components/Button";
import { RemoteImage } from "../components/RemoteImage";
import { Typography } from "../components/Typography";
import { useImagePickAndUpload } from "../hooks/useImagePickAndUpload";
import database from '@react-native-firebase/database';
import { Divider } from '../components/Divider';
import { Icon } from "../components/Icons";

export const SettingScreen = () => {
    const [userInfo, setUserInfo] = useRecoilState(stateUserInfo);
    const runImagePickAndUpload = useImagePickAndUpload(false);

    const navigation = useNavigation();

    const onPressBack = useCallback(() => {
        navigation.goBack();
    }, []);

    const onPressProfile = useCallback(async () => {
        const result = await runImagePickAndUpload();
        if(result.flex >= 1) {
            const userDB = `/users/${userInfo.uid}`

            // 프로필 이미지로 선택한 것이 업로드 됨
            setUserInfo((prevState) => {
                return {
                    ...prevState,
                    profileImage: result[0]
                }
            })

            await database().ref(userDB).update({
                profileImage:result[0]
            })
        }
    }, [userInfo, runImagePickAndUpload])

    const onPressAddPassword = useCallback(() => {
        navigation.navigate('AddPassword');
    }, []);

    const onPressClearPassword = useCallback(() => {
        database().ref(userDB).update({
            password:'',
        })
    }, []);

    return (
        <View style={{ flex:1, paddingTop:32 }}>
            <Header>
                <Header.Group>
                    <Header.Icon iconName='arrow-back' onPress={onPressBack}/>
                    <Spacer space={12} horizontal/>
                    <Header.Title title='SETTING'/>
                </Header.Group>
            </Header>

            <View style={{ flex:1 }}>
                <View style={{ alignItems:'center', justifyContent:'center' }}>
                    <Button onPress={onPressProfile}>
                        <RemoteImage
                            url={userInfo.profileImage}
                            width={100}
                            height={100}
                            style={{ borderRadius:50 }}
                        />
                    </Button>
                    <Spacer space={20}/>
                    <Typography fontSize={20}>{userInfo.name}</Typography>
                </View>

                <Spacer space={20}/>
                <Divider/>
                <Spacer space={20}/>

                <Button onPress={onPressAddPassword}>
                    <View style={{ 
                        flexDirection:'row', 
                        alignItems:'center', 
                        justifyContent: 'space-between',
                        paddingVertical:12,
                        paddingHorizontal:24,
                    }}>
                        <Typography fontSize={16}>비밀번호 추가</Typography>
                        <Icon name='chevron-forward-outline' size={16}/>
                    </View>
                </Button>

                <Button onPress={onPressClearPassword}>
                    <View style={{ 
                        flexDirection:'row', 
                        alignItems:'center', 
                        justifyContent: 'space-between',
                        paddingVertical:12,
                        paddingHorizontal:24,
                    }}>
                        <Typography fontSize={16}>비밀번호 초기화</Typography>
                    </View>
                </Button>
            </View>
        </View>
    )
}