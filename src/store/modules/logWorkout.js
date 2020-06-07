const logWorkout = {
    state: {
        // log workout title
        workoutTitle: null,
        workoutTypes: ["Strength", "Metcon", "Other"],
        workoutType: "Strength",
        workoutNotes: null,
        otherWorkoutDescription: null,

        //Strength
        sets: [],
        anotherWeight: null,
        anotherRep: null
    },
    mutations: {
        setTitle(state, title) {
            state.workoutTitle = title
        }
    },
    actions: {},
    getters: {
        workoutType: (state) => {
            return state.workoutType
        },
        workoutTitle: (state) => {
            return state.workoutTitle
        },
    }
}

export default logWorkout