document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById ('wrapper');
    const boxes = Array.from(wrapper.querySelectorAll('.box'));

    for (let i = boxes.length-1; i>0; i--) {
        const j= Math.floor(Math.random()  * (i+1));

        [boxes[i], boxes[j]] = [boxes[j], boxes[i]];
    }   
    wrapper.innerHTML = '';
    boxes.forEach (box => wrapper.appendChild (box))
    });

//Was missing semicolon from ln 6