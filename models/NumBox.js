let startId = 11;

/**
 * 숫자를 담고 있는 Box 객체
 */
class NumBox {
    /**
     * NumBox 생성자. 숫자를 지정한다. 0이면 빈 박스
     * @param {Number} num Box에 들어갈 숫자
     */
    constructor(num) {
        this._id = startId++;
        this.num = num || 0;
    }

    /**
     * 숫자 2배로
     * @returns this
     */
    multiple() {
        this.num *= 2;
        return this;
    }

    /**
     * 두 객체가 동일한지 여부
     * @param {NumBox} obj
     * @returns 동일 여부 true/false
     */
    equals(obj) {
        return obj instanceof NumBox && obj.num === this.num;
    }

    /**
     * 빈 NumBox인지 확인
     * @returns 비어있으면 true
     */
    isEmpty() {
        return this.num === 0;
    }

    toString() {
        return `(${this._id}, ${this.num})`;
    }
}

export default NumBox;
