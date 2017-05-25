/**
 * Created by Administrator on 2017/5/16.
 */
var loadUtil=function (opt) {
    this.defaults={
        page:1, //请求开始页面
        pageLimit:10, //单次请求数据条数
        url:'', //请求主路径
        template:'', //模板id
        type:'get', //请求类型
        parents:'body' //父元素
    };
    this.options=$.extend({},this.defaults,opt);
    this.lock=false;
    this.tag=false;
    this._init();    
}

loadUtil.prototype={
    _init:function () {
        var self=this;
        var html='';
        this.createLoading();
        this._ajax(function (data) {
            html=template(self.options.template,data);
            self.bindDom(html);
        })
        this.bindEvents();
    },
    _ajax:function (cb) {
        var self=this;
        this.lock=true;
        this.tag=true;
        this.showLoading();
        $.ajax({
            url:self.options.url+'/'+self.options.page+'.json?page='+self.options.page+'&limit='+self.options.pageLimit,
            type:self.options.type,
            dataType:'json',
            success:function (data) {
            	cb(data);
            	if(data.list.length<self.options.pageLimit){
            		$('.load-loading').text('没有更多');
            	}else{
            		self.hideLoading();                
	                self.lock=false;
	                self.tag=false;
            	}
                
            },
            error:function(){
            	$('.load-loading').text('没有更多');
            }
        })
    },
    bindDom:function (str) {
        $(this.options.parents).append(str);
    },
    bindEvents:function () {
        var self=this;
        $(window).scroll(function () {
            if(self.lock){
                return;
            }else {
                self.tag=self.checkToBottom();
                if(self.tag){
                    self.options.page++;
                    self._ajax(function (data) {
                        self.bindDom(template(self.options.template,data));
                    })
                }
            }
        })
    },
    checkToBottom:function () {
        if($(window).height()+$(document).scrollTop()>$(document).height()-10){
            return true;
        }else {
            return false;
        }
    },
    createLoading:function () {
        $(this.options.parents).css({'position':'relative','padding-bottom':'40px'});
        var loading=$('<div class="load-loading">加载中...</div>');
        $(this.options.parents).append(loading);
        loading.css({
            position:'absolute',
            bottom:0,
            left:0,
            height:'40px',
            'line-height':'40px',
            'text-align':'center',
            display:'none',
            width:'100%'
        })
    },
    showLoading:function () {
        $('.load-loading').show();
    },
    hideLoading:function () {
        $('.load-loading').hide();
    }
}