<template>
  <div>
    <v-layout id="portfolio" class="backcolor-portfolios">
      <v-flex my-5 xs12>
        <PortfolioList :limits="9" :load-more="true" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import PortfolioList from "../components/PortfolioList";

export default {
  name: "PortfolioPage",
  components: {
    PortfolioList
  },
  data() {
    return {
      translatedText: []
    };
  }
};
</script>

<style>
@media screen and (max-width: 300px) {
  .create-which {
    margin-left: 42vw;
  }
}
@media screen and (min-width: 301px) and (max-width: 340px) {
  .create-which {
    margin-left: 56%;
  }
}
@media screen and (min-width: 341px) and (max-width: 360px) {
  .create-which {
    margin-left: 62%;
  }
}
@media screen and (min-width: 361px) and (max-width: 400px) {
  .create-which {
    margin-left: 63%;
  }
}
@media screen and (min-width: 401px) and (max-width: 420px) {
  .create-which {
    margin-left: 67%;
  }
}
@media screen and (min-width: 421px) and (max-width: 460px) {
  .create-which {
    margin-left: 68%;
  }
}
@media screen and (min-width: 461px) and (max-width: 480px) {
  .create-which {
    margin-left: 70%;
  }
}
@media screen and (min-width: 481px) and (max-width: 500px) {
  .create-which {
    margin-left: 71%;
  }
}
@media screen and (min-width: 501px) and (max-width: 520px) {
  .create-which {
    margin-left: 73%;
  }
}
@media screen and (min-width: 521px) and (max-width: 540px) {
  .create-which {
    margin-left: 74%;
  }
}
@media screen and (min-width: 541px) and (max-width: 560px) {
  .create-which {
    margin-left: 75%;
  }
}
@media screen and (min-width: 561px) and (max-width: 580px) {
  .create-which {
    margin-left: 76%;
  }
}
@media screen and (min-width: 581px) and (max-width: 620px) {
  .create-which {
    margin-left: 77%;
  }
}
@media screen and (min-width: 621px) and (max-width: 660px) {
  .create-which {
    margin-left: 79%;
  }
}
@media screen and (min-width: 661px) and (max-width: 700px) {
  .create-which {
    margin-left: 80%;
  }
}
@media screen and (min-width: 701px) and (max-width: 740px) {
  .create-which {
    margin-left: 81%;
  }
}
@media screen and (min-width: 741px) and (max-width: 780px) {
  .create-which {
    margin-left: 83%;
  }
}
@media screen and (min-width: 781px) and (max-width: 860px) {
  .create-which {
    margin-left: 78vw;
  }
}
@media screen and (min-width: 861px) and (max-width: 1264px) {
  .create-which {
    margin-left: 85.3%;
  }
}
@media screen and (min-width: 1265px) and (max-width: 1960px) {
  .create-which {
    margin-left: 89%;
  }
}
@media screen and (min-width: 1961px) {
  .create-which {
    margin-left: 92.8%;
  }
}
</style>
