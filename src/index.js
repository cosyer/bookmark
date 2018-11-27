'use strict';

require('./index.less');
const $ = require('./libs/jquery.js');

var bookmarksType = [];
document.addEventListener('DOMContentLoaded',function(){
    loadStorage();
    initEvent();
})

//读取数据
function loadStorage(){
    chrome.bookmarks.getTree(function(data){
        const result = formatTree(data[0]);
        console.log(typeof(result),result,'ooooo');
        renderData(result);
    })

}

//初始化数据
function initEvent(){

}

//将书签树数据进行遍历
function formatTree(parent,parentTitle){
    const that = this;
    if(parent && parent.children){
        if(parent.children.length){
            parent.children.forEach(function(item){
                var sonTitle = parentTitle
                if(item.children && item.children.length){
                    sonTitle = parentTitle ? parentTitle + '-' + item.title : item.title;
                }
                formatTree(item,sonTitle);
            })
        }else{
            formatTree(null)
        }
    }else if(bookmarksType[parentTitle]){
        bookmarksType[parentTitle].push(parent);
    }else{
        bookmarksType[parentTitle] = parent ? [parent] : that;
    }
    return bookmarksType;
}

//渲染书签数据
function renderData(result){
    for(var key in result){
        if(result[key] && result[key].length){
            var html = '<div class="content" id="tags">'+
                     '<div class="title">'+ key + '</div>'+
                     '<ul class="child-bookmark">';
            result[key].forEach(function(item){
                html += '<li><img class="icon" src="chrome://favicon/'+item.url+'"><a target="_blank" href="' + item.url + '">'+ item.title + '</a></li>';
            })
            html += '</ul></div>';
            $('.wrap').append(html);
        }
        
    }
}


