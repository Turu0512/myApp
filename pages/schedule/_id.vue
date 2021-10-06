<template>
<v-app>
<v-container>
  <v-btn outlined small class="ma-4" @click="backToSchedule">
        カレンダーに戻る
      </v-btn>
  <v-card>
    <v-card-title class="justify-center">
      {{title}}
    </v-card-title>
  </v-card>
  <v-row>
  <v-col
  cols="8">
  <v-card>
    迎え
  </v-card>
  <div class="d-flex flex-column">
      <v-col
      
        v-for="n in 3"
        :key="n"
        class="pa-2 pt-5"
        outlined
        tile
      >
    <v-card
      class="d-flex flex-row"
      :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
      flat
      tile
      max-height="56px"
    >

    <v-card
    max-width="100px">
    <v-card-title 
    class="text-subtitle-1 pa-0 ma-0 mt-n5"
    >デロリアン</v-card-title>
    <v-card-subtitle
    class="pa-0 ma-0 text-caption mt-n1"
    >定員：６名</v-card-subtitle>
    <v-select
          :items="items"
          label="ドライバー"
          class="pa-0 ma-0 text-caption mt-n1"
          height="5"
          dense
          solo
          
        ></v-select>
   </v-card>
      <v-card
        v-for="n in (6*2-1)"
        :key="n"
        class="pa-2"
        outlined
        tile
      >
      <v-col
      cols="3"
      v-if="n%2 != 0">
         {{ user }}
      </v-col>
      <v-card v-else>
       →
      </v-card>
      </v-card>
        
    </v-card>
    </v-col>
    </div>
    <v-select
          :items="items"
          label="車両追加"
          class="pa-0 ma-0 text-caption"
          height="5"
          dense
          solo
          
        ></v-select>
   </v-col>



<v-col
   cols="2">
  <v-card
    width="150"
    tile
  >
    <v-list 
    class="user"
    dense
    >
      <v-subheader>家族送迎</v-subheader>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>

   </v-col>

   <v-col
   cols="2">
  <v-card
    width="150"
    tile
  >
    <v-list 
    class="user"
    dense
    >
      <v-subheader>利用者一覧</v-subheader>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>

  <v-card
    width="150"
    tile
    class="pt-2"
  >
    <v-list 
    class="user"
    dense
    >
      <v-subheader>休み</v-subheader>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>

  </v-col>
　<v-card>
    送り
  </v-card>
  </v-row>
  
  </v-container>

  
 </v-app>
</template>

<script>
import moment from 'moment';
  export default {
    data: () => ({
      selectedItem: 1,
      items: [
        { text: 'Real-Time' },
        { text: 'Audience' },
        { text: 'Conversions' },
      ],
      users:[
       // {name:"佐野",index:1,},
       // {name:"mob1",index:2,},
       // {name:"木崎",index:3},
       // {name:"mob2",index:4},
       {},
       {}
      ]
    }),

    computed: {
    title() {
      return moment(this.$route.params.id).format('M月 DD日');
    },
    },
    methods: {
    backToSchedule() {
      this.$router.push({name: "schedule-schedule"});
    },
  }
  }
</script>

<style>
.user{
 justify-content:center
}

.v-input__slot{
  padding:0px !important;
}
</style>