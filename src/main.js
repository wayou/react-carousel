/**
* @description resuable carousel react component
* @author wayou
*/

import React from 'react';

import jss from 'js-stylesheet';

// TODO: using a image component with error fallback
// import NiceImage from 'common/components/NiceImage/NiceImage.es6';

const ANIMATION_DURATION = 5000;//s
const DEFAULT_WIDTH = 375;

let initialized = false;

class Carousel extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            width: DEFAULT_WIDTH,
            height: Math.round(DEFAULT_WIDTH / 3) //3：1
        };
        this.init = this.init.bind(this);
        this.initialSize = this.initialSize.bind(this);
    }

    init() {
        this.initialSize();
        if (this.props.autoPlay) {
            this.play();
        }
    }

    componentDidMount() {
        //TODO: resize support
        // window.onresize = (event) => {
        //     this.initialSize();
        // };

        jss(require('./helpers/styles.js')); // eslint-disable-line global-require

        this.init();
    }

    componentWillUnmount() {
        clearTimeout(this.state.playId);
    }

    componentDidUpdate(prevProps, prevState) {
        //TODO: as we're using PureComponent, this equalation check is unnessesary any more, but remind to be verified
        // if (!_.isEqual(prevProps, this.props)) { 
        // this.init();
        // }


        if (!initialized) {
            console.log('componentDidUpdate');
            // this.init();
            initialized = true;
        }

    }

    initialSize() {
        let width = this.refs.carouselWrap.offsetWidth;
        console.log(`width is ${width}`);
        
        // console.log(`width is ${width}`);

        let height = Math.round(width / 3);

        //获取轮播宽度
        this.setState({
            width: width,
            height: height
        })

        //TODO: swipe support
        // this.initialSwipe();

    }

    // initialSwipe() {
    //     $('.carousel-item').swipeLeft(() => {
    //         this.nextSlide();
    //     }).swipeRight(() => {
    //         this.prevSlide();
    //     })
    // }

    play() {
        clearInterval(this.state.playId);

        let imgCnt = this.props.data.length;
        if (!imgCnt) {
            // in case of zero value
            return;
        }

        let playId = setInterval(() => {
            this.setState({
                currentIndex: (this.state.currentIndex + 1) % imgCnt
            })
        }, this.props.duration);

        this.setState({
            playId: playId
        })
    }

    /**
     * 切换到相应轮播
     */
    goToSlide(num) {
        this.setState({
            currentIndex: +num
        })
        if (this.props.autoPlay) {
            this.play();
        }
    }

    /**
     * 上一张
     */
    prevSlide() {
        let imgCnt = this.props.data.length;
        let currentIndex = this.state.currentIndex;
        if (currentIndex - 1 < 0) {
            currentIndex = imgCnt;
        }
        let num = Math.abs(--currentIndex) % imgCnt;
        this.goToSlide(num);
    }

    /**
     * 下一张
     */
    nextSlide() {
        let imgCnt = this.props.data.length;
        let currentIndex = this.state.currentIndex;
        let num = Math.abs(++currentIndex) % imgCnt;
        this.goToSlide(num);
    }

    getSlidesStyle() {
        return { 'left': -this.state.currentIndex * this.state.width + 'px' };
    }

    render() {
        let props = this.props;

        return (
            <div className={'carousel-wrap' + this.props.clsName} ref="carouselWrap">
                <div className="carousel-slides" style={this.getSlidesStyle()}>
                    {
                        props.data.map((item, index) => {
                            return (
                                <div className="carousel-item" key={index}>
                                    <a href={item.url || 'javascript:;'} >
                                        <img className="carousel-img" src={item.imgUrl} style={{ height: this.state.height }} />
                                        <div className="carousel-title">
                                            <p>{item.title}</p>
                                        </div>
                                    </a>
                                </div>
                            )
                        })
                    }
                </div>
                <ul className="carousel-indicator">
                    {
                        props.data.map((item, index) => {
                            return (
                                <li key={index}
                                    className={"indicator-item"+(this.state.currentIndex == index?' active':'')}
                                    onClick={this.goToSlide.bind(this, index)}>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

Carousel.defaultProps = {
    clsName: '',
    autoPlay: true,
    data: [],
    duration: ANIMATION_DURATION
}

Carousel.PropTypes = {
    clsName: React.PropTypes.string,//customized className
    data: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            imgUrl: React.PropTypes.string,
            url: React.PropTypes.number,
            title: React.PropTypes.number,
        })
    ),
    autoPlay: React.PropTypes.bool,// start play immediately or not
    duration: React.PropTypes.string// how long a single slide shows in ms 
};

export default Carousel;