<script setup>
import { FormField, FormMessage } from "../ui/form";
import FormItem from "../ui/form/FormItem.vue";
import FormLabel from "../ui/form/FormLabel.vue";
import FormControl from "../ui/form/FormControl.vue";
import Input from "../ui/input/Input.vue";
import { Checkbox } from "../ui/checkbox";
import Button from "../ui/button/Button.vue";
import { Spinner } from "@/components/ui/spinner";

import { useForm } from "vee-validate";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { loginFormSchema } from "@/schema/LoginSchema";
import { toast } from "vue-sonner";
import { useRouter } from "vue-router";

const form = useForm({
  validationSchema: loginFormSchema,
  initialValues: {
    username: "",
    password: "",
    rememberMe: true,
  },
});

const authStore = useAuthStore();
const { isAuthenticated, loading } = storeToRefs(authStore);
const { login } = authStore;
const navigate = useRouter();

const onSubmit = form.handleSubmit(async (values) => {
  const response = await login(values);
  if (response.success) {
    toast.success("Đăng nhập thành công!");
    navigate.push({ name: "home" });
  } else {
    toast.error(response.message || "Đăng nhập không thành công!");
  }
  return response;
});
</script>

<template>
  <form
    class="flex min-h-[450px] w-[500px] flex-col gap-10 rounded bg-white p-10 shadow-lg"
    @submit.prevent="onSubmit"
  >
    <FormItem class="text-center text-2xl font-bold uppercase">
      <div>the band cms</div>
      <div class="text-sm text-gray-500">Chỉ dành cho thành viên ban nhạc</div>
    </FormItem>

    <div class="flex flex-col gap-4">
      <!-- Username field -->
      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel class="text-base font-semibold">Username</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Enter your username"
              v-bind="componentField"
              :disabled="loading"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Password field -->
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel class="text-base font-semibold">Password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="Enter your password" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <div class="flex items-center justify-between">
      <FormField v-slot="{ componentField }" name="rememberMe">
        <FormItem class="flex items-center gap-2">
          <FormControl>
            <Checkbox v-bind="componentField" />
          </FormControl>
          <FormLabel class="text-gray-500">Ghi nhớ đăng nhập</FormLabel>
        </FormItem>
      </FormField>
      <RouterLink to="#" class="text-sm text-black hover:underline">Quên mật khẩu?</RouterLink>
    </div>

    <Button>
      <Spinner v-show="loading" />
      Đăng nhập
    </Button>
  </form>
</template>
