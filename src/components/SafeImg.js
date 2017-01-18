/**
* @description 带默认图回退的图片组件
* @author wayou
* TODO: 加载动画，加载完成再显示图片
*/

/*eslint browser: true, esversion: 6, vars: true, nomen: true, indent: 4, maxlen: 120, plusplus: true, sloppy: true*/
/*global define: true, require, $ , module, angular, __inline, console, phantom*/

import React, { Component } from 'react';
import { fallbackImg } from '../helpers/util'

class SafeImg extends React.Component {
    constructor(props) {
        super(props);

        let defaultSrc = props.fallbackSrc || fallbackImg;
        this.state = {
            src: defaultSrc
        };
    }

    componentDidMount() {
        let props = this.props;
        let img = new Image();
        img.onload = () => {
            this.setState({
                src: this.props.src
            });
            //如果外部有自定义的 onload则调用一下
            props.onload && props.onload()
        }
        img.onerror = () => {
            //如果外部有自定义的 onError则调用一下
            props.onError && props.onError()
        }
        img.src = this.props.src;
    }

    render() {
        let props = this.props;
        return (
            <img className={'umu-img '+props.clsName} src={this.state.src} alt={props.alt} />
        );
    }
}

SafeImg.defaultProps = {
    clsName: '',
    src: '',
    fallbackSrc: fallbackImg,
    alt: ''
}

SafeImg.PropTypes = {
    clsName: React.PropTypes.string,//自定义类名
    src: React.PropTypes.string,//图片地址
    fallbackSrc: React.PropTypes.string,//自定义默认图
    onError: React.PropTypes.func,//自定义错误处理
    onLoad: React.PropTypes.func,//自定义加载处理
    alt: React.PropTypes.string,// 图片说明
};
export default SafeImg;