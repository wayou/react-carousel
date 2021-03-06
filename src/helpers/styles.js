module.exports = {
    '.carousel-wrap': {
        overflow: 'hidden',
        position: 'relative',
    },
    '.carousel-wrap .carousel-slides': {
        position: 'relative',
        'white-space': 'nowrap',
        left: 0,
        transition: 'left .5s ease, right .5s ease',
    },
    '.carousel-wrap .carousel-item': {
        display: 'inline-block',
        position: 'relative',
        width: '100%',
    },
    '.carousel-wrap .carousel-item a, .carousel-wrap .carousel-item .carousel-img': {
        display: 'inline-block',
        color: '#fff',
        width: '100%',
    },
    '.carousel-wrap .carousel-item a:avtive': {
        color: '#fff',
    },
    '.carousel-wrap .carousel-title': {
        width: '100%',
        position: 'absolute',
        bottom: '3px',
        'font-size': '17px',
        padding: '14px 16px',
        'box-sizing': 'border-box',
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.65) 100%)',
    },
    '.carousel-wrap .carousel-title p': {
        'text-overflow': 'ellipsis',
        overflow: 'hidden',
        'margin-right': '50px',
        margin: 0,
    },
    '.carousel-wrap .carousel-indicator': {
        position: 'absolute',
        bottom: '14px',
        width: '100%',
        'text-align': 'right',
        margin: '0',
        padding: '0 16px',
        'box-sizing': 'border-box',
        'list-style': 'none',
    },
    '.carousel-wrap .indicator-item': {
        display: 'inline-block',
        width: '4px',
        height: '4px',
        'background-color': '#a5a3a5',
        margin: '2px',
        'border-radius': '50%',
    },
    '.carousel-wrap .indicator-item:last-child': {
        'margin-right': '0',
    },
    '.carousel-wrap .indicator-item.active': {
        'background-color': '#ffbd2b',
    }
};
