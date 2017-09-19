import React from 'react';
import { connect } from 'dva';

function mapStateToProps() {
  return {

  }
}
class NotFound extends React.PureComponent{
  componentWillUnmount(){
    this.props.dispatch({ type: 'route/hide', payload: { hideLeft: false }});
  }
  componentDidMount(){
    this.props.dispatch({ type: 'route/hide', payload: { hideLeft: true }});
  }
  render(){
    return (
      <div>404 NOT FOUND</div>
    )
  }
}

export default connect(mapStateToProps)(NotFound);
