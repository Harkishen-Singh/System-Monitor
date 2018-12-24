"use strict";
let nextEle = document.getElementById('next');
nextEle.onclick = () => {
    window.location.href = './SubmitDetails.html';
};
let prevEle = document.getElementById('back');
prevEle.onclick = () => {
    window.location.href = './UserDetails.html';
};
