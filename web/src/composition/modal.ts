import {ref} from 'vue';

export function useModal() {
    const modalActive_Txt = ref(false);
    const modalActive_Img = ref(false);
    const toggleModal_Txt = () => {
      modalActive_Txt.value = !modalActive_Txt.value;
    }
    const toggleModal_Img = () => {
      modalActive_Img.value = !modalActive_Img.value;
    }
    return [modalActive_Txt, toggleModal_Txt, modalActive_Img, toggleModal_Img];
}
