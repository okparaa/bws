import { h, Component, cloneElement } from 'preact';
import TransitionGroup from '@/components/transition-group';
import LiquidAnimator from '@/components/liquid-animator';
import AsyncRoute from '@/components/async-route';

let currentAnimation = null;

export default class LiquidRoute extends Component {
  constructor() {
    super();
  }
  getEntryAnimation() {
    return (currentAnimation && currentAnimation.getEntryAnimation()) || null;
  }
  getExitAnimation() {
    return (currentAnimation && currentAnimation.getExitAnimation()) || null;
  }
  setCurrentAnimation() {
    currentAnimation = this.props.animator;
  }
  render(props) {
    return (
      <TransitionGroup>
        <LiquidAnimator
          getEntryAnimation={() => {
            return this.getEntryAnimation();
          }}
          getExitAnimation={() => {
            return this.getExitAnimation();
          }}
          key={props.url}
          onSetCurrentAnimation={() => {
            this.setCurrentAnimation();
          }}
          {...props}
        >
          <AsyncRoute {...props} />
        </LiquidAnimator>
      </TransitionGroup>
    );
  }
}
