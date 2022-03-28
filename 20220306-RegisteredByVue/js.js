const { ref, reactive, watch, onMounted } = Vue;
const app = {
    setup(){
      const registered = reactive({
        username:"",
        password:"",
        email:"",
        age:"",
        gender:"",
        terms:false,
      });
      const error_message = reactive({});

      const handError = (errObj)=>{
        //因為會出現的錯誤狀態並不固定(可能是name錯或是email錯)
        //所以用Object.keys取出key組成的陣列，跑forEach把內容推進去error_message的reactive內
        //由該key就可以判斷提示文字是否該出現
        Object.keys(errObj).forEach((errKey)=>{
            error_message[errKey] = errObj[errKey];
        })
      }
      const isReg = ref(false);
      const handleSubmit = ()=> {
        axios.post(" https://vue-lessons-api.herokuapp.com/auth/registered",
                  registered )
        .then((res)=>{
          console.log(res);
          isReg.value = true;
        })
        //取出後端提供的錯誤訊息內容，並噴到畫面上
        .catch((err)=>{
          console.error(err.response.data.error_message);
          handError(err.response.data.error_message);
        })
          
      };
      return{ registered, handleSubmit, isReg, error_message }
    }
};

  Vue.createApp(app).mount("#app");
