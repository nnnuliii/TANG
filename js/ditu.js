document.addEventListener("DOMContentLoaded", function() {
    // 获取图片容器和图片列表
    var imgsContainer = document.getElementById("countries-imgs");
    var imgs = imgsContainer.querySelectorAll(".img");

    // 获取文字容器和文字列表
    var textContainer = document.getElementById("countries-text");
    var texts = textContainer.querySelectorAll(".countries-p");

    // 监听容器滚动事件
    imgsContainer.addEventListener("scroll", function() {
        // 获取容器滚动的像素值
        var scrollPosition = imgsContainer.scrollTop;

        // 计算当前应该显示的图片索引
        var containerHeight = imgsContainer.clientHeight;
        var imgHeight = imgs[0].clientHeight;
        var newIndex = Math.floor(scrollPosition / (containerHeight - imgHeight));

        // 显示新的图片
        imgs.forEach(function(img, index) {
            if (index === newIndex) {
                img.style.opacity = "1";
                img.style.position = "fixed";
                img.style.top = "0";
            } else {
                img.style.opacity = "0";
                img.style.position = "absolute";
                img.style.top = "unset";
            }
        });
    });
});
