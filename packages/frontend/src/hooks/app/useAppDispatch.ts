import { AppDispatchType } from '@/types/app';
import { useDispatch } from 'react-redux';

const useAppDispatch: () => AppDispatchType = useDispatch;

export default useAppDispatch;
