import React from 'react';
import {
  PixelRatio,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {KeyboardUtils} from 'react-native-keyboard-input';

export interface IKeyboardAccessoryViewContentProps {
  inputRef: any;
  setKeyboardOpenState: (value: boolean) => void;
  setCustomKeyboard: (kyybord: CustomKeyboard) => void;
}

export type CustomKeyboard = {
  component?: any;
  initialProps?: {title: string};
};

export const KeyboardAccessoryViewContent: React.FC<IKeyboardAccessoryViewContentProps> = ({
  setKeyboardOpenState,
  setCustomKeyboard,
  inputRef,
}) => {
  const getToolbarButtons = () => {
    return [
      {
        text: 'show1',
        testID: 'show1',
        onPress: () =>
          showKeyboardView('KeyboardView', 'FIRST - 1 (passed prop)'),
      },
      {
        text: 'show2',
        testID: 'show2',
        onPress: () =>
          showKeyboardView('AnotherKeyboardView', 'SECOND - 2 (passed prop)'),
      },
      {
        text: 'reset',
        testID: 'reset',
        onPress: () => resetKeyboardView(),
      },
    ];
  };

  const showKeyboardView = (component: any, title: string) => {
    setKeyboardOpenState(false);

    setCustomKeyboard({
      component,
      initialProps: {title},
    });
  };

  const resetKeyboardView = () => {
    setCustomKeyboard({});
  };

  return (
    <View style={styles.keyboardContainer}>
      <View style={styles.border} />
      <View style={styles.inputContainer}>
        <AutoGrowingTextInput
          maxHeight={200}
          style={styles.textInput}
          ref={inputRef}
          placeholder={'Message'}
          underlineColorAndroid="transparent"
          onFocus={resetKeyboardView}
          testID={'input'}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => KeyboardUtils.dismiss()}>
          <Text>Action</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.keybordButtonTypeContainer}>
        {getToolbarButtons().map((button, index) => (
          <TouchableOpacity
            onPress={button.onPress}
            style={styles.keybordButtonType}
            key={index}
            testID={button.testID}>
            <Text>{button.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    ...Platform.select({
      ios: {
        flex: 1,
        backgroundColor: '#F5FCFF',
      },
    }),
  },
  border: {borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#bbb'},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  keybordButtonTypeContainer: {flexDirection: 'row'},
  keybordButtonType: {paddingLeft: 15, paddingBottom: 10},
  textInput: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 5,
    fontSize: 16,
    backgroundColor: 'white',
    borderWidth: 0.5 / PixelRatio.get(),
    borderRadius: 18,
  },
  sendButton: {
    paddingRight: 15,
    paddingLeft: 15,
    alignSelf: 'center',
  },
});
