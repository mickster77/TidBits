import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase"; // needed for user auth
import db from "@/firebase/init";
import letters from "@/store/modules/letters";
import router from '@/router'



Vue.use(Vuex)

// I only really use this store to help with displaying the right requests in the data tabel on the home page.
export const store = new Vuex.Store({
    modules: {
        letters: letters,
    },
    state: {
        TidBits: [],
        user: null,
        error: null,
        loading: false
    },
    mutations: {

        addTidBit(state, TidBit) {
            // state.TidBits.push(TidBit)
            // using unshift will add at the beginning of the array, resulting in the newest tidbit being displayed first.
            state.TidBits.unshift(TidBit)

        },
        nullTidBits(state) {
            state.TidBits = []
        },
        setUser(state, payload) {
            state.user = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        setLoading(state, payload) {
            state.loading = payload
        }

    },
    actions: {
        updateTidBits(context) {
            // console.log(firebase.auth().currentUser.uid)
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
        userSignUp({ commit }, payload) {
            commit('setLoading', true)
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(firebaseUser => {
                    commit('setUser', { email: firebaseUser.user.email })
                    commit('setLoading', false)
                    router.push('/home')
                    commit('setError', null)
                })
                .catch(error => {
                    commit('setError', error.message)
                    commit('setLoading', false)
                })
        },
        userSignIn({ commit }, payload) {
            commit('setLoading', true)
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(firebaseUser => {
                    commit('setUser', { email: firebaseUser.user.email })
                    commit('setLoading', false)
                    commit('setError', null)
                    router.push('/')
                })
                .catch(error => {
                    commit('setError', error.message)
                    commit('setLoading', false)
                })
        },
        autoSignIn({ commit }, payload) {
            // commit('setUser', { email: payload.email })
            commit('setUser', payload)

        },
        userSignOut({ commit }) {
            firebase.auth().signOut()
            commit('setUser', null)
            router.push('/login')
        }

    },
    getters: {
        totalTidBits: (state) => {
            return state.TidBits.length
        },
        isAuthenticated(state) {
            return state.user !== null && state.user !== undefined
        },
        isAdmin(state) {
            if (state.user) {
                if (state.user.email == "shit.mail@icloud.com") {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        },
        userDisplayName(state) {
            return state.user.displayName
        },
        userEmail(state) {
            return state.user.email
        },
        uid(state) {
            return state.user.uid
        },

    }
})