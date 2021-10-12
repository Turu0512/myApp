<template>
<v-app>
<v-card>
  <v-card-title class="justify-center">
  車両管理
  </v-card-title>
</v-card>
<v-container>
  <v-row
  align="center">
    <v-col cols="2" >
      <v-subheader justify="center">車両名</v-subheader>
    </v-col>
    <v-col cols="4">
      <v-text-field
      label="車両名を入力してください"
      v-model="car.name"
      ></v-text-field>
    </v-col>
    
  </v-row>
  <v-row>
    <v-col cols="2">
      <v-subheader class="text-center">定員数</v-subheader>
    </v-col>
    <v-col cols="4">
      <v-text-field
      label="定員数を入力してください"
      v-model="car.max"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-btn @click="createCar">
    車両追加
  </v-btn>
</v-container>
<v-container>
  <v-simple-table
  fixed-header
  height="300px"
>
  <template v-slot:default>
    <thead>
      <tr>
        <th class="text-left">
          車両名
        </th>
        <th class="text-rigth text-center">
          定員数
        </th>
        <th class="text-rigth text-center">
          ー
        </th>
        <th class="text-rigth text-center">
          ー
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="car in cars"
        :key="car.name"
      >
        <td >{{ car.name }}</td>
        <td align="center">{{ car.max }}</td>
        <td align="center"><v-btn>編集</v-btn></td>
        <td align="center"><v-btn>削除</v-btn></td>
      </tr>
    </tbody>
  </template>
</v-simple-table>
</v-container>
</v-app>
</template>

<script>
export default {
data:() => ({
car:{
  name:"" , 
  max:"",
},

cars:[],

}),

methods:{
createCar(){
  this.$store.dispatch("car/createCar",this.car)
}
}
}
</script>