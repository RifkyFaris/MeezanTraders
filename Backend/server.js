const app=require("./app");
const connectDatabase = require("./config/database");

connectDatabase();
port=process.env.port||8000
app.listen(port,()=>{
    console.log(`server listening to port ${port}`)
})