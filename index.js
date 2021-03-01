app=require("express")();
_=require("lodash");
yt=require("youtube-search");
url=require("ytdl-core");
cors=require("cors")
request=require("request")

app.use(cors())
opt={key: "AIzaSyCg4WbYR_fegTYMmS5jqijjRN8xc-Ce1mo"}


app.get("/search/:query",(req,res)=>{
yt(_.replace(req.params.query,"+"," "),opt,(err,ret)=>{
if(err)res.status(200).json([]); else{
ls=[];
for(var i=0;i<ret.length;i++){
if(ret[i].kind=="youtube#video"){
ls.push(ret[i])}}
res.json(ls)}})
})

app.get("/video/:query",(req,res)=>{
url.getInfo("https://www.youtube.com/watch?v="+
req.params.query).then(e=>{
 var u =e.formats[e.formats.length-1].url
console.log(e.formats[e.formats.length-1])
 req.pipe(request(u)).pipe(res);
})
 })

app.listen(process.env.PORT||3000)
console.log("ready")
