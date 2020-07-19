<template>
  <div class="profile-header">
    <img class="profile-header-image" src="http://placekitten.com/128/128" />
  </div>
</template>

<style lang="scss">
@import "@/scss/shared/_variables.scss";

.profile-header {
  background-color: #FE4D55;
  font-size: 0;
  padding: #{$padding * 2} $padding;
  text-align: center;

  .profile-header-image {
    border-radius: 9999px;
    border-style: solid;
    border-width: 5px;
    width: 128px;
  }
}
</style>