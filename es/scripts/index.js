/*
 THIS CODE IS MADE BY m7mdy9   AND IS NOT AUTHORIZED TO BE USED WITHOUT HIS PERMISSION. 
 FOR MORE INFO VIEW LICENSE FILE - 2025 © m7mdy9
*/
// import { en } from "./lang.json" assert { type: 'json' };
// const text_list = [
//     en.list1,en.list2,
//     en.list3,en.list4,
// ]
// const attributes = [
//     en.nv, en.d_learn, en.m_learn, en.tensor, en.cv, en.ntp,
// ]
const text_list = [
    "Esta es la RTX 3080 MSI.",
    "Estos son los ventiladores de enfriamiento, responsables de enfriar la GPU expulsando el aire caliente, ya que la GPU genera calor durante su uso y, dependiendo de la carga, puede calentarse muy rápidamente.",
    "Este es el disipador de calor, que generalmente está hecho de aluminio; su función es transferir el calor de las placas en la parte posterior que tocan los 'puntos calientes'. Luego, este calor se transfiere a través de las placas y es expulsado por los ventiladores.",
    "Por último, el 'die'. El 'die' es el chip que proporciona la base para que todo lo demás funcione. A su alrededor se encuentran módulos de VRAM, que almacenan memoria para que el 'die' pueda acceder rápidamente a los datos que necesita."
];

const attributes = [
    "NVIDIA es una empresa tecnológica líder, conocida por sus potentes GPU y sus avances en IA, videojuegos y centros de datos.",
    "El aprendizaje profundo es una rama de la IA que utiliza redes neuronales para procesar enormes cantidades de datos y resolver problemas complejos.",
    "El aprendizaje automático es un campo de la IA que permite a los sistemas aprender de los datos y mejorar su rendimiento sin programación explícita.",
    "La tecnología Tensor Core es el hardware especializado de NVIDIA diseñado para acelerar los cálculos de IA y aprendizaje profundo.",
    "La visión por computadora es un campo de la IA que permite a las máquinas interpretar y comprender la información visual del mundo.",
    "El procesamiento de lenguaje natural es una rama de la IA que permite a las máquinas comprender e interactuar con el lenguaje humano."
];

const isArabic = document.querySelector("html").lang === "ar"
let layout_display_boolean = parseFloat(window.innerWidth / window.innerHeight).toFixed(5) < 1 || window.innerWidth <= 1024;
const video = document.getElementById("aiBreakdown");
let targetTime = 0;
let isAnimating = false;
let at_end = false;
let lastScrollY;
const textLabel = document.getElementById("changing")
const stickyDiv = document.querySelector('#NVIDIA_3D_model');
const stickyDivRect = stickyDiv.getBoundingClientRect();
let model_trigger = isPhone()? false:true // false means mobile so trigger is false, otherwise it'd be on (true)
const switch_trigger = document.querySelector('#toggle')
const infoIcon = document.querySelector('.info-icon');
const infoContainer = document.querySelector('.info-container');
function isTouchDevice() {
    return ('ontouchstart' in window || navigator.maxTouchPoints > 0);
}
function isPhone(){
    if('ontouchstart' in window || navigator.maxTouchPoints > 0){
        // if(window.innerWidth <= 1024){
            return true
        // } 
        // else {
        //     return false;
        // }
    } else {
        return false
    }
}

console.log('Is touch device:', isTouchDevice());

const modelSwitch = document.querySelector('.model_switch')
const N_3D_Div = document.querySelector("#NVIDIA_3D_model")
const N_no_anims = document.querySelector('.NVIDIA_no_anims')
const break_div = document.querySelector("#break_div")
// const N_no_anims = document.querySelector('.NVIDIA_no_anims')
async function model_trigger_func(boolean){
    if(!boolean){
        // modelSwitch.style.display = "none"
        N_3D_Div.style.opacity = "0"
        setTimeout(() => {
            N_no_anims.style.display = 'block'
            N_3D_Div.style.display = "none"
            locoScroll.update()
            // videoSec.paddingLeft = "none"   
        }, 700);
        setTimeout(() => {
            N_no_anims.style.opacity = '1'
        }, 900);
    } else {
        // modelSwitch.style.display = ""
        N_no_anims.style.opacity = '0'
        setTimeout(() => {
            N_3D_Div.style.display = ""
            N_no_anims.style.display = 'none'
            locoScroll.update()  
        }, 700);
        setTimeout(() => {
            // videoSec.paddingLeft = ""
            N_3D_Div.style.opacity = "1"
        }, 900);
        return;
    }
}
let first_run_result
function first_run(){
    if(isPhone() || window.innerWidth < 617){
        first_run_result = true
        modelSwitch.style.display = "none"
        N_3D_Div.style.display = "none"
        N_no_anims.style.display = "block"
        N_no_anims.style.opacity = "1"
        infoContainer.style.display = "flex"
        infoIcon.addEventListener('click', () => {
            infoContainer.classList.toggle('show-message');
          });
          
          document.addEventListener('click', (e) => {
            if (!infoContainer.contains(e.target)) {
              infoContainer.classList.remove('show-message');
            }
          });
    } else {
        modelSwitch.style.display = ""
        N_3D_Div.style.display = ""
        N_no_anims.style.display = ""
        N_no_anims.style.opacity = ""
        infoContainer.style.display = ""
        first_run_result = false
        infoIcon.removeEventListener('click', () => {
            infoContainer.classList.toggle('show-message');
          });
          
          document.removeEventListener('click', (e) => {
            if (!infoContainer.contains(e.target)) {
              infoContainer.classList.remove('show-message');
            }
          });
    };
}
const card = document.querySelectorAll('.card')
const ratio = parseFloat(window.innerWidth / window.innerHeight).toFixed(2);
const wide_ratio = ratio >= 3;
const isPortrait = ratio < 1;
const small_display = window.innerWidth <= 1024;
function adjustLayout() {
    model_trigger = isPhone()? false:true
    const html = document.querySelector('html');
    const aiDefText = document.querySelector('#ai_def_text');
    const aiDefHead = document.querySelector('#ai_def_head');
    const aiDefImgDiv = document.querySelector('#ai_def_img_div');
    const aiDefImg = document.querySelector('#ai_def_img');
    const aiDefP = document.querySelector('#ai_def_p');
    const aiDefDiv = document.querySelector('.ai_def_div');
    const N_3D_Div_2 = document.querySelector("#NVIDIA_3D_div")
    const models_no_anims = document.querySelectorAll(".models_no_anims")
    const models_no_anims_1 = document.querySelector(".models_no_anims")
    const container = document.querySelector('.container')
    // const noAnimImg = document.querySelector(".no_anims_img")

    const ratio = parseFloat(window.innerWidth / window.innerHeight).toFixed(2);
    const wide_ratio = ratio >= 3;
    const isPortrait = ratio < 1;
    const windowWidth = window.innerWidth
    const small_display = windowWidth <= 1024;
    const mid_ratio = ratio < 0.85 && ratio >= 0.70 || 850 >= windowWidth > 768;
    const mid_small_ratio = ratio < 0.70 && ratio >= 0.6;
    const small_ratio = ratio < 0.6 && ratio > 0.43 && 768 >= windowWidth; 
    const tiny_ratio = ratio <= 0.43;

    if (isPortrait || small_display) {
        card.forEach(el =>{
            el.style.display = "block"
            el.firstElementChild.style.width = "100%";
            el.lastElementChild.style.width = "100%";
            el.lastElementChild.style.paddingTop = "5%"
            el.lastElementChild.style.paddingBottom = "3%"
        })
        aiDefImgDiv.style.display = "flex"
        aiDefText.style.width = "100%";
        aiDefImgDiv.style.width = "95%";
        aiDefImg.style.transform = "translateY(-10rem)";
        aiDefImg.style.paddingRight = "0";
        if(ratio > 1){
            aiDefImg.style.width = "75%"
        }
        aiDefDiv.style.justifyContent = "center";
        aiDefDiv.style.paddingLeft = "0";
        // aiDefImg.style.alignItems = "center";
        aiDefDiv.style.flexWrap = "wrap";
        aiDefText.style.maxWidth = "100vw";
        aiDefP.style.paddingRight = "7.5%";
        aiDefP.style.paddingLeft = "7.5%";
        aiDefHead.style.paddingRight = "5%";
        aiDefHead.style.paddingLeft = "5%";
        aiDefDiv.style.paddingLeft = "0%";
        aiDefImgDiv.style.justifyContent = "center";
        aiDefImgDiv.style.maxWidth = "100vw";
        aiDefImg.style.justifyContent = "center";
        // aiDefImgDiv.style.paddingRight = "5%";
        // aiDefImgDiv.style.paddingLeft = "5%";
        aiDefImgDiv.style.minHeight = "50vw";
        N_no_anims.style.width = "95vw"
        N_3D_Div_2.style.height = `auto`
        models_no_anims.forEach(el =>{
            el.style.height = "60vh"
        })
        models_no_anims_1.style.height = "40vh"
        let  width_desired
        card.forEach(el => {
            if(el.textContent.includes("Frank")){
                if(ratio > 1){
                    width_desired = "30vw"
                } else {
                    width_desired = "40vw"
                }
            } else {
                if(ratio > 1){
                    width_desired = "50vw"
                } else {
                    width_desired = "65vw"
                }
            }
            const img1 = el.lastElementChild.firstElementChild
            // if(windowWidth > 768){
                el.lastElementChild.style.display = "flex"
                el.lastElementChild.style.flexDirection = "column"
                el.lastElementChild.style.justifyContent = "center"
                el.lastElementChild.style.alignItems = "center"
                img1.style.height = "auto"
                img1.style.width = width_desired
            // }

            el.style.width = "100%"
            el.style.left = "0"
            el.style.marginTop = "5vh"
        })
        container.style.gap = "0";
        container.style.display = 'block';
        // noAnimImg.style.paddingTop = "7vh"
    } else {
        [aiDefText, aiDefImgDiv, aiDefImg, aiDefDiv, aiDefP, aiDefHead, container].forEach(el => {
            el.style = '';
        });
        card.forEach(el =>{
            const img1 = el.lastElementChild.firstElementChild
            el.lastElementChild.style.display = ""
            el.lastElementChild.style.flexDirection = ""
            el.lastElementChild.style.justifyContent = ""
            el.lastElementChild.style.alignItems = ""
            img1.style.width = ""
            img1.style.height = ""
            el.style.display = ""
            el.firstElementChild.style.width = "";
            el.lastElementChild.style.width = "";
            el.lastElementChild.style.paddingTop = ""
            el.lastElementChild.style.paddingBottom = ""
        })
        N_3D_Div.style.height = ``
        N_no_anims.style.width = ""
        models_no_anims.forEach(el =>{
            el.style.height = ""
        })
        if(!isArabic){
            card.forEach(el => {
                el.style.width = ""
                el.style.left = ""
                el.style.marginTop = ""
            })
        }
        models_no_anims_1.style.height = ""
        N_3D_Div_2.style.height = `auto`
    }

    const fontSizeMap = {
        mid_ratio: '0.95vh',
        mid_small_ratio: '0.85vh',
        small_ratio: '0.68vh',
        tiny_ratio: '0.55vh',
        wide_ratio: '1.25vh',
        default: '1vh'
    };

    const matchedRatio = Object.entries({
        mid_ratio,
        mid_small_ratio,
        small_ratio,
        tiny_ratio,
        wide_ratio
    }).find(([key, value]) => value);
    
    html.style.fontSize = fontSizeMap[matchedRatio ? matchedRatio[0] : 'default'];
}

let locoScroll;

function initLocoScroll() {
    if (typeof LocomotiveScroll === 'undefined') return;

    locoScroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        smoothMobile: false,
        smartphone: {
            smooth: false,
            breakpoint: 0,
        },
        tablet: {
            smooth: false,
            breakpoint: 0,
        },
        lerp: 0.125,
        multiplier: 0.8,
    });

    ScrollTrigger.scrollerProxy('[data-scroll-container]', {
        scrollTop(value) {
            return arguments.length ? 
                locoScroll.scrollTo(value, { duration: 0, disableLerp: true }) : 
                locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        }
    });
    ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
    ScrollTrigger.defaults({ scroller: '[data-scroll-container]' });
    ScrollTrigger.refresh();

    if (isTouchDevice()) {
        document.addEventListener('scroll', handleNativeScroll);
    }
}

function handleNativeScroll() {
    ScrollTrigger.update();
}

function setupAnimations() {
    gsap.fromTo("#header_1", {
        opacity: 0,
        y: 50,
        rotationX: 90,
        transformOrigin: "bottom center",
    }, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.3,
        delay: 0.3,
        ease: "power3.out",
    });

    gsap.to("#small_header", {
        opacity: 1,
        y: -20,
        duration: 1.25,
        delay: 1.2,
        ease: "power1.out",
    });

    setTimeout(() => {
        const scrollY = locoScroll ? locoScroll.scroll.instance.scroll.y : window.scrollY;
        document.getElementById('scroll_prompt').style.opacity = scrollY < 20 ? 1 : 0;
    }, 3300);

    gsap.to("#scroll_prompt", {
        opacity: 0,
        duration: 0.3,
        ease: "power1.out",
        scrollTrigger: {
            trigger: ".header_div",
            start: "top+=35 top",
            toggleActions: "play none none reverse",
        }
    });

    const createScrollTrigger = (trigger, id, start = layout_display_boolean ? "top 85%": "top 75%") => {
        gsap.from(trigger, {
            opacity: 0,
            duration: 1.2,
            scrollTrigger: {
                trigger: id,
                start: start,
            }
        });
    };

    createScrollTrigger(".ai_def_div", ".ai_def_div");
    createScrollTrigger("#NVIDIA_head", "#NVIDIA_header");
    if(!isPhone() && !small_display && !isPortrait) {
        createScrollTrigger("#NVIDIA_3D_div", "#NVIDIA_3D_header");
        createScrollTrigger("#ai_evo", "#ai_evo", "top 90%")
        createScrollTrigger(".card", ".card", "top 90%")
    }
    // createScrollTrigger(".conclusion", ".conclusion")
}
video.addEventListener("loadedmetadata", () => {
    console.log("Video duration:", video.duration); 
    updateTargetTime();
});
let state = 0;
function updateTargetTime() {
    if (!video.duration || video.duration <= 0) {
        console.warn("Video duration is not loaded or invalid.");
        return;
    }
    // if(locoScroll.scroll.instance.scroll.y < window.innerHeight * 200){
        //     return;
        // }
        const textLabel = document.getElementById("changing")
        targetTime = ((locoScroll.scroll.instance.scroll.y).toFixed(2) / window.innerHeight) * 100;
        if(targetTime < 100) return;    
    // console.log("Scroll",locoScroll.scroll.instance.scroll.y, targetTime)
    // if (targetTime >= 490 && targetTime <= 570) {
    //     textLabel.innerText = "A heat sink, which is typically made of aluminum, transfers heat from plates on the back that touch 'hot spots'.This heat then gets transferred through the plates and blown away by fans."
    //     textLabel.style.opacity = 1
    // } else if (targetTime > 570) {
    //     textLabel.innerText = "Finally, the die. The die is the chip that provides foundation for everything else to run.Surrounding it are VRAM modules, which hold important memory that allows the die to recieve it quicker."
    //     textLabel.style.opacity = 1
    // } else if (targetTime >= 448 && targetTime <= 490) {
    //     textLabel.innerText = "Graphics Cards being used for AI models are typically being worked at full capacity, and so they generate a lot of heat.One way to combat this is by the use of fans to remove heat."
    //     textLabel.style.opacity = 1
    // }

    const list_of_times = [
        448+10, 490+7, 570+12
    ]
    let duration_used;
    if (targetTime >= list_of_times[0] && targetTime <= list_of_times[1] && state !== 1){
        if(isAnimating) return;
        isAnimating = true;
        if (state === 0){
            duration_used = 1.25;
        }
        if (state === 2){
            duration_used = 4
        }
        if (state === 3){
            duration_used = 8
        }
        state = 1
        textLabel.style.opacity = 0
        set_text_and_opacity_time(textLabel, text_list[state], duration_used-0.5)
        gsap.to(video, {
            currentTime: 1.5,
            duration: duration_used,
            onComplete: () => {
                isAnimating = false;
            } 
        });
    } 
     if (targetTime < list_of_times[0] && state !== 0){
         if(isAnimating) return;
         isAnimating = true;
         if (state === 1){
            duration_used = 1.25;
        }
        if (state === 2){
            duration_used = 5
        }
        if (state === 3){
            duration_used = 9
        }
         state = 0
        textLabel.style.opacity = 0
        set_text_and_opacity_time(textLabel, text_list[state], duration_used)
        gsap.to(video, {
            currentTime: 0.05,
            duration: duration_used,
            onComplete: () => {
                isAnimating = false;
            } 
        });
    }
     if (targetTime > list_of_times[2] && state !== 3){
        if(isAnimating) return;
        isAnimating = true;
        if (state === 0){
            duration_used = 10
        }
        if (state === 1){
            duration_used = 8.75
        }
        if (state === 2){
            duration_used = 5
        }
        state = 3
        // if(targetTime < 9.5) return;
        textLabel.style.opacity = 0
        set_text_and_opacity_time(textLabel, text_list[state], duration_used-2.8)
        console.log(targetTime, video.currentTime)
        gsap.to(video, {
            currentTime: video.duration,
            duration: duration_used,
            onComplete: () => {
                isAnimating = false;
            }
        });
        } 
         if(targetTime >= list_of_times[1] && targetTime <= list_of_times[2] && state !== 2) {
             if(isAnimating) return;
             isAnimating = true;
            if (state === 0){
                duration_used = 5.5
            }
            if (state === 1){
                duration_used = 4
            }
            if (state === 3){
                duration_used = 4
            }
            state = 2 
            textLabel.style.opacity = 0
            set_text_and_opacity_time(textLabel, text_list[state], duration_used-1.5)
            console.log("2nd", video.currentTime >= 12.5)
            console.log(targetTime)
            gsap.to(video, {
                currentTime: 7.9,
                duration: duration_used,
                onComplete: () => {
                    isAnimating = false;
                } 

            });
        } 
        //  if (targetTime > 4000.8  && targetTime <= 9000){
        //     if(isAnimating) return;
        //     isAnimating = true;
        //     at_end = false
        //     return gsap.to(video, {
        //         currentTime: 6.85,
        //         duration: 2,
        //         onComplete: () => {
        //             isAnimating = false;
        //         } 

        //     });
        // }
        //  else {
        //     console.log("3rd")
        // console.log("Scroll Position:", scrollPosition, "Scroll %:", scrollPercentage, "Target Time:", targetTime);
    
        // animateVideo();
        // }
}

function set_text_and_opacity_time(el, text, time){
    setTimeout(() => {
        if(el){
            el.innerText = text.toString()
            el.style.opacity = 1
        }
    }, (time)*1000);
}

function throttle_ignore(func, limit) {
    let lastRan = 0;

    return function(...args) {
        const context = this;
        const now = Date.now();

        if (now - lastRan >= limit) {
            func.apply(context, args);
            lastRan = now;
        } else {
            return;
        }
    };
}
document.addEventListener('DOMContentLoaded', () => {
    if(isArabic){
        card.forEach(el => {
            el.style.width = "100%"
            el.style.left = "0"
            el.style.marginTop = "5vh"
        })
    }
    initLocoScroll();
    adjustLayout();
    first_run();
    // model_trigger_func(model_trigger)
    setupAnimations();
    const setupTooltip = (selector, text) => {
        const element = document.querySelector(selector);
        if (element) element.setAttribute('title', text);
    };

    document.querySelectorAll(".ai_span_nv, .ai_span_nv_main").forEach(span => {
        span.setAttribute('title', attributes[0]);
    });

    setupTooltip('.ai_span_d_learn', attributes[1]);
    setupTooltip('.ai_span_m_learn', attributes[2]);
    setupTooltip('.ai_span_tensor', attributes[3]);
    setupTooltip('.ai_span_cv', attributes[4]);
    setupTooltip('.ai_span_ntp', attributes[5]);
    
    locoScroll.on('scroll', () => {
        ScrollTrigger.update
        if(model_trigger && !isPhone()){
            throttle_ignore(updateTargetTime(), 1000)
        }
    });
    ScrollTrigger.refresh();
    if(!isPhone()){
        switch_trigger.addEventListener('change', ()=>{
            model_trigger = switch_trigger.checked? false:true
            console.log(model_trigger)
            model_trigger_func(model_trigger)
            // adjustLayout()
        })
    }
});

window.addEventListener('resize', () => {
    adjustLayout();
    if(window.innerWidth < 617){
        first_run()
    } else if(first_run_result){
        first_run()
    }
    locoScroll.update()
    // model_trigger = switch_trigger.checked? false:true
    // model_trigger_func(model_trigger)
    ScrollTrigger.refresh();
});

// window.addEventListener('beforeunload', () => {
//     destroyLocoScroll();
//     ScrollTrigger.killAll();
// });

/*
 THIS CODE IS MADE BY m7mdy9   AND IS NOT AUTHORIZED TO BE USED WITHOUT HIS PERMISSION. 
 FOR MORE INFO VIEW LICENSE FILE - 2025 © m7mdy9
*/