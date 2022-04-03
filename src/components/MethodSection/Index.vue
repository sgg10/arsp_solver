<template>
    <div class="method-section">
        <b-row>
            <b-col>
                <h4>{{name}}</h4>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-list-group>
                    <b-list-group-item
                        class="list-group-item"
                        button
                        v-for="(method, idx) in methods"
                        :key="idx"
                        :to="method.to"
                    >
                        {{method.name}}
                    </b-list-group-item>
                </b-list-group>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            required: true,
            type: String
        },
        methods: {
            required: true,
            type: Array
        }
    }
}
</script>

<style lang="scss">
    .method-section {
        background-color: rgba(255, 255, 255, 0.164);
        border-radius: 15px;
        padding: 15px;
        margin-bottom: 34px;

        & .list-group-item {
            &:hover {
                color: rgb(138, 38, 38);
            }
        }
    }
</style>
