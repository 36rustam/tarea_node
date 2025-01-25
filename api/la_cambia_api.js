// axios
const axios = require('axios').default;

axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json').then(response=>{
    // console.log(response.data);
}).catch(error=>{
    console.log(error.cause)
});