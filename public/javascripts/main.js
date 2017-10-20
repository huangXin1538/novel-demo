$(function () {
    $(".searchBTN").on('click',function () {
        var s=$('.mui-input-clear').val();
        $.ajax({
            url:'search',
            type:'post',
            data:{
                name:s
            },
            success:function (result) {
                renderresult(result)
            }
        })
    })
    function  renderresult(result) {
        var s='';
        $(".mui-table-view").empty();
        $(".num").html(result.list.length);
        $('.tip').show();
        $.each(result.list,function (i) {
            s='<li class="mui-table-view-cell" link="'+this.link+'"><div class="mui-navigate-right"><div class="title">'+this.title+'</div><div style="margin-top: 10px;"><span>简介：</span><span class="desc">'+this.desc+'</span></div></div></li>';
            $('.mui-table-view').append(s);
        })
        $('li').on('click',function () {
            var link=$(this).attr('link').split("_")[1];
            location.href="book/"+link;
        })
    };

    //点击

})