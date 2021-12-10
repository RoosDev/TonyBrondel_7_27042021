<template>
    <div
        :id="'bubbledeleteComment_' + props.theComment.id"
        class="bubbledeleteComment"
        v-if="currentUserStore.id == props.theComment.authorComment.id || myRole == 'okAGo'"
    >
        <font-awesome-icon
            id="closeModalAwesome"
            :icon="['fas', 'times-circle']"
            @click="toggleModal_DeleteComment()"
        />
    </div>
    <div id="bubbleText" class="col-12">
        <p>{{ props.theComment.content }}</p>
    </div>
    <div id="bubbleAuthor" class="col">
        <p>{{ props.theComment.authorComment.firstname }} {{ props.theComment.authorComment.lastname }} - {{ formatDatePost(props.theComment.updatedAt) }}</p>
    </div>
    <Modal @close="toggleModal_DeleteComment" :modalActive="modalActive_DeleteComment">
        <div :id="'modal-contentComment' + props.theComment.id" class="modal-content">
            <DeleteComment :commentId="props.theComment.id" :commentContent="props.theComment.content" />
        </div>
    </Modal>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import store from '../store/index';
import moment from 'moment';
import DeleteComment from '@/components/DeleteComment.vue';
import Modal from '@/components/Modal.vue';
import { useModal } from '@/composition/modal';

const myStore: any = store;

const props = defineProps <{
    theComment: any,
}>()

// Définition de l'ID utilisateur (avec le localstorage)
const currentUserStore = computed(() => myStore.state.auth.user);
const currentUser = JSON.parse(localStorage.getItem("user")!);
const myRole = currentUser.canOrNot!;

// Fonction de mise en forme de la date du post
const formatDatePost = (postDate) => {
    moment.locale("fr")
    return moment(postDate).format('lll')
}


const [modalActive_DeleteComment, toggleModal_DeleteComment] = useModal()

</script>
