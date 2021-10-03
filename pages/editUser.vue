<template>
 <v-app>
  <h1 class="text-center">利用者登録</h1>

  <v-container>
  
   <v-row
   align="center" >
      <v-col cols="2" class="pa-0" align="center">
        <v-subheader class="d-inline-block pa-4" align="center">表示名</v-subheader>
      </v-col>
      <v-col cols="5">
        <v-text-field
        label="送迎表に表示する名前を入力してください"
        placeholder="例：佐野（万）"
        ></v-text-field>
      </v-col>
    </v-row>

   <v-row
   align="center">
      <v-col cols="2" >
        <v-subheader justify="center">姓</v-subheader>
      </v-col>
      <v-col cols="4">
        <v-text-field
        label="姓を入力してください"
        placeholder="例：佐野"
          
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-subheader class="text-center">名</v-subheader>
      </v-col>
      <v-col cols="4">
        <v-text-field
        label="名を入力してください"
        placeholder="例：万次郎"
          
        ></v-text-field>
      </v-col>
    </v-row>

   <v-row
   align="center">
      <v-col cols="2" >
        <v-subheader justify="center">姓（フリガナ）</v-subheader>
      </v-col>
      <v-col cols="4">
        <v-text-field
        label="フリガナ"
        placeholder="例：サノ"
          
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-subheader class="text-center">名（フリガナ）</v-subheader>
      </v-col>
      <v-col cols="4">
        <v-text-field
        label="フリガナ"
        placeholder="例：マンジロウ"
          
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row
   align="center">
      <v-col cols="2" >
        <v-subheader>性別</v-subheader>
      </v-col>
      <v-col cols="4">
        <v-select
          :items="sex"
          label="性別"
        ></v-select>
      </v-col>
      <v-col cols="2">
        <v-subheader class="text-center">住所</v-subheader>
      </v-col>
      <v-col cols="4">
        <v-text-field
        label="フリガナ"
        placeholder="例：マンジロウ"
          
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
     <v-col cols="2">
        <v-subheader class="text-center">利用日</v-subheader>
      </v-col>
     <v-checkbox
      v-for="item in items" :key="item.index"
      :label="item.week"
      class="mr-7"
    ></v-checkbox>
    </v-row>

    <v-row>
     <v-col cols="2">
        <v-subheader class="text-center">送迎</v-subheader>
      </v-col>
      
      <v-radio-group row>
     <v-radio
      v-for="transfer in transfers" :key="transfer.index"
      :label="transfer.label"
      class="mr-7"
    ></v-radio>
      </v-radio-group>
    </v-row>

    <v-row
   align="center" >
      <v-col cols="2" class="pa-0" align="center">
        <v-subheader class="d-inline-block pa-4" align="center">持参品</v-subheader>
      </v-col>
      <v-col cols="5">
        <v-text-field
        label="持参するものがあれば入力してください"
        placeholder="例：杖"
        ></v-text-field>
      </v-col>
    </v-row>
    
  <v-row>
     <v-col cols="2">
        <v-subheader class="text-center">中止</v-subheader>
      </v-col>
     <v-checkbox
      label="利用者一覧に名前が表示されなくなります"
    ></v-checkbox>
    </v-row>
    <v-low>
     <v-col cols="12" class="pl-12">
     ＊再表示させる場合にはチェックを外してください
     </v-col>
    </v-low>
    <v-row class="justify-center mt-10">
        <v-btn>編集</v-btn>
    </v-row>
  </v-container>
  

   
 </v-app>
</template>

<script>
export default {
 data:()=> ({
  sex:["男","女"],
  items:[
   {week:"月"},
   {week:"火"},
   {week:"水"},
   {week:"木"},
   {week:"金"},
   {week:"土"},
   {week:"日"},
  ],
  transfers:[
   {label:"送迎あり", value:false},
   {label:"送迎なし", value:false},
   {label:"途中送迎", value:false}
   ],
 }),
}
</script>

<style>
.v-subheader{
 justify-content:center
}
</style>