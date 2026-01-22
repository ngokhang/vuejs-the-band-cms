<template>
  <div>
    <ul>
      <li v-for="student in students" :key="student">
        {{ student }}
      </li>
    </ul>
  </div>
  <form @submit.prevent="addStudent" class="flex gap-2">
    <input type="text" v-model="newStudent" placeholder="Enter student name" class="border border-gray-300 rounded-md p-2" :disabled="lockedInput">
    <button class="bg-red-500 text-white rounded-md p-2 cursor-pointer" @click.prevent="handleLockInput">{{ lockedInput ? "Unlock Input" : "Lock Input" }}</button>
    <button type="submit" class="bg-blue-500 text-white rounded-md p-2">Add Student</button>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const newStudent = ref('');

  const students = ref([
    'Khang', "Thanh", "Hoai", "Vi"
  ]);
  const lockedInput = ref(false);

  const handleLockInput = () => lockedInput.value = !lockedInput.value;

  const addStudent = (e: Event) => {
    students.value.push(newStudent.value);
    newStudent.value = '';
  }
</script>
