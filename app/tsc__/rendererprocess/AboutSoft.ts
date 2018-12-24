let nextEle : any = document.getElementById('next');
nextEle.onclick = () => {
    window.location.href = './SubmitDetails.html';
}

let prevEle : any = document.getElementById('back');
prevEle.onclick = () => {
    window.location.href = './UserDetails.html'
}