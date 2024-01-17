// @flow
import React from 'react';
import type { Node } from 'react';
import {
  Svg, Path, G, Rect, Polygon,
} from 'react-native-svg';

type Props = {
  style?: Object,
};

function Legend(props: Props): Node {
  return (
    <Svg viewBox="0 0 714.89 127.8" style={props.style}>
      <G>
        <Path fill="#fff" opacity="0.8" d="M1542,2404.2a2.59,2.59,0,0,0,1,2.18,4.78,4.78,0,0,0,2.94.79,5.61,5.61,0,0,0,3.09-.82A4.94,4.94,0,0,0,1551,2404v-2.58h-5Q1541.95,2401.38,1542,2404.2Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#fff" opacity="0.8" d="M1739,2415.35a4.35,4.35,0,0,0-2.19-.56,4.4,4.4,0,0,0-2.21.56,4.06,4.06,0,0,0-1.54,1.59,5.23,5.23,0,0,0,0,4.71,4.09,4.09,0,0,0,1.54,1.6,4.4,4.4,0,0,0,2.21.56,4.35,4.35,0,0,0,2.19-.56,4,4,0,0,0,1.54-1.6,5.23,5.23,0,0,0,0-4.71A4,4,0,0,0,1739,2415.35Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#fff" opacity="0.8" d="M1787.73,2414.77a3.92,3.92,0,0,0-2.8,1.06,4.16,4.16,0,0,0-1.29,2.79h8.21a4.25,4.25,0,0,0-1.29-2.79A4,4,0,0,0,1787.73,2414.77Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#fff" opacity="0.8" d="M1751.5,2414.77a4,4,0,0,0-2.81,1.06,4.2,4.2,0,0,0-1.28,2.79h8.2a4.16,4.16,0,0,0-1.29-2.79A3.94,3.94,0,0,0,1751.5,2414.77Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#fff" opacity="0.8" d="M1782.12,2382a5.43,5.43,0,0,0-2.13-2,6.95,6.95,0,0,0-6.18,0,5.17,5.17,0,0,0-2.13,2,6.23,6.23,0,0,0,0,6,5.26,5.26,0,0,0,2.13,2.05,6.36,6.36,0,0,0,3.07.74,6.47,6.47,0,0,0,3.09-.74,5.31,5.31,0,0,0,2.15-2.05,5.87,5.87,0,0,0,.76-3A5.81,5.81,0,0,0,1782.12,2382Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#fff" opacity="0.8" d="M1800.7,2388.53V2386h-5q-4.05,0-4,2.82a2.57,2.57,0,0,0,1,2.17,4.78,4.78,0,0,0,2.94.8,5.62,5.62,0,0,0,3.09-.83A4.91,4.91,0,0,0,1800.7,2388.53Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#fff" opacity="0.8" d="M1355.25,2380a6.29,6.29,0,0,0-6,0,5.42,5.42,0,0,0-2.1,2.17,7.08,7.08,0,0,0,0,6.42,5.45,5.45,0,0,0,2.1,2.18,6.36,6.36,0,0,0,6,0,5.33,5.33,0,0,0,2.08-2.18,7.24,7.24,0,0,0,0-6.42A5.31,5.31,0,0,0,1355.25,2380Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#fff" opacity="0.8" d="M1325.8,2421.6a2,2,0,0,0,.8,1.67,3.72,3.72,0,0,0,2.26.61,4.24,4.24,0,0,0,2.37-.64,3.76,3.76,0,0,0,1.47-1.82v-2h-3.8C1326.83,2419.44,1325.8,2420.16,1325.8,2421.6Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#fff" opacity="0.8" d="M1367.45,2414.26a4.14,4.14,0,0,0-2.93,1.12,4.38,4.38,0,0,0-1.35,2.91h8.58a4.37,4.37,0,0,0-1.34-2.91A4.18,4.18,0,0,0,1367.45,2414.26Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#fff" opacity="0.8" d="M1433.37,2380.62a5.42,5.42,0,0,0-3.86-1.46,5.36,5.36,0,0,0-3.82,1.46,5.71,5.71,0,0,0-1.76,3.79h11.19A5.7,5.7,0,0,0,1433.37,2380.62Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#fff" opacity="0.8" d="M1762.2,2380.65a5.82,5.82,0,0,0-7.69,0,5.72,5.72,0,0,0-1.75,3.8H1764A5.77,5.77,0,0,0,1762.2,2380.65Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#fff" opacity="0.8" d="M1330.41,2390.73a6.32,6.32,0,0,0,6,0,5.43,5.43,0,0,0,2.12-2.18,6.62,6.62,0,0,0,.76-3.21,6.51,6.51,0,0,0-.76-3.19,5.56,5.56,0,0,0-2.12-2.18,6.18,6.18,0,0,0-6,0,5.58,5.58,0,0,0-2.1,2.18,6.52,6.52,0,0,0-.77,3.19,6.62,6.62,0,0,0,.77,3.21A5.45,5.45,0,0,0,1330.41,2390.73Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#fff" opacity="0.8" d="M1399.5,2414.87a4.51,4.51,0,0,0-2.29-.58,4.56,4.56,0,0,0-2.31.58,4.18,4.18,0,0,0-1.61,1.67,5.42,5.42,0,0,0,0,4.92,4.18,4.18,0,0,0,1.61,1.67,4.56,4.56,0,0,0,2.31.59,4.51,4.51,0,0,0,2.29-.59,4.18,4.18,0,0,0,1.61-1.67,5.42,5.42,0,0,0,0-4.92A4.18,4.18,0,0,0,1399.5,2414.87Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#fff" opacity="0.8" d="M1437.06,2414.85a4.89,4.89,0,0,0-2.38-.56,5,5,0,0,0-2.36.55,4,4,0,0,0-1.63,1.56,4.78,4.78,0,0,0,0,4.6,4.06,4.06,0,0,0,1.63,1.58,5,5,0,0,0,2.36.56,5.05,5.05,0,0,0,2.37-.56,4.09,4.09,0,0,0,1.64-1.58,4.76,4.76,0,0,0,0-4.59A4.15,4.15,0,0,0,1437.06,2414.85Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#fff" opacity="0.8" d="M1850.8,2379.2a5.37,5.37,0,0,0-3.83,1.45,5.72,5.72,0,0,0-1.75,3.8h11.19a5.73,5.73,0,0,0-1.76-3.8A5.39,5.39,0,0,0,1850.8,2379.2Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#fff" opacity="0.8" d="M1865,2334.25H1234.87a42.37,42.37,0,0,0-42.37,42.38v43a42.37,42.37,0,0,0,42.37,42.38H1865a42.37,42.37,0,0,0,42.37-42.38v-43A42.37,42.37,0,0,0,1865,2334.25Zm-113.38,47a7.25,7.25,0,0,1,2.75-2.85,7.75,7.75,0,0,1,3.95-1,7.63,7.63,0,0,1,3.93,1,7.22,7.22,0,0,1,2.73,2.83,8.56,8.56,0,0,1,1,4.16l0,.66h-13.2a5.63,5.63,0,0,0,1.89,4,6.28,6.28,0,0,0,4.32,1.52,6.81,6.81,0,0,0,2.7-.53,5.88,5.88,0,0,0,2.13-1.54l1.2,1.38a6.74,6.74,0,0,1-2.62,1.92,8.9,8.9,0,0,1-3.47.66,8.72,8.72,0,0,1-4.3-1,7.4,7.4,0,0,1-2.93-2.86,8.17,8.17,0,0,1-1-4.14A8.46,8.46,0,0,1,1751.64,2381.24Zm-352.16-9.82a1.51,1.51,0,0,1,1.11-.45,1.54,1.54,0,0,1,1.11.44,1.38,1.38,0,0,1,.45,1,1.57,1.57,0,0,1-2.67,1.11,1.47,1.47,0,0,1-.45-1.08A1.44,1.44,0,0,1,1399.48,2371.42Zm2.16,6v15.78h-2.13v-15.78Zm-22.41-6a1.51,1.51,0,0,1,1.11-.45,1.54,1.54,0,0,1,1.11.44,1.38,1.38,0,0,1,.45,1,1.57,1.57,0,0,1-2.67,1.11,1.47,1.47,0,0,1-.45-1.08A1.44,1.44,0,0,1,1379.23,2371.42Zm2.16,6v15.78h-2.13v-15.78Zm-56,0h2v3.12a6.57,6.57,0,0,1,2.54-2.4,7.42,7.42,0,0,1,3.55-.84,8.11,8.11,0,0,1,4,1,7.17,7.17,0,0,1,2.82,2.83,9.1,9.1,0,0,1,0,8.37,7.22,7.22,0,0,1-2.8,2.84,8.1,8.1,0,0,1-4,1,7.44,7.44,0,0,1-3.46-.79,6.59,6.59,0,0,1-2.54-2.33v8.79h-2.13Zm-24.17,33.77a17.8,17.8,0,0,1-17.8,17.8h-24.83a17.8,17.8,0,0,1-17.79-17.8V2386.4a17.8,17.8,0,0,1,17.79-17.8h24.83a17.8,17.8,0,0,1,17.8,17.8Zm33.06,13.83h-1.56v-1.89a3.82,3.82,0,0,1-1.62,1.48,5.74,5.74,0,0,1-2.55.53,5,5,0,0,1-3.22-1,3.34,3.34,0,0,1-.08-5,5.48,5.48,0,0,1,3.56-.94h3.84v-.74a3.09,3.09,0,0,0-.88-2.38,3.61,3.61,0,0,0-2.55-.81,6.34,6.34,0,0,0-2.21.38,5.54,5.54,0,0,0-1.81,1l-.74-1.22a6.44,6.44,0,0,1,2.21-1.2,8.41,8.41,0,0,1,2.71-.43,5.15,5.15,0,0,1,3.64,1.19,4.55,4.55,0,0,1,1.26,3.5Zm11.35-.82a6.21,6.21,0,0,1-3.67.94,9.33,9.33,0,0,1-2.81-.43,6,6,0,0,1-2.11-1.07l.74-1.29a6,6,0,0,0,1.91,1,7.62,7.62,0,0,0,2.39.38,4.53,4.53,0,0,0,2.45-.52,1.63,1.63,0,0,0,.79-1.46,1.31,1.31,0,0,0-.44-1,2.82,2.82,0,0,0-1.1-.58,15.27,15.27,0,0,0-1.77-.38,20.11,20.11,0,0,1-2.37-.56,3.45,3.45,0,0,1-1.53-1,2.73,2.73,0,0,1-.63-1.91,3,3,0,0,1,1.26-2.48,5.66,5.66,0,0,1,3.52-1,9,9,0,0,1,2.35.31,6.52,6.52,0,0,1,1.93.82l-.71,1.31a6.13,6.13,0,0,0-3.57-1,4.13,4.13,0,0,0-2.36.56,1.69,1.69,0,0,0-.79,1.44,1.45,1.45,0,0,0,.45,1.11,2.72,2.72,0,0,0,1.11.61c.45.13,1.06.26,1.84.4a23.59,23.59,0,0,1,2.33.55,3.41,3.41,0,0,1,1.49,1,2.55,2.55,0,0,1,.62,1.84A2.92,2.92,0,0,1,1345.68,2424.23Zm5.36-2.76a4.14,4.14,0,0,0,1.63,1.66,4.78,4.78,0,0,0,2.36.59,4.61,4.61,0,0,0,2-.44,3.74,3.74,0,0,0,1.52-1.33l1.22.82a4.64,4.64,0,0,1-2,1.79,6.27,6.27,0,0,1-2.78.61,6.47,6.47,0,0,1-3.21-.79,5.7,5.7,0,0,1-2.22-2.19,6.43,6.43,0,0,1-.8-3.19,6.3,6.3,0,0,1,.8-3.17,5.7,5.7,0,0,1,2.22-2.19,6.57,6.57,0,0,1,3.21-.78,6.2,6.2,0,0,1,2.8.61,4.69,4.69,0,0,1,1.94,1.78l-1.22.83a3.69,3.69,0,0,0-1.52-1.34,4.48,4.48,0,0,0-2-.45,4.77,4.77,0,0,0-2.36.58,4.16,4.16,0,0,0-1.63,1.67,5.44,5.44,0,0,0,0,4.93Zm8.17-32a7.47,7.47,0,0,1-2.87,2.87,8.72,8.72,0,0,1-8.22,0,7.56,7.56,0,0,1-2.88-2.87,8.69,8.69,0,0,1,0-8.28,7.44,7.44,0,0,1,2.88-2.85,8.79,8.79,0,0,1,8.22,0,7.35,7.35,0,0,1,2.87,2.85,8.84,8.84,0,0,1,0,8.28Zm14.08,30h-10.12a4.38,4.38,0,0,0,1.45,3,4.84,4.84,0,0,0,3.31,1.16,5.13,5.13,0,0,0,2.07-.41,4.44,4.44,0,0,0,1.64-1.18l.92,1.06a5.26,5.26,0,0,1-2,1.47,7.18,7.18,0,0,1-6-.29,5.69,5.69,0,0,1-2.24-2.19,6.27,6.27,0,0,1-.81-3.18,6.5,6.5,0,0,1,.77-3.17,5.52,5.52,0,0,1,2.12-2.19,5.88,5.88,0,0,1,3-.78,5.82,5.82,0,0,1,3,.78,5.58,5.58,0,0,1,2.1,2.18,6.59,6.59,0,0,1,.76,3.18Zm.32-27.34a8.22,8.22,0,0,1-4.79,1.21,12.08,12.08,0,0,1-3.67-.55,7.93,7.93,0,0,1-2.75-1.4l1-1.68a8.09,8.09,0,0,0,2.49,1.28,9.89,9.89,0,0,0,3.12.49,6,6,0,0,0,3.2-.67,2.15,2.15,0,0,0,1-1.91,1.7,1.7,0,0,0-.57-1.36,3.79,3.79,0,0,0-1.44-.75,20.39,20.39,0,0,0-2.31-.5,26.62,26.62,0,0,1-3.09-.73,4.53,4.53,0,0,1-2-1.28,3.55,3.55,0,0,1-.83-2.49,3.9,3.9,0,0,1,1.65-3.24,7.41,7.41,0,0,1,4.59-1.26,11.92,11.92,0,0,1,3.06.41,8.42,8.42,0,0,1,2.52,1.06l-.93,1.71a8,8,0,0,0-4.65-1.35,5.37,5.37,0,0,0-3.07.72,2.21,2.21,0,0,0-1,1.89,1.87,1.87,0,0,0,.59,1.44,3.59,3.59,0,0,0,1.45.8,23.7,23.7,0,0,0,2.4.52,27.61,27.61,0,0,1,3,.72,4.45,4.45,0,0,1,2,1.23,3.38,3.38,0,0,1,.81,2.4A3.82,3.82,0,0,1,1373.61,2392.17Zm14.17,32.88h-1.63v-6.85a4,4,0,0,0-.94-2.88,3.55,3.55,0,0,0-2.69-1,4.16,4.16,0,0,0-3.1,1.16,4.4,4.4,0,0,0-1.14,3.21v6.35h-1.63V2413h1.56v2.23a4.66,4.66,0,0,1,1.86-1.71,5.85,5.85,0,0,1,2.74-.61,5,5,0,0,1,3.63,1.32,5.22,5.22,0,0,1,1.34,3.86Zm-.09-36.26v-9.54h-2.82v-1.8h2.82V2374h2.13v3.45h4.8v1.8h-4.8v9.42a3,3,0,0,0,.71,2.15,2.66,2.66,0,0,0,2,.73,4,4,0,0,0,1.28-.21,3.15,3.15,0,0,0,1.06-.6l.75,1.53a4,4,0,0,1-1.48.83,6,6,0,0,1-1.85.28,4.18,4.18,0,0,1-4.62-4.59Zm15.62,36.26h-1.57v-2.39a5,5,0,0,1-1.94,1.86,5.71,5.71,0,0,1-2.73.65,6.06,6.06,0,0,1-3.08-.79,5.59,5.59,0,0,1-2.16-2.18,7,7,0,0,1,0-6.4,5.56,5.56,0,0,1,2.16-2.17,6.26,6.26,0,0,1,3.08-.77,5.67,5.67,0,0,1,2.66.61,5,5,0,0,1,1.94,1.78V2408h1.64Zm6.18,0h-1.63V2413h1.63Zm0-15.09a1.21,1.21,0,0,1-1.7,0,1.13,1.13,0,0,1-.35-.83,1.11,1.11,0,0,1,.35-.8,1.15,1.15,0,0,1,.85-.34,1.18,1.18,0,0,1,.85.33,1.07,1.07,0,0,1,.35.79A1.15,1.15,0,0,1,1409.54,2410Zm2.09-16.73-7-15.78h2.22l5.91,13.44,6-13.44h2.1l-7,15.78Zm13.55,31.82h-1.63v-6.85a4,4,0,0,0-1-2.88,3.52,3.52,0,0,0-2.69-1,4.15,4.15,0,0,0-3.09,1.16,4.4,4.4,0,0,0-1.14,3.21v6.35h-1.63V2413h1.56v2.23a4.63,4.63,0,0,1,1.85-1.71,5.9,5.9,0,0,1,2.75-.61,4.93,4.93,0,0,1,3.62,1.32,5.18,5.18,0,0,1,1.35,3.86Zm-2.33-35.57a8.17,8.17,0,0,1-1-4.14,8.46,8.46,0,0,1,1-4.14,7.28,7.28,0,0,1,2.76-2.85,8.1,8.1,0,0,1,7.87,0,7.24,7.24,0,0,1,2.73,2.84,8.52,8.52,0,0,1,1,4.15l0,.66h-13.2a5.65,5.65,0,0,0,1.89,4,6.27,6.27,0,0,0,4.32,1.51,6.81,6.81,0,0,0,2.7-.52,5.91,5.91,0,0,0,2.13-1.55l1.2,1.38a6.74,6.74,0,0,1-2.62,1.92,8.9,8.9,0,0,1-3.47.66,8.74,8.74,0,0,1-4.3-1A7.49,7.49,0,0,1,1422.85,2389.48Zm18,34.1a6.16,6.16,0,0,1-1.51,4.56,6.22,6.22,0,0,1-4.54,1.49,10.19,10.19,0,0,1-3.19-.5,6.5,6.5,0,0,1-2.45-1.37l.83-1.24a6.16,6.16,0,0,0,2.13,1.22,7.93,7.93,0,0,0,2.63.44,4.66,4.66,0,0,0,3.38-1.07,4.5,4.5,0,0,0,1.08-3.32v-1.55a4.88,4.88,0,0,1-2,1.75,6.13,6.13,0,0,1-2.72.6,6.43,6.43,0,0,1-3.1-.75,5.48,5.48,0,0,1-2.18-2.09,5.88,5.88,0,0,1-.79-3.05,5.8,5.8,0,0,1,.79-3,5.47,5.47,0,0,1,2.17-2.07,6.52,6.52,0,0,1,3.11-.74,6.17,6.17,0,0,1,2.78.62,5,5,0,0,1,2,1.8V2413h1.57Zm75.74-2a7.15,7.15,0,0,1-7.15,7.15h-9a7.15,7.15,0,0,1-7.16-7.15v-46.11a7.16,7.16,0,0,1,7.16-7.16h9a7.16,7.16,0,0,1,7.15,7.16Zm36.47-12.86h-2v-2.46a4.87,4.87,0,0,1-2.11,1.92,7.42,7.42,0,0,1-3.32.69,6.49,6.49,0,0,1-4.2-1.26,4.33,4.33,0,0,1-.1-6.57,7.1,7.1,0,0,1,4.63-1.23h5v-1a4,4,0,0,0-1.14-3.1,4.71,4.71,0,0,0-3.33-1.07,8.47,8.47,0,0,0-2.88.5,7.25,7.25,0,0,0-2.37,1.36l-1-1.59a8.5,8.5,0,0,1,2.88-1.57,11.21,11.21,0,0,1,3.54-.56,6.68,6.68,0,0,1,4.74,1.55,6,6,0,0,1,1.65,4.57Zm15.84,0-5-6.6-5,6.6h-2.4l6.24-8.1-5.94-7.68h2.4l4.74,6.18,4.74-6.18H1571l-5.93,7.68,6.29,8.1Zm8.1,0h-2.13v-15.78H1577Zm.06-19.68a1.59,1.59,0,0,1-2.22,0,1.47,1.47,0,0,1-.45-1.08,1.44,1.44,0,0,1,.45-1.05,1.51,1.51,0,0,1,1.11-.45,1.54,1.54,0,0,1,1.11.44,1.38,1.38,0,0,1,.45,1A1.51,1.51,0,0,1,1577.08,2389Zm14.9,18.62a8.22,8.22,0,0,1-4.79,1.21,12.08,12.08,0,0,1-3.67-.55,7.93,7.93,0,0,1-2.75-1.4l1-1.68a8.09,8.09,0,0,0,2.49,1.28,9.89,9.89,0,0,0,3.12.49,6,6,0,0,0,3.2-.67,2.15,2.15,0,0,0,1-1.91,1.7,1.7,0,0,0-.57-1.36,3.79,3.79,0,0,0-1.44-.75,20.39,20.39,0,0,0-2.31-.5,26.62,26.62,0,0,1-3.09-.73,4.53,4.53,0,0,1-2-1.28,3.55,3.55,0,0,1-.83-2.49,3.9,3.9,0,0,1,1.65-3.24,7.41,7.41,0,0,1,4.59-1.26,11.92,11.92,0,0,1,3.06.41,8.42,8.42,0,0,1,2.52,1.06l-.93,1.71a8,8,0,0,0-4.65-1.35,5.37,5.37,0,0,0-3.07.72,2.21,2.21,0,0,0-1,1.89,1.87,1.87,0,0,0,.59,1.44,3.59,3.59,0,0,0,1.45.8,23.7,23.7,0,0,0,2.4.52,27.61,27.61,0,0,1,3,.72,4.45,4.45,0,0,1,2,1.23,3.38,3.38,0,0,1,.81,2.4A3.82,3.82,0,0,1,1592,2407.64Zm115.69,3.62a17.79,17.79,0,0,1-17.79,17.79h-24.83a17.79,17.79,0,0,1-17.79-17.79v-24.83a17.79,17.79,0,0,1,17.79-17.8h24.83a17.79,17.79,0,0,1,17.79,17.8Zm35,13.82h-1.49v-2.28a4.81,4.81,0,0,1-1.86,1.78,5.46,5.46,0,0,1-2.61.61,5.88,5.88,0,0,1-3-.74,5.31,5.31,0,0,1-2.06-2.09,6.62,6.62,0,0,1,0-6.12,5.22,5.22,0,0,1,2.06-2.08,6,6,0,0,1,3-.74,5.44,5.44,0,0,1,2.54.59,4.74,4.74,0,0,1,1.86,1.7v-6.95h1.56Zm.36-44.5a4.62,4.62,0,0,0-3.51-1.29,5.38,5.38,0,0,0-4,1.51A5.74,5.74,0,0,0,1734,2385v8.28h-2.13v-15.78h2v2.91a6,6,0,0,1,2.42-2.24,7.71,7.71,0,0,1,3.58-.79,6.46,6.46,0,0,1,4.73,1.72,6.75,6.75,0,0,1,1.75,5v9.15h-2.13v-8.94A5.23,5.23,0,0,0,1743,2380.58Zm14.08,39.2h-9.68a4.12,4.12,0,0,0,1.38,2.92,4.61,4.61,0,0,0,3.17,1.11,4.93,4.93,0,0,0,2-.39,4.23,4.23,0,0,0,1.56-1.13l.88,1a4.85,4.85,0,0,1-1.92,1.41,7,7,0,0,1-5.7-.27,5.52,5.52,0,0,1-2.15-2.11,6,6,0,0,1-.77-3,6.25,6.25,0,0,1,.74-3,5.41,5.41,0,0,1,2-2.09,5.67,5.67,0,0,1,2.9-.75,5.57,5.57,0,0,1,2.88.75,5.27,5.27,0,0,1,2,2.08,6.2,6.2,0,0,1,.73,3.05Zm9.82,4.52a6,6,0,0,1-3.51.89,9,9,0,0,1-2.7-.4,5.73,5.73,0,0,1-2-1l.71-1.23a5.88,5.88,0,0,0,1.82.94,7.32,7.32,0,0,0,2.29.36,4.34,4.34,0,0,0,2.34-.49,1.57,1.57,0,0,0,.76-1.4,1.24,1.24,0,0,0-.42-1,2.76,2.76,0,0,0-1-.55,14.37,14.37,0,0,0-1.7-.37,18.83,18.83,0,0,1-2.26-.53,3.47,3.47,0,0,1-1.47-.94,2.62,2.62,0,0,1-.6-1.83,2.84,2.84,0,0,1,1.21-2.37,5.42,5.42,0,0,1,3.37-.93,8.68,8.68,0,0,1,2.24.3,6.36,6.36,0,0,1,1.85.78l-.68,1.26a5.86,5.86,0,0,0-3.41-1,4,4,0,0,0-2.26.52,1.63,1.63,0,0,0-.76,1.39,1.37,1.37,0,0,0,.43,1.06,2.76,2.76,0,0,0,1.07.58,17.73,17.73,0,0,0,1.76.38c.92.18,1.66.36,2.22.53a3.35,3.35,0,0,1,1.43.9,2.48,2.48,0,0,1,.59,1.76A2.79,2.79,0,0,1,1766.91,2424.3Zm13.32-32.41a8,8,0,0,1-3.56.78,8.37,8.37,0,0,1-4-1,7.2,7.2,0,0,1-2.85-2.73,8.08,8.08,0,0,1,0-7.93,7.14,7.14,0,0,1,2.83-2.7,8.47,8.47,0,0,1,4.05-1,8,8,0,0,1,3.63.81,6.54,6.54,0,0,1,2.61,2.34v-3h2v13.86q0,4-2,6t-5.93,1.94a13.21,13.21,0,0,1-4.15-.65,8.56,8.56,0,0,1-3.2-1.78l1.08-1.62a8,8,0,0,0,2.78,1.59,10.33,10.33,0,0,0,3.43.57,6.06,6.06,0,0,0,4.41-1.4,5.86,5.86,0,0,0,1.41-4.33v-2A6.41,6.41,0,0,1,1780.23,2391.89Zm-8.2,29.77a4,4,0,0,0,1.57,1.59,4.52,4.52,0,0,0,2.25.56,4.35,4.35,0,0,0,1.91-.42,3.52,3.52,0,0,0,1.46-1.28l1.16.8a4.4,4.4,0,0,1-1.87,1.7,5.94,5.94,0,0,1-2.66.58,6.23,6.23,0,0,1-3.07-.74,5.42,5.42,0,0,1-2.12-2.1,6.12,6.12,0,0,1-.77-3,6.05,6.05,0,0,1,.77-3,5.46,5.46,0,0,1,2.12-2.09,6.23,6.23,0,0,1,3.07-.75,5.89,5.89,0,0,1,2.67.59,4.37,4.37,0,0,1,1.86,1.7l-1.16.79a3.59,3.59,0,0,0-1.46-1.28,4.22,4.22,0,0,0-1.91-.43,4.52,4.52,0,0,0-2.25.56,4,4,0,0,0-1.57,1.59,4.93,4.93,0,0,0-.56,2.36A4.87,4.87,0,0,0,1772,2421.66Zm21.29-1.88h-9.68a4.16,4.16,0,0,0,1.38,2.92,4.63,4.63,0,0,0,3.17,1.11,4.93,4.93,0,0,0,2-.39,4.15,4.15,0,0,0,1.56-1.13l.88,1a4.85,4.85,0,0,1-1.92,1.41,7,7,0,0,1-5.7-.27,5.43,5.43,0,0,1-2.14-2.11,5.89,5.89,0,0,1-.77-3,6.24,6.24,0,0,1,.73-3,5.44,5.44,0,0,1,2-2.09,5.64,5.64,0,0,1,2.89-.75,5.57,5.57,0,0,1,2.88.75,5.27,5.27,0,0,1,2,2.08,6.2,6.2,0,0,1,.73,3.05Zm-2.16-27.62a4.33,4.33,0,0,1-.1-6.57,7.1,7.1,0,0,1,4.63-1.23h5v-1a4.06,4.06,0,0,0-1.14-3.11,4.71,4.71,0,0,0-3.33-1.06,8.46,8.46,0,0,0-2.88.49,7.27,7.27,0,0,0-2.37,1.37l-1-1.59a8.52,8.52,0,0,1,2.88-1.58,11.21,11.21,0,0,1,3.54-.55,6.68,6.68,0,0,1,4.74,1.54,6,6,0,0,1,1.65,4.58v9.78h-2v-2.46a4.87,4.87,0,0,1-2.11,1.92,7.42,7.42,0,0,1-3.32.69A6.49,6.49,0,0,1,1791.16,2392.16Zm16,32.92h-1.56v-6.55a3.84,3.84,0,0,0-.9-2.75,3.41,3.41,0,0,0-2.58-1,4,4,0,0,0-3,1.11,4.23,4.23,0,0,0-1.09,3.07v6.07h-1.56v-11.57h1.5v2.14a4.25,4.25,0,0,1,1.77-1.64,5.63,5.63,0,0,1,2.63-.59,4.74,4.74,0,0,1,3.46,1.27,4.92,4.92,0,0,1,1.29,3.68Zm1.8-36.25v-9.54h-2.82v-1.8H1809V2374h2.13v3.45h4.8v1.8h-4.8v9.42a3,3,0,0,0,.7,2.14,2.69,2.69,0,0,0,2,.74,3.89,3.89,0,0,0,1.27-.21,3.19,3.19,0,0,0,1.07-.6l.75,1.53a4,4,0,0,1-1.49.82,6,6,0,0,1-1.84.29,4.18,4.18,0,0,1-4.62-4.59Zm13,36.25h-1.5v-2.28a4.81,4.81,0,0,1-1.86,1.78,5.45,5.45,0,0,1-2.6.61,5.85,5.85,0,0,1-3-.74,5.4,5.4,0,0,1-2.07-2.09,6.62,6.62,0,0,1,0-6.12,5.31,5.31,0,0,1,2.07-2.08,6,6,0,0,1,3-.74,5.46,5.46,0,0,1,2.54.59,4.88,4.88,0,0,1,1.86,1.7v-6.95H1822Zm.9-31.81h-2.13v-15.78h2.13Zm.06-19.68a1.59,1.59,0,0,1-2.22,0,1.47,1.47,0,0,1-.45-1.08,1.44,1.44,0,0,1,.45-1.05,1.51,1.51,0,0,1,1.11-.45,1.53,1.53,0,0,1,1.11.43,1.4,1.4,0,0,1,.45,1A1.51,1.51,0,0,1,1823,2373.59Zm5.16,3.9,5.91,13.44,6-13.44h2.1l-7,15.78h-2.19l-7-15.78Zm-.2,47.59h-1.57v-11.57H1828Zm0-14.43a1.17,1.17,0,0,1-1.63,0,1.07,1.07,0,0,1-.33-.79,1.06,1.06,0,0,1,.33-.77,1.11,1.11,0,0,1,.82-.33,1.13,1.13,0,0,1,.81.32,1,1,0,0,1,.33.76A1.1,1.1,0,0,1,1828,2410.65Zm15,14.43h-1.56v-6.55a3.84,3.84,0,0,0-.9-2.75,3.4,3.4,0,0,0-2.58-1,4,4,0,0,0-3,1.11,4.23,4.23,0,0,0-1.09,3.07v6.07h-1.56v-11.57h1.5v2.14a4.25,4.25,0,0,1,1.77-1.64,5.63,5.63,0,0,1,2.63-.59,4.72,4.72,0,0,1,3.46,1.27,4.92,4.92,0,0,1,1.29,3.68Zm15-1.4a5.88,5.88,0,0,1-1.44,4.36,5.94,5.94,0,0,1-4.34,1.42,9.88,9.88,0,0,1-3.05-.47,6.28,6.28,0,0,1-2.34-1.31l.79-1.19a6,6,0,0,0,2,1.17,7.57,7.57,0,0,0,2.52.42,4.42,4.42,0,0,0,3.24-1,4.3,4.3,0,0,0,1-3.18v-1.47a4.71,4.71,0,0,1-1.9,1.67,5.91,5.91,0,0,1-2.61.57,6.14,6.14,0,0,1-3-.71,5.36,5.36,0,0,1-2.09-2,5.7,5.7,0,0,1-.76-2.92,5.63,5.63,0,0,1,.76-2.9,5.28,5.28,0,0,1,2.08-2,6.21,6.21,0,0,1,3-.71,5.81,5.81,0,0,1,2.66.6,4.8,4.8,0,0,1,1.92,1.71v-2.22H1858Zm.47-37.64h-13.2a5.63,5.63,0,0,0,1.89,4,6.28,6.28,0,0,0,4.32,1.52,6.81,6.81,0,0,0,2.7-.53,5.88,5.88,0,0,0,2.13-1.54l1.2,1.38a6.77,6.77,0,0,1-2.63,1.92,9.43,9.43,0,0,1-7.77-.38,7.44,7.44,0,0,1-2.92-2.86,8.17,8.17,0,0,1-1.05-4.14,8.45,8.45,0,0,1,1-4.14,7.28,7.28,0,0,1,2.76-2.85,7.72,7.72,0,0,1,4-1,7.63,7.63,0,0,1,3.93,1,7.22,7.22,0,0,1,2.73,2.83,8.56,8.56,0,0,1,1,4.16Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#fff" opacity="0.8" d="M1818.39,2415.35a4.6,4.6,0,0,0-4.4,0,3.93,3.93,0,0,0-1.54,1.59,5.23,5.23,0,0,0,0,4.71,4,4,0,0,0,1.54,1.6,4.6,4.6,0,0,0,4.4,0,4.09,4.09,0,0,0,1.54-1.6,5.23,5.23,0,0,0,0-4.71A4.06,4.06,0,0,0,1818.39,2415.35Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#fff" opacity="0.8" d="M1854.31,2415.33a5.06,5.06,0,0,0-4.53,0,3.8,3.8,0,0,0-1.56,1.49,4.6,4.6,0,0,0,0,4.4,3.85,3.85,0,0,0,1.56,1.51,5,5,0,0,0,4.52,0,3.9,3.9,0,0,0,1.58-1.51,4.58,4.58,0,0,0,0-4.39A4,4,0,0,0,1854.31,2415.33Z" transform="translate(-1192.5 -2334.25)" />
        <Rect fill="#828282" x="48.35" y="34.35" width="60.42" height="60.42" rx="17.79" />
        <Path fill="#333" d="M1327.57,2390.26a6.59,6.59,0,0,0,2.54,2.33,7.44,7.44,0,0,0,3.46.79,8.1,8.1,0,0,0,4-1,7.22,7.22,0,0,0,2.8-2.84,9.1,9.1,0,0,0,0-8.37,7.17,7.17,0,0,0-2.82-2.83,8.11,8.11,0,0,0-4-1,7.42,7.42,0,0,0-3.55.84,6.57,6.57,0,0,0-2.54,2.4v-3.12h-2v21.6h2.13Zm.74-8.11a5.58,5.58,0,0,1,2.1-2.18,6.18,6.18,0,0,1,6,0,5.56,5.56,0,0,1,2.12,2.18,6.51,6.51,0,0,1,.76,3.19,6.62,6.62,0,0,1-.76,3.21,5.43,5.43,0,0,1-2.12,2.18,6.32,6.32,0,0,1-6,0,5.45,5.45,0,0,1-2.1-2.18,6.62,6.62,0,0,1-.77-3.21A6.52,6.52,0,0,1,1328.31,2382.15Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#333" d="M1356.34,2378.35a8.79,8.79,0,0,0-8.22,0,7.44,7.44,0,0,0-2.88,2.85,8.69,8.69,0,0,0,0,8.28,7.56,7.56,0,0,0,2.88,2.87,8.72,8.72,0,0,0,8.22,0,7.47,7.47,0,0,0,2.87-2.87,8.84,8.84,0,0,0,0-8.28A7.35,7.35,0,0,0,1356.34,2378.35Zm1,10.2a5.33,5.33,0,0,1-2.08,2.18,6.36,6.36,0,0,1-6,0,5.45,5.45,0,0,1-2.1-2.18,7.08,7.08,0,0,1,0-6.42,5.42,5.42,0,0,1,2.1-2.17,6.29,6.29,0,0,1,6,0,5.31,5.31,0,0,1,2.08,2.17,7.24,7.24,0,0,1,0,6.42Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#333" d="M1372.57,2385.25a27.61,27.61,0,0,0-3-.72,23.7,23.7,0,0,1-2.4-.52,3.59,3.59,0,0,1-1.45-.8,1.87,1.87,0,0,1-.59-1.44,2.21,2.21,0,0,1,1-1.89,5.37,5.37,0,0,1,3.07-.72,8,8,0,0,1,4.65,1.35l.93-1.71a8.42,8.42,0,0,0-2.52-1.06,11.92,11.92,0,0,0-3.06-.41,7.41,7.41,0,0,0-4.59,1.26,3.9,3.9,0,0,0-1.65,3.24,3.55,3.55,0,0,0,.83,2.49,4.53,4.53,0,0,0,2,1.28,26.62,26.62,0,0,0,3.09.73,20.39,20.39,0,0,1,2.31.5,3.79,3.79,0,0,1,1.44.75,1.7,1.7,0,0,1,.57,1.36,2.15,2.15,0,0,1-1,1.91,6,6,0,0,1-3.2.67,9.89,9.89,0,0,1-3.12-.49,8.09,8.09,0,0,1-2.49-1.28l-1,1.68a7.93,7.93,0,0,0,2.75,1.4,12.08,12.08,0,0,0,3.67.55,8.22,8.22,0,0,0,4.79-1.21,3.82,3.82,0,0,0,1.72-3.29,3.38,3.38,0,0,0-.81-2.4A4.45,4.45,0,0,0,1372.57,2385.25Z" transform="translate(-1192.5 -2334.25)" />
        <Rect fill="#333" x="186.76" y="43.2" width="2.13" height="15.78" />
        <Path fill="#333" d="M1380.34,2374a1.54,1.54,0,0,0,1.56-1.56,1.38,1.38,0,0,0-.45-1,1.54,1.54,0,0,0-1.11-.44,1.51,1.51,0,0,0-1.11.45,1.44,1.44,0,0,0-.45,1,1.47,1.47,0,0,0,.45,1.08A1.51,1.51,0,0,0,1380.34,2374Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#333" d="M1394.16,2393.1a4,4,0,0,0,1.48-.83l-.75-1.53a3.15,3.15,0,0,1-1.06.6,4,4,0,0,1-1.28.21,2.66,2.66,0,0,1-2-.73,3,3,0,0,1-.71-2.15v-9.42h4.8v-1.8h-4.8V2374h-2.13v3.45h-2.82v1.8h2.82v9.54a4.18,4.18,0,0,0,4.62,4.59A6,6,0,0,0,1394.16,2393.1Z" transform="translate(-1192.5 -2334.25)" />
        <Rect fill="#333" x="207.01" y="43.2" width="2.13" height="15.78" />
        <Path fill="#333" d="M1400.59,2374a1.54,1.54,0,0,0,1.56-1.56,1.38,1.38,0,0,0-.45-1,1.54,1.54,0,0,0-1.11-.44,1.51,1.51,0,0,0-1.11.45,1.44,1.44,0,0,0-.45,1,1.47,1.47,0,0,0,.45,1.08A1.51,1.51,0,0,0,1400.59,2374Z" transform="translate(-1192.5 -2334.25)" />
        <Polygon fill="#333" points="226.24 43.2 220.27 56.64 214.36 43.2 212.14 43.2 219.13 58.98 221.32 58.98 228.34 43.2 226.24 43.2" />
        <Path fill="#333" d="M1433.55,2392.72a6.74,6.74,0,0,0,2.62-1.92l-1.2-1.38a5.91,5.91,0,0,1-2.13,1.55,6.81,6.81,0,0,1-2.7.52,6.27,6.27,0,0,1-4.32-1.51,5.65,5.65,0,0,1-1.89-4h13.2l0-.66a8.52,8.52,0,0,0-1-4.15,7.24,7.24,0,0,0-2.73-2.84,8.1,8.1,0,0,0-7.87,0,7.28,7.28,0,0,0-2.76,2.85,8.46,8.46,0,0,0-1,4.14,8.17,8.17,0,0,0,1,4.14,7.49,7.49,0,0,0,2.93,2.87,8.74,8.74,0,0,0,4.3,1A8.9,8.9,0,0,0,1433.55,2392.72Zm-7.86-12.1a5.36,5.36,0,0,1,3.82-1.46,5.42,5.42,0,0,1,3.86,1.46,5.7,5.7,0,0,1,1.75,3.79h-11.19A5.71,5.71,0,0,1,1425.69,2380.62Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#828282" d="M1329.43,2412.86a8.41,8.41,0,0,0-2.71.43,6.44,6.44,0,0,0-2.21,1.2l.74,1.22a5.54,5.54,0,0,1,1.81-1,6.34,6.34,0,0,1,2.21-.38,3.61,3.61,0,0,1,2.55.81,3.09,3.09,0,0,1,.88,2.38v.74h-3.84a5.48,5.48,0,0,0-3.56.94,3.34,3.34,0,0,0,.08,5,5,5,0,0,0,3.22,1,5.74,5.74,0,0,0,2.55-.53,3.82,3.82,0,0,0,1.62-1.48v1.89h1.56v-7.5a4.55,4.55,0,0,0-1.26-3.5A5.15,5.15,0,0,0,1329.43,2412.86Zm3.27,8.56a3.76,3.76,0,0,1-1.47,1.82,4.24,4.24,0,0,1-2.37.64,3.72,3.72,0,0,1-2.26-.61,2,2,0,0,1-.8-1.67c0-1.44,1-2.16,3.1-2.16h3.8Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#828282" d="M1344.89,2418.93a23.59,23.59,0,0,0-2.33-.55c-.78-.14-1.39-.27-1.84-.4a2.72,2.72,0,0,1-1.11-.61,1.45,1.45,0,0,1-.45-1.11,1.69,1.69,0,0,1,.79-1.44,4.13,4.13,0,0,1,2.36-.56,6.13,6.13,0,0,1,3.57,1l.71-1.31a6.52,6.52,0,0,0-1.93-.82,9,9,0,0,0-2.35-.31,5.66,5.66,0,0,0-3.52,1,3,3,0,0,0-1.26,2.48,2.73,2.73,0,0,0,.63,1.91,3.45,3.45,0,0,0,1.53,1,20.11,20.11,0,0,0,2.37.56,15.27,15.27,0,0,1,1.77.38,2.82,2.82,0,0,1,1.1.58,1.31,1.31,0,0,1,.44,1,1.63,1.63,0,0,1-.79,1.46,4.53,4.53,0,0,1-2.45.52,7.62,7.62,0,0,1-2.39-.38,6,6,0,0,1-1.91-1l-.74,1.29a6,6,0,0,0,2.11,1.07,9.33,9.33,0,0,0,2.81.43,6.21,6.21,0,0,0,3.67-.94,2.92,2.92,0,0,0,1.32-2.51,2.55,2.55,0,0,0-.62-1.84A3.41,3.41,0,0,0,1344.89,2418.93Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#828282" d="M1352.67,2414.87a4.77,4.77,0,0,1,2.36-.58,4.48,4.48,0,0,1,2,.45,3.69,3.69,0,0,1,1.52,1.34l1.22-.83a4.69,4.69,0,0,0-1.94-1.78,6.2,6.2,0,0,0-2.8-.61,6.57,6.57,0,0,0-3.21.78,5.7,5.7,0,0,0-2.22,2.19,6.3,6.3,0,0,0-.8,3.17,6.43,6.43,0,0,0,.8,3.19,5.7,5.7,0,0,0,2.22,2.19,6.47,6.47,0,0,0,3.21.79,6.27,6.27,0,0,0,2.78-.61,4.64,4.64,0,0,0,2-1.79l-1.22-.82a3.74,3.74,0,0,1-1.52,1.33,4.61,4.61,0,0,1-2,.44,4.78,4.78,0,0,1-2.36-.59,4.14,4.14,0,0,1-1.63-1.66,5.44,5.44,0,0,1,0-4.93A4.16,4.16,0,0,1,1352.67,2414.87Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#828282" d="M1370.46,2413.64a5.82,5.82,0,0,0-3-.78,5.88,5.88,0,0,0-3,.78,5.52,5.52,0,0,0-2.12,2.19,6.5,6.5,0,0,0-.77,3.17,6.27,6.27,0,0,0,.81,3.18,5.69,5.69,0,0,0,2.24,2.19,7.18,7.18,0,0,0,6,.29,5.26,5.26,0,0,0,2-1.47l-.92-1.06a4.44,4.44,0,0,1-1.64,1.18,5.13,5.13,0,0,1-2.07.41,4.84,4.84,0,0,1-3.31-1.16,4.38,4.38,0,0,1-1.45-3h10.12l0-.51a6.59,6.59,0,0,0-.76-3.18A5.58,5.58,0,0,0,1370.46,2413.64Zm-7.29,4.65a4.38,4.38,0,0,1,1.35-2.91,4.43,4.43,0,0,1,5.89,0,4.37,4.37,0,0,1,1.34,2.91Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#828282" d="M1382.81,2412.86a5.85,5.85,0,0,0-2.74.61,4.66,4.66,0,0,0-1.86,1.71V2413h-1.56v12.1h1.63v-6.35a4.4,4.4,0,0,1,1.14-3.21,4.16,4.16,0,0,1,3.1-1.16,3.55,3.55,0,0,1,2.69,1,4,4,0,0,1,.94,2.88v6.85h1.63v-7a5.22,5.22,0,0,0-1.34-3.86A5,5,0,0,0,1382.81,2412.86Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#828282" d="M1401.67,2415.25a5,5,0,0,0-1.94-1.78,5.67,5.67,0,0,0-2.66-.61,6.26,6.26,0,0,0-3.08.77,5.56,5.56,0,0,0-2.16,2.17,7,7,0,0,0,0,6.4,5.59,5.59,0,0,0,2.16,2.18,6.06,6.06,0,0,0,3.08.79,5.71,5.71,0,0,0,2.73-.65,5,5,0,0,0,1.94-1.86v2.39h1.57V2408h-1.64Zm-.56,6.21a4.18,4.18,0,0,1-1.61,1.67,4.51,4.51,0,0,1-2.29.59,4.56,4.56,0,0,1-2.31-.59,4.18,4.18,0,0,1-1.61-1.67,5.42,5.42,0,0,1,0-4.92,4.18,4.18,0,0,1,1.61-1.67,4.56,4.56,0,0,1,2.31-.58,4.51,4.51,0,0,1,2.29.58,4.18,4.18,0,0,1,1.61,1.67,5.42,5.42,0,0,1,0,4.92Z" transform="translate(-1192.5 -2334.25)" />
        <Rect fill="#828282" x="215.36" y="78.7" width="1.63" height="12.1" />
        <Path fill="#828282" d="M1408.69,2408a1.15,1.15,0,0,0-.85.34,1.11,1.11,0,0,0-.35.8,1.13,1.13,0,0,0,.35.83,1.2,1.2,0,0,0,2.05-.85,1.07,1.07,0,0,0-.35-.79A1.18,1.18,0,0,0,1408.69,2408Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#828282" d="M1420.21,2412.86a5.9,5.9,0,0,0-2.75.61,4.63,4.63,0,0,0-1.85,1.71V2413h-1.56v12.1h1.63v-6.35a4.4,4.4,0,0,1,1.14-3.21,4.15,4.15,0,0,1,3.09-1.16,3.52,3.52,0,0,1,2.69,1,4,4,0,0,1,1,2.88v6.85h1.63v-7a5.18,5.18,0,0,0-1.35-3.86A4.93,4.93,0,0,0,1420.21,2412.86Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#828282" d="M1439.3,2415.28a5,5,0,0,0-2-1.8,6.17,6.17,0,0,0-2.78-.62,6.52,6.52,0,0,0-3.11.74,5.47,5.47,0,0,0-2.17,2.07,5.8,5.8,0,0,0-.79,3,5.88,5.88,0,0,0,.79,3.05,5.48,5.48,0,0,0,2.18,2.09,6.43,6.43,0,0,0,3.1.75,6.13,6.13,0,0,0,2.72-.6,4.88,4.88,0,0,0,2-1.75v1.55a4.5,4.5,0,0,1-1.08,3.32,4.66,4.66,0,0,1-3.38,1.07,7.93,7.93,0,0,1-2.63-.44,6.16,6.16,0,0,1-2.13-1.22l-.83,1.24a6.5,6.5,0,0,0,2.45,1.37,10.19,10.19,0,0,0,3.19.5,6.22,6.22,0,0,0,4.54-1.49,6.16,6.16,0,0,0,1.51-4.56V2413h-1.57Zm-.61,5.72a4.09,4.09,0,0,1-1.64,1.58,5.05,5.05,0,0,1-2.37.56,5,5,0,0,1-2.36-.56,4.06,4.06,0,0,1-1.63-1.58,4.78,4.78,0,0,1,0-4.6,4,4,0,0,1,1.63-1.56,5,5,0,0,1,2.36-.55,4.89,4.89,0,0,1,2.38.56,4.15,4.15,0,0,1,1.63,1.56,4.76,4.76,0,0,1,0,4.59Z" transform="translate(-1192.5 -2334.25)" />
        <Rect fill="#5b5b5b" x="454.76" y="34.38" width="60.42" height="60.42" rx="17.79" />
        <Path fill="#333" d="M1746.37,2393.27v-9.15a6.75,6.75,0,0,0-1.75-5,6.46,6.46,0,0,0-4.73-1.72,7.71,7.71,0,0,0-3.58.79,6,6,0,0,0-2.42,2.24v-2.91h-2v15.78H1734V2385a5.74,5.74,0,0,1,1.49-4.19,5.38,5.38,0,0,1,4-1.51,4.62,4.62,0,0,1,3.51,1.29,5.23,5.23,0,0,1,1.23,3.75v8.94Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#333" d="M1754.61,2392.38a8.72,8.72,0,0,0,4.3,1,8.9,8.9,0,0,0,3.47-.66,6.74,6.74,0,0,0,2.62-1.92l-1.2-1.38a5.88,5.88,0,0,1-2.13,1.54,6.81,6.81,0,0,1-2.7.53,6.28,6.28,0,0,1-4.32-1.52,5.63,5.63,0,0,1-1.89-4H1766l0-.66a8.56,8.56,0,0,0-1-4.16,7.22,7.22,0,0,0-2.73-2.83,7.63,7.63,0,0,0-3.93-1,7.75,7.75,0,0,0-3.95,1,7.25,7.25,0,0,0-2.75,2.85,8.46,8.46,0,0,0-1,4.14,8.17,8.17,0,0,0,1,4.14A7.4,7.4,0,0,0,1754.61,2392.38Zm-.1-11.73a5.82,5.82,0,0,1,7.69,0,5.77,5.77,0,0,1,1.75,3.8h-11.19A5.72,5.72,0,0,1,1754.51,2380.65Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#333" d="M1781.41,2396a6.06,6.06,0,0,1-4.41,1.4,10.33,10.33,0,0,1-3.43-.57,8,8,0,0,1-2.78-1.59l-1.08,1.62a8.56,8.56,0,0,0,3.2,1.78,13.21,13.21,0,0,0,4.15.65q4,0,5.93-1.94t2-6v-13.86h-2v3a6.54,6.54,0,0,0-2.61-2.34,8,8,0,0,0-3.63-.81,8.47,8.47,0,0,0-4.05,1,7.14,7.14,0,0,0-2.83,2.7,8.08,8.08,0,0,0,0,7.93,7.2,7.2,0,0,0,2.85,2.73,8.37,8.37,0,0,0,4,1,8,8,0,0,0,3.56-.78,6.41,6.41,0,0,0,2.59-2.28v2A5.86,5.86,0,0,1,1781.41,2396Zm.71-8A5.31,5.31,0,0,1,1780,2390a6.47,6.47,0,0,1-3.09.74,6.36,6.36,0,0,1-3.07-.74,5.26,5.26,0,0,1-2.13-2.05,6.23,6.23,0,0,1,0-6,5.17,5.17,0,0,1,2.13-2,6.95,6.95,0,0,1,6.18,0,5.43,5.43,0,0,1,2.13,2,5.81,5.81,0,0,1,.76,3A5.87,5.87,0,0,1,1782.12,2388Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#333" d="M1800.79,2390.81v2.46h2v-9.78a6,6,0,0,0-1.65-4.58,6.68,6.68,0,0,0-4.74-1.54,11.21,11.21,0,0,0-3.54.55,8.52,8.52,0,0,0-2.88,1.58l1,1.59a7.27,7.27,0,0,1,2.37-1.37,8.46,8.46,0,0,1,2.88-.49,4.71,4.71,0,0,1,3.33,1.06,4.06,4.06,0,0,1,1.14,3.11v1h-5a7.1,7.1,0,0,0-4.63,1.23,4.33,4.33,0,0,0,.1,6.57,6.49,6.49,0,0,0,4.2,1.26,7.42,7.42,0,0,0,3.32-.69A4.87,4.87,0,0,0,1800.79,2390.81Zm-8,.13a2.57,2.57,0,0,1-1-2.17q0-2.82,4-2.82h5v2.58a4.91,4.91,0,0,1-1.92,2.38,5.62,5.62,0,0,1-3.09.83A4.78,4.78,0,0,1,1792.75,2390.94Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#333" d="M1815.44,2393.13a4,4,0,0,0,1.49-.82l-.75-1.53a3.19,3.19,0,0,1-1.07.6,3.89,3.89,0,0,1-1.27.21,2.69,2.69,0,0,1-2-.74,3,3,0,0,1-.7-2.14v-9.42h4.8v-1.8h-4.8V2374H1809v3.45h-2.82v1.8H1809v9.54a4.18,4.18,0,0,0,4.62,4.59A6,6,0,0,0,1815.44,2393.13Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#333" d="M1821.88,2371a1.51,1.51,0,0,0-1.11.45,1.44,1.44,0,0,0-.45,1.05,1.47,1.47,0,0,0,.45,1.08,1.56,1.56,0,0,0,2.67-1.11,1.4,1.4,0,0,0-.45-1A1.53,1.53,0,0,0,1821.88,2371Z" transform="translate(-1192.5 -2334.25)" />
        <Rect fill="#333" x="628.3" y="43.23" width="2.13" height="15.78" />
        <Polygon fill="#333" points="642.61 59.01 649.63 43.23 647.53 43.23 641.56 56.67 635.65 43.23 633.43 43.23 640.42 59.01 642.61 59.01" />
        <Path fill="#333" d="M1854.73,2378.39a7.63,7.63,0,0,0-3.93-1,7.72,7.72,0,0,0-4,1,7.28,7.28,0,0,0-2.76,2.85,8.45,8.45,0,0,0-1,4.14,8.17,8.17,0,0,0,1.05,4.14,7.44,7.44,0,0,0,2.92,2.86,9.43,9.43,0,0,0,7.77.38,6.77,6.77,0,0,0,2.63-1.92l-1.2-1.38a5.88,5.88,0,0,1-2.13,1.54,6.81,6.81,0,0,1-2.7.53,6.28,6.28,0,0,1-4.32-1.52,5.63,5.63,0,0,1-1.89-4h13.2l0-.66a8.56,8.56,0,0,0-1-4.16A7.22,7.22,0,0,0,1854.73,2378.39Zm-9.51,6.06a5.72,5.72,0,0,1,1.75-3.8,5.81,5.81,0,0,1,7.68,0,5.73,5.73,0,0,1,1.76,3.8Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#828282" d="M1741.09,2415.71a4.74,4.74,0,0,0-1.86-1.7,5.44,5.44,0,0,0-2.54-.59,6,6,0,0,0-3,.74,5.22,5.22,0,0,0-2.06,2.08,6.62,6.62,0,0,0,0,6.12,5.31,5.31,0,0,0,2.06,2.09,5.88,5.88,0,0,0,3,.74,5.46,5.46,0,0,0,2.61-.61,4.81,4.81,0,0,0,1.86-1.78v2.28h1.49v-16.32h-1.56Zm-.54,5.94a4,4,0,0,1-1.54,1.6,4.35,4.35,0,0,1-2.19.56,4.4,4.4,0,0,1-2.21-.56,4.09,4.09,0,0,1-1.54-1.6,5.23,5.23,0,0,1,0-4.71,4.06,4.06,0,0,1,1.54-1.59,4.4,4.4,0,0,1,2.21-.56,4.35,4.35,0,0,1,2.19.56,4,4,0,0,1,1.54,1.59,5.23,5.23,0,0,1,0,4.71Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#828282" d="M1754.38,2414.17a5.57,5.57,0,0,0-2.88-.75,5.67,5.67,0,0,0-2.9.75,5.41,5.41,0,0,0-2,2.09,6.25,6.25,0,0,0-.74,3,6,6,0,0,0,.77,3,5.52,5.52,0,0,0,2.15,2.11,7,7,0,0,0,5.7.27,4.85,4.85,0,0,0,1.92-1.41l-.88-1a4.23,4.23,0,0,1-1.56,1.13,4.93,4.93,0,0,1-2,.39,4.61,4.61,0,0,1-3.17-1.11,4.12,4.12,0,0,1-1.38-2.92h9.68l0-.48a6.2,6.2,0,0,0-.73-3.05A5.27,5.27,0,0,0,1754.38,2414.17Zm-7,4.45a4.2,4.2,0,0,1,1.28-2.79,4.27,4.27,0,0,1,5.63,0,4.16,4.16,0,0,1,1.29,2.79Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#828282" d="M1766.15,2419.23c-.56-.17-1.3-.35-2.22-.53a17.73,17.73,0,0,1-1.76-.38,2.76,2.76,0,0,1-1.07-.58,1.37,1.37,0,0,1-.43-1.06,1.63,1.63,0,0,1,.76-1.39,4,4,0,0,1,2.26-.52,5.86,5.86,0,0,1,3.41,1l.68-1.26a6.36,6.36,0,0,0-1.85-.78,8.68,8.68,0,0,0-2.24-.3,5.42,5.42,0,0,0-3.37.93,2.84,2.84,0,0,0-1.21,2.37,2.62,2.62,0,0,0,.6,1.83,3.47,3.47,0,0,0,1.47.94,18.83,18.83,0,0,0,2.26.53,14.37,14.37,0,0,1,1.7.37,2.76,2.76,0,0,1,1,.55,1.24,1.24,0,0,1,.42,1,1.57,1.57,0,0,1-.76,1.4,4.34,4.34,0,0,1-2.34.49,7.32,7.32,0,0,1-2.29-.36,5.88,5.88,0,0,1-1.82-.94l-.71,1.23a5.73,5.73,0,0,0,2,1,9,9,0,0,0,2.7.4,6,6,0,0,0,3.51-.89,2.79,2.79,0,0,0,1.26-2.41,2.48,2.48,0,0,0-.59-1.76A3.35,3.35,0,0,0,1766.15,2419.23Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#828282" d="M1773.6,2415.35a4.52,4.52,0,0,1,2.25-.56,4.22,4.22,0,0,1,1.91.43,3.59,3.59,0,0,1,1.46,1.28l1.16-.79a4.37,4.37,0,0,0-1.86-1.7,5.89,5.89,0,0,0-2.67-.59,6.23,6.23,0,0,0-3.07.75,5.46,5.46,0,0,0-2.12,2.09,6.05,6.05,0,0,0-.77,3,6.12,6.12,0,0,0,.77,3,5.42,5.42,0,0,0,2.12,2.1,6.23,6.23,0,0,0,3.07.74,5.94,5.94,0,0,0,2.66-.58,4.4,4.4,0,0,0,1.87-1.7l-1.16-.8a3.52,3.52,0,0,1-1.46,1.28,4.35,4.35,0,0,1-1.91.42,4.52,4.52,0,0,1-2.25-.56,4,4,0,0,1-1.57-1.59,4.87,4.87,0,0,1-.56-2.36,4.93,4.93,0,0,1,.56-2.36A4,4,0,0,1,1773.6,2415.35Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#828282" d="M1790.61,2414.17a5.57,5.57,0,0,0-2.88-.75,5.64,5.64,0,0,0-2.89.75,5.44,5.44,0,0,0-2,2.09,6.24,6.24,0,0,0-.73,3,5.89,5.89,0,0,0,.77,3,5.43,5.43,0,0,0,2.14,2.11,7,7,0,0,0,5.7.27,4.85,4.85,0,0,0,1.92-1.41l-.88-1a4.15,4.15,0,0,1-1.56,1.13,4.93,4.93,0,0,1-2,.39,4.63,4.63,0,0,1-3.17-1.11,4.16,4.16,0,0,1-1.38-2.92h9.68l0-.48a6.2,6.2,0,0,0-.73-3.05A5.27,5.27,0,0,0,1790.61,2414.17Zm-7,4.45a4.16,4.16,0,0,1,1.29-2.79,3.92,3.92,0,0,1,2.8-1.06,4,4,0,0,1,2.83,1.06,4.25,4.25,0,0,1,1.29,2.79Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#828282" d="M1802.43,2413.42a5.63,5.63,0,0,0-2.63.59,4.25,4.25,0,0,0-1.77,1.64v-2.14h-1.5v11.57h1.56V2419a4.23,4.23,0,0,1,1.09-3.07,4,4,0,0,1,3-1.11,3.41,3.41,0,0,1,2.58,1,3.84,3.84,0,0,1,.9,2.75v6.55h1.56v-6.71a4.92,4.92,0,0,0-1.29-3.68A4.74,4.74,0,0,0,1802.43,2413.42Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#828282" d="M1820.47,2415.71a4.88,4.88,0,0,0-1.86-1.7,5.46,5.46,0,0,0-2.54-.59,6,6,0,0,0-3,.74,5.31,5.31,0,0,0-2.07,2.08,6.62,6.62,0,0,0,0,6.12,5.4,5.4,0,0,0,2.07,2.09,5.85,5.85,0,0,0,3,.74,5.45,5.45,0,0,0,2.6-.61,4.81,4.81,0,0,0,1.86-1.78v2.28h1.5v-16.32h-1.56Zm-.54,5.94a4.09,4.09,0,0,1-1.54,1.6,4.6,4.6,0,0,1-4.4,0,4,4,0,0,1-1.54-1.6,5.23,5.23,0,0,1,0-4.71,3.93,3.93,0,0,1,1.54-1.59,4.6,4.6,0,0,1,4.4,0,4.06,4.06,0,0,1,1.54,1.59,5.23,5.23,0,0,1,0,4.71Z" transform="translate(-1192.5 -2334.25)" />
        <Rect fill="#828282" x="633.88" y="79.26" width="1.56" height="11.57" />
        <Path fill="#828282" d="M1827.18,2408.76a1.11,1.11,0,0,0-.82.33,1.06,1.06,0,0,0-.33.77,1.07,1.07,0,0,0,.33.79,1.15,1.15,0,0,0,2-.81,1,1,0,0,0-.33-.76A1.13,1.13,0,0,0,1827.18,2408.76Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#828282" d="M1838.2,2413.42a5.63,5.63,0,0,0-2.63.59,4.25,4.25,0,0,0-1.77,1.64v-2.14h-1.5v11.57h1.56V2419a4.23,4.23,0,0,1,1.09-3.07,4,4,0,0,1,3-1.11,3.4,3.4,0,0,1,2.58,1,3.84,3.84,0,0,1,.9,2.75v6.55H1843v-6.71a4.92,4.92,0,0,0-1.29-3.68A4.72,4.72,0,0,0,1838.2,2413.42Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#828282" d="M1856.46,2415.73a4.8,4.8,0,0,0-1.92-1.71,5.81,5.81,0,0,0-2.66-.6,6.21,6.21,0,0,0-3,.71,5.28,5.28,0,0,0-2.08,2,5.63,5.63,0,0,0-.76,2.9,5.7,5.7,0,0,0,.76,2.92,5.36,5.36,0,0,0,2.09,2,6.14,6.14,0,0,0,3,.71,5.91,5.91,0,0,0,2.61-.57,4.71,4.71,0,0,0,1.9-1.67v1.47a4.3,4.3,0,0,1-1,3.18,4.42,4.42,0,0,1-3.24,1,7.57,7.57,0,0,1-2.52-.42,6,6,0,0,1-2-1.17l-.79,1.19a6.28,6.28,0,0,0,2.34,1.31,9.88,9.88,0,0,0,3.05.47,5.94,5.94,0,0,0,4.34-1.42,5.88,5.88,0,0,0,1.44-4.36v-10.17h-1.49Zm-.58,5.48a3.9,3.9,0,0,1-1.58,1.51,5,5,0,0,1-4.52,0,3.85,3.85,0,0,1-1.56-1.51,4.6,4.6,0,0,1,0-4.4,3.8,3.8,0,0,1,1.56-1.49,5.06,5.06,0,0,1,4.53,0,4,4,0,0,1,1.57,1.49,4.58,4.58,0,0,1,0,4.39Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#333" d="M1546.69,2392.8a11.21,11.21,0,0,0-3.54.56,8.5,8.5,0,0,0-2.88,1.57l1,1.59a7.25,7.25,0,0,1,2.37-1.36,8.47,8.47,0,0,1,2.88-.5,4.71,4.71,0,0,1,3.33,1.07,4,4,0,0,1,1.14,3.1v1h-5a7.1,7.1,0,0,0-4.63,1.23,4.33,4.33,0,0,0,.1,6.57,6.49,6.49,0,0,0,4.2,1.26,7.42,7.42,0,0,0,3.32-.69,4.87,4.87,0,0,0,2.11-1.92v2.46h2v-9.78a6,6,0,0,0-1.65-4.57A6.68,6.68,0,0,0,1546.69,2392.8ZM1551,2404a4.94,4.94,0,0,1-1.92,2.39,5.61,5.61,0,0,1-3.09.82,4.78,4.78,0,0,1-2.94-.79,2.59,2.59,0,0,1-1-2.18q0-2.82,4-2.82h5Z" transform="translate(-1192.5 -2334.25)" />
        <Polygon fill="#333" points="378.5 58.67 376.15 58.67 371.42 64.85 366.68 58.67 364.27 58.67 370.21 66.35 363.98 74.45 366.38 74.45 371.42 67.85 376.43 74.45 378.86 74.45 372.56 66.35 378.5 58.67" />
        <Rect fill="#333" x="382.39" y="58.67" width="2.13" height="15.78" />
        <Path fill="#333" d="M1576,2386.44a1.51,1.51,0,0,0-1.11.45,1.44,1.44,0,0,0-.45,1.05,1.47,1.47,0,0,0,.45,1.08,1.56,1.56,0,0,0,2.67-1.11,1.38,1.38,0,0,0-.45-1A1.54,1.54,0,0,0,1576,2386.44Z" transform="translate(-1192.5 -2334.25)" />
        <Path fill="#333" d="M1590.94,2400.72a27.61,27.61,0,0,0-3-.72,23.7,23.7,0,0,1-2.4-.52,3.59,3.59,0,0,1-1.45-.8,1.87,1.87,0,0,1-.59-1.44,2.21,2.21,0,0,1,1-1.89,5.37,5.37,0,0,1,3.07-.72,8,8,0,0,1,4.65,1.35l.93-1.71a8.42,8.42,0,0,0-2.52-1.06,11.92,11.92,0,0,0-3.06-.41,7.41,7.41,0,0,0-4.59,1.26,3.9,3.9,0,0,0-1.65,3.24,3.55,3.55,0,0,0,.83,2.49,4.53,4.53,0,0,0,2,1.28,26.62,26.62,0,0,0,3.09.73,20.39,20.39,0,0,1,2.31.5,3.79,3.79,0,0,1,1.44.75,1.7,1.7,0,0,1,.57,1.36,2.15,2.15,0,0,1-1,1.91,6,6,0,0,1-3.2.67,9.89,9.89,0,0,1-3.12-.49,8.09,8.09,0,0,1-2.49-1.28l-1,1.68a7.93,7.93,0,0,0,2.75,1.4,12.08,12.08,0,0,0,3.67.55,8.22,8.22,0,0,0,4.79-1.21,3.82,3.82,0,0,0,1.72-3.29,3.38,3.38,0,0,0-.81-2.4A4.45,4.45,0,0,0,1590.94,2400.72Z" transform="translate(-1192.5 -2334.25)" />
        <Rect fill="#3c5e99" x="300.78" y="34.04" width="23.33" height="60.42" rx="7.15" />

      </G>
    </Svg>
  );
}

export default Legend;