import {useContext} from 'react'
import {IUserContext} from './UserData'

export const useIUser = () => {
    const data = useContext(IUserContext);
    return data;
}