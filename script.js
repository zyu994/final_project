
const imgListOne = document.querySelector('.img-list')

let imgBoxList = Array.prototype.slice.call(document.querySelectorAll('.img-list .img-box'))
const imgBoxCount = imgBoxList.length
const root = document.documentElement;
const btnGroup = document.querySelector('.btn-group')
const lastBtn = document.querySelector('.last')
const nextBtn = document.querySelector('.next')
const lastImgBox = document.getElementById('last-img-box')

// --post-spacing, --post-size
const postSpacing = Number(getComputedStyle(root).getPropertyValue('--post-spacing').replace("vw", ""));
const postSize = Number(getComputedStyle(root).getPropertyValue('--post-size').replace("vw", ""));

// img-list width
let imgListLength = (postSize + postSpacing) * imgBoxCount
console.log(imgListLength);
// img-box width
const imgBoxLength = postSize + postSpacing

let index = 0
let indexOne = 1
let timer = null
let animationTime = 0.5

// initial order
imgBoxList.unshift(imgBoxList.pop())
// imgListOne, animationTime
imgListOne.style.transition = animationTime + 's ease'
// button timeout
setTimeout(function () {
    btnGroup.style.opacity = '1'
    btnGroup.style.bottom = '5%'
}, animationTime * 1000)
// clickfunction
function cilckFun(flag) {
    //next
    if (flag == 'next') {
        index--
        console.log(index);
        // move left
        imgListOne.style.left = imgBoxLength * index + "vw";
        setTimeout(function () {
            imgListOne.style.transition = 'none'
            // When clicking on the next cumulative number of images reached, which is equivalent to going back to the origin, the variables and position are reset
            if (Math.abs(index) == imgBoxCount) {
                index = 0
                imgListOne.style.left = 0
                imgBoxList.forEach(item => {
                    if (item.id == 'last-img-box') {
                        item.style.transform = `translateX(-160.68vw)`
                    } else {
                        item.style.transform = 'none'
                    }
                });
            } else {
                // last-img-box, start -160.68vw
                if (imgBoxList[0].id == 'last-img-box') {
                    lastImgBox.style.transition = 'none'
                    lastImgBox.style.transform = 'translateX(0px)'
                } else if (index >= 0) {
                    /*click smooth transition*/
                    imgBoxList[0].style.transform = 'none'
                } else {
                    // left to the last
                    imgBoxList[0].style.transform = 'translateX(160.68vw)'
                }
            }
            // left to the last
            imgBoxList.push(imgBoxList.shift())
        }, animationTime * 1000)
    } else {
        // previous
        index++
        console.log(index);
        // right to the nmain
        imgBoxList.unshift(imgBoxList.pop())
        // img to left -- imgListOne
        if (imgBoxList[0].id == 'last-img-box' && index != 0) {
            // last-img-box, start -321.36vw
            imgBoxList[0].style.transform = 'translateX(-321.36vw)'
        } else if (index < 0) {
            // 
            imgBoxList[0].style.transform = 'none'
        } else {
            // right to front
            imgBoxList[0].style.transform = 'translateX(-160.68vw)'
        }
        imgListOne.style.left = imgBoxLength * index + "vw";
        lastImgBox.style.transition = 'none'
        // next to last
        if (Math.abs(index) == imgBoxCount) {
            index = 0
            setTimeout(function () {
                imgListOne.style.transition = 'none'
                imgListOne.style.left = 0
                imgBoxList.forEach(item => {
                    if (item.id == 'last-img-box') {
                        item.style.transform = 'translateX(-160.68vw)'
                    } else {
                        item.style.transform = 'none'
                    }
                });
            }, animationTime * 1000)
        }
    }
    imgListOne.style.transition = animationTime + 's ease'
}

//click speed limit
function throttle(fn, delay) {
    return function () {
        if (timer) {
            return
        }
        fn.apply(this, arguments)
        timer = setTimeout(() => {
            timer = null
        }, delay)
    }
}

nextBtn.onclick = throttle(() => cilckFun('next'), animationTime * 1000);

lastBtn.onclick = throttle(() => cilckFun('last'), animationTime * 1000);
const autoPlayInterval = 3000;
let autoPlayTimer = setInterval(() => {
    cilckFun('next');
}, autoPlayInterval);
// mouseover for stop auto play
imgListOne.addEventListener('mouseover', () => {
    clearInterval(autoPlayTimer);
});

// mouseout for start auto play
imgListOne.addEventListener('mouseout', () => {
    autoPlayTimer = setInterval(() => {
        cilckFun('next');
    }, autoPlayInterval);
});