import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

//Routes Simplifies the process of transitioning between views, and allows you to pass the Layout component that surrounds said view.
//Takes:
// - Layout Component as layout
// - View Component as component
// - Any extra variables specific to the react-router-dom module
// - path defined for that view.

const Routes = (props) => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

Routes.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
};

export default Routes;
