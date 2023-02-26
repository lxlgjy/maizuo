<template>
    <div class="Center">
        <div class="Center-middle">
            <span>{{data}}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'

const data =ref('个人中心模块不做展示')

</script>

<style scoped>
.Center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
}
</style>