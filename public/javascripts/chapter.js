$(function(){
    $(".catalog").on('click',function () {
        var x=$(this).attr('data-catalog');
        location.href="../../book/"+x;
    })
    $(".before").on('click',function () {
        var x=$(this).attr('data-link');
        if(x.match("_")){
            location.href="/chapter/"+x;
        }else{
            location.href="/book/"+x;
        }

    })
    $(".after").on('click',function () {
        var x=$(this).attr('data-after');
        if(x.match("_")){
            location.href="/chapter/"+x;
        }else{
            location.href="/book/"+x;
        }
    })
})
