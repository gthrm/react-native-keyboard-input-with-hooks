import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Platform,
  View,
  ScrollView,
  Text,
  TextInput,
  Switch,
} from 'react-native';
import {
  KeyboardAccessoryView,
  KeyboardUtils,
} from 'react-native-keyboard-input';
import _ from 'lodash';
import {
  CustomKeyboard,
  KeyboardAccessoryViewContent,
} from './KeyboardAccessoryViewContent';
import './demoKeyboards';

export const Screen = ({message}: {message: string}) => {
  const TrackInteractive = true;
  const [keyboardOpenState, setKeyboardOpenState] = useState(false);
  const [customKeyboard, setCustomKeyboard] = useState<CustomKeyboard>({});
  const [receivedKeyboardData, setReceivedKeyboardData] = useState<string>();
  const [useSafeArea, setUseSafeArea] = useState<boolean>(false);

  const [
    keyboardAccessoryViewHeight,
    setKeyboardAccessoryViewHeight,
  ] = useState<number | undefined>();

  const inputRef = useRef<TextInput>(null);

  const isCustomKeyboardOpen = () => {
    return keyboardOpenState && !_.isEmpty(customKeyboard);
  };

  const showLastKeyboard = () => {
    const customKeyboardConst = customKeyboard;
    setCustomKeyboard({});
    setTimeout(() => {
      setKeyboardOpenState(true);
      setCustomKeyboard(customKeyboardConst);
    }, 500);
  };

  const toggleUseSafeArea = () => {
    setUseSafeArea(!useSafeArea);

    if (isCustomKeyboardOpen()) {
      KeyboardUtils.dismiss();
      showLastKeyboard();
    }
  };

  const onKeyboardResigned = () => {
    setKeyboardOpenState(false);
    setCustomKeyboard({});
  };

  const onKeyboardItemSelected = (keyboardId: any, params: any) => {
    const receivedKeyboardDataString = `onItemSelected from "${keyboardId}"\nreceived params: ${JSON.stringify(
      params,
    )}`;
    setReceivedKeyboardData(receivedKeyboardDataString);
  };

  const safeAreaSwitchToggle = () => {
    if (Platform.OS !== 'ios') {
      return <View />;
    }
    return (
      <View style={styles.safeAreaSwitchContainer}>
        <Text>Safe Area Enabled:</Text>
        <Switch
          style={styles.switch}
          value={useSafeArea}
          onValueChange={toggleUseSafeArea}
        />
      </View>
    );
  };

  const redderContant = () => {
    return (
      <KeyboardAccessoryViewContent
        inputRef={inputRef}
        setKeyboardOpenState={setKeyboardOpenState}
        setCustomKeyboard={setCustomKeyboard}
      />
    );
  };

  console.log('====================================');
  console.log('--- keyboardAccessoryViewHeight', keyboardAccessoryViewHeight);
  console.log('====================================');
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardDismissMode={TrackInteractive ? 'interactive' : 'none'}>
        <Text style={styles.welcome}>{message || 'Keyboards example'}</Text>
        <Text testID={'demo-message'}>{receivedKeyboardData}</Text>
        {safeAreaSwitchToggle()}
      </ScrollView>
      <KeyboardAccessoryView
        renderContent={redderContant}
        onHeightChanged={(height: number) =>
          setKeyboardAccessoryViewHeight(
            Platform.OS === 'ios' ? height : undefined,
          )
        }
        trackInteractive={TrackInteractive}
        kbInputRef={inputRef}
        kbComponent={customKeyboard?.component}
        kbInitialProps={customKeyboard?.initialProps}
        onItemSelected={onKeyboardItemSelected}
        onKeyboardResigned={onKeyboardResigned}
        revealKeyboardInteractive
        useSafeArea={useSafeArea}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  scrollContainer: {
    justifyContent: 'center',
    padding: 15,
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    paddingTop: 50,
    paddingBottom: 50,
  },
  switch: {
    marginLeft: 15,
  },
  safeAreaSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
