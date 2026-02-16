import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import { colors } from '../../constants/colors';

const { width, height } = Dimensions.get('window');
const GRID_SIZE = 40;

export function BlueprintBackground() {
  const gridPath = Skia.Path.Make();

  // Vertical lines
  for (let x = 0; x <= width; x += GRID_SIZE) {
    gridPath.moveTo(x, 0);
    gridPath.lineTo(x, height);
  }

  // Horizontal lines
  for (let y = 0; y <= height; y += GRID_SIZE) {
    gridPath.moveTo(0, y);
    gridPath.lineTo(width, y);
  }

  return (
    <View style={styles.container} pointerEvents="none">
      <Canvas style={styles.canvas}>
        <Path
          path={gridPath}
          color="rgba(196,149,106,0.06)"
          style="stroke"
          strokeWidth={0.5}
        />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.cream.DEFAULT,
  },
  canvas: {
    flex: 1,
  },
});
