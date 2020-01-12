// import firebase from "firebase"; // needed for user auth
import db from "@/firebase/init";
const letters = {
    state: {
        notes: [],
        selectedLetter: 1
    },
    mutations: {

        addNote(state, note) {
            state.notes.push(note)
            // console.table(state.notes)
        },
        updateSelectedLetter(state, payload) {
            state.selectedLetter = payload.letter
        },
        nullNotes(state) {
            state.notes = []
        },
    },
    actions: {
        updateLetterNotes(context) {
            // console.log("update letter notes")
            // console.log(this.state.selectedLetter)
            if (this.state.selectedLetter) {
                db.collection("Letters")
                    .doc(this.state.selectedLetter.toString())
                    .collection("notes")
                    .onSnapshot(snapshot => {
                        snapshot.forEach(doc => {
                            context.commit('nullNotes')

                            let note = doc.data();
                            let id = doc.id
                            note.id = id
                            context.commit('addNote', note)
                        });
                    });
            }

        },
    },
    getters: {

    }
}

export default letters

// const letters = {
//     state: {

//     },
//     mutations: {},
//     actions: {},
//     getters: {

//     }
// }

// export default letters