<template>
  <div class="main_padding">
    <ImgBanner id="imgSrc" class="slider0">
      <div class="main-title-after-ko" slot="text">
        우리 모두가 잘되는 그날까지
      </div>
    </ImgBanner>
    <UserProfile />
  </div>
</template>

<script>
import UserProfile from "../components/UserProfile";
import ImgBanner from "../components/ImgBanner";

export default {
  name: "MyPage",
  components: {
    ImgBanner,
    UserProfile
  }
};
</script>
