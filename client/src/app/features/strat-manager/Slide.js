//Status that could take the slider 
const Status = {
    DISPLAY: 1,
    HIDE: -1,
}




export default class Slider {

    constructor(height, duration) {
        this.duration = duration;
        this.freeze = false;
        this.frame = this.duration / this.height;
        this.status = Status.DISPLAY;
        this.height = height;
    };
    /**
     * first change the position of the attached element, then 
     * if the target size is equals to the current height : do this method until it's finish , 
     * else change status allowed and set freeze to false in the aim to re use again the slider 
     * @param {*} attached  
     * @param {*} frame 
     * @param {*} current 
     * @param {*} target 
     */
    #slide(attached, frame, current, target) {
        const newH = current + this.status * 1;
        attached.style.height = newH + 'px';
        if (newH !== target)
            setTimeout(() => this.#slide(attached, frame, newH, target));
        else {
            this.status = this.status === 1 ? Status.HIDE : Status.DISPLAY;
            this.freeze = false;
        }
    };
    /**
     *  launch the animation and block all new event during the animation 
     * @param {*} slide box 
     * @returns 
     */
    launch(tag) {
        if (this.freeze) return;
        this.freeze = true;
        let targetHeight = this.status === 1 ? this.height : 0;
        this.#slide(tag, this.frame, Math.abs(targetHeight - this.height), targetHeight);
    }

}