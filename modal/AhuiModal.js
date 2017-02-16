
function Modal(options){
    this.defaults={
        width:490,
        height:220,
        text:'',
        type:'alert',
        comfirmName:'确定',
        cancelName:'取消',
        allowClose:false,
        callback:function(){
            return;
        }

    };
    this.tempObj={};
    this.options=$.extend({},this.defaults,options);
}

Modal.prototype={
    init:function(){
        this.createModal();
        this.bindEvents();
        this.fadeInModal();
    },
    createModal:function () {
        this.bindWrapDom();
        this.tempObj=$('.ahui-modal');
        this.bindContentDom();
        this.addStyle();
    },
    bindWrapDom:function () {
        var str='';
        str+='<div class="ahui-modal-bg">';
        str+='<div class="ahui-modal">';
        str+='</div>';
        str+='</div>';
        $('body').append(str);
    },
    bindContentDom:function () {
        var str='';
        str+='<div class="modal-deco"><div class="modal-flower"></div><div class="modal-logo">提示</div></div>';
        str+='<div class="modal-text"><div class="inner">'+this.options.text+'</div></div>';
        if(this.options.type === 'alert'){
            str+='<div class="modal-btn"><span class="btn-comfirm">'+this.options.comfirmName+'</span></div>';
        }else if(this.options.type === 'comfirm'){
            str+='<div class="modal-btn"><span class="btn-comfirm">'+this.options.comfirmName+'</span><span class="btn-cancel">'+this.options.cancelName+'</span></div>';
        }
        this.tempObj.append(str);
    },
    addStyle:function () {
        this.tempObj.width(this.options.width);
        this.tempObj.height(this.options.height);
        this.tempObj.css({'margin-top':'-'+(this.options.height/2)+'px','margin-left':'-'+(this.options.width/2)+'px'});
    },
    bindEvents:function () {
        var self=this;
        $('.ahui-modal .btn-cancel').on('click',function () {
            self.clearModal();
        });
        $('.ahui-modal .btn-comfirm').on('click',function () {
            self.clearModal();
            self.options.callback();
        });
        if(this.options.allowClose){
            $('.ahui-modal-bg').on('click',function (e) {
                var con=self.tempObj;
                if(! con.is(e.target) && con.has(e.target).length === 0){
                    self.clearModal();
                }
            });
        }

    },
    fadeInModal:function () {
        $('.ahui-modal-bg').fadeIn();
    },
    clearModal:function () {
        $('.ahui-modal-bg').remove();
    }

};

function AhuiModal(opt) {
    var modal=new Modal(opt);
    modal.init();
}


