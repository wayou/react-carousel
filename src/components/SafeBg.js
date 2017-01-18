import React, { Component } from 'react';
import { fallbackImg } from '../helpers/util'

class SafeBg extends React.Component {
    constructor(props) {
        super(props);

        let defaultBg = this.props.fallbackSrc || fallbackImg;

        this.state = {
            defaultImgCls: 'umu-img-default',
            bgStyle: {
                backgroundImage: 'url(' + defaultBg + ')'
            }
        };
    }

    componentDidMount() {
        this._isMounted = true;
        let img = new Image();
        img.onload = () => {
            if (!this._isMounted) return;
            this.setState({
                bgStyle: {
                    backgroundImage: 'url(' + this.props.bgSrc + ')'
                },
                defaultImgCls: ''
            })
        }
        img.src = this.props.bgSrc;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let props = this.props;
        let eleStyle = Object.assign({}, this.props.style, this.state.bgStyle);
        return (
            <div className={'umu-bg ' + this.state.defaultImgCls+ ' ' + props.clsName} style={eleStyle} ></div>
        );
    }
}

SafeBg.defaultProps = {
    clsName: '',
    bgSrc: '',
    fallbackSrc: fallbackImg,
    style: ''
}

SafeBg.PropTypes = {
    clsName: React.PropTypes.string,//自定义类名
    bgSrc: React.PropTypes.string,//图片地址
    fallbackSrc: React.PropTypes.string,//自定义默认图
    style: React.PropTypes.string,//外部自定义样式
};
export default SafeBg;