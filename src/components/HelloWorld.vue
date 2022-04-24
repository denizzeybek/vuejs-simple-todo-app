<template>
  <div class="hello">
    <form>
      <!-- burda bir liste dönsün -->
      <ul class="list-general">
        <li v-for="(text,index) in todoList" :key="index">{{text}} </li>
      </ul>
      <input v-model="todoText">
      <button @click="addToList" type="submit" class="">Add</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted(){
    const getList = localStorage.getItem("todoList");
    this.todoList = JSON.parse(getList) || [];
  },
  data(){
    return{
      todoList:[],
      todoText:''
    }
  },
  methods:{
    addToList(e){
      e.preventDefault();
      this.todoList.push(this.todoText)
      this.todoText = ''
      localStorage.setItem("todoList", JSON.stringify(this.todoList))
    }
  }
}
</script>

<style scoped>
.list-general{
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
