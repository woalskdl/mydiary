import { useCallback } from "react"
import database from '@react-native-firebase/database';
import { useRecoileValue, useSetRecoilState } from 'recoil';
import { stateUserInfo } from "../states/stateUserInfo";
import { stateDiaryList } from '../states/stateDiaryList';

export const useCreateDiary = () => {

    return useCallback(async (photoUrl, date, title, content) => {
        const userInfo = useRecoileValue(stateUserInfo);
        const setDiaryList = useSetRecoilState(stateDiaryList);

        if(!date)
            return;

        if(!content)
            return;

        if(!title)
            return;

        const now = new Date().toISOString().at
        const userDiaryDB = database().ref(`diary/${userInfo.uid}`).push();

        const saveItem = {
            photoUrl,
            title,
            content,
            date: date.toISOString(),
            createAt:now,
            updatedAt:now
        }

        await userDiaryDB.set(saveItem);

        setDiaryList((prevList) => {
            return prevList.concat([
                saveItem
            ])
        })

    }, [])
}