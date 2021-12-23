const loader = new PIXI.Loader();
const sprites = {};
let app;

const audio = new Audio('musicBg.mp3');
const audioToasty = new Audio('toasty.mp3');

document.addEventListener('DOMContentLoaded', function(){

    const placeDiv = document.querySelector('#adsplace');
    showPreloader(placeDiv);

    loader.add('background', 'img/background.jpg')
        .add('man', 'img/man.png')
        .add('man1', 'img/man1.png')
        .add('man2', 'img/man2.png')
        .add('man3', 'img/man3.png')
        .add('man4', 'img/man4.png')
        .add('man5', 'img/man5.png')
        .add('btn', 'img/btn.png')
        .add('logo', 'img/logo.png')

        .add('stair', 'img/stair.png')
        .add('table','img/table.png')
        .add('subStair_v1', 'img/subStair_v1.png')
        .add('subStair_v2', 'img/subStair_v2.png')
        .add('subStair_v3', 'img/subStair_v3.png')
        .add('stair_v1_1', 'img/stair_v1_1.png')
        .add('stair_v1_2', 'img/stair_v1_2.png')
        .add('stair_v1_3', 'img/stair_v1_3.png')
        .add('stair_v2_1', 'img/stair_v2_1.png')
        .add('stair_v2_2', 'img/stair_v2_2.png')
        .add('stair_v2_3', 'img/stair_v2_3.png')
        .add('stair_v3_1', 'img/stair_v3_1.png')
        .add('stair_v3_2', 'img/stair_v3_2.png')
        .add('stair_v3_3', 'img/stair_v3_3.png')
        .add('plant', 'img/plant.png')
        .add('soundControlOn', 'img/soundControlOn.png')
        .add('soundControlOff', 'img/soundControlOff.png')
        .add('enviroment', 'img/enviroment.png');

    loader.load((_loader, resources) => {

        sprites.background = new PIXI.Sprite(resources.background.texture);
        sprites.man = new PIXI.Sprite(resources.man.texture);
        sprites.man1 = new PIXI.Sprite(resources.man1.texture);
        sprites.man2 = new PIXI.Sprite(resources.man2.texture);
        sprites.man3 = new PIXI.Sprite(resources.man3.texture);
        sprites.man4 = new PIXI.Sprite(resources.man4.texture);
        sprites.man5 = new PIXI.Sprite(resources.man5.texture);

        sprites.logo = new PIXI.Sprite(resources.logo.texture);
        sprites.soundControlOn = new PIXI.Sprite(resources.soundControlOn.texture);
        sprites.soundControlOff = new PIXI.Sprite(resources.soundControlOff.texture);
        sprites.btn = new PIXI.Sprite(resources.btn.texture);

        sprites.stair = new PIXI.Sprite(resources.stair.texture);
        sprites.table = new PIXI.Sprite(resources.table.texture);

        sprites.subStair_v1 = new PIXI.Sprite(resources.subStair_v1.texture);
        sprites.subStair_v2 = new PIXI.Sprite(resources.subStair_v2.texture);
        sprites.subStair_v3 = new PIXI.Sprite(resources.subStair_v3.texture);
        sprites.stair_v1_1 = new PIXI.Sprite(resources.stair_v1_1.texture);
        sprites.stair_v1_2 = new PIXI.Sprite(resources.stair_v1_2.texture);
        sprites.stair_v1_3 = new PIXI.Sprite(resources.stair_v1_3.texture);
        sprites.stair_v2_1 = new PIXI.Sprite(resources.stair_v2_1.texture);
        sprites.stair_v2_2 = new PIXI.Sprite(resources.stair_v2_2.texture);
        sprites.stair_v2_3 = new PIXI.Sprite(resources.stair_v2_3.texture);
        sprites.stair_v3_1 = new PIXI.Sprite(resources.stair_v3_1.texture);
        sprites.stair_v3_2 = new PIXI.Sprite(resources.stair_v3_2.texture);
        sprites.stair_v3_3 = new PIXI.Sprite(resources.stair_v3_3.texture);

        sprites.repairStairs = new PIXI.Sprite(PIXI.Texture.from('img/repairStairs.png'));
        sprites.repairTable = new PIXI.Sprite(PIXI.Texture.from('img/repairTable.png'));

        sprites.subTable_v1 = new PIXI.Sprite(PIXI.Texture.from('img/subTable_v1.png'));
        sprites.subTable_v2 = new PIXI.Sprite(PIXI.Texture.from('img/subTable_v2.png'));
        sprites.subTable_v3 = new PIXI.Sprite(PIXI.Texture.from('img/subTable_v3.png'));
        
        sprites.table_v1 = new PIXI.Sprite(PIXI.Texture.from('img/table_v1.png'));
        sprites.table_v2 = new PIXI.Sprite(PIXI.Texture.from('img/table_v2.png'));
        sprites.table_v3 = new PIXI.Sprite(PIXI.Texture.from('img/table_v3.png'));
        
        sprites.plant = new PIXI.Sprite(resources.plant.texture);
        sprites.enviroment = new PIXI.Sprite(resources.enviroment.texture);
        sprites.endScreen = new PIXI.Sprite(PIXI.Texture.from('img/end.png'));
        sprites.toasty = new PIXI.Sprite(PIXI.Texture.from('img/cat.png'));
    }); 
});

loader.onComplete.add(() => { 
    const placeDiv = document.querySelector('#adsplace');    
    startApp(placeDiv);
});


/* Class create interactive objects  with submenu and repair function   */
/* new InteractObj(Container with old Sprite, Sprites Icon to open menu changeable, Array new elements preview, Array sprites/array (if contain any detail) new elements); */
/* Methods: showSubMenu / hideSubMenu
            activate - change property active to true, and make Object interactive (show Icon repear)
            showAcceptChoice(element) // element - PIXI.Container with attribution number (order number in array)
            showOKbtn(element) // show Accept button near element
            tryNewObjectMulti(oldCntnr, newSprites) - Show animation of new Element instead old, new Sorites may be array
*/

class InteractObj {

    constructor(sprite = new PIXI.Container(), repairIco = new PIXI.Sprite, previewElements = [], newElements = [] ) {

        this.sprite = sprite;
        this.repairIco = repairIco;
        this.previewElements = previewElements;
        this.newElements = newElements;
        this.activeTimers = [];
        this.active = false; //Element closed for interactive while waiting in sequence
      
        this.repairIco.x = this.sprite.x + this.sprite.width / 2;
        this.repairIco.y = this.sprite.y + this.sprite.height / 3;
        this.repairIco.interactive = true;
        this.repairIco.buttonMode = true;
        this.repairIco.parentObj = this;
      
        this.btnOk = new PIXI.Sprite(PIXI.Texture.from('img/okBtn.png'));
        this.btnOk.interactive = true;
        this.btnOk.buttonMode = true;
        this.btnOk.parentObj = this;
        this.btnOk.on('mousedown', function(e){e.target.parentObj.hideSubMenu(); e.target.visible = false; endDemo()});
        this.btnOk.on('touchstart', function(e){e.target.parentObj.hideSubMenu(); e.target.visible = false; endDemo()}); 
      
      
        this.textureSubMenu = PIXI.Texture.from('img/subMenuBg.png');
        this.textureSubMenuActive = PIXI.Texture.from('img/subMenuBgActive.png');
        this.subMenu = new PIXI.Container();
        this.subMenuElements = [];
        
        
        for (let i=0; i < previewElements.length; i++) {
            this.previewElements[i].pivot.set(0,0);
            this.previewElements[i].anchor.set(0,0);
            this.subMenuElements.push(new PIXI.Container());
        }

        this.subMenuElements.forEach((container, i) => {
            container.parentObj = this;
            container.number = i;
            container.interactive = true;
            container.buttonMode = true;

            container.bg = new PIXI.Sprite(this.textureSubMenu);
            container.addChild(container.bg); // background of button menu
            container.addChild(this.previewElements[i]);   // preview of element for renew
            container.x = this.repairIco.x + Math.pow(i+1, 1.6) * 60 - 250;
            container.y = this.repairIco.y  - 120 * Math.pow(i, 0.2) + 100;
            container.pivot.x = container.width / 2;
            container.pivot.y = container.height / 2;
            container.on('mousedown', function(e){e.target.parentObj.showAcceptChoice(container)});
            container.on('touchstart', function(e){e.target.parentObj.showAcceptChoice(container)}); 

            this.subMenu.addChild(container);
        })
    }


    activate(menuCntnr) {

        this.active = true;
        menuCntnr.addChild(this.repairIco);
        showAnimation(this.repairIco,30,'bump');
        this.repairIco.on('mousedown', function(e){e.target.parentObj.showSubMenu()});
        this.repairIco.on('touchstart', function(e){e.target.parentObj.showSubMenu()});
        this.btnOk.visible = false;
        this.subMenu.visible = false;
        menuCntnr.addChild(this.subMenu);
        menuCntnr.addChild(this.btnOk);
    }


    showSubMenu() {

        this.repairIco.visible = false;
        this.subMenu.visible = true;
        this.subMenu.children.forEach(element => {
            showAnimation(element,33,'zoom');
        });
    }


    hideSubMenu() {
        this.subMenu.visible = false;
    }


    showAcceptChoice(element) {  
        this.subMenuElements.forEach(container => {
            container.bg.texture = this.textureSubMenu;
        })
        element.bg.texture = this.textureSubMenuActive;
        
        this.showOKbtn(element);
        let arrayParts = []; // form array element's parts 
        
        this.newElements.forEach ( arr => {
            arrayParts.push(arr[element.number]);
        });
        this.tryNewObjectMulti(this.sprite, arrayParts);
     }


    showOKbtn(element) {
        this.btnOk.anchor.set(0.5,0.5);
        this.btnOk.x = element.x;
        this.btnOk.y = element.y  + element.height / 5 * 3; 
        this.btnOk.visible = true;
    }

    
    tryNewObjectMulti(oldCntnr, newSprites) {

        while (this.activeTimers.length > 0) {
            clearTimeout(this.activeTimers.pop());
        }

        oldCntnr.removeChildren(0, oldCntnr.children.length);
        
        for (let i = 0; i < newSprites.length; i++) {
            this.activeTimers.push( 
                setTimeout(function() {
                    oldCntnr.addChild(newSprites[i]);
                    showAnimation(newSprites[i],30,"down");
                }, 300 * i) );
        }
    }
}
// end Class InteractObj 

/* action for button Start */
function onDownload () {
    window.location.replace("https://stacksite.ru");
}


/* TODO think about optimization */
function showAnimation (obj = PIXI.Container(),speed = 30,type = 'ease') {

    obj.alpha = 0.3;
    if ((type === "bump")||(type === "down")) {
        var startY = obj.y;
        obj.y -= 40; // down up 40px    
        var deltaY = 6;
        var bumpN = 1; 
        var delta = deltaY;
    }
    if (type === "zoom") {
        var scale = 0.3;
        obj.transform.scale.set(scale,scale);
    }
    const loopID = setInterval(function () {

        if (obj.alpha < 1) {
            obj.alpha += 0.1;
        }

        if (type === "zoom") {
            scale+=0.1;
            obj.transform.scale.set(scale,scale);
        }
        if ((obj.alpha >= 1)&& (type === "ease") ) {
            clearInterval(loopID);
            obj.alpha = 1;
        }
        if ((obj.transform.scale.x >= 1)&& (type === "zoom") ) {
            clearInterval(loopID);
            obj.alpha = 1; 
            obj.transform.scale.set(1,1);
        }

        if (type === "bump") {
            obj.y += delta;
            if (obj.y > startY) {
                delta = -deltaY; 
                bumpN++; 
                obj.y = startY += delta;

                if (bumpN > 2) {
                    clearInterval(loopID);
                } 
            }
            if (delta < 0) {
                    if (obj.y < (startY - 40 / bumpN) ) {
                    delta = deltaY;
                }
            }
        }

        if (type === "down") {
            obj.y += delta;
            if (obj.y >= startY ) {
                clearInterval(loopID);
            }
        }
    }, speed);
}

function endDemo() {

    if (app.activeElements.table.active) {
        app.stage.addChild(sprites.endScreen);
        app.stage.addChild(sprites.btn);
    }else{
        app.activeElements.menuCntnr.visible = true;
        app.activeElements.table.activate(app.activeElements.menuCntnr); 
    }
}


function showPreloader(placeDiv) {

    const preloadImage = document.createElement("img");
    preloadImage.src = "img/preloader.gif";
    preloadImage.style.width = "300px";
    preloadImage.style.display = "block";
    preloadImage.style.margin = "auto";
    preloadImage.style.opacity = "1";
    preloadImage.style.transition ="all 0.5s ease";
    preloadImage.style.borderRadius ="25px";
    placeDiv.appendChild(preloadImage);
}


function hidePreloader(placeDiv) {

    const preloadImage = placeDiv.getElementsByTagName("img")[0];
    preloadImage.style.opacity = "0";
   
    return new Promise(resolve => {
        setTimeout(() => {
            placeDiv.innerHTML = "";
            resolve();
        }, 300);
      });
}


function toasty() {
    app.activeElements.toasty.visible = true;
    audioToasty.play();
    setTimeout(function(){
        app.activeElements.toasty.visible = false;
    },500);
}



/* MAIN BLOCK */
async function startApp(placeDiv) {

    await hidePreloader(placeDiv);
    
    app = new PIXI.Application({
        width: 1390, height: 640, backgroundColor: 0xcccccc, resolution: window.devicePixelRatio || 1,
    });

    app.activeElements = {}; // Create global view elements

    app.view.style.opacity = "0";
    app.view.style.transition = "all 1s ease";
    placeDiv.appendChild(app.view);
    setTimeout(function(){
        app.view.style.opacity = "1";
    }, 1);
    
    /* app layers*/
    const moveLayer = new PIXI.Container();
    const bg = new PIXI.Container();
    const logoCntnr = new PIXI.Container();
    const menuCntnr = new PIXI.Container();
    
    app.activeElements.menuCntnr = menuCntnr; //shortlink
    
    /*egg*/ 
    const toastyImg = sprites.toasty;
    toastyImg.x = app.screen.width - toastyImg.width;
    toastyImg.y = app.screen.height - toastyImg.height;
    toastyImg.anchor.set(0, 0);
    toastyImg.visible = false;
    menuCntnr.addChild(toastyImg);
    app.activeElements.toasty = toastyImg;

    // manage sprites 
    const man = sprites.man;
    const manAnimation = [sprites.man1,sprites.man2,sprites.man3,sprites.man4,sprites.man5];

    const stair = new PIXI.Container();
    stair.addChild(sprites.stair);

    const table = new PIXI.Container();
    table.addChild(sprites.table);

    const stairsMenu = [sprites.subStair_v1, sprites.subStair_v2, sprites.subStair_v3]; 
    const mainStairs = [sprites.stair_v1_1, sprites.stair_v2_1, sprites.stair_v3_1];
    const handStairs = [sprites.stair_v1_2, sprites.stair_v2_2, sprites.stair_v3_2];
    const carpetStairs = [sprites.stair_v1_3, sprites.stair_v2_3, sprites.stair_v3_3];
    
    const talbesMenu = [sprites.subTable_v1, sprites.subTable_v2, sprites.subTable_v3]; 
    const mainTables = [sprites.table_v1, sprites.table_v2, sprites.table_v3];

    /* Positions */
    sprites.logo.x = sprites.logo.width / 2 + 12;
    sprites.logo.y = sprites.logo.height / 2 + 12;

    sprites.man.x = 65 * app.screen.width / 100;
    sprites.man.y = 10 * app.screen.width / 100;
    sprites.man.anchor.x = 0.5;
    sprites.man.scale.x *= -1;

    sprites.btn.anchor.set(0.5, 0.5);
    sprites.logo.anchor.set(0.5, 0.5);
    sprites.btn.x = app.screen.width / 2;
    sprites.btn.y = app.screen.height  - sprites.btn.height / 2 - 32;
    sprites.btn.interactive = true;
    sprites.btn.buttonMode = true;
    sprites.btn.on('mousedown', onDownload);
    sprites.btn.on('touchstart', onDownload);

    stair.x = app.screen.width - stair.width;
    stair.y = app.screen.height - stair.height;
    stair.pivot.set(0, 0);
    
    table.x = app.screen.width / 2 - table.width;
    table.y = app.screen.height / 2 - table.height;
    table.pivot.set(-100, -100);
    
    const stairObj = new InteractObj(stair, sprites.repairStairs, stairsMenu, [mainStairs, handStairs, carpetStairs]);
    const tableObj = new InteractObj(table, sprites.repairTable, talbesMenu, [mainTables]); 

    app.activeElements.stair = stairObj;
    app.activeElements.table = tableObj;

    sprites.plant.x = app.screen.width - sprites.plant.width;
    sprites.plant.y = app.screen.height - sprites.plant.height;
    sprites.plant.interactive = true;
   
    sprites.plant.on("mousedown", toasty);
    sprites.plant.on("touchstart", toasty);
    
    /* //Positions */

    sprites.enviroment.zOrder = 1;
    sprites.stair.zOrder = 20;
    sprites.table.zOrder = 20;
    sprites.man.zOrder = 10;
    
    bg.addChild(sprites.background);

    logoCntnr.addChild(sprites.logo);
    showAnimation(sprites.logo,52,'zoom');
    
    const soundControl = new PIXI.Container();
    
    sprites.soundControlOff.width = 80;
    sprites.soundControlOff.height = 80;
    sprites.soundControlOn.width = 80;
    sprites.soundControlOn.height = 80;

    soundControl.pivot.set(0, 0);
    soundControl.x = 12;
    soundControl.y = app.screen.height - 92;
    soundControl.interactive = true;
    soundControl.buttonMode = true;
    
    soundControl.on('mousedown', function(e){ if (audio.paused) {soundControl.soundOn(); audio.play()} else {soundControl.soundOff(); audio.pause()} });
    soundControl.on('touchstart', function(e){  if (audio.paused) {soundControl.soundOn(); audio.play()} else {soundControl.soundOff(); audio.pause()} }); 

    soundControl.addChild(sprites.soundControlOn);
    soundControl.addChild(sprites.soundControlOff);
    
    soundControl.soundOn = function() {
        sprites.soundControlOn.visible = true;
        sprites.soundControlOff.visible = false;
    }

    soundControl.soundOff = function() {
        sprites.soundControlOn.visible = false;
        sprites.soundControlOff.visible = true;
    }
    
    soundControl.soundOff();

    logoCntnr.addChild(soundControl);

    moveLayer.addChild(sprites.enviroment);
    moveLayer.addChild(stair);
    moveLayer.addChild(table);
    moveLayer.addChild(sprites.man);
    moveLayer.addChild(sprites.plant);
    
    menuCntnr.addChild(sprites.btn);  
    
    app.stage.addChild(bg);
    app.stage.addChild(moveLayer);
    app.stage.addChild(logoCntnr);
    app.stage.addChild(menuCntnr);
    
    const deltaPulse = 0.001; // speed Btn Continue pulse
    let delta = deltaPulse;

/* Time and Animations */

    setTimeout(function() {
        stairObj.activate(menuCntnr); // show repairIco for changable element 
    }, 2500)

    // Listen for animate update Main Btn
    let speedFrame = 10;
    let timer = 0;
    let manSpriteNumber = 0;

    app.ticker.add(function (time) {
        if (sprites.btn.scale.x > 1.02) {
            delta = -deltaPulse;
        } 
        if (sprites.btn.scale.x < 0.98) {
            delta = deltaPulse;
        }
        
        sprites.btn.scale.x += delta;
        sprites.btn.scale.y += delta;
        timer += time;
        if (timer > speedFrame) {
            manSpriteNumber++;
            timer = 0;
        }
        // pause animate after half turn man
        if (manSpriteNumber === 0 || manSpriteNumber === 4) {
            speedFrame = 200 + 50*Math.random(1);
        }
        if (manSpriteNumber === 1 || manSpriteNumber === 5) {
            speedFrame = 10;
        }
        
        if (manSpriteNumber > 8) {
            manSpriteNumber = 0;
        }
        man.texture = manAnimation[Math.abs(manSpriteNumber - 4)].texture;
    });

}