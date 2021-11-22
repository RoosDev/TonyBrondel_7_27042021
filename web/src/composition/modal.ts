import {ref} from 'vue';

export function useModal() {
  // modals du feed
    const modalActive_Txt = ref(false);
    const modalActive_Img = ref(false);

    const toggleModal_Txt = () => {
      modalActive_Txt.value = !modalActive_Txt.value;
    }
    const toggleModal_Img = () => {
      modalActive_Img.value = !modalActive_Img.value;
    }

  // modals de l edition de profil  
  const modalActive_EditProfile = ref(false);
  const modalActive_Password = ref(false);

  const toggleModal_EditProfile = () => {
    modalActive_EditProfile.value = !modalActive_EditProfile.value;
    }
    const toggleModal_Password = () => {
      modalActive_Password.value = !modalActive_Password.value;
    }



    return [modalActive_Txt, toggleModal_Txt, modalActive_Img, toggleModal_Img,
            modalActive_EditProfile, toggleModal_EditProfile, modalActive_Password, toggleModal_Password];
}
