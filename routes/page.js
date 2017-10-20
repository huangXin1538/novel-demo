var express = require('express');
var router = express.Router();
var http=require('http');
var cheerio=require('cheerio');


router.post('/page',function (req,res,next) {
    var rand=parseInt(Math.random()*100000000);
    var id=req.body.id;
    var page=req.body.page;
    var link="http://m.biquzi.com/modules/article/wapallchapter.php?aid="+id+"&page="+page+"&rand="+rand;
    // //发送时转码中文

    var req= http.get(link,function (res2) {
        var html='';
        res2.on('data',function (data){
            html+=data;

        });
        res2.on('end',function () {
            var pagemodel= selectChapter(html)
            html='';
            res.json(pagemodel)
        })
    });
    req.end();
})


function selectChapter(html) {
   var pagemodel={
        "chapter":[],
        "pages":""

    }
    var $=cheerio.load(html);
    pagemodel.pages= $("#allchapter_2 td:nth-child(1) a").text();
    $(".onechapter").each(function (i) {
        var model={
            name:$(this).text(),
            link:$(this).find("a").attr("href")
        }
        pagemodel.chapter.push(model);
    });
    return pagemodel;
}
module.exports = router;