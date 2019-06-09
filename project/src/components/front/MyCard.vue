<template>
    <div class="col-md-4">
        <div class="card mb-4 box-shadow">
            <img class="card-img-top img-thumbnail" data-src="../assests/img/main/main1.jpg" alt="Thumbnail [100%x225]" style="height: 225px; width: 100%; display: block;" :src="shoe" data-holder-rendered="true">
            <div class="card-body">
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <div class="d-flex justify-content-between align-items-center">
                    <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                <a class="text-dark" href="#"><font-awesome-icon class="fa-lg" icon="cart-plus" /></a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
             shoe: require('../../assets/img/main/main2.jpg')
        }
    }
}
</script>

