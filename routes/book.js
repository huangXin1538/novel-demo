var express = require('express');
var router = express.Router();
var http=require('http');
var cheerio=require('cheerio');
var iconv=require('iconv-lite');
var themodel={
    msg:"0",
    title:'',
    author:'',
    lasttime:'',
    lastchapters:'',
    list:[],
    alllist:[]
};
var info_enum={
    title:0,
    author:1,
    update_time:2,
    last_chapters:3
}
function render(html) {
    var $=cheerio.load(html);
    themodel.title=$("title").text().split("_")[0];//基本信息
    $(".lb_fm td:nth-child(2) > div").each(function (i) {
        switch (i){
            case info_enum.title:
                themodel.title=$(this).text();
                break;
            case info_enum.author:
                themodel.author=$(this).text();
                break;
            case info_enum.update_time:
                themodel.lasttime=$(this).text();
                break;
            case info_enum.last_chapters:
                themodel.lastchapters=$(this).text();
                break
        }
    });
    themodel.desc=$(".lb_jj div").eq(2).text();
    var chapters=$('.chapter9').find("div");
    themodel.list=[];
    $(chapters).each(function (i) {
        var amodel={
            text:$(this).find('a').text(),
            href:$(this).find('a').attr("href").split("wapbook/")[1].split(".")[0]
        }
        themodel.list.push(amodel);
    });
}
router.get("/:link",function (req,res,next) {
    var url="http://m.biquzi.com/wapbook/"+req.params.link+".html";
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
            res.render('book',{result:themodel});
        })

    })
});
module.exports =router;