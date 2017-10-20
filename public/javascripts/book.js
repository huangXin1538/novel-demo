$(function(){
    var url=location.pathname;
    var id=url.split("book/")[1];
    var page=1;
    var rand=parseInt(Math.random()*1000000);
    var pages='';

    function getchapter(page) {
        $.ajax({
            url:'/page',
            type:'post',
            data:{
                id:id,
                page:page,
            },
            success:function (result) {
                renderchapter(result.chapter);
                pages=result.pages;
                $(".pages").html(result.pages);
                pages=$(".pages").html().split("/")[1];
                var l=pages.length;
                pages=pages.splice(0,l-1);
                console.log(pages)
            }
        })
    }

    getchapter(page);

    function  renderchapter(chapters) {
        $(chapters).each(function (i) {
            var link=this.link.split("wapbook")[1].split(".")[0];
            var s='<li class="mui-table-view-cell chapter"><a class="mui-navigate-right" data-link='+link+'>'+this.name+'</a> </li>';
            $(".allchapter").append(s);
        })
        $(".chapter").on("click",function () {
            var nextlink=$(this).find("a").attr("data-link").split("wapbook/");
            location.href="/chapter/"+nextlink;
        })

    }
    $(".before").on('click',function (i) {
        page++;
        getchapter(page)
    })
    $(".after").on('click',function (i) {

        page--;
        getchapter(page)
    })
})
