import {create} from 'zustand';

const useImageStore = create((set) => ({
    base64Image: null,
    setBase64Image: (base64Image: string) => set({base64Image}),
}));

export default useImageStore;