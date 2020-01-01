import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase"; // needed for user auth
import db from "@/firebase/init";
import letters from "@/store/modules/letters";


Vue.use(Vuex)

// I only really use this store to help with displaying the right requests in the data tabel on the home page.
export const store = new Vuex.Store({
    modules: {
        letters: letters,
    },
    state: {
        TidBits: [],
        user: null
    },
    mutations: {

        addTidBit(state, TidBit) {
            state.TidBits.push(TidBit)
        },
        nullTidBits(state) {
            state.TidBits = []
        },


    },
    actions: {
        updateTidBits(context) {
            console.log(firebase.auth().currentUser.uid)
            db.collection("UserOwned")
                .doc(firebase.auth().currentUser.uid)
                .collection("TidBits").
                orderBy("nowDate").onSnapshot(snapshot => {
                    context.commit('nullTidBits')
                    snapshot.forEach(doc => {
                        let TidBit = doc.data();
                        let id = doc.id
                        TidBit.id = id
                        context.commit('addTidBit', TidBit)
                    });
                });
        },

    },
    getters: {
        totalTidBits: (state) => {
            return state.TidBits.length
        }


    }
})