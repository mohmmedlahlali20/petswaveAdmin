import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store/store';


export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector = <TSelected>(selector: (state: RootState) => TSelected) =>
    useSelector(selector);