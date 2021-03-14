app=require("express")();
_=require("lodash");
yt=require("youtube-search");
url=require("ytdl-core");
cors=require("cors")
request=require("request")

app.use(cors())
opt={key: "AIzaSyCg4WbYR_fegTYMmS5jqijjRN8xc-Ce1mo"}
lifetime=0

app.get("/search/:query",(req,res)=>{
yt(_.replace(req.params.query,"+"," "),opt,(err,ret)=>{
if(err)res.status(200).json([]); else{
ls=[];
for(var i=0;i<ret.length;i++){
if(ret[i].kind=="youtube#video"){
ls.push(ret[i])}}
res.json(ls)}})
})

app.get("/video/:query/:type",(req,res)=>{
url.getInfo("https://www.youtube.com/watch?v="+
req.params.query).then(e=>{


if(req.params.type=="listen"||req.params.type==undefined){
 var u =e.formats[e.formats.length-1].url
 req.pipe(request(u)).pipe(res);}

if(req.params.type=="listenhigh"){
 var u =e.formats[e.formats.length-3].url
 req.pipe(request(u)).pipe(res);}


})
 })

setInterval(()=>{lifetime+=1000},1000)
setInterval(()=>{request("https://audioluv.web.app",(e,h,d)=>
{})},10000)

setInterval(()=>{
request("https://audio-love.herokuapp.com/search/jcole+apparently"
,(e,r,b)=>{
if(e)console.log(e);
else console.log("stay awake",lifetime)})},1200000)



app.listen(process.env.PORT||3000)
console.log("ready")
