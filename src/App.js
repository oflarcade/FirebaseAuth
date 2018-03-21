import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state ={ loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
    apiKey: 'AIzaSyAlMYqoMpFBbbulXWEXfIZ2-mam6rQkhrA',
    authDomain: 'auth-bf4f5.firebaseapp.com',
    databaseURL: 'https://auth-bf4f5.firebaseio.com',
    projectId: 'auth-bf4f5',
    storageBucket: 'auth-bf4f5.appspot.com',
    messagingSenderId: '258292595627'
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
