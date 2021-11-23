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

  // modals de l edition de post  
  const modalActive_DeletePost = ref(false);
  const modalActive_ChangePost = ref(false);

  const toggleModal_DeletePost = () => {
    modalActive_DeletePost.value = !modalActive_DeletePost.value;
    }
    const toggleModal_ChangePost = () => {
      modalActive_ChangePost.value = !modalActive_ChangePost.value;
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
  // modals de l edition de role  
  const modalActive_Role = ref(false);

  const toggleModal_Role = () => {
    modalActive_Role.value = !modalActive_Role.value;
    }





    return [modalActive_Txt, toggleModal_Txt, modalActive_Img, toggleModal_Img,
            modalActive_DeletePost, toggleModal_DeletePost,modalActive_ChangePost, toggleModal_ChangePost,
            modalActive_EditProfile, toggleModal_EditProfile, modalActive_Password, toggleModal_Password,
            modalActive_Role, toggleModal_Role];
}
