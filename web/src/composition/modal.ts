import {ref} from 'vue';

export function useModal(){
    const modalActive_Txt = ref(false);
    const modalActive_Img = ref(false);
    const toggleModal_Txt = () => {
      modalActive_Txt.value = !modalActive_Txt.value;
    }
    const toggleModal_Img = () => {
      modalActive_Img.value = !modalActive_Img.value;
    }
console.log(modalActive_Txt)
console.log(modalActive_Img)
console.log(toggleModal_Txt);
console.log(toggleModal_Img);
    return [modalActive_Txt, toggleModal_Txt, modalActive_Img, toggleModal_Img]
}
