import { h, Component } from 'preact';
import animate from '@/components/animate'

export default class LiquidAnimator extends Component {
  constructor() {
    super();
  }
  componentWillEnter(cb) {
    this.props.onSetCurrentAnimation && this.props.onSetCurrentAnimation();
    const animation = this.props.getEntryAnimation();
    if (!animation) {
      return cb();
    }
    var anim = animation.animation;
    let container = this.container;
    container.style.opacity = 0;
    animate({
      el: container,
      ...anim,
      complete: function(){
        cb();
      }
    })
  }
  componentWillLeave(cb) {
    const animation = this.props.getExitAnimation();
    console.log('component will leave called')
    if (!animation) {
      return cb();
    }
    var anim = animation.animation;
    this.container.style.opacity = 1;
    animate({
      el: this.container,
      ...anim,
      complete: function(){
       cb();
      }
    })
  }
  render() {
    return (
      <div className="page-container">
        <div
          className="bws-page"
          ref={container => {
            this.container = container;
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
