import { AppStateType } from '@/types/app';
import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

export default useAppSelector;
