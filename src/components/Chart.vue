<template>
    <div class="text-center my-5">
        <img width="100%" :src="'data:image/png;base64,'+src" />
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