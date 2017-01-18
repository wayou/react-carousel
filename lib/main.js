'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jsStylesheet = require('js-stylesheet');

var _jsStylesheet2 = _interopRequireDefault(_jsStylesheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @description resuable carousel react component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @author wayou
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

// TODO: using a image component with error fallback
// import NiceImage from 'common/components/NiceImage/NiceImage.es6';

var ANIMATION_DURATION = 5000; //s
var DEFAULT_WIDTH = 375;

var initialized = false;

var Carousel = function (_React$PureComponent) {
    _inherits(Carousel, _React$PureComponent);

    function Carousel(props) {
        _classCallCheck(this, Carousel);

        var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));

        _this.state = {
            currentIndex: 0,
            width: DEFAULT_WIDTH,
            height: Math.round(DEFAULT_WIDTH / 3) //3：1
        };
        _this.init = _this.init.bind(_this);
        _this.initialSize = _this.initialSize.bind(_this);
        return _this;
    }

    _createClass(Carousel, [{
        key: 'init',
        value: function init() {
            this.initialSize();
            if (this.props.autoPlay) {
                this.play();
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            //TODO: resize support
            // window.onresize = (event) => {
            //     this.initialSize();
            // };

            (0, _jsStylesheet2.default)(require('./helpers/styles.js')); // eslint-disable-line global-require

            this.init();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearTimeout(this.state.playId);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
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
    }, {
        key: 'initialSize',
        value: function initialSize() {
            var width = this.refs.carouselWrap.offsetWidth;
            console.log('width is ' + width);

            // console.log(`width is ${width}`);

            var height = Math.round(width / 3);

            //获取轮播宽度
            this.setState({
                width: width,
                height: height
            });

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

    }, {
        key: 'play',
        value: function play() {
            var _this2 = this;

            clearInterval(this.state.playId);

            var imgCnt = this.props.data.length;
            if (!imgCnt) {
                // in case of zero value
                return;
            }

            var playId = setInterval(function () {
                _this2.setState({
                    currentIndex: (_this2.state.currentIndex + 1) % imgCnt
                });
            }, this.props.duration);

            this.setState({
                playId: playId
            });
        }

        /**
         * 切换到相应轮播
         */

    }, {
        key: 'goToSlide',
        value: function goToSlide(num) {
            this.setState({
                currentIndex: +num
            });
            if (this.props.autoPlay) {
                this.play();
            }
        }

        /**
         * 上一张
         */

    }, {
        key: 'prevSlide',
        value: function prevSlide() {
            var imgCnt = this.props.data.length;
            var currentIndex = this.state.currentIndex;
            if (currentIndex - 1 < 0) {
                currentIndex = imgCnt;
            }
            var num = Math.abs(--currentIndex) % imgCnt;
            this.goToSlide(num);
        }

        /**
         * 下一张
         */

    }, {
        key: 'nextSlide',
        value: function nextSlide() {
            var imgCnt = this.props.data.length;
            var currentIndex = this.state.currentIndex;
            var num = Math.abs(++currentIndex) % imgCnt;
            this.goToSlide(num);
        }
    }, {
        key: 'getSlidesStyle',
        value: function getSlidesStyle() {
            return { 'left': -this.state.currentIndex * this.state.width + 'px' };
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var props = this.props;

            return _react2.default.createElement(
                'div',
                { className: 'carousel-wrap' + this.props.clsName, ref: 'carouselWrap' },
                _react2.default.createElement(
                    'div',
                    { className: 'carousel-slides', style: this.getSlidesStyle() },
                    props.data.map(function (item, index) {
                        return _react2.default.createElement(
                            'div',
                            { className: 'carousel-item', key: index },
                            _react2.default.createElement(
                                'a',
                                { href: item.url || 'javascript:;' },
                                _react2.default.createElement('img', { className: 'carousel-img', src: item.imgUrl, style: { height: _this3.state.height } }),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'carousel-title' },
                                    _react2.default.createElement(
                                        'p',
                                        null,
                                        item.title
                                    )
                                )
                            )
                        );
                    })
                ),
                _react2.default.createElement(
                    'ul',
                    { className: 'carousel-indicator' },
                    props.data.map(function (item, index) {
                        return _react2.default.createElement('li', { key: index,
                            className: "indicator-item" + (_this3.state.currentIndex == index ? ' active' : ''),
                            onClick: _this3.goToSlide.bind(_this3, index) });
                    })
                )
            );
        }
    }]);

    return Carousel;
}(_react2.default.PureComponent);

Carousel.defaultProps = {
    clsName: '',
    autoPlay: true,
    data: [],
    duration: ANIMATION_DURATION
};

Carousel.PropTypes = {
    clsName: _react2.default.PropTypes.string, //customized className
    data: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
        imgUrl: _react2.default.PropTypes.string,
        url: _react2.default.PropTypes.number,
        title: _react2.default.PropTypes.number
    })),
    autoPlay: _react2.default.PropTypes.bool, // start play immediately or not
    duration: _react2.default.PropTypes.string // how long a single slide shows in ms 
};

exports.default = Carousel;