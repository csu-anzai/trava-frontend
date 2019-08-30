<template>
    <div>

        <b-card :title="item.day" style="max-width: 30rem;" class="mb-2" id="card">

            <span>{{dateFormat(item.date)}}</span>

            <b-card-text>
                <strong>Budget:</strong>
                {{item.budget}}
            </b-card-text>

            <b-card-text>
                <strong>Description: </strong>
                {{item.description}}
            </b-card-text> 

            <img :src="item.pictures" width="300px">

        </b-card>

    </div>
</template>

<script>
export default {
    name: 'JCard'
}
</script>