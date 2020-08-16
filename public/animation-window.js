class AnimationWindow{
    targetContainerID;
    width;
    height;

    container;
    canvas;
    ctx;
    interval;
    imageSet;
    
    form;
    animationFamily;
    indexStart;
    indexEnd;
    fps;
    duration;
    
    constructor(config){
        this.targetContainerID = config.id;
        this.width = config.width;
        this.height = config.height;
        
        this.container = document.getElementById(this.targetContainerID);
        this.generateCanvasAndForm();
        this.imageSet = {};

        this.animationFamily = '';
        this.indexStart = 0;
        this.indexEnd = 0;
        this.fps = config.fps;
        this.duration = 0;
        

        this.addHoverEffect();
    }

    generateCanvasAndForm(){
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('width', this.width);
        this.canvas.setAttribute('height', this.height);
        this.canvas.setAttribute('class', 'generic-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);
        
        this.form = document.createElement('form');
        this.container.appendChild(this.form);
        this.form.setAttribute('class', 'animation-form');
        this.form.setAttribute('autocomplete', 'off');
        this.form.addEventListener('keyup', (e) => {
            if(e.keyCode == 13){
                let data = new FormData(this.form);
                this.animationFamily = data.get('image-name');
                this.indexStart = parseInt(data.get('index-start')) || 0;
                this.indexEnd = parseInt(data.get('index-end')) || 0;
                this.duration = (this.indexEnd - this.indexStart + 1) * 1000/ this.fps;
                this.prepareAnimation();
            }
        });

        

        let formItem1 = document.createElement('div');
        this.form.appendChild(formItem1);
        formItem1.setAttribute('class', 'form-item');
        let label1 = document.createElement('label');
        formItem1.appendChild(label1);
        label1.setAttribute('class', 'form-item-label');
        label1.innerHTML = 'ani-fam';
        let input1 = document.createElement('input');
        input1.setAttribute('name', 'image-name');
        input1.setAttribute('class', 'form-item-input');
        formItem1.appendChild(input1);

        let formItem2 = document.createElement('div');
        this.form.appendChild(formItem2);
        formItem2.setAttribute('class', 'form-item');
        let label2 = document.createElement('label');
        formItem2.appendChild(label2);
        label2.setAttribute('class', 'form-item-label');
        label2.innerHTML = 'start';
        let input2 = document.createElement('input');
        input2.setAttribute('name', 'index-start');
        input2.setAttribute('class', 'form-item-input');
        formItem2.appendChild(input2);

        let formItem3 = document.createElement('div');
        this.form.appendChild(formItem3);
        formItem3.setAttribute('class', 'form-item');
        let label3 = document.createElement('label');
        formItem3.appendChild(label3);
        label3.setAttribute('class', 'form-item-label');
        label3.innerHTML = 'end';
        let input3 = document.createElement('input');
        input3.setAttribute('name', 'index-end');
        input3.setAttribute('class', 'form-item-input');
        formItem3.appendChild(input3);
    }

    addHoverEffect(){
        this.container.addEventListener('mouseover', () => {
            this.form.classList.add('shown');
        });
        this.container.addEventListener('mouseout', (event) => { 
            var e = event.toElement || event.relatedTarget;
            if (e && (e.parentNode == this || e == this)) {
                return;
            }
            this.form.classList.remove('shown');
        });
    }

    prepareAnimation(){
        if(this.interval){
            clearInterval(this.interval);
        }
        let numImages = this.indexEnd - this.indexStart + 1;
        this.imageSet = {};
        for(let i = this.indexStart; i <= this.indexEnd; i++){
            let imageName = this.animationFamily + this.pad(i, 3);
            this.imageSet[imageName] = new Image();
            this.imageSet[imageName].src = 'frames/' + imageName + '.PNG';
        }
        let imgIndex = this.indexStart;
        this.interval = setInterval(() => {
            let image = this.imageSet[this.animationFamily + this.pad(imgIndex, 3)];
            this.ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, this.canvas.width, this.canvas.height);
            if (imgIndex == this.indexEnd){
                imgIndex = this.indexStart;
            }
            else{
                imgIndex++;
            }
        }, this.duration / numImages);
    }

    pad(num, size) {
        var s = "00" + num;
        return s.substr(s.length-size);
    }

}