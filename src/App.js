import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state ={ loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
    apiKey: '',
    authDomain: '',
    databaseURL: '', 
    projectId: '',
    storageBucket: '',
    messagingSenderId: ''
  });

  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
  });
}

  renderContent() {
      switch (this.state.loggedIn) {
        case true:
        return (
          <CardSection>
                  <Button onPress={() => firebase.auth().signOut()} style={styles.buttonStyle}>
                      Log Out
                  </Button>
          </CardSection>
        );
        case false:
          return <LoginForm />;
        default:
          return <Spinner size="large" />;
      }
  }

    render() {
      return (
        <View>
          <Header HeaderText="Authentication" />
          {this.renderContent()}
        </View>
      );
    }

}

const styles = {
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  }
};
export default App;
