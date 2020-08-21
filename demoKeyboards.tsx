import React from 'react';
import {Text, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import {KeyboardRegistry} from 'react-native-keyboard-input';

export interface IKeyboardViewProps {
  title: string;
}

export const KeyboardView: React.FC<IKeyboardViewProps> = ({title}) => {
  const onButtonPress = () => {
    KeyboardRegistry.onItemSelected('KeyboardView', {
      message: 'item selected from KeyboardView',
    });
  };
  return (
    <ScrollView
      contentContainerStyle={[
        styles.keyboardContainer,
        styles.firstKeyboardContainer,
      ]}>
      <Text style={styles.text}>HELOOOO!!!</Text>
      <Text style={styles.text}>{title}</Text>
      <TouchableOpacity
        testID={'click-me'}
        style={styles.button}
        onPress={onButtonPress}>
        <Text>Click Me!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export interface IAnotherKeyboardViewProps {
  title: string;
}

export const AnotherKeyboardView: React.FC<IAnotherKeyboardViewProps> = ({
  title,
}) => {
  const onButtonPress = () => {
    KeyboardRegistry.toggleExpandedKeyboard('AnotherKeyboardView');
  };
  return (
    <ScrollView
      contentContainerStyle={[
        styles.keyboardContainer,
        styles.anotherKeyboardContainer,
      ]}>
      <Text>*** ANOTHER ONE ***</Text>
      <Text>{title}</Text>
      <TouchableOpacity
        testID={'toggle-fs'}
        style={styles.button}
        onPress={onButtonPress}>
        <Text>Toggle Full-Screen!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstKeyboardContainer: {backgroundColor: 'purple'},
  anotherKeyboardContainer: {backgroundColor: 'orange'},
  button: {padding: 20, marginTop: 30, backgroundColor: 'white'},
  text: {color: 'white'},
});

KeyboardRegistry.registerKeyboard('KeyboardView', () => KeyboardView);
KeyboardRegistry.registerKeyboard(
  'AnotherKeyboardView',
  () => AnotherKeyboardView,
);
