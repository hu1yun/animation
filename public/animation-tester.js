var interval;
var imageSet = {};
var imgIndex;
var canvas;
var ctx;
var config;

function prepareCanvasForm() {
    let form = document.getElementById('config');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        reconfigureCanvas(getFormData('config'));
    });
}

    
    
function reconfigureCanvas(formData) {
    if(interval){
        clearInterval(interval);
    }
    let numImages = parseInt(formData['index-end'])-parseInt(formData['index-start'])+1;
    imageSet = {};
    for(let i = parseInt(formData['index-start']); i <= parseInt(formData['index-end']); i++) {
        let imageName = formData['image-name'] + pad(i, 3);
        imageSet[imageName] = new Image();
        imageSet[imageName].src = 'frames/' + imageName + '.PNG';
    }
    let end = parseInt(formData['index-end']);
    imgIndex = parseInt(formData['index-start']);
    interval = setInterval(() => {
        let image = imageSet[formData['image-name'] + pad(imgIndex, 3)];
        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
        if (imgIndex == end){
            imgIndex = parseInt(formData['index-start']);
        }
        else{
            imgIndex++;
        }
    }, parseInt(formData['duration'])/numImages);
}

function getFormData(formId) {
    return $(`#${formId}`).serializeArray().reduce(function (obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
}

function pad(num, size) {
    var s = "00" + num;
    return s.substr(s.length-size);
}

$(document).ready(() => {
    canvas = document.getElementById('main')
    ctx = canvas.getContext('2d');
    prepareCanvasForm();
    reconfigureCanvas({
        'duration': "1000",
        'image-name': "a",
        'index-end': "3",
        'index-start': "1"
    });



    // let canvas = document.getElementById('main');
    // let img = {
    //     img1: new Image(),
    //     img2: new Image(),
    //     img3: new Image()
    // }
    // img['img1'].src = 'frames/a001.PNG';
    // img['img2'].src = 'frames/a002.PNG';
    // img['img3'].src = 'frames/a003.PNG';
    // let ctx = canvas.getContext("2d");
    // let index = 1;
    // setInterval(() => {
    //     let image = img['img' + index];
    //     ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
    //     if (index == 3){
    //         index = 1;
    //     }
    //     else{
    //         index++;
    //     }
    // }, 333);


    config = {
        id: 'window',
        width: '200',
        height: '200',
        fps: 3
    }
    var window = new AnimationWindow(config);
});