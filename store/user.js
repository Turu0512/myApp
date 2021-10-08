export const state = () => ({
 transferUsers:[],
 editUserData:[],
})
// ------------------Mutations---------------------
export const mutations = {
addUser(state, usersList){
 console.log(usersList)
state.transferUsers.push(usersList)
},

editUserData(state,userData){
 console.log(userData)
 state.editUserData = []
 state.editUserData.push(userData)
}
}

// --------------------Actions-------------------------
export const actions = {
addUser({commit},user){
 commit("addUser",user)
}
}

// -----------------------Getters-------------------------
export const getters = {
 users: state => {
  return state.transferUsers
 },

 editUsersData: state => {
  return state.editUserData
 }
}