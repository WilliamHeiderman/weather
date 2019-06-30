import React from 'react';

export default function (props) {
  const {
    isLoaded,
    error,
    query,
  } = props;
  
  if (error) {
    return (<div className="form_state_error">{error}</div>)
  } else {
    return isLoaded || ( <div className="form_state_loading">Searching for {query}...</div> );
  }
}