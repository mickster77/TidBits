import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase"; // needed for user auth
import db from "@/firebase/init";

Vue.use(Vuex)

// I only really use this store to help with displaying the right requests in the data tabel on the home page.
export const store = new Vuex.Store({
    state: {
        requests: [{ name: "normal requests" }],
        visibleRequests: [{ name: "select requests to view" }],
        showRequests: "all"
    },
    mutations: {
        increment(state) {
            state.count++
        },
        addRequest(state, request) {
            state.requests.push(request)
        },
        nullRequests(state) {
            state.requests = []
        },
        showAll(state) {
            state.visibleRequests = state.requests.sort((a, b) => (a.dateSubmitted < b.dateSubmitted) ? 1 : -1)
        },
        showRequests(state, payload) {
            let sortedArray = state.requests.sort((a, b) => (a.dateSubmitted < b.dateSubmitted) ? 1 : -1)
            if (payload === "new") {
                state.visibleRequests = sortedArray.filter(request => request.status === "new")
            } else if (payload === "ticketed") {
                state.visibleRequests = sortedArray.filter(request => request.status === "ticketed")
            } else if (payload === "ongoing") {
                state.visibleRequests = sortedArray.filter(request => request.status === "ongoing")
            } else if (payload === "completed") {
                state.visibleRequests = sortedArray.filter(request => request.status === "completed")
            } else {
                state.visibleRequests = state.requests.sort((a, b) => (a.dateSubmitted < b.dateSubmitted) ? 1 : -1)
            }
        },
        showRequests2(state, payload) {
            state.showRequests = payload
        }
    },
    actions: {
        updateRequests(context) {
            db.collection("newRequests")
                .onSnapshot(snapshot => {
                    context.commit('nullRequests')
                    snapshot.forEach(doc => {
                        let request = doc.data();
                        let id = doc.id
                        request.id = id
                        context.commit('addRequest', request)
                    });
                });
        },
        deleteRequest(context, payload) {
            db.collection("newRequests") // Gets the smoothie collection
                .doc(payload) // Gets the doc of a specific id
                .delete() // This deletes it from the database
                .then(() => {
                    console.log("deleted")
                });
        }

    },
    getters: {
        sortedRequests: state => {
            return state.requests.sort((a, b) => (a.dateSubmitted < b.dateSubmitted) ? 1 : -1)
        },
        newRequests: state => {
            let sortedArray = state.requests.sort((a, b) => (a.dateSubmitted < b.dateSubmitted) ? 1 : -1)
            let newReq = sortedArray.filter(function (request) {
                if (request.status == "new" || request.status == "all") {
                    return true;
                } else {
                    return false;
                }
            })
            return newReq
        },
        ongoingRequests: state => {
            let sortedArray = state.requests.sort((a, b) => (a.dateSubmitted < b.dateSubmitted) ? 1 : -1)
            let newReq = sortedArray.filter(function (request) {
                if (request.status == "ongoing" || request.status == "all") {
                    return true;
                } else {
                    return false;
                }
            })
            return newReq
        },
        completedRequests: state => {
            let sortedArray = state.requests.sort((a, b) => (a.dateSubmitted < b.dateSubmitted) ? 1 : -1)
            let newReq = sortedArray.filter(function (request) {
                if (request.status == "completed" || request.status == "all") {
                    return true;
                } else {
                    return false;
                }
            })
            return newReq
        },
        // visibleRequests2: state => {
        //     return sortedArray = state.requests.sort((a, b) => (a.dateSubmitted < b.dateSubmitted) ? 1 : -1)
        //     //I am not using this right now...
        // },
    }
})