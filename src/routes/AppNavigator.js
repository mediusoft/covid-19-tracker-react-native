import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import * as theme from "theme";
import { Home } from "screens/Home";
import Detail from "screens/Detail";
import Splash from "screens/Splash";

const Stack = createStackNavigator();

function AppNavigator({ defaultCountry }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        headerMode="screen"
        screenOptions={{
          gestureEnabled: true,
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: theme.colors.background_secondary
          }
        }}
      >
        <Stack.Screen
          name="Home"
          component={props => <Home defaultCountry={defaultCountry} {...props} />}
          screenOptions="default"
          options={{
            title: "Covid-19",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "bold"
            },
            headerLeft: null
          }}
        />

        <Stack.Screen
          name="Detail"
          component={Detail}
          options={({ route }) => ({
            title: route.params.selected,
            headerTitleStyle: {
              fontWeight: "bold"
            },
            headerTitleAlign: "center"
          })}
        />

        <Stack.Screen
          name="Splash"
          component={Splash}
          header={null}
          headerMode="none"
          options={() => ({
            title: "",
            headerStyle: {
              backgroundColor: theme.colors.background
            }
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
