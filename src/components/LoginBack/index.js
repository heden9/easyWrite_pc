import React from 'react';
import './style.less';
import 'particles.js';

export default class LoginBack extends React.PureComponent{
  componentDidMount(){
    particlesJS("particles", {
      particles: {
        number: {
          value: 20,
          density: {
            enable: !0,
            value_area: 1E3
          }
        },
        color: {
          value: "#e1e1e1"
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000"
          },
          polygon: {
            nb_sides: 5
          },
          image: {
            src: "img/github.svg",
            width: 100,
            height: 100
          }
        },
        opacity: {
          value: .5,
          random: !1,
          anim: {
            enable: !1,
            speed: 1,
            opacity_min: .1,
            sync: !1
          }
        },
        size: {
          value: 15,
          random: !0,
          anim: {
            enable: !1,
            speed: 180,
            size_min: .1,
            sync: !1
          }
        },
        line_linked: {
          enable: !0,
          distance: 650,
          color: "#cfcfcf",
          opacity: .26,
          width: 1
        },
        move: {
          enable: !0,
          speed: 2,
          direction: "none",
          random: !0,
          straight: !1,
          out_mode: "out",
          bounce: !1,
          attract: {
            enable: !1,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: !1,
            mode: "repulse"
          },
          onclick: {
            enable: !1,
            mode: "push"
          },
          resize: !0
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: .4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: !0
    });
  }
  render(){
    return (
      <div id="particles" className={this.props.className}>
        {this.props.children}
      </div>
    )
  }
}
