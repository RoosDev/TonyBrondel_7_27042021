<template>
    <nav class="col-12 col-md-10">
        <router-link to="/Home" class="col-3 col-md-6 navLink">
            <div class="sizeSvg">
                <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 23 23"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                </svg>
            </div>
            <div class="svgText">
                <p>News</p>
            </div>
        </router-link>
        <router-link to="/Profile" class="col-3 col-md-6 navLink">
            <div class="sizeSvg">
                <svg fill="currentColor" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                    />
                </svg>
            </div>
            <div class="svgText">
                <p>Mon profil</p>
            </div>
        </router-link>
        <router-link to="/Admin" class="col-3 col-md-6 navLink">
            <div class="sizeSvg">
                <svg fill="currentColor" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
                    />
                </svg>
            </div>
            <div class="svgText">
                <p v-if="myRole == 'okAGo'">Admin.</p>
                <p v-else>Annuaire</p>
            </div>
        </router-link>
        <a @click.prevent="logOut" class="col-3 col-md-6 navLink">
            <div class="sizeSvg">
                <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 23 23"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                </svg>
            </div>
            <div class="svgText">
                <p>Déconnexion</p>
            </div>
        </a>
    </nav>
</template>
<script setup lang="ts">
import store from '../store/index';
import { useRouter } from "vue-router";

const myStore: any = store;
const myRouter: any = useRouter();

// Récupération de l' ID de l'utilisateur
const currentUser = JSON.parse(localStorage.getItem("user")!);
const myRole = currentUser.canOrNot!;


// Fonction de déconnexion 
const logOut = () => {
    myStore.dispatch('auth/logout');
    myRouter.push('/');
}
</script>
<style lang="scss">
@import "../scss/variables.scss";

nav {
    height: 25vh;
    margin-top: 100px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: flex-start;
    margin-right: auto;
    margin-left: auto;
    a {
        color: $groupo-color4;
        border: 1px solid transparent;
        margin: 0;

        &:hover {
            color: $groupo-color2;
            text-decoration: wavy;
            border: 1px solid $groupo-color4;
            border-radius: 15px;
        }
    }
    .navLink {
        width: 100px;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
        margin: 0;
        text-decoration: none;
        font-size: 1.1em;
        text-align: center;
        p {
            white-space: nowrap;
            text-align: center;
        }

        .sizeSvg {
            margin-left: auto;
            margin-right: auto;
            width: 80px;
            height: 40px;
            // color: $groupo-color4;

            svg {
                padding: 0;
                margin: 0;
                width: 35px;
                height: 35px;

                path {
                    margin: 0;
                }
            }
        }
        .svgText {
            text-align: center;
            text-decoration: none;
            font-size: 1em;
        }
    }
    .router-link-active,
    .router-link-exact-active {
        color: $groupo-color1;
        border: 1px solid $groupo-color1;
        border-radius: 15px;
        font-weight: bold;
        background-color: #fff;
    }
}
@media (max-width: 1199.99px) {
    nav {
        height: 90%;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
        margin-right: auto;
        margin-left: auto;
        a {
            color: $groupo-colorLight3;
            border: 1px solid transparent;
            margin: 0;

            &:hover {
                background-color: $groupo-colorLight3;
            }
        }
    }
}
@media (max-width: 575.99px) {
    nav {
        // height: 15vh;
        margin-top: 62px;
        a {
            color: $groupo-color4;
            border: 1px solid transparent;
            margin: 0;

            &:hover {
                text-decoration: wavy;
                border: 1px solid $groupo-color4;
                border-radius: 15px;
            }
        }
        .navLink {
            width: 60px;
            p {
                font-size: 0.6em;
            }

            .sizeSvg {
                width: 65px;
                height: 30px;

                svg {
                    width: 35px;
                    height: 35px;
                }
            }
        }
    }
}
@media (max-width: 329.99px) {
    nav {
        // height: 15vh;
        margin-top: 62px;
        a {
            color: $groupo-color4;
            border: 1px solid transparent;
            margin: 0;

            &:hover {
                text-decoration: wavy;
                border: 1px solid $groupo-color4;
                border-radius: 10px;
            }
        }
        .navLink {
            width: 50px;
            p {
                font-size: 0.4em;
            }

            .sizeSvg {
                width: 50px;
                height: 30px;

                svg {
                    width: 30px;
                    height: 35px;
                }
            }
        }
    }
}
</style>
