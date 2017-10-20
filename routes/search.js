var express = require('express');
var router = express.Router();
var http=require('http');
var cheerio=require('cheerio');
var searchmodel={
    msg:"0",
    list:[]
};
var filterChapter=function (html) {
    var $=cheerio.load(html);
    var chapters=$('.result-game-item-detail');
    searchmodel.list=[];
    $(chapters).each(function () {
        var obj={
            title:'',
            link:'',
            desc:'',
            info:''
        };
        obj.title=$(this).find('.result-game-item-title-link').attr('title');
        obj.link=$(this).find('.result-game-item-title-link').attr('href').split("/")[3];
        obj.desc=$(this).find('.result-game-item-desc').text();
        searchmodel.list.push(obj);
    })
}
//搜索
router.post('/',function (req,res,next) {
    var name=req.body.name;
    if(!name){
        searchmodel.msg="名字不能为空";
        res.json(searchmodel);
    }else {
        var url='http://zhannei.baidu.com/cse/search?q='+ name+'&s=11815863563564650233';
        //发送时转码中文
        var url2=encodeURI(url);
        http.get(url2,function (res2) {
            var html='';
            res2.on('data',function (data){
                html+=data;
            });
            res2.on('end',function () {
                filterChapter(html);
                res.json(searchmodel);
            })
        })
    }
})
//选中一个小说
var findmodel={
    chapters:[]
};
router.post('/findone',function (req,res,next) {
    var link=req.body.link;
    //发送时转码中文
    http.get(link,function (res) {
        var html='';
        res.on('data',function (data){
            html+=data;
        });
        res.on('end',function () {
            res.json(findmodel);
        })
    })
})
module.exports = router;