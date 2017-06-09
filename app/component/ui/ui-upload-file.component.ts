import {Component, OnInit, OnChanges} from '@angular/core';
import {Output,Input, EventEmitter} from '@angular/core';


@Component({
    selector: 'ui-upload-file',
    inputs:['activeColor','baseColor','overlayColor', 'type'],
    template: `
        <label class="ui-upload-file" ondragover="return false;"
            [class.loaded]="loaded"
            [style.outlineColor]="dragging ? activeColor : baseColor"
            (dragenter)="handleDragEnter()"
            (dragleave)="handleDragLeave()"
            (drop)="handleDrop($event)"
            (click)="clk($event)"
        >

            <span *ngIf="fileSrc.length == 0 && type=='image'">Перенесите фотографии (или кликните для выбора фото)</span>
            <span *ngIf="fileSrc.length == 0 && type=='document'"
                [style.font-size]="'9pt'">Перенесите документ (или кликните для выбора файла)</span>
            <div class="image_contain" *ngIf="type=='image'">
                <div class='image' *ngFor="let image of fileSrc" (click)="remove(image.index)">
                    <img  [src]="image.src" (load)="handleImageLoad()" [class.loaded]="imageLoaded"/>
                    <div style="height: 4px; background-color: #54b947; border-radius: 10px; position: absolute; bottom: 0; left: 0;"
                        [style.width]="image.load_pers"
                    ></div>
                </div>
            </div>
            <div class="doc_contain" *ngIf="type=='document'">
                <div class='document' *ngFor="let image of fileSrc">
                    <span style="position: relative;display: block;width: 100%;text-align: center;margin: 5px;"
                        >Идет загрузка файла...
                    </span>
                    <progress
                         [value]="image.load_pers" max="300"
                    ></progress>
                </div>
            </div>
            <div class="load_buttom" (click)="image_load()" *ngIf="fileSrc.length > 0 && type=='image'">Загрузить</div>
            <input type="file" name="file" [accept]="format" [multiple]="multiple"
                (change)="handleInputChange($event)">
        </label>
    `,
    styles: [`
        .ui-upload-file input {
            display: none;
        }

        .ui-upload-file {
            align-items: center;
            background-color: #efefef;
            background-color: rgba(0, 0, 0, 0.02);
            cursor: pointer;
            display: flex;
            flex-direction: column;
            height: 100%;
            justify-content: center;
            outline: 3px dashed #ccc;
            outline-offset: -6px;
            position: relative;
            width: 100%;
        }

        .ui-upload-file img {
            pointer-events: none;
        }

        .ui-upload-file{
            transition: all 100ms ease-in;
        }

        .ui-upload-file span {
            color: rgb(144, 144, 144);
            font-size: 14pt;
            position: absolute;
        }

        .ui-upload-file img {
            opacity: 0;
            max-height: 100%;
            max-width: 100%;
            transition: all 300ms ease-in;
            z-index: -1;
        }

        .ui-upload-file img.loaded {
            opacity: 1;
        }

        .image_contain{
            width: calc(100% - 10px);
            height: calc(100% - 75px);
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: center;
        }

        .image_contain>.image{
            width: 175px;
            height: 130px;
            /* border: 2px solid silver; */
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }
        .image_contain>.image:hover{
            transition: all 250ms linear;
            background-color: rgba(107, 107, 107, 0.79);
        }
        .image_contain>.image:hover:before{
            content: "Удалить";
            color: white;
            position: absolute;
            font-size: 12pt;
        }

        .doc_contain{
            width: calc(100% - 10px);
            height: calc(100% - 10px);
        }

        .doc_contain>.document{
            width: 100%;
            height: 100%;
        }

        .doc_contain>.document>progress:not([value]){

            background-image: url(res/progress_bar.png);
            background-color: #ff9900;
        }

        .doc_contain>.document>progress {
	        width: 355px;
	        height: 20px;
            max-width: 100%;
        	display: block;
        	-webkit-appearance: none;
        	border: none;
            margin-left: 2px;
        }

        .doc_contain>.document>progress::-webkit-progress-bar {
            background: transparent;
        }

        .doc_contain>.document>progress::-webkit-progress-value {
            background-image:
                -webkit-linear-gradient(-45deg, transparent 33%, rgba(0, 0, 0, .1) 33%, rgba(0,0, 0, .1) 66%, transparent 66%),
                -webkit-linear-gradient(top, rgba(255, 255, 255, .25), rgba(0, 0, 0, .25)),
                -webkit-linear-gradient(left, #338c4e, #0dce00);
            background-size: 35px 20px, 100% 100%, 100% 100%;
            background-repeat: repeat-x;
            -webkit-animation: animate-stripes 5s linear infinite;
            animation: animate-stripes 5s linear infinite;
        }

        @-webkit-keyframes animate-stripes {
            from { background-position: 0px 0px; }
            to { background-position: -100px 0px; }
        }

        @keyframes animate-stripes {
            from { background-position: 0px 0px; }
            to { background-position: -100px 0px; }
        }

        .load_buttom{
            width: 118px;
            height: 30px;
            background-color: #008cdb;
            color: white;
            line-height: 30px;
            text-align: center;
        }
    `]
})


export class UIUploadFile implements OnInit{
    activeColor: string = 'green';
    baseColor: string = '#ccc';
    overlayColor: string = 'rgba(255,255,255,0.5)';
    type: string = 'image';
    dragging: boolean = false;
    loaded: boolean = false;
    imageLoaded: boolean = false;
    fileSrc: Array<any> = [];
    format:string;
    pattern: RegExp;
    multiple: boolean;

    @Output() fileChange: EventEmitter<any> = new EventEmitter();

    ngOnInit(){
        if(this.type == 'image'){
            this.format='image/*';
            this.pattern=/image-*/;
            this.multiple=true;
        }else if(this.type == 'document'){
            this.format='application/pdf, .doc, .docx';
            this.pattern=/(application\/pdf)|(application\/vnd\.openxmlformats-officedocument)/;
            this.multiple=false;
        }
    }

    handleDragEnter() {
        this.dragging = true;
    }

    handleDragLeave() {
        this.dragging = false;
    }

    handleDrop(e) {
        e.preventDefault();
        this.dragging = false;
        this.handleInputChange(e);
    }

    handleImageLoad() {
        this.imageLoaded = true;
        //this.iconColor = this.overlayColor;
    }

    handleInputChange(e) {
        let files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        let fileSrc = this.fileSrc;
        let pattern = this.pattern;
        let reader = new FileReader();
        let type = this.type;


        reader.onloadstart = ((event) => {
            this.loaded = false;
            if(this.type == 'document')
                this.image_load();
        });
        reader.onprogress = ((event) => {

        });

        reader.onloadend = ((event) => {
            this.loaded = false;
        });
        function readFile(index) {
           if( index >= files.length ) return;
           var file = files[index];
           if (!file.type.match(pattern))  return;
           reader.onload = ((e) =>{
               fileSrc.push({src: reader.result, load_pers: 0, index: index, fileName: file.name});
               readFile(index+1);
           });
           if(type == 'image')
              reader.readAsDataURL(file);
           else if(type == 'document')
              reader.readAsText(file);
       }

       readFile(0);

    }

    _setActive() {
        //this.borderColor = this.activeColor;
        if (this.fileSrc.length === 0) {
            //this.iconColor = this.activeColor;
        }
    }

    _setInactive() {
        //this.borderColor = this.baseColor;
        if (this.fileSrc.length === 0) {
            //this.iconColor = this.baseColor;
        }
    }

    image_load(){
        let i=0;
        let id = setInterval(()=>{
            if(i>= this.fileSrc.length){
                clearInterval(id);
                return;
            }
            if(this.fileSrc[i].load_pers < 360 )
                this.fileSrc[i].load_pers +=1;
            else{
                if(this.type == 'document')
                    this.fileChange.emit(this.fileSrc.shift().fileName);
            }

        }, 10);
    }

    remove(index){
        this.fileSrc.splice(index,1);
    }

    clk(e){
        console.log((<HTMLElement>e.target).className);
        if( (<HTMLElement>e.target).className == "load_buttom" ||  (<HTMLElement>e.target).className == "image")
            e.preventDefault();
    }
}
