import * as React from "react";
import Svg, { G, Path, Rect, Circle } from "react-native-svg";

const ThemeBtnSVG = ({ size = 40 }) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        // xmlns:svgjs="http://svgjs.com/svgjs"
        width={size}
        height={size}
        x={0}
        y={0}
        viewBox="0 0 64 64"
        style={{
            enableBackground: "new 0 0 512 512",
        }}
        xmlSpace="preserve"
        className=""
    >
        <G transform="matrix(1.05,0,0,1.05,-1.6000000000000014,-1.6000000000000014)">
            <Rect
                width={60}
                height={30}
                x={2}
                y={17}
                fill="#4c6cb5"
                rx={15}
                data-original="#4c6cb5"
                className=""
            />
            <Path
                fill="#78a0d4"
                d="M17 21h30v22H17z"
                data-original="#78a0d4"
                className=""
            />
            <Path
                fill="#93bee5"
                d="M17 21v16h13a2 2 0 0 0 2-2V21z"
                data-original="#93bee5"
                className=""
            />
            <Circle
                cx={17}
                cy={32}
                r={11}
                fill="#e2e7f6"
                data-original="#e2e7f6"
                className=""
            />
            <Path
                fill="#f2f2f2"
                d="M25 31a10.99 10.99 0 0 0-6.061-9.819 10.99 10.99 0 0 0-6.878 20.638A10.955 10.955 0 0 0 25 31z"
                data-original="#f2f2f2"
                className=""
            />
            <Circle
                cx={47}
                cy={32}
                r={11}
                fill="#e2e7f6"
                data-original="#e2e7f6"
                className=""
            />
            <Path
                fill="#f2f2f2"
                d="M55 31a10.99 10.99 0 0 0-6.061-9.819 10.99 10.99 0 0 0-6.878 20.638A10.955 10.955 0 0 0 55 31z"
                data-original="#f2f2f2"
                className=""
            />
            <G fill="#f9d266">
                <Path
                    d="M16 24h2v4h-2zM16 36h2v4h-2zM21 31h4v2h-4zM9 31h4v2H9zM19.342 35.751l1.414-1.414 2.604 2.604-1.414 1.414zM10.634 27.043l1.414-1.414 2.604 2.604-1.414 1.414zM19.341 28.239l2.604-2.604 1.414 1.414-2.604 2.604zM10.631 36.948l2.657-2.657 1.414 1.414-2.657 2.657z"
                    fill="#f9d266"
                    data-original="#f9d266"
                    className=""
                />
            </G>
            <Path
                fill="#9da1bf"
                d="M48.414 26A5.581 5.581 0 0 1 41 33.414 6.095 6.095 0 1 0 48.414 26z"
                data-original="#9da1bf"
            />
            <Circle cx={17} cy={32} r={5} fill="#f4a93c" data-original="#f4a93c" />
            <Path
                fill="#f6b940"
                d="M12 32a4.969 4.969 0 0 0 1.851 3.855 4.977 4.977 0 0 0 4.3-8.71A4.958 4.958 0 0 0 12 32z"
                data-original="#f6b940"
                className=""
            />
        </G>
    </Svg>
);
export default React.memo(ThemeBtnSVG)