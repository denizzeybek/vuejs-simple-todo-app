<template>
    <div class="container">
        <div class="input-group my-3">
            <input 
                v-model="todoText" 
                @keyup.enter="submitBtn" 
                type="text" 
                class="form-control" 
                placeholder="" 
                aria-label="Example text with button addon" 
                aria-describedby="button-addon1">
            <button  
                @click="submitBtn" 
                class="btn btn-outline-primary" 
                type="button" 
                id="button-addon1">
                Add To List
            </button>
        </div> 

        <div v-for="todo in getToDoList" :key="todo.id" class="row mt-2">
            <div class="col-md-12">
                <div class="d-flex justify-content-between align-items-center">
                    <input 
                        v-if="isEditing == true && tempID == todo.id && tempID != null" 
                        v-model="editText" 
                        @keyup.enter="editBtn(todo)" 
                        class="col form-control"
                        type="text"  
                    >
                    <p v-else > {{todo.title}}</p>
                    <div>
                        <div 
                            @click="editBtn(todo)" 
                            class="btn btn-outline-secondary mx-2">
                            {{ isEditing == true && tempID == todo.id && tempID != null ? 'Update' : 'Edit' }}
                        </div>
                        <div 
                            @click="deleteBtn(todo.id)" 
                            class="btn btn-outline-danger ">
                            Delete
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex';
import {v1} from 'uuid';
export default {
    data(){
        return{
            todoText:'',
            editText:'',
            isEditing:false,
            tempID:'',
            updateCounter:1
        }
    },
    methods:{
        ...mapActions([
            'addList',
            'deleteItem',
            'updateItem'
        ]),
        submitBtn(){
            if(this.todoText){
                this.addList({
                    id:v1(),
                    title:this.todoText
                })
                this.todoText=''
            }
        },
        deleteBtn(id){
            this.deleteItem(id)
        }, 
        editBtn(todo){
            this.isEditing = !this.isEditing;
            this.tempID = todo.id
            todo.title = this.editText
            let mode = this.updateCounter % 2 
            this.editText = '';
            this.updateCounter++;
            if(mode == 0){
                this.updateItem(todo)
            }
        }
        
    },
    computed:{
        ...mapGetters([
            'getToDoList',
        ])
    }
}
</script>

<style scoped>
p{
    padding:0;
    margin:0;
}
</style>