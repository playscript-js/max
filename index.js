app=require("express")();
_=require("lodash");
yt=require("youtube-search-api");
url=require("ytdl-core");
fs=require("fs");
cors=require("cors");

app.use(cors())



app.get("/search/:query",(req,res)=>{
yt.GetListByKeyword(_.replace(req.params.query,"+"," "),false)
.then(ret=>{res.json(ret.items)})
.catch(e=>{res.send(e)})
})

app.get("/video/:query",(req,res)=>{

url.getInfo(req.params.query)
.then(e=>{res.send(e.formats[e.formats.length-1].url||"null")})
})

app.listen(process.env.PORT||3000)
console.log("ready")
