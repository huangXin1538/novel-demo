var express = require('express');
var router = express.Router();
var http=require('http');
var cheerio=require('cheerio');
var iconv=require('iconv-lite');
var themodel={
    title:'',
    content:'',
    catalog:'',
    before:'',
    after:''
};
function render(html){
    var $=cheerio.load(html);
    themodel.catalog=$(".mulu").find("a").attr('href').split("wapbook/")[1].split(".")[0];
    themodel.before=$(".prev").find("a").attr('href').split("wapbook/")[1].split(".")[0];

    themodel.after=$(".next").find("a").attr('href').split("wapbook/")[1].split(".")[0];
    themodel.title=$(".nr_title").text();
    themodel.content=$(".nr_nr").find("div").text();
    console.log(html)
}
router.get("/:link",function (req,res,next) {
    var url="http://m.biquzi.com/wapbook/"+req.params.link+".html"
    //发送时转码中文
    var url2=encodeURI(url);
    http.get(url2,function (res2) {
        var html='';
        res2.on('data',function (data){
            var data2=iconv.decode(data,"gbk");
            html+=data2;
        });
        res2.on('end',function () {
            render(html);
            res.render('chapter',{result:themodel});
        })
    })
});
module.exports =router;