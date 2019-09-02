<template>
    <div class="fabButton" v-if="this.login == true">
      <fab
      :position="position"
      :bg-color="bgColor"
      :actions="fabActions"
      @Add="formAccess"
      @Edit="profile"
      @Search="home"
        v-bind:files="file"
      :onaddfile="upload" 
    ></fab>
    </div>
</template>