import React from 'react';
import Svg, { Path } from 'react-native-svg';

const DownArrowIcon = (props) => (
    <Svg width="30" height="30" viewBox="0 0 24 24" {...props}>
        <Path d="M7 10l5 5 5-5H7z" fill="gray" />
    </Svg>
);

export default DownArrowIcon;
