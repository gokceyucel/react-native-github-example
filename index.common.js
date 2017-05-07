import { Navigation } from 'react-native-navigation';
import Main from './App/Components/Main';
import Dashboard from './App/Components/Dashboard';
import Profile from './App/Components/Profile';
import Repositories from './App/Components/Repositories';
import WebView from './App/Components/Helpers/WebView';

// register all screens of the app (including internal ones)
function registerScreens() {
  Navigation.registerComponent('Main', () => Main);
  Navigation.registerComponent('Dashboard', () => Dashboard);
  Navigation.registerComponent('Profile', () => Profile);
  Navigation.registerComponent('Repositories', () => Repositories); 
  Navigation.registerComponent('WebView', () => WebView); 
}
registerScreens();

// start the app
export default Navigation.startSingleScreenApp({
  screen: {
    screen: 'Main', // this is a registered name for a screen
    title: 'Main Screen'
  }
});
