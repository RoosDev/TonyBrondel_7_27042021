import { ref } from "vue";

export function useModal() {
  // modals du feed
  const modalActive_Txt = ref(false); // pour le post de text
  const modalActive_Img = ref(false); // pour le post d'une image

  const toggleModal_Txt = () => {
    modalActive_Txt.value = !modalActive_Txt.value;
  };
  const toggleModal_Img = () => {
    modalActive_Img.value = !modalActive_Img.value;
  };

  // modals de l edition de post
  const modalActive_DeletePost = ref(false); // pour la suppression d'un post
  const modalActive_ChangePost = ref(false); // pour la modification d'un post

  const toggleModal_DeletePost = () => {
    modalActive_DeletePost.value = !modalActive_DeletePost.value;
  };
  const toggleModal_ChangePost = () => {
    modalActive_ChangePost.value = !modalActive_ChangePost.value;
  };

  // modals de l edition de post Image
  const modalActive_DeleteImg = ref(false); // pour la suppression d'un post
  const modalActive_ChangeImg = ref(false); // pour la modification d'un post

  const toggleModal_DeleteImg = () => {
    modalActive_DeleteImg.value = !modalActive_DeleteImg.value;
  };
  const toggleModal_ChangeImg = () => {
    modalActive_ChangeImg.value = !modalActive_ChangeImg.value;
  };

  // modals de l edition de profil
  const modalActive_EditProfile = ref(false);     // pour l 'edition d un profil
  const modalActive_Password = ref(false);        // pour la modification d un mot de passe

  const toggleModal_EditProfile = () => {
    modalActive_EditProfile.value = !modalActive_EditProfile.value;
  };
  const toggleModal_Password = () => {
    modalActive_Password.value = !modalActive_Password.value;
  };


  // modals de l edition de role
  const modalActive_Role = ref(false);      // pour le changement de niveau de autorisation d'un utilisateur

  const toggleModal_Role = () => {
    modalActive_Role.value = !modalActive_Role.value;
  };

  return [
    modalActive_Txt,
    toggleModal_Txt,
    modalActive_Img,
    toggleModal_Img,
    modalActive_DeletePost,
    toggleModal_DeletePost,
    modalActive_ChangePost,
    toggleModal_ChangePost,
    modalActive_DeleteImg,
    toggleModal_DeleteImg,
    modalActive_ChangeImg,
    toggleModal_ChangeImg,
    modalActive_EditProfile,
    toggleModal_EditProfile,
    modalActive_Password,
    toggleModal_Password,
    modalActive_Role,
    toggleModal_Role,
  ];
}
