"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var UIUploadFile = (function () {
    function UIUploadFile() {
        this.activeColor = 'green';
        this.baseColor = '#ccc';
        this.overlayColor = 'rgba(255,255,255,0.5)';
        this.type = 'image';
        this.dragging = false;
        this.loaded = false;
        this.imageLoaded = false;
        this.fileSrc = [];
        this.fileChange = new core_2.EventEmitter();
    }
    UIUploadFile.prototype.ngOnInit = function () {
        if (this.type == 'image') {
            this.format = 'image/*';
            this.pattern = /image-*/;
            this.multiple = true;
        }
        else if (this.type == 'document') {
            this.format = 'application/pdf, .doc, .docx';
            this.pattern = /(application\/pdf)|(application\/vnd\.openxmlformats-officedocument)/;
            this.multiple = false;
        }
    };
    UIUploadFile.prototype.handleDragEnter = function () {
        this.dragging = true;
    };
    UIUploadFile.prototype.handleDragLeave = function () {
        this.dragging = false;
    };
    UIUploadFile.prototype.handleDrop = function (e) {
        e.preventDefault();
        this.dragging = false;
        this.handleInputChange(e);
    };
    UIUploadFile.prototype.handleImageLoad = function () {
        this.imageLoaded = true;
        //this.iconColor = this.overlayColor;
    };
    UIUploadFile.prototype.handleInputChange = function (e) {
        var _this = this;
        var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        var fileSrc = this.fileSrc;
        var pattern = this.pattern;
        var reader = new FileReader();
        var type = this.type;
        reader.onloadstart = (function (event) {
            _this.loaded = false;
            if (_this.type == 'document')
                _this.image_load();
        });
        reader.onprogress = (function (event) {
        });
        reader.onloadend = (function (event) {
            _this.loaded = false;
        });
        function readFile(index) {
            if (index >= files.length)
                return;
            var file = files[index];
            if (!file.type.match(pattern))
                return;
            reader.onload = (function (e) {
                fileSrc.push({ src: reader.result, load_pers: 0, index: index, fileName: file.name });
                readFile(index + 1);
            });
            if (type == 'image')
                reader.readAsDataURL(file);
            else if (type == 'document')
                reader.readAsText(file);
        }
        readFile(0);
    };
    UIUploadFile.prototype._setActive = function () {
        //this.borderColor = this.activeColor;
        if (this.fileSrc.length === 0) {
        }
    };
    UIUploadFile.prototype._setInactive = function () {
        //this.borderColor = this.baseColor;
        if (this.fileSrc.length === 0) {
        }
    };
    UIUploadFile.prototype.image_load = function () {
        var _this = this;
        var i = 0;
        var id = setInterval(function () {
            if (i >= _this.fileSrc.length) {
                clearInterval(id);
                return;
            }
            if (_this.fileSrc[i].load_pers < 360)
                _this.fileSrc[i].load_pers += 1;
            else {
                if (_this.type == 'document')
                    _this.fileChange.emit(_this.fileSrc.shift().fileName);
            }
        }, 10);
    };
    UIUploadFile.prototype.remove = function (index) {
        this.fileSrc.splice(index, 1);
    };
    UIUploadFile.prototype.clk = function (e) {
        console.log(e.target.className);
        if (e.target.className == "load_buttom" || e.target.className == "image")
            e.preventDefault();
    };
    return UIUploadFile;
}());
__decorate([
    core_2.Output(),
    __metadata("design:type", core_2.EventEmitter)
], UIUploadFile.prototype, "fileChange", void 0);
UIUploadFile = __decorate([
    core_1.Component({
        selector: 'ui-upload-file',
        inputs: ['activeColor', 'baseColor', 'overlayColor', 'type'],
        template: "\n        <label class=\"ui-upload-file\" ondragover=\"return false;\"\n            [class.loaded]=\"loaded\"\n            [style.outlineColor]=\"dragging ? activeColor : baseColor\"\n            (dragenter)=\"handleDragEnter()\"\n            (dragleave)=\"handleDragLeave()\"\n            (drop)=\"handleDrop($event)\"\n            (click)=\"clk($event)\"\n        >\n\n            <span *ngIf=\"fileSrc.length == 0 && type=='image'\">\u041F\u0435\u0440\u0435\u043D\u0435\u0441\u0438\u0442\u0435 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438 (\u0438\u043B\u0438 \u043A\u043B\u0438\u043A\u043D\u0438\u0442\u0435 \u0434\u043B\u044F \u0432\u044B\u0431\u043E\u0440\u0430 \u0444\u043E\u0442\u043E)</span>\n            <span *ngIf=\"fileSrc.length == 0 && type=='document'\"\n                [style.font-size]=\"'9pt'\">\u041F\u0435\u0440\u0435\u043D\u0435\u0441\u0438\u0442\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 (\u0438\u043B\u0438 \u043A\u043B\u0438\u043A\u043D\u0438\u0442\u0435 \u0434\u043B\u044F \u0432\u044B\u0431\u043E\u0440\u0430 \u0444\u0430\u0439\u043B\u0430)</span>\n            <div class=\"image_contain\" *ngIf=\"type=='image'\">\n                <div class='image' *ngFor=\"let image of fileSrc\" (click)=\"remove(image.index)\">\n                    <img  [src]=\"image.src\" (load)=\"handleImageLoad()\" [class.loaded]=\"imageLoaded\"/>\n                    <div style=\"height: 4px; background-color: #54b947; border-radius: 10px; position: absolute; bottom: 0; left: 0;\"\n                        [style.width]=\"image.load_pers\"\n                    ></div>\n                </div>\n            </div>\n            <div class=\"doc_contain\" *ngIf=\"type=='document'\">\n                <div class='document' *ngFor=\"let image of fileSrc\">\n                    <span style=\"position: relative;display: block;width: 100%;text-align: center;margin: 5px;\"\n                        >\u0418\u0434\u0435\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0444\u0430\u0439\u043B\u0430...\n                    </span>\n                    <progress\n                         [value]=\"image.load_pers\" max=\"300\"\n                    ></progress>\n                </div>\n            </div>\n            <div class=\"load_buttom\" (click)=\"image_load()\" *ngIf=\"fileSrc.length > 0 && type=='image'\">\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C</div>\n            <input type=\"file\" name=\"file\" [accept]=\"format\" [multiple]=\"multiple\"\n                (change)=\"handleInputChange($event)\">\n        </label>\n    ",
        styles: ["\n        .ui-upload-file input {\n            display: none;\n        }\n\n        .ui-upload-file {\n            align-items: center;\n            background-color: #efefef;\n            background-color: rgba(0, 0, 0, 0.02);\n            cursor: pointer;\n            display: flex;\n            flex-direction: column;\n            height: 100%;\n            justify-content: center;\n            outline: 3px dashed #ccc;\n            outline-offset: -6px;\n            position: relative;\n            width: 100%;\n        }\n\n        .ui-upload-file img {\n            pointer-events: none;\n        }\n\n        .ui-upload-file{\n            transition: all 100ms ease-in;\n        }\n\n        .ui-upload-file span {\n            color: rgb(144, 144, 144);\n            font-size: 14pt;\n            position: absolute;\n        }\n\n        .ui-upload-file img {\n            opacity: 0;\n            max-height: 100%;\n            max-width: 100%;\n            transition: all 300ms ease-in;\n            z-index: -1;\n        }\n\n        .ui-upload-file img.loaded {\n            opacity: 1;\n        }\n\n        .image_contain{\n            width: calc(100% - 10px);\n            height: calc(100% - 75px);\n            display: flex;\n            flex-wrap: wrap;\n            justify-content: space-around;\n            align-items: center;\n        }\n\n        .image_contain>.image{\n            width: 175px;\n            height: 130px;\n            /* border: 2px solid silver; */\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            position: relative;\n        }\n        .image_contain>.image:hover{\n            transition: all 250ms linear;\n            background-color: rgba(107, 107, 107, 0.79);\n        }\n        .image_contain>.image:hover:before{\n            content: \"\u0423\u0434\u0430\u043B\u0438\u0442\u044C\";\n            color: white;\n            position: absolute;\n            font-size: 12pt;\n        }\n\n        .doc_contain{\n            width: calc(100% - 10px);\n            height: calc(100% - 10px);\n        }\n\n        .doc_contain>.document{\n            width: 100%;\n            height: 100%;\n        }\n\n        .doc_contain>.document>progress:not([value]){\n\n            background-image: url(res/progress_bar.png);\n            background-color: #ff9900;\n        }\n\n        .doc_contain>.document>progress {\n\t        width: 355px;\n\t        height: 20px;\n            max-width: 100%;\n        \tdisplay: block;\n        \t-webkit-appearance: none;\n        \tborder: none;\n            margin-left: 2px;\n        }\n\n        .doc_contain>.document>progress::-webkit-progress-bar {\n            background: transparent;\n        }\n\n        .doc_contain>.document>progress::-webkit-progress-value {\n            background-image:\n                -webkit-linear-gradient(-45deg, transparent 33%, rgba(0, 0, 0, .1) 33%, rgba(0,0, 0, .1) 66%, transparent 66%),\n                -webkit-linear-gradient(top, rgba(255, 255, 255, .25), rgba(0, 0, 0, .25)),\n                -webkit-linear-gradient(left, #338c4e, #0dce00);\n            background-size: 35px 20px, 100% 100%, 100% 100%;\n            background-repeat: repeat-x;\n            -webkit-animation: animate-stripes 5s linear infinite;\n            animation: animate-stripes 5s linear infinite;\n        }\n\n        @-webkit-keyframes animate-stripes {\n            from { background-position: 0px 0px; }\n            to { background-position: -100px 0px; }\n        }\n\n        @keyframes animate-stripes {\n            from { background-position: 0px 0px; }\n            to { background-position: -100px 0px; }\n        }\n\n        .load_buttom{\n            width: 118px;\n            height: 30px;\n            background-color: #008cdb;\n            color: white;\n            line-height: 30px;\n            text-align: center;\n        }\n    "]
    })
], UIUploadFile);
exports.UIUploadFile = UIUploadFile;
//# sourceMappingURL=ui-upload-file.component.js.map