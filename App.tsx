import 'react-native-devsettings';
import React from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import Main from './src/routes/main';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistor, store } from './src/redux/store';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      {/* <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}> */}
      <Main />
      {/* </PersistGate>
      </Provider> */}
    </SafeAreaProvider>
  );
}

export default App;
