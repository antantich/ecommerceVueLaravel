<template>
    <div class="flex min-h-full pt-1 pl-1 pr-4 bg-gray-100">
       <Sidebar :class="{'-ml-[210px]': sidebarClosed}"></Sidebar>
        <div class="flex-1">
           <HeaderComponent @toggle-sidebar="toggleSidebar" class="border-b-2 rounded-r-xl"></HeaderComponent>

            <!--Content-->
            <main class="p-6">
                <div class="p-4 rounded bg-white">
                    <router-view></router-view>
                </div>
            </main>
            <!--/Content-->
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue'
import Sidebar from "./Sidebar.vue";
import HeaderComponent from "./HeaderComponent.vue";

const {title} = defineProps({
    title: String
})

const sidebarClosed = ref(false)

function toggleSidebar() {
    sidebarClosed.value = !sidebarClosed.value
}

onMounted(() => {
    if (window.outerWidth <= 768) {
        sidebarClosed.value = true
    }
})
</script>

<style scoped>

</style>
