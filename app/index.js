import { StyleSheet, View } from "react-native";
import React from "react";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import HomeScreenNavigation from "./navigation/HomeScreenNavigation";

export default function index() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <HomeScreenNavigation />
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});