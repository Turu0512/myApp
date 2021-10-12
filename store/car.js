import firebase from '@/plugins/firebase'
const fbstore = firebase.firestore()

export const state = () => ({
carList: [],
})
// ------------------Mutations-------------------------------
export const mutations = {

addCar(state, car){
console.log(car)
state.carList.push(car)
},


}

// --------------------Actions-------------------------
export const actions = {
async createCar({commit},car){
await fbstore.collection('carList').add({})
.then((res) => {
fbstore.collection('carList').doc(res.id)
    .set({
      ...car,
      id: res.id,
    }).then(() => {
      commit('addCar', car )
      console.log(car, res.id)
    })
})
},


}

// -----------------------Getters-------------------------
export const getters = {


}