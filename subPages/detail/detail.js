const { createApp } = Vue

createApp({
  data() {
    return {

    }
  },
  methods:{
    back(){
      window.location.href= '../../exploration.html'
    }
  }
}).mount('#detailPage')