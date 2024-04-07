import { create } from 'zustand';
import {UseFullInfoStore} from '~type/use-full-info-store';


const useFullInfoStore = create<UseFullInfoStore>(() => ({
	converted: null,
	loading: false,
	error: false,
}))

export default useFullInfoStore;