<template>
    <div class="text-center my-5">
        <img width="100%" :src="src" />
    </div>
</template>

<script>
export default {
    name: 'Chart',
    props: {
        src: {
            required: false,
            type: String
        }
    }

}
</script>