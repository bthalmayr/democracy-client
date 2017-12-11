/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import styled from 'styled-components/native';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import List from './screens/List';
import ListDetails from './screens/ListDetails/ListDetails';

const Container = styled.View`
  flex: 1;
  background-color: #f5fcff;
`;

export default () => (
  <Router>
    <Container>
      <Route exact path="/" component={List} />
      <Route exact path="/details" component={ListDetails} />
    </Container>
  </Router>
);
