import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {RouteNames} from "routes/names";

function Index(props) {
 
    function renderApp() {
        return(
          <span>
              <Route exact path={{RouteNames.Root}}/>
          </span>  
        );
    }
    
    
    return(
      <div>
          <h1>Welcome!</h1>
      </div>  
    );
}

export {Index};